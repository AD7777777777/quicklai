import Link from "next/link";
import { getContent } from "@/lib/content";
import { getUI } from "@/lib/content/ui";

export default function Footer({ locale = "en" }) {
  const { SITE } = getContent(locale);
  const nav = getUI(locale).nav;
  const footer = getUI(locale).footer;
  const prefix = locale === "he" ? "/he" : "";

  return (
    <footer className="w-full border-t border-gray-100 mt-20">
      <div className="max-w-[980px] mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-400">
        <p>
          © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.
        </p>
        <div className="flex items-center gap-5">
          <Link href={`${prefix}/about`} className="hover:text-gray-600 transition-colors">
            {nav.about}
          </Link>
          <Link href={`${prefix}/services`} className="hover:text-gray-600 transition-colors">
            {nav.services}
          </Link>
          <Link href={`${prefix}/blog`} className="hover:text-gray-600 transition-colors">
            {nav.blog}
          </Link>
          <Link href={`${prefix}/contact`} className="hover:text-gray-600 transition-colors">
            {nav.contact}
          </Link>
          <Link href={`${prefix}/privacy`} className="hover:text-gray-600 transition-colors">
            {footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
