// ============================================================
//  Quicklai — Google Apps Script lead receiver
//  Paste this into a Google Apps Script bound to your Sheet.
//  See GOOGLE_SHEETS_SETUP.md for step-by-step instructions.
// ============================================================

// >>> SET THIS: the email address that should be notified on every lead.
var NOTIFY_EMAIL = "you@example.com";

// Handles POST requests from the Quicklai lead API: appends a row AND
// emails you a notification for every new lead.
function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(10000); // avoid two leads writing at the same moment

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads")
      || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Create a header row once, if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone",
        "Email",
        "Contact Methods",
        "Source",
        "Privacy Consent",
        "Marketing Opt-In",
        "Business Field",
        "Recommended AI Tools",
      ]);
    }

    var data = JSON.parse(e.postData.contents);

    // Preserve the phone exactly as entered (including any leading zero).
    // Prefixing with an apostrophe forces Google Sheets to treat it as text
    // instead of a number, which would otherwise strip a leading 0.
    var phoneValue = data.phone ? "'" + String(data.phone) : "";

    sheet.appendRow([
      data.createdAt || new Date().toISOString(),
      data.name || "",
      phoneValue,
      data.email || "",
      data.contactMethods || "",
      data.source || "",
      data.consent ? "Yes" : "No",
      data.marketingOptIn ? "Yes" : "No",
      data.businessContext || "",
      data.recommendedTools || "",
    ]);

    lock.releaseLock();

    // Email a notification for every lead. Wrapped in its own try/catch so a
    // mail hiccup never blocks the lead from being saved.
    try {
      sendLeadEmail(data);
    } catch (mailErr) {
      // Logged in the Apps Script Executions view; the lead is already saved.
      console.error("Lead email failed:", mailErr);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Sends you a simple, readable notification email about a new lead.
function sendLeadEmail(data) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL === "you@example.com") {
    // Not configured yet — skip quietly so nothing breaks.
    return;
  }

  // Guard against being called with no/invalid data (e.g. from a manual test).
  data = data || {};

  var name = data.name || "(no name)";
  var phone = data.phone ? String(data.phone) : "(no phone)";
  var emailAddr = data.email || "(none)";
  var methods = data.contactMethods || "(none)";
  var source = data.source || "unknown";
  var field = data.businessContext || "(not specified)";
  var tools = data.recommendedTools || "(none noted)";
  var when = data.createdAt || new Date().toISOString();

  var subject = "New Quicklai lead: " + name;

  var body =
    "You have a new lead from Quicklai.\n\n" +
    "Name:            " + name + "\n" +
    "Phone:           " + phone + "\n" +
    "Email:           " + emailAddr + "\n" +
    "Reach via:       " + methods + "\n" +
    "Business field:  " + field + "\n" +
    "AI tools discussed: " + tools + "\n" +
    "Source:          " + source + "\n" +
    "Time:            " + when + "\n\n" +
    "Privacy consent: " + (data.consent ? "Yes" : "No") + "\n" +
    "Partner sharing: " + (data.marketingOptIn ? "Yes" : "No") + "\n\n" +
    "The full record has been added to your Google Sheet.";

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

// ------------------------------------------------------------------
//  TEST HELPERS — run these manually from the Apps Script editor to
//  verify email works. Safe to leave in; they're never called by doPost.
// ------------------------------------------------------------------

// Run this to check your email setup end to end. Select "runEmailTest" in the
// function dropdown, click Run, then approve permissions if prompted.
function runEmailTest() {
  Logger.log("NOTIFY_EMAIL is: " + NOTIFY_EMAIL);
  Logger.log("Remaining daily email quota: " + MailApp.getRemainingDailyQuota());

  // Passes a realistic fake lead so it exercises the real email path.
  sendLeadEmail({
    name: "Test Lead",
    phone: "0501234567",
    email: "test@example.com",
    contactMethods: "Call, WhatsApp",
    source: "manual test",
    businessContext: "bakery / food retail",
    recommendedTools: "AI agent for after-hours enquiries; automated lead follow-up",
    consent: true,
    marketingOptIn: true,
    createdAt: new Date().toISOString(),
  });

  Logger.log("runEmailTest finished — check your inbox (and spam folder).");
}
