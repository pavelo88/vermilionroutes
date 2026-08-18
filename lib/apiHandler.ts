import { NextResponse } from 'next/server';
import { ZodSchema } from 'zod';

export type ApiHandlerContext = { params?: Promise<Record<string, string>> | Record<string, string> };

export type HandlerFunction<T = any> = (
  req: Request,
  ctx: ApiHandlerContext,
  parsedBody: T
) => Promise<Response> | Response;

/**
 * ============================================================================
 * HIGH ORDER FUNCTION (HOF) — CENTRALIZED API SECURITY & VALIDATION WRAPPER
 * ============================================================================
 * Intercepts incoming requests, safely parses JSON, validates against Zod schemas,
 * standardizes 400 Bad Request error responses, and catches unhandled exceptions (500).
 */
export function withValidation<T = any>(
  schema: ZodSchema<T>,
  handler: HandlerFunction<T>
) {
  return async (req: Request, ctx: ApiHandlerContext = {}): Promise<Response> => {
    try {
      let body: any;
      try {
        body = await req.json();
      } catch (parseErr) {
        return NextResponse.json(
          {
            success: false,
            error: 'JSON payload inválido o malformado.',
          },
          { status: 400 }
        );
      }

      const validationResult = schema.safeParse(body);

      if (!validationResult.success) {
        const firstIssue = validationResult.error.issues?.[0];
        const errorMessage = firstIssue?.message || 'Validación fallida';
        return NextResponse.json(
          {
            success: false,
            error: errorMessage,
            details: validationResult.error.format(),
          },
          { status: 400 }
        );
      }

      return await handler(req, ctx, validationResult.data);
    } catch (error: any) {
      console.error('[API_ERROR]', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Error Interno del Servidor',
          message: error?.message || 'Ocurrió un error inesperado al procesar la solicitud.',
        },
        { status: 500 }
      );
    }
  };
}
