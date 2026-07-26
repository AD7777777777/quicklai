"use client";

import { useState } from "react";
import { getUI } from "@/lib/content/ui";

export default function ContactForm({ locale = "en" }) {
  const t = getUI(locale).contactForm;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    // TODO: wire this to your email service (Resend, Formspree, etc.)
    // For now it just confirms locally.
    setSent(true);
  };

  if (sent) {
    return (
      <section className="max-w-[480px] mx-auto px-5 py-10 text-center">
        <div className="bg-[#F5F5F7] rounded-2xl p-8">
          <h2 className="text-[22px] font-semibold text-gray-900 mb-2">
            {t.sentTitle}
          </h2>
          <p className="text-[15px] text-gray-500">{t.sentBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[480px] mx-auto px-5 py-10">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder={t.namePlaceholder}
          className="border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-brand-blue"
        />
        <input
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder={t.emailPlaceholder}
          className="border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-brand-blue"
        />
        <textarea
          value={form.message}
          onChange={update("message")}
          placeholder={t.messagePlaceholder}
          rows={5}
          className="border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-brand-blue resize-none"
        />
        <button
          onClick={submit}
          className="bg-brand-blue hover:bg-brand-bluehover text-white rounded-full px-7 py-3 text-[16px] font-medium transition-colors"
        >
          {t.submit}
        </button>
      </div>
    </section>
  );
}
