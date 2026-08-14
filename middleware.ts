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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --------------------------------------------------------------------------
  // PASO 1: Interceptación y Blindaje de Rutas Administrativas en el Edge
  // --------------------------------------------------------------------------
  // Detecta patrones como `/:locale/admin` o `/:locale/admin/*`
  const localePattern = locales.join('|');
  const adminRegex = new RegExp(`^/(${localePattern})/admin(?:/(.*))?$`);
  const adminMatch = pathname.match(adminRegex);

  // También verifica accesos directos sin prefijo de idioma a `/admin`
  const isDirectAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  if (adminMatch || isDirectAdmin) {
    const locale = adminMatch ? adminMatch[1] : 'en';
    const subPath = adminMatch ? (adminMatch[2] || '') : pathname.replace(/^\/admin\/?/, '');
    
    // Cookie de sesión estándar de Firebase Auth / Edge Session
    const sessionCookie = req.cookies.get('__session')?.value;

    // Rutas públicas dentro del módulo de administración (ej. pantalla de login dedicada)
    const isPublicAdminRoute = subPath === 'login';

    // Si no existe la cookie de sesión y el usuario intenta acceder a una sección protegida
    if (!sessionCookie && !isPublicAdminRoute) {
      // Redirigir al usuario al login administrativo preservando el idioma
      const loginUrl = new URL(`/${locale}/admin/login`, req.url);
      
      // Si el usuario intentaba acceder a una subruta específica, preservar la URL de retorno
      if (subPath && subPath !== 'dashboard') {
        loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
      }

      return NextResponse.redirect(loginUrl);
    }
  }

  // --------------------------------------------------------------------------
  // PASO 2: Procesamiento de Rutas Públicas e Internacionalización (i18n)
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
    // Rutas de API para eventual rate limiting
    '/api/concierge/:path*',
    '/api/checkout/:path*',
    '/api/leads/:path*',
    // Exclusión explícita de archivos internos y estáticos
    '/((?!_next/static|_next/image|favicon.ico|images/.*|.*\\..*).*)'
  ]
};
