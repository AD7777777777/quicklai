import Link from "next/link";
import { SITE } from "@/lib/config";

export default function Nav() {
  return (
    <nav className="w-full border-b border-gray-100">
      <div className="max-w-[980px] mx-auto px-5 h-12 flex items-center justify-between">
        <Link href="/" className="text-[17px] font-bold tracking-tight text-gray-900">
          {SITE.name}
        </Link>
        <div className="flex items-center gap-6 text-[13px] text-gray-600">
          <Link href="/about" className="hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-gray-900 transition-colors">
            Services
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-900 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
