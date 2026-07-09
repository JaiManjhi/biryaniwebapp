import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, notFoundResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import Reservation from '@/models/Reservation';

/* ═══════════════════════════════════════════════════════
   GET    /api/v1/reservations/:id — Get single reservation
   PATCH  /api/v1/reservations/:id — Update status (admin)
   DELETE /api/v1/reservations/:id — Cancel reservation
   ═══════════════════════════════════════════════════════ */

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;
    const reservation = await Reservation.findById(id).lean();

    if (!reservation) return notFoundResponse('Reservation not found');

    return successResponse(reservation, 'Reservation retrieved');
  } catch (error) {
    console.error('Get reservation error:', error);
    return serverErrorResponse();
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const allowedFields = ['status', 'tableNumber'];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!reservation) return notFoundResponse('Reservation not found');

    return successResponse(reservation, 'Reservation updated');
  } catch (error) {
    console.error('Update reservation error:', error);
    return serverErrorResponse();
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { $set: { status: 'cancelled', isActive: false } },
      { new: true }
    );

    if (!reservation) return notFoundResponse('Reservation not found');

    return successResponse(null, 'Reservation cancelled');
  } catch (error) {
    console.error('Cancel reservation error:', error);
    return serverErrorResponse();
  }
}
