import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';
import { hashPassword, comparePassword, signToken, createTokenCookie } from '@/lib/auth';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/utils';
import User from '@/models/User';

/* ═══════════════════════════════════════════════════════
   POST /api/v1/auth/register — Create new customer account
   POST /api/v1/auth/login    — Authenticate and return JWT
   ═══════════════════════════════════════════════════════ */

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const action = url.pathname.split('/').pop();

    if (action === 'register') {
      return handleRegister(req);
    } else if (action === 'login') {
      return handleLogin(req);
    }

    return errorResponse('Invalid auth action', 400);
  } catch (error) {
    console.error('Auth error:', error);
    return serverErrorResponse();
  }
}

async function handleRegister(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, phone, password } = body;

  /* Validate required fields */
  const errors: Array<{ field: string; message: string }> = [];
  if (!fullName?.trim()) errors.push({ field: 'fullName', message: 'Full name is required' });
  if (!email?.trim()) errors.push({ field: 'email', message: 'Email is required' });
  if (!phone?.trim()) errors.push({ field: 'phone', message: 'Phone is required' });
  if (!password || password.length < 6) errors.push({ field: 'password', message: 'Password must be at least 6 characters' });

  if (errors.length > 0) {
    return errorResponse('Validation failed', 400, errors);
  }

  /* Check duplicate email */
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return errorResponse('Email already registered', 409, [
      { field: 'email', message: 'This email is already in use' },
    ]);
  }

  /* Hash password and create user */
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    password: hashedPassword,
  });

  /* Generate JWT */
  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: 'customer',
  });

  const response = successResponse(
    {
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    },
    'Account created successfully',
    201
  );

  response.headers.set('Set-Cookie', createTokenCookie(token));
  return response;
}

async function handleLogin(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return errorResponse('Email and password are required', 400);
  }

  /* Find user with password field */
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return errorResponse('Invalid email or password', 401);
  }

  if (!user.isActive) {
    return errorResponse('Account is deactivated', 403);
  }

  /* Verify password */
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return errorResponse('Invalid email or password', 401);
  }

  /* Generate JWT */
  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: 'customer',
  });

  const response = successResponse(
    {
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        loyaltyPoints: user.loyaltyPoints,
      },
      token,
    },
    'Login successful'
  );

  response.headers.set('Set-Cookie', createTokenCookie(token));
  return response;
}
