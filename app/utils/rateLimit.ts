// Simple in-memory rate limiting
// For production, consider Redis or Upstash Rate Limit

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function rateLimit(identifier: string): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      reset: now + RATE_LIMIT_WINDOW,
    };
  }

  if (entry.count >= MAX_REQUESTS) {
    // Rate limit exceeded
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - entry.count,
    reset: entry.resetTime,
  };
}
