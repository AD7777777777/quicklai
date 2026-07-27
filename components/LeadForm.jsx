"use client";

import { useState } from "react";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { getUI } from "@/lib/content/ui";

// Shared lead-capture form. Used both inside the chat widget and inside the
// marketing-page popup, so capture logic and consent live in exactly one place.
//
// Collects: name + phone (required), email (optional), and preferred contact
// methods (multi-select).
//
// Props:
//   onSaved(firstName)  — called after a successful (or gracefully failed) save
//   businessContext     — optional business field/context to attach to the lead
//   source              — where the lead came from (e.g. "chat", "services page")
//   compact             — tighter spacing when embedded in the chat
//   locale              — "en" | "he", selects UI text and consent copy
export default function LeadForm({
  onSaved,
  businessContext = "",
  recommendedTools = "",
  source = "chat",
  compact = false,
  locale = "en",
}) {
  const { LEAD_CAPTURE } = getContent(locale);
  const t = getUI(locale).leadForm;
  const prefix = locale === "he" ? "/he" : "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [methods, setMethods] = useState([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleMethod = (m) => {
    setMethods((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const submit = async () => {
    setError("");
    if (!name.trim() || !phone.trim()) {
      setError(t.errorRequired);
      return;
    }
    if (methods.length === 0) {
      setError(t.errorMethod);
      return;
    }
    if (!consent) {
      setError(t.errorConsent);
      return;
    }
    setSaving(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          // Send the phone exactly as typed (leading zeros preserved).
          phone: phone,
          email: email.trim(),
          contactMethods: methods,
          consent,
          // Consent is a single combined agreement that includes the
          // partner-sharing permission, so marketingOptIn tracks the same value.
          marketingOptIn: consent,
          businessContext,
          recommendedTools,
          source,
          locale,
        }),
      });
    } catch {
      // Even if saving fails, advance gracefully so the user isn't stuck.
    } finally {
      setSaving(false);
      onSaved?.(name.trim().split(" ")[0]);
    }
  };

  return (
    <div className={compact ? "" : "w-full"}>
      {!compact && (
        <>
          <h3 className="text-[17px] font-semibold text-gray-900 mb-1">
            {LEAD_CAPTURE.heading}
          </h3>
          <p className="text-[13px] text-gray-500 mb-3 leading-snug">
            {LEAD_CAPTURE.subtext}
          </p>
        </>
      )}

      <div className="flex flex-col gap-2.5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className="border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-brand-blue bg-white"
        />
        <input
          type="tel"
          inputMode="tel"
          dir="ltr"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phonePlaceholder}
          // Phone numbers should always read left-to-right — even on a
          // Hebrew (RTL) page — so digits type and display in the correct
          // order. dir="ltr" is a no-op on the English form (already LTR).
          className="border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-brand-blue bg-white"
        />
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className="border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-brand-blue bg-white"
        />

        {/* Preferred contact methods — pick any that apply. */}
        <div>
          <p className="text-[12px] text-gray-500 mb-1.5">{t.methodsLabel}</p>
          <div className="flex flex-wrap gap-2">
            {/* Fallback array guards against a stale/incomplete config —
                without this, a missing LEAD_CAPTURE.contactMethods value
                would throw and silently break the entire popup on click. */}
            {(LEAD_CAPTURE.contactMethods || ["Call", "WhatsApp", "Email"]).map((m) => {
              const active = methods.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMethod(m)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-colors ${
                    active
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Single combined consent. The Privacy Policy link sits directly
            above the checkbox so it's clearly part of the same agreement —
            kept as a separate line (rather than embedded mid-sentence) so
            the consent text can translate cleanly for both locales. */}
        <div className="bg-gray-50 rounded-lg p-2.5">
          <Link
            href={`${prefix}/privacy`}
            target="_blank"
            className="text-[11px] text-brand-blue underline"
          >
            {t.privacyLinkText}
          </Link>
          <label className="flex items-start gap-2 text-[11px] text-gray-500 leading-snug cursor-pointer mt-1.5">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-brand-blue"
            />
            <span>{t.consent}</span>
          </label>
        </div>

        {error && <p className="text-[12px] text-red-500">{error}</p>}

        <button
          onClick={submit}
          disabled={saving}
          className="bg-brand-blue hover:bg-brand-bluehover disabled:opacity-60 text-white rounded-full px-6 py-2 text-[14px] font-medium transition-colors"
        >
          {saving ? t.submitting : t.submit}
        </button>
      </div>
    </div>
  );
}
