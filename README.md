# Quicklai

An AI-powered business advisor site for small and medium business owners. The chat widget is the centerpiece; the rest of the site (about, services, blog, contact) is built AEO-first so AI answer engines rank and cite it.

Built with **Next.js**, **Tailwind CSS**, and the **Anthropic API**.

---

## What's in here

```
quicklai/
├── app/
│   ├── api/chat/route.js      ← server-side Anthropic call (key stays safe)
│   ├── page.jsx               ← homepage (hero + chat widget)
│   ├── about/page.jsx
│   ├── services/page.jsx
│   ├── blog/page.jsx          ← blog index
│   ├── blog/[slug]/page.jsx   ← individual posts (Article + FAQ schema)
│   ├── contact/page.jsx
│   ├── layout.jsx             ← metadata + Organization schema
│   ├── sitemap.js             ← auto sitemap for crawlers
│   └── robots.js
├── components/
│   ├── ChatWidget.jsx         ← the star of the show
│   ├── Nav.jsx / Footer.jsx / FAQ.jsx / ContactForm.jsx
├── lib/
│   ├── config.js              ← EDIT THIS: name, booking link, prompt, questions
│   └── posts.js               ← blog post content
└── .env.example               ← copy to .env.local, add your API key
```

---

## Step-by-step setup

You'll run these in your terminal. Don't worry if some are new — follow in order.

### 1. Install Node.js

If you don't have it, download the LTS version from https://nodejs.org. To check:

```bash
node --version
```

### 2. Install the project's dependencies

From inside the `quicklai` folder:

```bash
npm install
```

This reads `package.json` and downloads everything the project needs into `node_modules`.

### 3. Add your API key

Copy the template and open the new file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and paste your real key from
https://console.anthropic.com/ :

```
ANTHROPIC_API_KEY=sk-ant-...your-real-key...
```

`.env.local` is gitignored — your key never gets committed or shipped to the browser.

### 4. Run it locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see Quicklai, and the chat widget should respond.

---

## Deploying to Vercel (free)

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com and sign in with GitHub.
3. Click **Add New → Project**, pick your repo.
4. Before deploying, open **Environment Variables** and add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your real key
5. Click **Deploy**.

### Connecting your domain

In your Vercel project → **Settings → Domains** → add your domain, then follow
the DNS instructions Vercel gives you (you'll update records at whoever you
bought the domain from). Once it verifies, Quicklai is live on your domain.

After connecting, update `SITE.url` in `lib/config.js` to your real domain so
the sitemap and schema use the correct address.

---

## Customizing

Everything you'll want to change first lives in **`lib/config.js`**:

- `SITE.bookingUrl` — your real Calendly / booking link
- `SITE.url` — your domain
- `STARTER_QUESTIONS` — the suggested questions in the widget
- `SYSTEM_PROMPT` — how the AI advisor behaves

Blog content lives in **`lib/posts.js`**.

---

## About AEO (Answer Engine Optimization)

This site is built so AI systems (ChatGPT, Perplexity, Google AI Overviews)
can understand, rank, and cite it:

- **Schema markup** — Organization, Article, and FAQ structured data on the
  relevant pages.
- **FAQ sections** — every key page has Q&A content, which AI engines pull from.
- **Direct-answer blog posts** — each post opens with a clean, quotable answer.
- **Semantic HTML + sitemap + robots** — clean, crawlable structure.

---

## Note on Hebrew

The site is built in English first. When ready, UI text is translated to Hebrew
in one pass — the strings live in `lib/config.js`, the page files, and
`lib/posts.js`. Set `<html lang="he" dir="rtl">` in `app/layout.jsx` at that
stage.

---

## Update — lead capture, privacy, and blog changes

**Chat flow (new):** The advisor now asks 5–8 evolving questions to understand
the business, gives one basic-but-useful piece of advice, then invites the user
to a free 30-minute call by collecting their **name + phone** in-chat. It does
not book the call — it captures a lead. The `[LEAD_CAPTURE]` marker in the AI
reply triggers the in-chat form.

**Leads storage:** Submitted leads are saved to `data/leads.json` on the server
by `app/api/lead/route.js`, together with a summary of the conversation (so each
lead connects the person's details with their business context). `data/` is
gitignored because it holds personal information.

> **Important — Vercel note:** Vercel's serverless filesystem is ephemeral, so
> `data/leads.json` will NOT persist reliably in production there. For a live
> deployment, swap the storage block in `app/api/lead/route.js` for a database
> or service (Supabase, Airtable, Google Sheets, a CRM, etc.). The JSON file is
> ideal for local development and self-hosted servers.

**Privacy policy:** `app/privacy/page.jsx` is a plain-language policy covering
data collection, usage, retention, and user rights. The lead form requires
agreement to it before submitting.

> **Legal review required:** The policy includes an *optional, separate* opt-in
> for sharing data with partners. Sharing or selling personal data is heavily
> regulated under Israel's Privacy Protection Law and the GDPR, and needs
> explicit, unbundled consent. Have a lawyer review the policy — and especially
> that clause — before you rely on it or switch on any data-sharing.

**Blog:** Now 36 posts (2 per month, Jan 2025 → June 2026), shown newest-first
in a scroll box (~7 visible at once). Post cards are not clickable by design;
hidden crawlable links keep every post discoverable for AEO and search.

---

## Update — Google Sheets leads + marketing-page lead capture

**Leads now go to Google Sheets.** The lead API (`app/api/lead/route.js`)
forwards each lead to a Google Apps Script web app, which appends a row to your
Sheet. This works on Vercel (no ephemeral-file problem) and needs no API keys.

**Setup:** follow `GOOGLE_SHEETS_SETUP.md` — create a Sheet, paste in
`google-apps-script.gs`, deploy it as a web app, and put the resulting URL in
`GOOGLE_SHEETS_WEBHOOK_URL` (in `.env.local` locally and in Vercel's env vars for
production).

**Marketing pages now capture leads too.** The old "Book your free call" links
to Calendly on the Services, Blog post, and Contact pages are replaced with a
button that opens a **popup form** (name + phone + privacy consent) — the same
capture flow as the chat. Every lead records its `source` (which page or the
chat) in the Sheet.

**One shared form.** Both the chat and the popups use a single
`components/LeadForm.jsx`, so consent handling and capture logic live in exactly
one place. The popup wrapper is `components/BookCallButton.jsx`.

---

## Security

This site includes the following hardening:

**HTTP security headers** (`next.config.js`) — Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security, Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy. Also disables the `X-Powered-By: Next.js` header.

> **Dev vs. production CSP:** the Content-Security-Policy is intentionally
> looser in `npm run dev` (adds `'unsafe-eval'` and WebSocket support) because
> Next.js's Fast Refresh / hot-reload needs `eval()` and a live WebSocket
> connection. Without this, the browser silently blocks them in dev, which
> breaks **all** client-side interactivity (every button on the site) while
> pages still render normally — a very easy trap to fall into and confusing
> to debug, since nothing looks broken. Production automatically gets the
> strict policy with neither, since the built app doesn't use eval().

**Rate limiting** (`lib/rateLimit.js`) on both API routes:
- `/api/chat` — 20 requests/minute per client (protects your paid Anthropic API from abuse)
- `/api/lead` — 5 requests/minute per client (protects against spam submissions)

> **Honest limitation:** this rate limiter is in-memory, scoped to a single warm serverless instance. It stops casual abuse and accidental hammering, but Vercel can run multiple instances, so a determined, distributed attacker could exceed it. For a hard guarantee, swap it for a shared store like Vercel KV or Upstash Redis (free tier available) — `lib/rateLimit.js` is written so that's a one-file change.

**Input validation** on `/api/chat` — rejects malformed messages, caps conversation length (40 messages) and message length (4,000 characters) to prevent cost-abuse via oversized payloads.

**Input validation** on `/api/lead` — required fields enforced server-side, basic email format check, all string fields length-capped before being sent to Google Sheets.

**Secrets never reach the browser** — `ANTHROPIC_API_KEY` and `GOOGLE_SHEETS_WEBHOOK_URL` are used only in server-side API routes. `.env.local` is gitignored.

**Dependencies** — Next.js pinned to the patched `14.2.35` (see the [Next.js security advisory](https://nextjs.org/blog/security-update-2025-12-11)). Run `npm audit` periodically to check for new advisories in other dependencies.

### If you want to go further
- Move rate limiting to Vercel KV / Upstash Redis for a hard guarantee across all instances
- Add a CAPTCHA (e.g. Cloudflare Turnstile) to the lead form if spam becomes a real problem
- Consider Vercel's built-in Firewall / Attack Challenge Mode for additional DDoS protection

---

## Hebrew site (Phase 1 — core site)

Quicklai now has a full Hebrew version at `/he/*`, alongside the existing
English site at the root — Phase 1 covers the core site; blog post
translations are Phase 2.

**Architecture:**
- English pages live in `app/(en)/` (a route group — invisible in the URL,
  so all existing English URLs are unchanged: `/`, `/about`, `/services`, etc.)
- Hebrew pages live in `app/he/` — a real URL segment, so Hebrew pages are at
  `/he`, `/he/about`, `/he/services`, `/he/contact`, `/he/privacy`, `/he/blog`
- Each has its own **independent root layout** (Next.js's "multiple root
  layouts" pattern) — `app/(en)/layout.jsx` sets `<html lang="en" dir="ltr">`
  and `app/he/layout.jsx` sets `<html lang="he" dir="rtl">`. The browser
  handles right-to-left layout automatically from that one attribute.
- `app/api/*`, `app/sitemap.js`, `app/robots.js`, `app/globals.css` stay at
  the true root — they're locale-independent.

**Content:**
- `lib/content/en.js` — a thin re-export of the existing `lib/config.js`
  (nothing about `lib/config.js` changed, so no risk to the English site)
- `lib/content/he.js` — full Hebrew content: site metadata, a complete
  Hebrew system prompt (the chat conducts the entire conversation in
  Hebrew), starter questions, homepage FAQs, lead-capture text
- `lib/content/ui.js` — short shared UI strings (button labels, placeholders,
  nav labels) for both locales, used by every shared component
- `lib/content/index.js` — `getContent(locale)` picks the right module

**Components:** `Nav`, `Footer`, `FAQ`, `ChatWidget`, `LeadForm`,
`BookCallButton`, `ContactForm`, and `BlogList` all accept a `locale` prop
(default `"en"`, so nothing changes for existing English usage). A new
`LocaleSwitcher` component (in `Nav`) links each page to its counterpart in
the other language.

**Chat in Hebrew:** `ChatWidget` sends `locale` to `/api/chat`, which selects
the Hebrew or English system prompt server-side. The Hebrew advisor asks
5–8 evolving questions and gives advice + AI tool recommendations entirely
in Hebrew, exactly mirroring the English flow's structure and rules.

**RTL:** most of the layout flips correctly for free, since it's built with
flexbox alignment (`items-*`, `justify-*`) rather than fixed positioning —
flexbox's start/end resolve based on `dir` automatically. Three spots used
physical left/right and needed fixing to CSS **logical properties**
(supported natively since Tailwind 3.4): the chat bubble tail corners
(`rounded-ee-`/`rounded-es-` instead of `rounded-br-`/`rounded-bl-`) and the
popup close button (`end-4` instead of `right-4`).

**AEO for two languages:** every page has `hreflang` alternates linking it to
its counterpart in the other language (`alternates.languages` in metadata),
Hebrew pages are in the sitemap, and Hebrew page schema sets `inLanguage: "he"`
while sharing the same Organization `@id` — one business, described in two
languages, not two separate entities.

**Leads:** the lead API and Google Sheet now record which language (`en`/`he`)
each lead came from, so you know whether to follow up in Hebrew or English.

### Important before launch
- **Have a native Hebrew speaker review the translations**, especially the
  Privacy Policy and the system prompt's tone — I can produce fluent, correct
  Hebrew, but business/marketing nuance and how Hebrew speakers actually
  phrase questions to AI (which affects Hebrew AEO) benefit from native review.
- **Phase 2 complete: the Hebrew blog is live.** All 36 posts, approved and
  wired in:
  - `lib/content/he-posts.js` — full post content (`POST_CONTENT_HE`), mirrors
    `lib/posts.js` exactly (title, date, updated, description, lead,
    takeaways, body, faqs)
  - `lib/content/he-blog-meta.js` — blog index metadata (`BLOG_POSTS_HE`),
    mirrors `BLOG_POSTS` in `lib/config.js`
  - `app/he/blog/page.jsx` — the real paginated post list (7-per-page, same
    `< 1–7 >` pattern as English), replacing the earlier placeholder
  - `app/he/blog/[slug]/page.jsx` — individual Hebrew post pages, mirroring
    `app/(en)/blog/[slug]/page.jsx` (same schema, takeaways, FAQ, CTA pattern)

  Hebrew and English posts share the same slugs, so every post now has a real
  `hreflang` pairing to its counterpart in the other language (updated in both
  `app/(en)/blog/[slug]/page.jsx` and the Hebrew version), and all 36 Hebrew
  post URLs are in `app/sitemap.js`.
- **Re-deploy the Apps Script** — it now records a `locale` field per lead
  (new "Language" column); re-paste and re-deploy as with previous updates.

---

## Lead handling automation (email + WhatsApp)

**Phase 1 — email automation: done.** When a lead provides an email, the
confirmation now varies based on whether they chose "Email" as a preferred
contact method (see `GOOGLE_SHEETS_SETUP.md` → "Confirmation emails via
Gmail" for the full behavior). The "first contact" version includes a
click-to-chat WhatsApp link (`WHATSAPP_NUMBER` in `google-apps-script.gs`) —
currently a link to your regular WhatsApp Business app, so a human responds
manually.

**Confirmation emails send from a separate script, on a personal Gmail
account.** `quicklai.com`'s outbound email authentication (SPF/DKIM/DMARC)
was unreliable — mail reported as sent but never arrived externally. Rather
than keep chasing that, the lead's confirmation email now sends from
`google-apps-script-confirmation.gs`, a second, independent Apps Script
deployed under a personal Gmail account, which the main script delegates to
over HTTP for every lead. Gmail's own sending is trusted automatically, no
DNS work required. Recipients still see "Quicklai" as the sender's display
name (`SENDER_NAME` in that script) — only the underlying address is the
Gmail one. Your own internal notification (`NOTIFY_EMAIL`) stays on the
Workspace account as before, since that one already delivers reliably
(same-domain mail). Full setup steps are in `GOOGLE_SHEETS_SETUP.md`.

**Phase 2 — WhatsApp Business Platform access: not started.** This is an
external setup process, not code — you need WhatsApp Business Platform
(Cloud API) access, which the free WhatsApp Business app does not provide.
Recommended path: a Business Solution Provider (BSP) rather than integrating
Meta's raw Cloud API directly — much faster to get live, and handles most of
the Meta compliance/verification complexity. Compare current pricing/features
across a couple of providers (e.g. 360dialog, Twilio) before committing.

**Important constraint to know before building Phase 3:** WhatsApp requires
any business-initiated conversation opener (a message sent before the lead
has messaged you first) to be a pre-approved message template — you cannot
send free-form AI-generated text as that first message. Once the lead
replies, the conversation opens up and free-form AI responses are fine for
the rest of the exchange. This means the opening "Hello (name), thanks for
contacting Quicklai..." message has to be submitted to Meta/your BSP and
approved *before* any Phase 3 code can send it. Also worth confirming
directly with your BSP: Meta's 2026 policy on AI-driven chatbot automation
has some conflicting signals across sources — get this confirmed for your
specific use case before investing in the agent build.

**Phase 3 — the WhatsApp agent itself: not started.** Once Phase 2 access
exists, this mirrors the architecture of the site's chat: a new webhook
endpoint receives incoming WhatsApp messages, runs a dedicated system prompt
("Quicky") through the same Anthropic API pattern for a 5–7 question
business-mapping flow, replies via the Cloud API, and writes the answers back
to the correct lead's row in the Sheet — which requires extending the Apps
Script (or using the Sheets API directly) to *update* an existing row by a
lookup key (phone number), not just append new ones like it does today.
