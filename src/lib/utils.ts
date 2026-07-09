import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/api';

/* ═══════════════════════════════════════════════════════
   API Response Helpers — Consistent response format
   
   Every API endpoint returns:
   { success: boolean, message: string, data?: T, errors?: [] }
   ═══════════════════════════════════════════════════════ */

export function successResponse<T>(
  data: T,
  message = 'Success',
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

export function errorResponse(
  message: string,
  status = 400,
  errors?: Array<{ field?: string; message: string }>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, message, errors },
    { status }
  );
}

export function unauthorizedResponse(
  message = 'Authentication required'
): NextResponse<ApiResponse> {
  return errorResponse(message, 401);
}

export function forbiddenResponse(
  message = 'Access denied'
): NextResponse<ApiResponse> {
  return errorResponse(message, 403);
}

export function notFoundResponse(
  message = 'Resource not found'
): NextResponse<ApiResponse> {
  return errorResponse(message, 404);
}

export function serverErrorResponse(
  message = 'Internal server error'
): NextResponse<ApiResponse> {
  return errorResponse(message, 500);
}
