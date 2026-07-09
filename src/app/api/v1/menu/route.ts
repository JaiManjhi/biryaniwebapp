import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import MenuItem from '@/models/MenuItem';

/* ═══════════════════════════════════════════════════════
   GET  /api/v1/menu — List menu items (public, filterable)
   POST /api/v1/menu — Create menu item (admin only)
   ═══════════════════════════════════════════════════════ */

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    /* Build query filters */
    const filter: Record<string, unknown> = { isActive: true };

    const category = searchParams.get('category');
    if (category) filter.categoryId = category;

    const veg = searchParams.get('veg');
    if (veg === 'true') filter.veg = true;
    if (veg === 'false') filter.veg = false;

    const featured = searchParams.get('featured');
    if (featured === 'true') filter.featured = true;

    const available = searchParams.get('available');
    if (available !== 'false') filter.available = true;

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) (filter.price as Record<string, number>).$gte = Number(minPrice);
      if (maxPrice) (filter.price as Record<string, number>).$lte = Number(maxPrice);
    }

    const rating = searchParams.get('rating');
    if (rating) filter.rating = { $gte: Number(rating) };

    const spiceLevel = searchParams.get('spiceLevel');
    if (spiceLevel) filter.spiceLevel = Number(spiceLevel);

    const search = searchParams.get('search');
    if (search) filter.$text = { $search: search };

    /* Sorting */
    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest: { createdAt: -1 },
      'price-low': { price: 1 },
      'price-high': { price: -1 },
      popular: { reviewCount: -1 },
      rating: { rating: -1 },
    };
    const sortParam = searchParams.get('sort') || 'newest';
    const sort = sortMap[sortParam] || sortMap.newest;

    /* Pagination */
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || 12)));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      MenuItem.find(filter)
        .populate('categoryId', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      MenuItem.countDocuments(filter),
    ]);

    return successResponse(
      {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
      'Menu items retrieved'
    );
  } catch (error) {
    console.error('Get menu error:', error);
    return serverErrorResponse();
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();

    /* Generate slug from name */
    const slug = body.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const item = await MenuItem.create({ ...body, slug });

    return successResponse(item, 'Menu item created', 201);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return errorResponse('Validation failed', 400);
    }
    console.error('Create menu error:', error);
    return serverErrorResponse();
  }
}
