/** @type {import('next').NextConfig} */

// Content-Security-Policy: restricts where the browser will load or execute
// resources from. script-src includes 'unsafe-inline' because Next.js's own
// hydration bootstrap needs it — removing it can break the app with no easy
// local way to catch it, so it's a deliberate, documented trade-off. The
// JSON-LD schema blocks (type="application/ld+json") are inert data, not
// executable script, so they aren't affected by script-src either way.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Forces HTTPS for a year, including subdomains. Only meaningful once the
  // site is served over HTTPS (Vercel does this automatically once the
  // domain is connected) — harmless before that.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  // Stops the site from advertising "X-Powered-By: Next.js" — a small
  // hardening step that gives attackers one less piece of free information.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
