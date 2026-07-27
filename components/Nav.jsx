"use client";

import { useState } from "react";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { getUI } from "@/lib/content/ui";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Nav({ locale = "en" }) {
  const { SITE } = getContent(locale);
  const t = getUI(locale).nav;
  const prefix = locale === "he" ? "/he" : "";
  const [open, setOpen] = useState(false);

  const links = [
    { href: `${prefix}/about`, label: t.about },
    { href: `${prefix}/services`, label: t.services },
    { href: `${prefix}/blog`, label: t.blog },
    { href: `${prefix}/contact`, label: t.contact },
  ];

  return (
    <nav className="w-full border-b border-gray-100">
      <div className="max-w-[980px] mx-auto px-5 h-12 flex items-center justify-between">
        <Link
          href={prefix || "/"}
          className="text-[17px] font-bold tracking-tight text-gray-900 flex-shrink-0"
        >
          {SITE.name}
        </Link>

        {/* Desktop: full row of links, hidden below the sm breakpoint where
            it would otherwise squeeze against the logo. */}
        <div className="hidden sm:flex items-center gap-6 text-[13px] text-gray-600">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gray-900 transition-colors">
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} />
        </div>

        {/* Mobile: a single hamburger button replaces the full row. */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          className="sm:hidden w-9 h-9 flex items-center justify-center flex-shrink-0 text-gray-600"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel — stacked links, shown only when open. */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 px-5 py-3 flex flex-col gap-1 text-[15px] text-gray-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      )}
    </nav>
  );
}
