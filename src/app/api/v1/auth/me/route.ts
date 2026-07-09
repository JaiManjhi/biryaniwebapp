import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest, clearTokenCookie } from '@/lib/auth';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from '@/lib/utils';
import User from '@/models/User';

/* ═══════════════════════════════════════════════════════
   GET  /api/v1/auth/me       — Get current user profile
   PATCH /api/v1/auth/me      — Update profile
   POST  /api/v1/auth/logout  — Clear token cookie
   ═══════════════════════════════════════════════════════ */

export async function GET(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const user = await User.findById(payload.userId);
    if (!user) return errorResponse('User not found', 404);

    return successResponse(user, 'Profile retrieved');
  } catch (error) {
    console.error('Get profile error:', error);
    return serverErrorResponse();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();

    /* Only allow updating safe fields */
    const allowedFields = ['fullName', 'phone', 'avatar', 'addresses'];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      payload.userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) return errorResponse('User not found', 404);

    return successResponse(user, 'Profile updated');
  } catch (error) {
    console.error('Update profile error:', error);
    return serverErrorResponse();
  }
}

export async function POST(req: NextRequest) {
  /* Logout — clear cookie */
  const url = new URL(req.url);
  if (url.pathname.endsWith('/logout')) {
    const response = successResponse(null, 'Logged out successfully');
    response.headers.set('Set-Cookie', clearTokenCookie());
    return response;
  }

  return errorResponse('Invalid endpoint', 400);
}
