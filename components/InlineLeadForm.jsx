"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import { getUI } from "@/lib/content/ui";

// Embeds the same "get in touch" form used in the BookCallButton popup,
// but directly on the page — no button/modal needed. Used on the Contact
// page, where showing the form immediately is better UX than requiring an
// extra click to reveal it.
export default function InlineLeadForm({ locale = "en", source = "contact page" }) {
  const t = getUI(locale).bookCall;
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div className="max-w-[480px] mx-auto px-5 py-10 text-center">
        <div className="bg-[#F5F5F7] rounded-2xl p-8">
          <div className="text-3xl mb-3">✓</div>
          <h2 className="text-[20px] font-semibold text-gray-900 mb-2">
            {t.savedTitle}
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            {t.savedBody}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto px-5 py-10 bg-white">
      <LeadForm locale={locale} source={source} onSaved={() => setSaved(true)} />
    </div>
  );
}
