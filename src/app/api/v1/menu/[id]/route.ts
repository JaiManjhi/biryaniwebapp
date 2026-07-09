import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/utils';
import MenuItem from '@/models/MenuItem';

/* ═══════════════════════════════════════════════════════
   GET    /api/v1/menu/:id — Get single menu item (public)
   PATCH  /api/v1/menu/:id — Update menu item (admin)
   DELETE /api/v1/menu/:id — Soft-delete menu item (admin)
   ═══════════════════════════════════════════════════════ */

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const item = await MenuItem.findById(id)
      .populate('categoryId', 'name slug')
      .lean();

    if (!item) return notFoundResponse('Menu item not found');

    return successResponse(item, 'Menu item retrieved');
  } catch (error) {
    console.error('Get menu item error:', error);
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

    /* If name changed, regenerate slug */
    if (body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const item = await MenuItem.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!item) return notFoundResponse('Menu item not found');

    return successResponse(item, 'Menu item updated');
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return errorResponse('Validation failed', 400);
    }
    console.error('Update menu error:', error);
    return serverErrorResponse();
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const payload = await authenticateRequest(req);
    if (!payload) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;

    const item = await MenuItem.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!item) return notFoundResponse('Menu item not found');

    return successResponse(null, 'Menu item deleted');
  } catch (error) {
    console.error('Delete menu error:', error);
    return serverErrorResponse();
  }
}
