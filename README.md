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
