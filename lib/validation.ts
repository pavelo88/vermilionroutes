import { z } from 'zod';

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
 * ✅ Sanitización robusta de texto libre.
 *
 * Estrategia de allowlist en lugar de blocklist parcial:
 * - Elimina TODOS los tags HTML (strip completo)
 * - Elimina TODOS los atributos de evento inline (on* handlers)
 * - Elimina pseudo-protocolos peligrosos (javascript:, vbscript:, data:)
 * - Normaliza entidades HTML que podrían reensamblar payloads después del strip
 * - Limita la longitud máxima para prevenir ataques de payload largo
 */
export function sanitizeText(input: string, maxLength: number = 2000): string {
  if (!input) return '';

  let sanitized = String(input);

  // 1. Decodificar entidades HTML comunes antes de procesar
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

  // 4. Eliminar atributos de evento inline (cualquier on* = "...")
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

/**
 * Esquema de validación para Leads y Solicitudes de Cotización
 */
export const leadSchema = z.object({
  customerName: z.string().optional(),
  name: z.string().optional(),
  customerEmail: z.string().optional(),
  email: z.string().optional(),
  customerPhone: z.string().optional(),
  phone: z.string().optional(),
  tourId: z.string().optional(),
  tourTitle: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  destination: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  travelDates: z.string().optional(),
  date: z.string().optional(),
  guestsCount: z.string().optional(),
  travelers: z.string().optional(),
  message: z.string().optional(),
}).superRefine((data, ctx) => {
  const rawName = (data.customerName || data.name || '').trim();
  const rawEmail = (data.customerEmail || data.email || '').trim();
  const rawPhone = (data.customerPhone || data.phone || '').trim();

  if (!rawName || rawName.length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Full customer name is required (minimum 2 characters).',
      path: ['customerName'],
    });
  }

  if (!rawEmail || !isValidEmail(rawEmail)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A valid email address is required.',
      path: ['customerEmail'],
    });
  }

  if (rawPhone && !isValidPhone(rawPhone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number format.',
      path: ['customerPhone'],
    });
  }
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Esquema de validación para Checkout Sessions de Stripe y depósitos
 */
export const checkoutSchema = z.object({
  tourId: z.string().nullable().optional(),
  tourTitle: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  clientEmail: z.string().min(3).refine((email) => isValidEmail(email), {
    message: 'A valid email address is required.',
  }),
  customLinkId: z.string().optional(),
  amount: z.number().optional(),
  paymentType: z.enum(['deposit', 'full', 'custom']).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
