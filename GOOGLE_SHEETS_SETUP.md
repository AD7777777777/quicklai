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
   `var NOTIFY_EMAIL = "you@example.com";` to the address where you want to be
   emailed on every lead. (Leave it as-is to skip email notifications.)
5. Click the **Save** icon (💾).

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

1. Run the site, use the chat until it asks for your details (or click "Book your
   free call" on a marketing page), and submit a test name + phone.
2. Check your Google Sheet — a new row should appear within a second or two.

---

## If you change the script later

Each time you edit `google-apps-script.gs`, you must **re-deploy**:
**Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.**
The URL stays the same.

## Troubleshooting

- **No row appears:** confirm the env var is set and the deployment access is
  "Anyone". Check the Apps Script **Executions** log for errors.
- **Rows appear but empty:** make sure you pasted the whole script and saved.
- **Works locally, not on Vercel:** the env var must be added in Vercel too, and
  you must redeploy after adding it.
- **No lead emails arriving:** confirm you set `NOTIFY_EMAIL` to a real address
  and re-deployed. Check your spam folder, and check the Apps Script
  **Executions** log. Note Gmail's daily send limit (roughly 100 emails/day on
  free accounts) — fine for normal lead volume.
