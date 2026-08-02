// ============================================================
//  Quicklai — Google Apps Script lead receiver
//  Paste this into a Google Apps Script bound to your Sheet.
//  See GOOGLE_SHEETS_SETUP.md for step-by-step instructions.
// ============================================================

// >>> SET THIS: the email address that should be notified on every lead.
// Leave empty ("") until you set your real address — sending is skipped
// automatically whenever this is empty, so there's no risk of accidentally
// emailing a placeholder address, and no fragile string comparison to break
// if this line gets edited later.
var NOTIFY_EMAIL = "ayal@quicklai.com";

// >>> SET THIS: Quicklai's WhatsApp Business number, in full international
// format with NO "+", spaces, or leading zero — e.g. an Israeli mobile
// 050-123-4567 becomes "972501234567" (972 = country code, drop the 0).
// Used to build a click-to-chat link (wa.me) included in the first-contact
// email. Leave empty ("") to omit the WhatsApp link until you set this.
var WHATSAPP_NUMBER = "972559164550";

// >>> SET THIS: the Web App URL of the SEPARATE confirmation-email script
// (google-apps-script-confirmation.gs), deployed under a personal Gmail
// account. This script delegates the lead's confirmation email to that one
// instead of sending it itself — quicklai.com's outbound email
// authentication has been unreliable, while Gmail's own sending is trusted
// automatically. Leave empty ("") to skip confirmation emails entirely
// (the Sheet row and your own internal notification still work either way).
var CONFIRMATION_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwX0TVTyieS2uIPlsGQo71C8laxNV80cNVcT-QOlkC0vR4enxmPvOybXQeyaNhj1hJk/exec";

// Builds a wa.me click-to-chat link with a pre-filled opening message, so
// the lead's chat opens with useful context already typed in. Returns ""
// if WHATSAPP_NUMBER isn't set, so callers can skip the link cleanly.
function getWhatsAppLink(locale) {
  if (!WHATSAPP_NUMBER) return "";
  var lrm = "\u200E";
  var text = locale === "he"
    ? "שלום, פניתי דרך האתר של " + lrm + "Quicklai" + lrm
    : "Hi, I reached out via the Quicklai website";
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}

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
        "Language",
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
      data.locale || "en",
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

    // Delegate the lead's confirmation email to the separate Gmail-based
    // script (see CONFIRMATION_WEBHOOK_URL above). Wrapped in its own
    // try/catch so it can never block the lead being saved or the internal
    // notification above.
    try {
      sendConfirmationViaGmailScript(data);
    } catch (confirmErr) {
      console.error("Lead confirmation delegation failed:", confirmErr);
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
  if (!NOTIFY_EMAIL) {
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

// Computes the WhatsApp click-to-chat link, then hands the lead's data off
// to the separate Gmail-based confirmation script — that script (not this
// one) actually sends the confirmation email. See CONFIRMATION_WEBHOOK_URL
// above for why this is a separate script.
function sendConfirmationViaGmailScript(data) {
  if (!CONFIRMATION_WEBHOOK_URL) {
    return; // not configured yet — skip quietly, matches other optional features.
  }
  var payload = Object.assign({}, data, {
    whatsappLink: getWhatsAppLink(data.locale),
  });
  UrlFetchApp.fetch(CONFIRMATION_WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true, // read the response ourselves rather than throw
  });
}


// ------------------------------------------------------------------
//  TEST HELPERS — run these manually from the Apps Script editor to
//  verify email works. Safe to leave in; they're never called by doPost.
// ------------------------------------------------------------------

// Run this to check your email setup end to end. Select "runEmailTest" in the
// function dropdown, click Run, then approve permissions if prompted.
// Sends the internal notification (to NOTIFY_EMAIL) plus ONE confirmation
// email to TEST_CONFIRMATION_EMAIL, in whichever language TEST_LOCALE is set
// to — this mirrors real production behavior exactly: one form submission,
// one confirmation, in the language that visitor actually used.
var TEST_CONFIRMATION_EMAIL = "doayalev@gmail.com";
var TEST_LOCALE = "en"; // set to "he" to test the Hebrew confirmation instead
var TEST_EMAIL_CHOSEN = true; // false = test the generic (non-first-contact) version

function runEmailTest() {
  Logger.log("NOTIFY_EMAIL is: " + NOTIFY_EMAIL);
  Logger.log("WHATSAPP_NUMBER is: " + (WHATSAPP_NUMBER || "(not set — link will be omitted)"));
  Logger.log("TEST_LOCALE is: " + TEST_LOCALE);
  Logger.log("TEST_EMAIL_CHOSEN is: " + TEST_EMAIL_CHOSEN);
  Logger.log("Remaining daily email quota: " + MailApp.getRemainingDailyQuota());
  if (TEST_CONFIRMATION_EMAIL === "test@example.com") {
    Logger.log("WARNING: TEST_CONFIRMATION_EMAIL is still the default placeholder — " +
      "example.com isn't a real inbox, so the confirmation delegation below may " +
      "report success without anything actually arriving anywhere. Change it to a " +
      "real address you can check.");
  }

  var isHebrew = TEST_LOCALE === "he";
  var baseMethods = isHebrew ? "טלפון, וואטסאפ" : "Call, WhatsApp";
  var emailLabel = isHebrew ? "אימייל" : "Email";
  var fakeLead = {
    name: isHebrew ? "בדיקה" : "Test Lead",
    phone: "0501234567",
    email: TEST_CONFIRMATION_EMAIL,
    contactMethods: TEST_EMAIL_CHOSEN ? baseMethods + ", " + emailLabel : baseMethods,
    source: "manual test",
    businessContext: "bakery / food retail",
    recommendedTools: "AI agent for after-hours enquiries; automated lead follow-up",
    consent: true,
    marketingOptIn: true,
    locale: TEST_LOCALE,
    createdAt: new Date().toISOString(),
  };

  // Internal notification to you. Each call is wrapped separately — if one
  // fails, you'll see the real error logged AND the rest still run, instead
  // of execution silently stopping (which is what made a real bug in
  // sendLeadEmail look like the confirmation email just wasn't sending).
  try {
    sendLeadEmail(fakeLead);
    Logger.log("sendLeadEmail: sent OK to " + NOTIFY_EMAIL);
  } catch (err) {
    Logger.log("sendLeadEmail FAILED: " + err);
  }

  try {
    if (!CONFIRMATION_WEBHOOK_URL) {
      Logger.log("CONFIRMATION_WEBHOOK_URL not set — skipping confirmation delegation test. " +
        "Set it up per GOOGLE_SHEETS_SETUP.md, or run runConfirmationEmailTest() directly " +
        "in the OTHER script (google-apps-script-confirmation.gs) to test that part alone.");
    } else {
      var payload = Object.assign({}, fakeLead, {
        whatsappLink: getWhatsAppLink(fakeLead.locale),
      });
      var response = UrlFetchApp.fetch(CONFIRMATION_WEBHOOK_URL, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
      });
      Logger.log("Confirmation delegation response (" + response.getResponseCode() + "): " +
        response.getContentText());
    }
  } catch (err) {
    Logger.log("Confirmation delegation FAILED: " + err);
  }

  Logger.log("runEmailTest finished — check NOTIFY_EMAIL and " + TEST_CONFIRMATION_EMAIL + " (and spam folders).");
}
