import { describe, it, expect } from 'vitest';
import { generateConciergeReply, buildSystemPrompt } from '@/lib/ai-providers';

describe('AI Concierge & Resilient Multi-Language Engine', () => {
  it('should build system prompt containing catalog context and locale instructions', async () => {
    const promptEs = await buildSystemPrompt('es');
    expect(promptEs).toContain('Pyro');
    expect(promptEs).toContain('Spanish (Español)');
    expect(promptEs).toContain('Vermilion Routes');

    const promptEn = await buildSystemPrompt('en');
    expect(promptEn).toContain('English');
  });

  it('should handle fallback responses in all 8 supported languages', async () => {
    const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

    for (const locale of locales) {
      const response = await generateConciergeReply(
        [{ role: 'user', content: 'Hello, I want to travel to Galapagos' }],
        'invalid-provider-force-fallback',
        locale
      );

      expect(response).toBeDefined();
      expect(response.message).toBeTruthy();
      expect(response.message.length).toBeGreaterThan(10);
      expect(response.providerUsed).toBe('Vermilion Concierge Engine');
    }
  });

  it('should answer price inquiries gracefully in fallback mode (Spanish)', async () => {
    const response = await generateConciergeReply(
      [{ role: 'user', content: '¿Cuál es el precio de los tours?' }],
      'force-fallback',
      'es'
    );

    expect(response.message).toContain('cotización');
  });

  it('should answer Galapagos inquiries gracefully in fallback mode (English)', async () => {
    const response = await generateConciergeReply(
      [{ role: 'user', content: 'Tell me about the Galapagos islands' }],
      'force-fallback',
      'en'
    );

    expect(response.message).toContain('Galapagos');
  });
});
