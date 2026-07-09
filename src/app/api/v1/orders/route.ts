import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import Order from '@/models/Order';

/* ═══════════════════════════════════════════════════════
   GET  /api/v1/orders — List orders (authenticated)
   POST /api/v1/orders — Create order (authenticated)
   ═══════════════════════════════════════════════════════ */

export async function GET(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const { searchParams } = new URL(req.url);

    const filter: Record<string, unknown> = { isActive: true };

    /* Customers see only their orders, admins see all */
    if (payload.role === 'customer') {
      filter.customerId = payload.userId;
    }

    const status = searchParams.get('status');
    if (status) filter.orderStatus = status;

    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || 12)));
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ]);

    return successResponse(
      {
        orders,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 },
      },
      'Orders retrieved'
    );
  } catch (error) {
    console.error('Get orders error:', error);
    return serverErrorResponse();
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();

    if (!body.items || body.items.length === 0) {
      return errorResponse('Order must have at least one item', 400);
    }

    /* Calculate totals */
    const subtotal = body.items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
    const discount = body.discount || 0;
    const deliveryCharge = body.deliveryType === 'delivery' ? 49 : 0;
    const grandTotal = subtotal + tax - discount + deliveryCharge;

    const items = body.items.map(
      (item: { menuItemId: string; name: string; image: string; price: number; quantity: number }) => ({
        ...item,
        subtotal: item.price * item.quantity,
      })
    );

    const order = await Order.create({
      customerId: payload.userId,
      items,
      subtotal,
      tax,
      discount,
      deliveryCharge,
      grandTotal,
      paymentMethod: body.paymentMethod || 'cash',
      deliveryType: body.deliveryType || 'dine-in',
      address: body.address,
    });

    return successResponse(order, 'Order placed successfully', 201);
  } catch (error) {
    console.error('Create order error:', error);
    return serverErrorResponse();
  }
}
