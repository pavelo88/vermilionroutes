import { NextRequest, NextResponse } from 'next/server';

/**
 * ✅ W-04 FIX: Rate limiting por IP en todos los endpoints /api/*
 *
 * Límites diferenciados por ruta:
 *  - /api/concierge/chat  → 15 req/min  (cada request consume tokens de IA de pago)
 *  - /api/leads           → 10 req/min  (previene spam de bookings y abuso de webhook n8n)
 *  - /api/checkout/*      → 10 req/min  (previene generación masiva de sesiones Stripe)
 *  - /api/seed            → 3  req/min  (endpoint de mantenimiento, uso muy infrecuente)
 *  - resto de /api/*      → 30 req/min  (límite general permisivo)
 *
 * Implementación: Map en memoria con ventana deslizante por IP.
 * En producción con múltiples instancias se recomienda migrar a Redis/Upstash.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Map global en el módulo (persiste entre requests en la misma instancia de servidor)
const rateLimitStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000; // ventana de 1 minuto

/** Retorna el límite de requests/minuto según el pathname */
function getLimitForPath(pathname: string): number {
  if (pathname.startsWith('/api/concierge')) return 15;
  if (pathname.startsWith('/api/leads'))     return 10;
  if (pathname.startsWith('/api/checkout'))  return 10;
  if (pathname.startsWith('/api/seed'))      return 3;
  return 30;
}

/** Extrae la IP real del request, considerando proxies y Vercel */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export function middleware(req: NextRequest) {
  // Solo aplicar a rutas de API
  if (!req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = getClientIp(req);
  const now = Date.now();
  const limit = getLimitForPath(req.nextUrl.pathname);
  const key = `${ip}:${req.nextUrl.pathname.split('/').slice(0, 3).join('/')}`;

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // Ventana nueva
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else if (entry.count >= limit) {
    // Límite superado
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit exceeded. Please wait ${retryAfter} seconds before retrying.`,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
        },
      }
    );
  } else {
    entry.count++;
  }

  // Añadir headers informativos de rate limit en la respuesta
  const remaining = limit - (rateLimitStore.get(key)?.count ?? 1);
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(limit));
  response.headers.set('X-RateLimit-Remaining', String(Math.max(0, remaining)));
  return response;
}

export const config = {
  // Solo intercepta rutas de API; no afecta páginas, assets ni _next
  matcher: ['/api/:path*'],
};
