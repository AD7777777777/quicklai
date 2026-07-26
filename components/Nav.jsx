import Link from "next/link";
import { getContent } from "@/lib/content";
import { getUI } from "@/lib/content/ui";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Nav({ locale = "en" }) {
  const { SITE } = getContent(locale);
  const t = getUI(locale).nav;
  const prefix = locale === "he" ? "/he" : "";

  return (
    <nav className="w-full border-b border-gray-100">
      <div className="max-w-[980px] mx-auto px-5 h-12 flex items-center justify-between">
        <Link
          href={prefix || "/"}
          className="text-[17px] font-bold tracking-tight text-gray-900"
        >
          {SITE.name}
        </Link>
        <div className="flex items-center gap-6 text-[13px] text-gray-600">
          <Link href={`${prefix}/about`} className="hover:text-gray-900 transition-colors">
            {t.about}
          </Link>
          <Link href={`${prefix}/services`} className="hover:text-gray-900 transition-colors">
            {t.services}
          </Link>
          <Link href={`${prefix}/blog`} className="hover:text-gray-900 transition-colors">
            {t.blog}
          </Link>
          <Link href={`${prefix}/contact`} className="hover:text-gray-900 transition-colors">
            {t.contact}
          </Link>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </nav>
  );
}
