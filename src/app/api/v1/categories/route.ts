import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import Category from '@/models/Category';

/* ═══════════════════════════════════════════════════════
   GET  /api/v1/categories — List all categories (public)
   POST /api/v1/categories — Create category (admin)
   ═══════════════════════════════════════════════════════ */

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .lean();

    return successResponse(categories, 'Categories retrieved');
  } catch (error) {
    console.error('Get categories error:', error);
    return serverErrorResponse();
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();

    if (!body.name?.trim()) {
      return errorResponse('Category name is required', 400);
    }

    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await Category.findOne({ slug });
    if (existing) {
      return errorResponse('Category already exists', 409);
    }

    const category = await Category.create({ ...body, slug });

    return successResponse(category, 'Category created', 201);
  } catch (error) {
    console.error('Create category error:', error);
    return serverErrorResponse();
  }
}
