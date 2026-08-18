import { describe, it, expect } from 'vitest';
import { sanitizeText, isValidEmail, isValidPhone } from '@/lib/validation';

describe('Perimeter Input Validation & Sanitization Security', () => {
  it('should sanitize dangerous HTML and script tags from input strings', () => {
    const malicious = '<script>alert("xss")</script>John Doe';
    const sanitized = sanitizeText(malicious);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('</script>');
    expect(sanitized).toContain('John Doe');
  });

  it('should correctly validate genuine and invalid email addresses', () => {
    expect(isValidEmail('traveler@vermilionroutes.com')).toBe(true);
    expect(isValidEmail('info@galapagos.ec')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('@missinguser.com')).toBe(false);
    expect(isValidEmail('user@.com')).toBe(false);
  });

  it('should correctly validate phone numbers', () => {
    expect(isValidPhone('+593994048458')).toBe(true);
    expect(isValidPhone('+1 (555) 234-5678')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
  });
});
