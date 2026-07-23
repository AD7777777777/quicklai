/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy: restricts where the browser will load or execute
// resources from.
//
// IMPORTANT: Next.js dev mode (`npm run dev`) uses eval() internally for Fast
// Refresh / hot module reloading. Without 'unsafe-eval' in script-src, the
// browser silently blocks that mechanism in dev — which breaks ALL client-side
// interactivity (every onClick on the whole site) while the page still looks
// and renders fine. That's a easy trap to fall into and hard to notice, so the
// policy is intentionally looser in development and strict in production,
// where eval() isn't used and the tighter policy applies safely.
//
// script-src also includes 'unsafe-inline' because Next.js's own hydration
// bootstrap needs it. The JSON-LD schema blocks (type="application/ld+json")
// are inert data, not executable script, so they aren't affected by script-src
// either way.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self'${isDev ? " ws: wss:" : ""};
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
