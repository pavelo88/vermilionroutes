import { describe, it, expect } from 'vitest';
import { withValidation } from '@/lib/apiHandler';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const sampleSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.string().email('Invalid email address'),
  count: z.number().min(1).optional(),
});

describe('API Security Wrapper (withValidation HOF)', () => {
  it('should process handler successfully when payload is valid', async () => {
    const handler = withValidation(sampleSchema, async (_req, _ctx, data) => {
      return NextResponse.json({ success: true, user: data.name }, { status: 200 });
    });

    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alexander', email: 'alex@example.com' }),
    });

    const response = await handler(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.user).toBe('Alexander');
  });

  it('should return 400 Bad Request with details when schema validation fails', async () => {
    const handler = withValidation(sampleSchema, async () => {
      return NextResponse.json({ success: true });
    });

    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'not-an-email' }),
    });

    const response = await handler(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toBeDefined();
    expect(json.details).toBeDefined();
  });

  it('should return 400 when JSON body is malformed', async () => {
    const handler = withValidation(sampleSchema, async () => {
      return NextResponse.json({ success: true });
    });

    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-non-json-string{',
    });

    const response = await handler(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it('should return 500 when handler throws an unhandled error', async () => {
    const handler = withValidation(sampleSchema, async () => {
      throw new Error('Database connection dropped unexpectedly');
    });

    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alexander', email: 'alex@example.com' }),
    });

    const response = await handler(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toContain('Error Interno');
  });
});
