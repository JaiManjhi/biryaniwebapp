import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

/* ═══════════════════════════════════════════════════════
   Auth Utilities — JWT + bcrypt helpers
   
   - Password hashing (bcrypt, 12 rounds)
   - JWT sign/verify
   - Request token extraction
   - Auth middleware for API routes
   ═══════════════════════════════════════════════════════ */

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-dev-secret';
const JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days

/* ── Password Hashing ── */

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/* ── JWT ── */

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/* ── Token Extraction ── */

export function getTokenFromRequest(req: NextRequest): string | null {
  /* Check Authorization header */
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  /* Check cookies */
  const cookieToken = req.cookies.get('token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

/* ── Auth Middleware ── */

export async function authenticateRequest(
  req: NextRequest
): Promise<JwtPayload | null> {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

/* ── Response Helpers ── */

export function createTokenCookie(token: string): string {
  const maxAge = 7 * 24 * 60 * 60; // 7 days
  return `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
}

export function clearTokenCookie(): string {
  return 'token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
}
