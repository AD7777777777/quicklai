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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, consent, marketingOptIn, businessContext, source } = body;

    // Consent to the privacy policy is required to store a lead at all.
    if (!name || !phone || !consent) {
      return Response.json(
        { error: "Name, phone, and privacy consent are required." },
        { status: 400 }
      );
    }

    const lead = {
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 50),
      consent: Boolean(consent),
      marketingOptIn: Boolean(marketingOptIn), // separate, explicit opt-in
      businessContext: String(businessContext || "").slice(0, 5000),
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
