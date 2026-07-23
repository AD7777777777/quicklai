// ------------------------------------------------------------------
//  Lightweight in-memory rate limiter.
//
//  HONEST LIMITATION: Vercel serverless functions are stateless across
//  cold starts and can run as multiple concurrent instances, so this
//  in-memory store does NOT give a hard, guaranteed limit — a determined
//  attacker distributing requests across many cold starts could exceed it.
//  It DOES stop casual abuse and accidental hammering (e.g. a bug in a
//  browser tab looping requests) within a warm instance, which is most of
//  the realistic risk for a small business site.
//
//  For a hard guarantee in production, use a shared store — Vercel KV or
//  Upstash Redis (a few minutes to set up, has a free tier) — and swap the
//  Map below for calls to it. This file is written so that swap only
//  touches this one file.
// ------------------------------------------------------------------

const buckets = new Map(); // key -> { count, resetAt }

/**
 * Returns { allowed: boolean, remaining: number } for the given key.
 * @param {string} key - usually the client IP plus a route name
 * @param {number} limit - max requests allowed per window
 * @param {number} windowMs - window length in milliseconds
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

// Occasionally clear old entries so the Map doesn't grow forever within a
// long-lived warm instance.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key);
  }
}, 5 * 60 * 1000).unref?.();

// Best-effort client identifier from request headers (works behind Vercel's
// proxy, which sets x-forwarded-for).
export function getClientKey(request) {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}
