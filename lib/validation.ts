/**
 * Security & Input Validation Helpers
 * Provides strict client-side and data-layer sanitization and validation.
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
 * Sanitizes string input to prevent XSS script injection or unwanted tags.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script blocks
    .replace(/<[^>]+>/g, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: pseudo-protocols
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .trim();
}
