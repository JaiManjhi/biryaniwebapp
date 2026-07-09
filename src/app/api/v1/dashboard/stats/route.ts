import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import Order from '@/models/Order';
import Reservation from '@/models/Reservation';
import User from '@/models/User';
import MenuItem from '@/models/MenuItem';

/* ═══════════════════════════════════════════════════════
   GET /api/v1/dashboard/stats — Admin dashboard KPIs
   ═══════════════════════════════════════════════════════ */

export async function GET(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalOrders,
      totalCustomers,
      totalReservations,
      pendingOrders,
      todayOrders,
      revenueAgg,
      todayRevenueAgg,
      recentOrders,
      popularItems,
    ] = await Promise.all([
      Order.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true }),
      Reservation.countDocuments({ isActive: true }),
      Order.countDocuments({ orderStatus: 'pending', isActive: true }),
      Order.countDocuments({ createdAt: { $gte: today, $lt: tomorrow }, isActive: true }),
      Order.aggregate([
        { $match: { isActive: true, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$grandTotal' } } },
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: today, $lt: tomorrow }, isActive: true, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$grandTotal' } } },
      ]),
      Order.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('orderNumber grandTotal orderStatus createdAt')
        .lean(),
      MenuItem.find({ isActive: true })
        .sort({ reviewCount: -1 })
        .limit(5)
        .select('name reviewCount rating image')
        .lean(),
    ]);

    return successResponse(
      {
        totalOrders,
        totalRevenue: revenueAgg[0]?.total || 0,
        totalCustomers,
        totalReservations,
        pendingOrders,
        todayOrders,
        todayRevenue: todayRevenueAgg[0]?.total || 0,
        recentOrders,
        popularItems,
      },
      'Dashboard stats retrieved'
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return serverErrorResponse();
  }
}
