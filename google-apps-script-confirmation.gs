// ============================================================
//  Quicklai — Confirmation email sender (Gmail-based)
//
//  This is a SEPARATE, standalone Apps Script project — deploy it under a
//  PERSONAL Gmail account (not the quicklai.com Workspace account). That's
//  the whole point: quicklai.com's outbound email authentication (SPF/
//  DKIM/DMARC) has been unreliable, while a plain Gmail account's mail is
//  trusted by other providers automatically, with no DNS setup needed.
//
//  Your main script (google-apps-script.gs, still on the Workspace account)
//  keeps handling the Sheet row + your own internal notification — this
//  script's only job is sending the LEAD's confirmation email. The main
//  script calls this one automatically for every lead; you never call this
//  one directly.
//
//  WHATSAPP_NUMBER is configured ONLY in the main script, not here — the
//  main script computes the click-to-chat link and passes it along in the
//  POST payload, so there's exactly one place to update it, not two that
//  could quietly drift out of sync.
//
//  Recipients still see "Quicklai" as the sender's display NAME (set via
//  the `name` option below) — only the underlying email address is a Gmail
//  one, which recipients rarely notice since most mail clients show the
//  display name prominently and the address in small/secondary text.
//
//  SETUP — see GOOGLE_SHEETS_SETUP.md → "Confirmation emails via Gmail"
//  for full step-by-step instructions.
// ============================================================

// >>> SET THIS: the display name recipients see as the sender.
var SENDER_NAME = "Quicklai";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

// Receives lead data POSTed from the main script and sends the lead's
// confirmation email. Expects the same shape as before, PLUS a pre-built
// `whatsappLink` field (computed by the main script).
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var result = sendLeadConfirmationEmail(data);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, result: result })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Sends the LEAD a confirmation email — only if they provided one (email is
// optional on the form). Content matches the language they used (en/he).
//
// Two different messages, depending on whether they actually chose "Email"
// as a preferred contact method:
//   - If yes: the "first contact" message — sets expectations that a human
//     will follow up, and invites them to start business-mapping on
//     WhatsApp in the meantime (link passed in as data.whatsappLink).
//   - If no (they just happened to fill in the optional email field while
//     choosing Call/WhatsApp as their real preference): a lighter, generic
//     confirmation, without pushing them toward a channel they didn't pick.
//
// LRM marks (\u200e) around "Quicklai" and "AI" in the Hebrew version match
// the same fix used across the website, so these terms don't visually
// scramble in RTL email clients either.
function sendLeadConfirmationEmail(data) {
  data = data || {};
  var email = data.email;
  if (!email || !isValidEmail(email)) {
    return { sent: false, reason: "no valid email provided: " + JSON.stringify(email) };
  }

  var name = (data.name || "").split(" ")[0]; // first name only, friendlier
  var isHebrew = data.locale === "he";
  var lrm = "\u200E";
  var methods = data.contactMethods || (isHebrew ? "הדרך שבחרתם" : "your preferred method");

  var methodsStr = String(data.contactMethods || "");
  var emailWasChosen = isHebrew
    ? methodsStr.indexOf("אימייל") !== -1
    : methodsStr.toLowerCase().indexOf("email") !== -1;

  var whatsappLink = data.whatsappLink || "";

  var subject, body;

  if (emailWasChosen) {
    if (isHebrew) {
      subject = "תודה שפניתם אל " + lrm + "Quicklai" + lrm;
      body =
        "שלום" + (name ? " " + name : "") + ",\n\n" +
        "נציג אנושי מ" + lrm + "Quicklai" + lrm + " ייצור איתכם קשר בקרוב.\n\n" +
        (whatsappLink
          ? "כדי לחסוך זמן בשיחה, אפשר כבר עכשיו להתחיל לשוחח איתנו בוואטסאפ " +
            "ולמפות את העסק שלכם: " + whatsappLink + "\n\n"
          : "") +
        "בברכה,\n" +
        "צוות " + lrm + "Quicklai" + lrm;
    } else {
      subject = "Thanks for reaching out to Quicklai";
      body =
        "Hi" + (name ? " " + name : "") + ",\n\n" +
        "A human from Quicklai will be in touch soon.\n\n" +
        (whatsappLink
          ? "In order to save time during the call, you can start chatting with us " +
            "on WhatsApp now, mapping your business: " + whatsappLink + "\n\n"
          : "") +
        "Best,\n" +
        "The Quicklai team";
    }
  } else {
    if (isHebrew) {
      subject = "תודה שפניתם אל " + lrm + "Quicklai" + lrm;
      body =
        "שלום" + (name ? " " + name : "") + ",\n\n" +
        "תודה שהשארתם פרטים אצל " + lrm + "Quicklai" + lrm + ". נחזור אליכם בקרוב באמצעות " +
        methods + " כדי לדבר על איך " + lrm + "AI" + lrm + " יכול לעזור לעסק שלכם.\n\n" +
        "בינתיים, מוזמנים להמשיך לשוחח עם היועץ הדיגיטלי שלנו באתר אם יש לכם עוד שאלות.\n\n" +
        "בברכה,\n" +
        "צוות " + lrm + "Quicklai" + lrm;
    } else {
      subject = "Thanks for reaching out to Quicklai";
      body =
        "Hi" + (name ? " " + name : "") + ",\n\n" +
        "Thanks for leaving your details with Quicklai. We'll get back to you soon via " +
        methods + " to talk about how AI could help your business.\n\n" +
        "In the meantime, feel free to keep chatting with our AI advisor on the site if " +
        "you have more questions.\n\n" +
        "Best,\n" +
        "The Quicklai team";
    }
  }

  // Using GmailApp instead of MailApp — see google-apps-script.gs for why.
  // Requires the gmail.send permission scope — run a function directly in
  // this script's editor once to trigger the fresh consent prompt if you
  // haven't authorized this yet.
  GmailApp.sendEmail(email, subject, body, { name: SENDER_NAME });
  return { sent: true, to: email, subject: subject };
}

// ------------------------------------------------------------------
//  TEST HELPER — run manually from the Apps Script editor. Safe to leave
//  in; it's never called by doPost.
// ------------------------------------------------------------------
var TEST_CONFIRMATION_EMAIL = "ayal@quicklai.com";
var TEST_LOCALE = "en"; // set to "he" to test the Hebrew version
var TEST_EMAIL_CHOSEN = true; // false = test the generic (non-first-contact) version
var TEST_WHATSAPP_LINK = "https://wa.me/972559164550"; // paste a real link to check it renders

function runConfirmationEmailTest() {
  Logger.log("Remaining daily email quota: " + MailApp.getRemainingDailyQuota());
  Logger.log("TEST_CONFIRMATION_EMAIL is: " + TEST_CONFIRMATION_EMAIL);
  if (TEST_CONFIRMATION_EMAIL === "test@example.com") {
    Logger.log("WARNING: TEST_CONFIRMATION_EMAIL is still the default placeholder — " +
      "example.com isn't a real inbox, so nothing will actually arrive anywhere " +
      "even if this reports success below. Change it to a real address you can check.");
  }
  var isHebrew = TEST_LOCALE === "he";
  var baseMethods = isHebrew ? "טלפון, וואטסאפ" : "Call, WhatsApp";
  var emailLabel = isHebrew ? "אימייל" : "Email";

  try {
    var result = sendLeadConfirmationEmail({
      name: isHebrew ? "בדיקה" : "Test Lead",
      email: TEST_CONFIRMATION_EMAIL,
      contactMethods: TEST_EMAIL_CHOSEN ? baseMethods + ", " + emailLabel : baseMethods,
      locale: TEST_LOCALE,
      whatsappLink: TEST_WHATSAPP_LINK,
    });
    Logger.log("Result: " + JSON.stringify(result));
  } catch (err) {
    Logger.log("sendLeadConfirmationEmail FAILED: " + err);
  }
}
