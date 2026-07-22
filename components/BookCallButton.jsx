"use client";

import { useState, useEffect } from "react";
import LeadForm from "@/components/LeadForm";

// A button that opens a simple popup with the lead-capture form.
// Drop-in replacement for the old Calendly link on marketing pages.
//
// Props:
//   label   — button text (default "Get in touch →")
//   source  — where the lead came from, for your records
//   variant — "solid" (filled blue) or "inline" (subtle)
export default function BookCallButton({
  label = "Get in touch →",
  source = "marketing page",
  variant = "solid",
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    // Reset the saved state after the modal closes so it can be reused.
    setTimeout(() => setSaved(false), 300);
  };

  const btnClass =
    variant === "solid"
      ? "inline-block bg-brand-blue hover:bg-brand-bluehover text-white rounded-full px-7 py-3 text-[16px] font-medium transition-colors"
      : "text-brand-blue hover:text-brand-bluehover text-[16px] font-medium transition-colors";

  return (
    <>
      <button onClick={() => setOpen(true)} className={btnClass}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[360px] max-h-[90vh] overflow-y-auto p-5">
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {saved ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="text-[20px] font-semibold text-gray-900 mb-2">
                  You're all set.
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                  Thanks — we'll get back to you shortly using the contact
                  method you chose, to set up your free 30-minute session.
                </p>
                <button
                  onClick={close}
                  className="bg-brand-blue hover:bg-brand-bluehover text-white rounded-full px-6 py-2.5 text-[15px] font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <LeadForm source={source} onSaved={() => setSaved(true)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
