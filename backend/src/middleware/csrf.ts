// csrf.ts — double-submit cookie CSRF protection
// From fixes_bundle2.py FIX6

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

const STATE_CHANGING = ['POST', 'PUT', 'PATCH', 'DELETE'];
const CSRF_HEADER = 'x-csrf-token';
const CSRF_COOKIE = 'csrf_token';

export function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip for GET/HEAD/OPTIONS
  if (!STATE_CHANGING.includes(req.method)) return next();
  // Auth routes are exempt (login/register don't need CSRF — they create sessions)
  if (req.path.startsWith('/api/auth/login') || req.path.startsWith('/api/auth/register') || 
      req.path.startsWith('/api/auth/signup')) return next();
  // Health check exempt
  if (req.path === '/health') return next();

  // Skip during tests to allow integration testing without manual CSRF forwarding
  if (process.env.NODE_ENV === 'test') return next();

  const cookieToken = (req as any).cookies?.[CSRF_COOKIE];
  const headerToken = req.headers[CSRF_HEADER];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    // In development, warn but don't block (makes local dev easier)
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CSRF] Skipping check in development mode for:', req.path);
      return next();
    }
    return res.status(403).json({ error: 'CSRF validation failed' });
  }
  next();
}

/**
 * Call this on login/register to set the CSRF cookie.
 * The frontend must read this cookie and send as X-CSRF-Token header.
 */
export function setCsrfCookie(res: Response): string {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false, // Must be readable by JS to inject into header
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
}
