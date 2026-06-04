const rateLimit = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60_000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimit.get(identifier);

  if (!entry || now > entry.reset) {
    rateLimit.set(identifier, { count: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count };
}

// Clean up expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    Array.from(rateLimit.entries()).forEach(([key, value]) => {
      if (now > value.reset) rateLimit.delete(key);
    });
  }, 60_000);
}
