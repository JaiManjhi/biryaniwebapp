import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, notFoundResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import Order from '@/models/Order';

/* ═══════════════════════════════════════════════════════
   GET    /api/v1/orders/:id        — Get single order
   PATCH  /api/v1/orders/:id/status — Update order status (admin)
   DELETE /api/v1/orders/:id        — Cancel order
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
    const order = await Order.findById(id).lean();

    if (!order) return notFoundResponse('Order not found');

    /* Customers can only view their own orders */
    if (payload.role === 'customer' && order.customerId.toString() !== payload.userId) {
      return unauthorizedResponse('You can only view your own orders');
    }

    return successResponse(order, 'Order retrieved');
  } catch (error) {
    console.error('Get order error:', error);
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

    const allowedFields = ['orderStatus', 'paymentStatus', 'estimatedTime'];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!order) return notFoundResponse('Order not found');

    return successResponse(order, 'Order updated');
  } catch (error) {
    console.error('Update order error:', error);
    return serverErrorResponse();
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;

    const order = await Order.findById(id);
    if (!order) return notFoundResponse('Order not found');

    /* Only allow cancelling pending orders */
    if (order.orderStatus !== 'pending') {
      return serverErrorResponse();
    }

    order.orderStatus = 'cancelled';
    order.isActive = false;
    await order.save();

    return successResponse(null, 'Order cancelled');
  } catch (error) {
    console.error('Cancel order error:', error);
    return serverErrorResponse();
  }
}
