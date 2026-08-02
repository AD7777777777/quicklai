# Connecting Quicklai leads to Google Sheets

This sends every captured lead (name, phone, consent, and the business context
from the conversation) straight into a Google Sheet. No coding, no API keys —
about 10 minutes.

---

## Step 1 — Create the Sheet

1. Go to https://sheets.google.com and create a new spreadsheet.
2. Rename the first tab to **`Leads`** (bottom-left tab — double-click to rename).
   (If you skip this, the script falls back to the first tab, but naming it is cleaner.)

## Step 2 — Open Apps Script

1. In the Sheet menu, click **Extensions → Apps Script**.
2. Delete any code shown in the editor.
3. Open the file **`google-apps-script.gs`** from this project, copy all of it,
   and paste it into the Apps Script editor.
4. **Set your notification email:** near the top of the script, change
   `var NOTIFY_EMAIL = "";` to the address where you want to be
   emailed on every lead. (Leave it as-is to skip email notifications.)
5. **Set your WhatsApp number:** just below that, change
   `var WHATSAPP_NUMBER = "";` to your WhatsApp Business number in full
   international format — no `+`, spaces, or leading zero. For example, an
   Israeli mobile `050-123-4567` becomes `972501234567`. This powers a
   click-to-chat link included in the "first contact" email (see below).
   Leave it empty to omit the link until you're ready.
6. Click the **Save** icon (💾).

## Step 3 — Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** Quicklai leads (anything works)
   - **Execute as:** Me
   - **Who has access:** **Anyone**
     *(This is required so your site can POST to it. The URL is unguessable and
     the script only appends rows — it doesn't expose your Sheet.)*
4. Click **Deploy**.
5. Google will ask you to **authorize** — approve the permissions. The script
   needs to edit your Sheet and (if you set NOTIFY_EMAIL) send email on your
   behalf, so both permissions will be requested. You may see an "unverified
   app" warning; click **Advanced → Go to (project name)** to continue. This is
   normal for your own scripts.
6. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfy..../exec`

## Step 4 — Add the URL to Quicklai

**Locally:** open `.env.local` and add:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy..../exec
```

Then restart `npm run dev`.

**On Vercel:** go to your project → **Settings → Environment Variables**, add
`GOOGLE_SHEETS_WEBHOOK_URL` with the same value, and redeploy.

## Step 5 — Test it

1. Run the site, use the chat until it asks for your details (or click "Get in
   touch" on a marketing page), and submit a test name, phone, **and email**.
2. Check your Google Sheet — a new row should appear within a second or two.
3. Check the inbox you set as `NOTIFY_EMAIL` — you should get the internal
   notification.
4. Check the email you tested with — you should get a confirmation email
   (English or Hebrew, matching whichever version of the site you tested).
   This only sends if an email was provided; leads who skip the optional
   email field won't get one, which is expected.

---

## Confirmation emails via Gmail (separate script)

Since email is optional on the form, leads only get a confirmation if they
provided one, and there are two versions of the message depending on
whether they actually chose "Email" as one of their preferred contact
methods:

- **They chose Email** — the "first contact" message: sets expectations
  that a human from Quicklai will be in touch, and invites them to start
  business-mapping on WhatsApp in the meantime via a click-to-chat link
  (`WHATSAPP_NUMBER`, set in the main script). This is currently a link to
  your regular WhatsApp Business app, so you respond manually — an
  automated WhatsApp agent is a separate, larger project (see the README).
- **They gave an email but chose Call/WhatsApp instead** — a lighter,
  generic confirmation, without pushing them toward a channel they didn't
  actually pick.

**Why this is a separate script:** `quicklai.com`'s outbound email
authentication (SPF/DKIM/DMARC) has been unreliable — mail reports as sent
successfully but never arrives externally. A plain Gmail account doesn't
have this problem; Google's own infrastructure is trusted automatically,
with no DNS setup required. So confirmation emails are sent from a
**second, separate Apps Script** deployed under a personal Gmail account,
while your main script (still on the Workspace account) keeps handling the
Sheet row and your own internal notification, which already works
reliably. Recipients see **"Quicklai"** as the sender's display name either
way (set via `SENDER_NAME` in the second script) — only the underlying
email *address* is the Gmail one, which most mail clients show in small,
secondary text rather than prominently.

### Setting up the second script

1. Go to **script.google.com**, make sure you're logged into the **personal
   Gmail account** you want sending these emails (check the account switcher
   in the top-right corner), then click **New project**.
2. Delete the placeholder code, and paste in the full contents of
   `google-apps-script-confirmation.gs` from this project.
3. Near the top, `SENDER_NAME` is already set to `"Quicklai"` — leave it as
   is unless you want it to read differently.
4. Click **Deploy → New deployment**, gear icon → **Web app**, same settings
   as the main script (**Execute as: Me**, **Who has access: Anyone**),
   then **Deploy**. Approve the permissions when asked — this time it's
   asking on behalf of your personal Gmail account, not the Workspace one.
5. Copy the **Web app URL** it gives you.
6. Go back to your **main script** (the Workspace one), and set
   `var CONFIRMATION_WEBHOOK_URL = "";` near the top to that URL. Save and
   **re-deploy the main script** (Deploy → Manage deployments → pencil icon
   → New version → Deploy) so the change takes effect.

### Testing

Each script has its own test function, since they're independent projects:

- **In the confirmation script** (personal Gmail account): set
  `TEST_CONFIRMATION_EMAIL`, `TEST_LOCALE`, and `TEST_EMAIL_CHOSEN` near the
  bottom, then run `runConfirmationEmailTest` — this tests the Gmail-sending
  part in isolation, without needing the main script at all.
- **In the main script** (Workspace account): running `runEmailTest` now
  also exercises the full delegation path — it sends the internal
  notification as before, then POSTs a fake lead to
  `CONFIRMATION_WEBHOOK_URL` and logs the response, so you can confirm the
  two scripts are actually talking to each other correctly, not just that
  each one works alone.

---

## If you change either script later

Each script deploys and re-deploys independently — editing one never
requires touching the other. Each time you edit a script (either
`google-apps-script.gs` or `google-apps-script-confirmation.gs`), open
**that script's own editor** and re-deploy: **Deploy → Manage deployments →
edit (pencil) → Version: New version → Deploy.** The URL stays the same, so
you never need to update `GOOGLE_SHEETS_WEBHOOK_URL` or
`CONFIRMATION_WEBHOOK_URL` after a re-deploy — only when a script is
deployed for the very first time.

## Troubleshooting

- **No row appears:** confirm the env var is set and the deployment access is
  "Anyone". Check the Apps Script **Executions** log for errors.
- **Rows appear but empty:** make sure you pasted the whole script and saved.
- **Works locally, not on Vercel:** the env var must be added in Vercel too, and
  you must redeploy after adding it.
- **No lead emails arriving (internal notification):** confirm you set
  `NOTIFY_EMAIL` to a real address and re-deployed the main script. Check
  your spam folder, and check that script's **Executions** log. Note
  Gmail's daily send limit (roughly 100 emails/day on free accounts) —
  fine for normal lead volume.
- **Lead didn't get a confirmation email:** first confirm they actually
  entered an email (it's optional — no email means no confirmation, by
  design). Then narrow down where it's failing:
  1. Is `CONFIRMATION_WEBHOOK_URL` actually set in the main script, and was
     the main script re-deployed after setting it?
  2. Run `runEmailTest` in the main script and check the delegation log
     line — a non-200 response code or an error there means the two
     scripts aren't successfully talking to each other (wrong URL, wrong
     deployment access setting, etc.).
  3. Run `runConfirmationEmailTest` directly in the *confirmation* script
     (the Gmail one) — if that also fails or doesn't arrive, the problem is
     in that script specifically, not in the connection between the two.
  4. Check spam on the receiving end either way.
- **Confirmation script asks to re-authorize / "unverified app" warning:**
  normal the first time you deploy a new Apps Script project — click
  Advanced → "Go to [project name] (unsafe)" to proceed. This is Google's
  standard warning for any newly created script, not specific to this one.
