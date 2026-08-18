/**
 * Tests de integración para /api/checkout/session
 *
 * Cubre los casos críticos que garantizan que la generación de sesiones
 * de Stripe funciona correctamente y maneja los errores sin exponer
 * información sensible al cliente.
 */
import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';

// ── Mocks ────────────────────────────────────────────────────────────────────

// Mock Stripe BEFORE the module import chain loads it.
// Must use a `function` (not arrow) so `new Stripe()` works as a constructor.
const mockSessionCreate = vi.fn();

vi.mock('stripe', () => {
  return {
    default: class MockStripe {
      checkout = {
        sessions: {
          create: mockSessionCreate,
        },
      };
    },
  };
});

import { POST } from '@/app/api/checkout/session/route';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Helper: builds a NextRequest-compatible mock object for POST /api/checkout/session
 */
function makeRequest(body: Record<string, unknown>): Request {
  return new Request('http://localhost:3000/api/checkout/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// ── Test Suite ────────────────────────────────────────────────────────────────

describe('POST /api/checkout/session', () => {
  let originalStripeKey: string | undefined;

  beforeAll(() => {
    originalStripeKey = process.env.STRIPE_SECRET_KEY;
    process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
  });

  afterAll(() => {
    process.env.STRIPE_SECRET_KEY = originalStripeKey;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // Default: Stripe resolves successfully
    mockSessionCreate.mockResolvedValue({
      id: 'cs_test_abc123',
      url: 'https://checkout.stripe.com/pay/cs_test_abc123',
    });
  });

  // ── Happy Path ────────────────────────────────────────────────────────────

  it('TC-01: returns sessionId and url on successful creation', async () => {
    const req = makeRequest({
      tourId: 'andes-jungle-galapagos',
      tourTitle: 'Andes, Amazon Jungle & Galapagos Expedition',
      clientEmail: 'traveler@example.com',
      amount: 500,
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.sessionId).toBe('cs_test_abc123');
    expect(json.url).toContain('checkout.stripe.com');
  });

  it('TC-02: uses finalAmount = 50000 cents when amount is not provided', async () => {
    const { POST } = await import('@/app/api/checkout/session/route');
    const req = makeRequest({
      tourId: 'galapagos-economic',
      tourTitle: 'Galapagos Economic Tour',
      clientEmail: 'client@test.com',
      // amount is intentionally omitted
    });

    await POST(req);

    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: 50000, // fallback: $500.00 USD
            }),
          }),
        ]),
      })
    );
  });

  it('TC-03: converts decimal amount to cents correctly (rounds)', async () => {
    const { POST } = await import('@/app/api/checkout/session/route');
    const req = makeRequest({
      tourId: 'test-tour',
      tourTitle: 'Test Tour',
      clientEmail: 'test@test.com',
      amount: 249.99, // should become 24999 cents
    });

    await POST(req);

    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: 24999,
            }),
          }),
        ]),
      })
    );
  });

  it('TC-04: passes customer_email correctly to Stripe', async () => {
    const { POST } = await import('@/app/api/checkout/session/route');
    const email = 'unique@vermilion.com';
    const req = makeRequest({ tourId: 't1', tourTitle: 'T1', clientEmail: email, amount: 100 });

    await POST(req);

    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({ customer_email: email })
    );
  });

  // ── Error Handling ────────────────────────────────────────────────────────

  it('TC-05: returns 500 on Stripe error WITHOUT exposing internal message', async () => {
    // Override the session create to simulate a Stripe error for this test
    mockSessionCreate.mockRejectedValue({
      type: 'StripeCardError',
      message: 'Your card was declined — internal stripe detail',
    });

    const { POST } = await import('@/app/api/checkout/session/route');
    const req = makeRequest({ tourId: 't', tourTitle: 'T', clientEmail: 'x@y.com', amount: 100 });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(500);
    // Must NOT contain the internal Stripe error message
    expect(json.error).not.toContain('declined');
    expect(json.error).not.toContain('internal stripe detail');
    // Must contain a generic, safe message
    expect(json.error).toMatch(/Payment session could not be created|Internal server error/i);
  });

  it('TC-06: includes tourId and customLinkId in Stripe session metadata', async () => {
    const { POST } = await import('@/app/api/checkout/session/route');
    const req = makeRequest({
      tourId: 'machu-picchu-luxury',
      tourTitle: 'Machu Picchu Luxury',
      clientEmail: 'vip@test.com',
      customLinkId: 'link-abc-123',
      amount: 300,
    });

    await POST(req);

    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({
          tourId: 'machu-picchu-luxury',
          customLinkId: 'link-abc-123',
        }),
      })
    );
  });
});
