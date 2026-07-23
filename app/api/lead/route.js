// ------------------------------------------------------------------
//  Lead capture endpoint → Google Sheets
//
//  Leads are forwarded to a Google Apps Script Web App, which appends
//  a row to your Google Sheet. This approach:
//    - needs no Google service-account keys or npm packages
//    - works on Vercel (data lives in Google's Sheet, not on disk)
//    - is easy to set up (see GOOGLE_SHEETS_SETUP.md)
//
//  Set GOOGLE_SHEETS_WEBHOOK_URL in your environment (.env.local locally,
//  and in Vercel's Environment Variables for production).
// ------------------------------------------------------------------

import { rateLimit, getClientKey } from "@/lib/rateLimit";

// Spam/abuse guard — generous for a real user submitting once, tight enough
// to stop a script from flooding your sheet and inbox with fake leads.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 1000;

// Loose but useful email sanity check — rejects obvious garbage without
// being so strict it blocks real, unusual-but-valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const clientKey = getClientKey(request);
    const { allowed } = rateLimit(`lead:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!allowed) {
      return Response.json(
        { error: "Too many submissions. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      phone,
      email,
      contactMethods,
      consent,
      marketingOptIn,
      businessContext,
      recommendedTools,
      source,
    } = body;

    // Consent to the privacy policy is required to store a lead at all.
    if (!name || !phone || !consent) {
      return Response.json(
        { error: "Name, phone, and privacy consent are required." },
        { status: 400 }
      );
    }
    if (email && !EMAIL_PATTERN.test(String(email).trim())) {
      return Response.json({ error: "That email doesn't look right." }, { status: 400 });
    }

    const lead = {
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 50),
      email: String(email || "").slice(0, 200),
      // Preferred contact methods, stored as a comma-separated string.
      contactMethods: Array.isArray(contactMethods)
        ? contactMethods.join(", ").slice(0, 200)
        : String(contactMethods || "").slice(0, 200),
      consent: Boolean(consent),
      marketingOptIn: Boolean(marketingOptIn), // separate, explicit opt-in
      businessContext: String(businessContext || "").slice(0, 5000),
      recommendedTools: String(recommendedTools || "").slice(0, 1000),
      source: String(source || "unknown").slice(0, 100),
      createdAt: new Date().toISOString(),
    };

    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhook) {
      // Fail loudly in logs so you notice the env var is missing, but don't
      // break the user's experience — they'll still get the confirmation.
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set. Lead not saved:", lead);
      return Response.json(
        { ok: false, error: "Lead storage not configured." },
        { status: 200 }
      );
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      console.error("Google Sheets webhook returned", res.status);
      return Response.json({ ok: false }, { status: 200 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Lead capture error:", err);
    return Response.json({ error: "Could not save lead." }, { status: 500 });
  }
}
