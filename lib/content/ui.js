// ============================================================
//  Shared short UI strings used by components that render on both
//  English and Hebrew pages (Nav, Footer, FAQ, ChatWidget, LeadForm,
//  BookCallButton, ContactForm, BlogList). Longer content (system
//  prompt, FAQs, blog posts) lives in lib/content/en.js / he.js instead.
// ============================================================

export const UI = {
  en: {
    nav: { about: "About", services: "Services", blog: "Blog", contact: "Contact", openMenu: "Open menu", closeMenu: "Close menu" },
    footer: { privacy: "Privacy" },
    faqHeading: "Frequently asked questions",
    chat: {
      empty: "Need a business advice?",
      emptySub: "Ask me anything about growing, managing, or marketing your business with ‎AI‎.",
      inputPlaceholder: "Ask a business question…",
    },
    leadForm: {
      namePlaceholder: "Your name",
      phonePlaceholder: "Phone number",
      emailPlaceholder: "Email (optional)",
      methodsLabel: "How should we reach you? (pick any)",
      consent:
        "I agree to ‎Quicklai‎'s Privacy Policy, to being contacted about a consultation, and that my details may be shared with selected partners for relevant offers.",
      privacyLinkText: "Privacy Policy",
      submit: "Send my details",
      submitting: "Sending…",
      errorRequired: "Please add your name and phone number.",
      errorMethod: "Please pick at least one way for us to reach you.",
      errorConsent: "Please agree to continue.",
    },
    bookCall: {
      defaultLabel: "Get in touch →",
      close: "Close",
      savedTitle: "You're all set.",
      savedBody: "Thanks — we'll get back to you shortly using the contact method you chose. It's free and there's no obligation.",
      done: "Done",
    },
    contactForm: {
      namePlaceholder: "Your name",
      emailPlaceholder: "you@business.com",
      messagePlaceholder: "How can we help your business?",
      submit: "Send message",
      sentTitle: "Message sent.",
      sentBody: "Thanks for reaching out — we'll be in touch soon.",
    },
    blogList: {
      prevAria: "Previous posts",
      nextAria: "Next posts",
      of: "of",
    },
  },
  he: {
    nav: { about: "אודות", services: "שירותים", blog: "בלוג", contact: "צור קשר", openMenu: "פתיחת תפריט", closeMenu: "סגירת תפריט" },
    footer: { privacy: "פרטיות" },
    faqHeading: "שאלות נפוצות",
    chat: {
      empty: "צריכים ייעוץ עסקי?",
      emptySub: "שאלו אותי כל דבר על צמיחה, ניהול או שיווק העסק שלכם באמצעות ‎AI‎.",
      inputPlaceholder: "שאלו שאלה עסקית…",
    },
    leadForm: {
      namePlaceholder: "השם שלכם",
      phonePlaceholder: "מספר טלפון",
      emailPlaceholder: "אימייל (אופציונלי)",
      methodsLabel: "איך נוכל לחזור אליכם? (בחרו כמה שתרצו)",
      consent:
        "אני מסכים/ה למדיניות הפרטיות של ‎Quicklai‎, ליצירת קשר בנוגע לייעוץ, ולכך שהפרטים שלי עשויים להישתף עם שותפים נבחרים להצעות רלוונטיות.",
      privacyLinkText: "מדיניות הפרטיות",
      submit: "שלחו את הפרטים שלי",
      submitting: "שולח…",
      errorRequired: "נא להזין שם ומספר טלפון.",
      errorMethod: "נא לבחור לפחות דרך אחת ליצירת קשר.",
      errorConsent: "נא לאשר את התנאים כדי להמשיך.",
    },
    bookCall: {
      defaultLabel: "צרו קשר ←",
      close: "סגירה",
      savedTitle: "מעולה, זה הכל.",
      savedBody: "תודה — נחזור אליכם בקרוב באמצעות אמצעי הקשר שבחרתם. זה בחינם וללא שום התחייבות.",
      done: "סיום",
    },
    contactForm: {
      namePlaceholder: "השם שלכם",
      emailPlaceholder: "you@business.com",
      messagePlaceholder: "איך נוכל לעזור לעסק שלכם?",
      submit: "שליחת הודעה",
      sentTitle: "ההודעה נשלחה.",
      sentBody: "תודה שפניתם אלינו — נחזור אליכם בקרוב.",
    },
    blogList: {
      prevAria: "פוסטים קודמים",
      nextAria: "פוסטים הבאים",
      of: "מתוך",
    },
  },
};

export function getUI(locale) {
  return UI[locale] || UI.en;
}
