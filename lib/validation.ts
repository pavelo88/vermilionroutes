/**
 * Security & Input Validation Helpers
 * Provides strict server-side sanitization and validation.
 */

/**
 * Filter raw phone input on typing:
 * Only allows digits, spaces, parentheses, hyphens, and a leading plus (+)
 */
export function filterPhoneInput(value: string): string {
  // Allow leading '+' and only digits, spaces, parentheses, hyphens
  let cleaned = value.replace(/[^\d\s()+ -]/g, '');
  // Ensure plus sign can only be at the very start
  if (cleaned.indexOf('+') > 0) {
    cleaned = cleaned.charAt(0) + cleaned.slice(1).replace(/\+/g, '');
  }
  return cleaned;
}

/**
 * Validates strict phone format:
 * Must be between 7 and 25 characters long and contain at least 7 digits.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.trim().length < 7) return false;
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) return false;
  const phoneRegex = /^[+\d\s()\-]{7,25}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Validates strict email syntax.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim().length === 0) return false;
  // Standard strict RFC 5322 compatible email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * ✅ W-02 FIX: Sanitización robusta de texto libre.
 *
 * Estrategia de allowlist en lugar de blocklist parcial:
 * - Elimina TODOS los tags HTML (strip completo, no solo <script>)
 * - Elimina TODOS los atributos de evento inline (on* handlers)
 * - Elimina pseudo-protocolos peligrosos (javascript:, vbscript:, data:)
 * - Normaliza entidades HTML que podrían reensamblar payloads después del strip
 * - Limita la longitud máxima para prevenir ataques de payload largo
 */
export function sanitizeText(input: string, maxLength: number = 2000): string {
  if (!input) return '';

  let sanitized = String(input);

  // 1. Decodificar entidades HTML comunes antes de procesar
  //    para atrapar payloads obfuscados como &#106;avascript:
  sanitized = sanitized
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  // 2. Eliminar bloques <script>...</script> incluyendo contenido
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 3. Eliminar bloques <style>...</style>
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // 4. Eliminar atributos de evento inline (cualquier on* = "...") — allowlist vacía
  //    Cubre los ~150 eventos del DOM: onclick, onmouseover, onfocus, onload, onerror, etc.
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '');

  // 5. Eliminar pseudo-protocolos peligrosos en atributos href/src/action
  sanitized = sanitized.replace(/(?:href|src|action|formaction|data)\s*=\s*["']?\s*(?:javascript|vbscript|data)\s*:/gi, '');

  // 6. Strip completo de cualquier tag HTML restante
  sanitized = sanitized.replace(/<[^>]+>/g, '');

  // 7. Eliminar instancias sueltas de pseudo-protocolos (fuera de atributos)
  sanitized = sanitized.replace(/javascript\s*:/gi, '');
  sanitized = sanitized.replace(/vbscript\s*:/gi, '');
  sanitized = sanitized.replace(/data\s*:\s*text\/html/gi, '');

  // 8. Limpiar whitespace redundante y aplicar límite de longitud
  sanitized = sanitized.trim();
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}
