// tokenBlacklist.ts — JWT logout token blacklist (Redis-backed)
// From fixes_bundle1.py FIX3

import jwt from 'jsonwebtoken';

const PREFIX = 'jwt_blacklist:';

// Graceful fallback if Redis unavailable
async function getRedis() {
  try {
    const { redis } = await import('./redis.js');
    return redis;
  } catch {
    return null;
  }
}

/**
 * Invalidate a token on logout. Stores until expiry so blacklist
 * never grows unbounded.
 */
export async function blacklistToken(token: string): Promise<void> {
  try {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (!decoded?.exp) return;
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      const r = await getRedis();
      if (r?.isReady) {
        await r.set(`${PREFIX}${token}`, '1', { EX: ttl });
      }
    }
  } catch { /* invalid token — nothing to blacklist */ }
}

export async function isBlacklisted(token: string): Promise<boolean> {
  try {
    const r = await getRedis();
    if (!r?.isReady) return false;
    const val = await r.get(`${PREFIX}${token}`);
    return val !== null;
  } catch {
    return false; // Redis unavailable — allow token (degraded mode)
  }
}
