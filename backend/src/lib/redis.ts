// redis.ts — Redis client singleton
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = createClient({ url: redisUrl });

redis.on('error', (err) => {
  console.warn('[Redis] Connection error (non-fatal):', err.message);
});

redis.on('connect', () => {
  console.log('[Redis] Connected ✓');
});

// Connect on import (lazy — won't block startup)
redis.connect().catch((err) => {
  console.warn('[Redis] Could not connect:', err.message, '— token blacklist will be no-op');
});

export default redis;
