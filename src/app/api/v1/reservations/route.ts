import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import Reservation from '@/models/Reservation';

/* ═══════════════════════════════════════════════════════
   GET  /api/v1/reservations — List reservations (admin)
   POST /api/v1/reservations — Create reservation (public)
   ═══════════════════════════════════════════════════════ */

export async function GET(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const { searchParams } = new URL(req.url);

    const filter: Record<string, unknown> = { isActive: true };

    const status = searchParams.get('status');
    if (status) filter.status = status;

    const date = searchParams.get('date');
    if (date) {
      const dayStart = new Date(date);
      const dayEnd = new Date(date);
      dayEnd.setDate(dayEnd.getDate() + 1);
      filter.date = { $gte: dayStart, $lt: dayEnd };
    }

    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || 12)));
    const skip = (page - 1) * limit;

    const [reservations, total] = await Promise.all([
      Reservation.find(filter)
        .sort({ date: -1, time: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Reservation.countDocuments(filter),
    ]);

    return successResponse(
      {
        reservations,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 },
      },
      'Reservations retrieved'
    );
  } catch (error) {
    console.error('Get reservations error:', error);
    return serverErrorResponse();
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    /* Validate */
    const errors: Array<{ field: string; message: string }> = [];
    if (!body.customerName?.trim()) errors.push({ field: 'customerName', message: 'Name is required' });
    if (!body.phone?.trim()) errors.push({ field: 'phone', message: 'Phone is required' });
    if (!body.email?.trim()) errors.push({ field: 'email', message: 'Email is required' });
    if (!body.date) errors.push({ field: 'date', message: 'Date is required' });
    if (!body.time) errors.push({ field: 'time', message: 'Time is required' });
    if (!body.guestCount || body.guestCount < 1) errors.push({ field: 'guestCount', message: 'At least 1 guest required' });

    if (errors.length > 0) {
      return errorResponse('Validation failed', 400, errors);
    }

    /* Check duplicate reservation (same email + date + time) */
    const duplicate = await Reservation.findOne({
      email: body.email.toLowerCase(),
      date: new Date(body.date),
      time: body.time,
      status: { $nin: ['cancelled'] },
      isActive: true,
    });

    if (duplicate) {
      return errorResponse(
        'You already have a reservation at this date and time',
        409,
        [{ field: 'date', message: 'Duplicate reservation' }]
      );
    }

    const reservation = await Reservation.create({
      ...body,
      email: body.email.toLowerCase().trim(),
      date: new Date(body.date),
    });

    return successResponse(reservation, 'Reservation created successfully', 201);
  } catch (error) {
    console.error('Create reservation error:', error);
    return serverErrorResponse();
  }
}
