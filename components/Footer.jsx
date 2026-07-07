import Link from "next/link";
import { SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 mt-20">
      <div className="max-w-[980px] mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-400">
        <p>
          © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/about" className="hover:text-gray-600 transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-gray-600 transition-colors">
            Services
          </Link>
          <Link href="/blog" className="hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
