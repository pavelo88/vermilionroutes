import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

/**
 * ============================================================================
 * VERMILION ROUTES — EDGE INFRASTRUCTURE MIDDLEWARE
 * ============================================================================
 * 
 * Responsabilidades:
 * 1. Protección en el Edge de rutas administrativas (/[locale]/admin/*).
 * 2. Validación de credenciales/sesión mediante la cookie estándar `__session`.
 * 3. Enrutamiento y negociación de idioma con `next-intl`.
 * 4. Arquitectura y puntos de extensión para Rate Limiting en endpoints críticos (/api/*).
 */

// 1. Configuración de internacionalización (next-intl)
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

/**
 * ============================================================================
 * [ARQUITECTURA DE RATE LIMITING EN EL EDGE - COMENTARIOS Y PLAN TÉCNICO]
 * ============================================================================
 * 
 * Para mitigar ataques de Denegación de Servicio Financiera (FDoS) en endpoints
 * que consumen APIs de pago (OpenAI/NVIDIA y Stripe Checkout), se recomienda 
 * implementar un algoritmo de Sliding Window en el Edge utilizando Upstash Redis 
 * o Cloudflare KV (@upstash/ratelimit).
 * 
 * Estrategia de Cuotas por Endpoint:
 * - `/api/concierge/chat` : 15 solicitudes / minuto por IP
 *   Razón: Cada consulta ejecuta inferencia LLM que genera costos directos por token.
 * 
 * - `/api/checkout/*`      : 10 solicitudes / minuto por IP
 *   Razón: Previene la creación masiva de Stripe Checkout Sessions y ataques de 
 *   card testing / validación automatizada de tarjetas fraudulentas.
 * 
 * - `/api/leads`           : 10 solicitudes / minuto por IP
 *   Razón: Protege el webhook de n8n y previene saturación en Firestore.
 * 
 * Ejemplo de implementación futura con Upstash / Edge Redis:
 * ```typescript
 * import { Ratelimit } from '@upstash/ratelimit';
 * import { Redis } from '@upstash/redis';
 * 
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(15, '1 m'),
 *   analytics: true,
 * });
 * 
 * async function applyRateLimit(req: NextRequest): Promise<NextResponse | null> {
 *   const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'anonymous';
 *   const { success, limit, remaining, reset } = await ratelimit.limit(`rate_limit:${ip}`);
 *   if (!success) {
 *     return NextResponse.json(
 *       { error: 'Too Many Requests', retryAfter: reset },
 *       { 
 *         status: 429, 
 *         headers: { 
 *           'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
 *           'X-RateLimit-Limit': limit.toString(),
 *           'X-RateLimit-Remaining': remaining.toString(),
 *           'X-RateLimit-Reset': reset.toString(),
 *         } 
 *       }
 *     );
 *   }
 *   return null;
 * }
 * ```
 * ============================================================================
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function getRateLimitConfig(pathname: string): { limit: number; windowMs: number } {
  if (pathname.startsWith('/api/concierge')) {
    return { limit: 15, windowMs: 60 * 1000 }; // 15 req/min (LLM token defense)
  }
  if (pathname.startsWith('/api/checkout')) {
    return { limit: 10, windowMs: 60 * 1000 }; // 10 req/min (Card testing defense)
  }
  if (pathname.startsWith('/api/leads')) {
    return { limit: 10, windowMs: 60 * 1000 }; // 10 req/min (Spam defense)
  }
  return { limit: 60, windowMs: 60 * 1000 };
}

function checkRateLimit(ip: string, pathname: string): { allowed: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();

  if (now - lastCleanup > CLEANUP_INTERVAL) {
    lastCleanup = now;
    for (const [key, record] of rateLimitMap.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 120 * 1000);
      if (record.timestamps.length === 0) {
        rateLimitMap.delete(key);
      }
    }
  }

  const { limit, windowMs } = getRateLimitConfig(pathname);
  const key = `${ip}:${pathname.split('/').slice(0, 3).join('/')}`;
  const record = rateLimitMap.get(key) || { timestamps: [] };

  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const reset = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return { allowed: false, limit, remaining: 0, reset: Math.max(1, reset) };
  }

  record.timestamps.push(now);
  rateLimitMap.set(key, record);
  return { allowed: true, limit, remaining: limit - record.timestamps.length, reset: Math.ceil(windowMs / 1000) };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --------------------------------------------------------------------------
  // PASO 1: Interceptación y Rate Limiting / Autorización en API Routes (/api/*)
  // --------------------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    // 1.1 Blindaje de autorización para /api/seed
    if (pathname === '/api/seed' || pathname.startsWith('/api/seed/')) {
      const sessionCookie = req.cookies.get('__session')?.value;
      const authHeader = req.headers.get('authorization');
      const isValidBearer = process.env.SEED_SECRET && authHeader === `Bearer ${process.env.SEED_SECRET}`;

      if (!sessionCookie && !isValidBearer) {
        return NextResponse.json(
          {
            success: false,
            error: 'Autorización Requerida',
            message: 'Se requiere autenticación o credenciales válidas para acceder a este recurso.'
          },
          { status: 401 }
        );
      }
    }

    // 1.2 Rate Limiting por IP en API routes
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, pathname);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please wait before retrying.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateCheck.reset.toString(),
            'X-RateLimit-Limit': rateCheck.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateCheck.reset.toString(),
          }
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', rateCheck.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateCheck.remaining.toString());
    return response;
  }

  // --------------------------------------------------------------------------
  // PASO 2: Interceptación y Blindaje de Rutas Administrativas en el Edge
  // --------------------------------------------------------------------------
  const localePattern = locales.join('|');
  const adminRegex = new RegExp(`^/(${localePattern})/admin(?:/(.*))?$`);
  const adminMatch = pathname.match(adminRegex);
  const isDirectAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  if (adminMatch || isDirectAdmin) {
    const locale = adminMatch ? adminMatch[1] : 'en';
    const subPath = adminMatch ? (adminMatch[2] || '') : pathname.replace(/^\/admin\/?/, '');
    
    const sessionCookie = req.cookies.get('__session')?.value;
    const isPublicAdminRoute = subPath === 'login';

    if (!sessionCookie && !isPublicAdminRoute) {
      const loginUrl = new URL(`/${locale}/admin/login`, req.url);
      if (subPath && subPath !== 'dashboard') {
        loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  // --------------------------------------------------------------------------
  // PASO 3: Procesamiento de Rutas Públicas e Internacionalización (i18n)
  // --------------------------------------------------------------------------
  return intlMiddleware(req);
}

export const config = {
  // Coincidir con todas las rutas excepto recursos estáticos, imágenes y favicon
  matcher: [
    // Rutas protegidas y de aplicación
    '/',
    '/(en|es|fr|de|zh|it|pt|ja)/:path*',
    // Rutas administrativas
    '/admin/:path*',
    '/admin',
    // Rutas de API protegidas y con rate limiting
    '/api/seed/:path*',
    '/api/seed',
    '/api/concierge/:path*',
    '/api/checkout/:path*',
    '/api/leads/:path*',
    // Exclusión explícita de archivos internos y estáticos
    '/((?!_next/static|_next/image|favicon.ico|images/.*|.*\\..*).*)'
  ]
};
