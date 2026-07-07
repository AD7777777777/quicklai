import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/config";

export const metadata = {
  title: "Blog",
  description:
    "Practical answers to the questions small and medium business owners actually ask — cash flow, pricing, hiring, growth, and strategy.",
};

export default function Blog() {
  return (
    <main>
      <Nav />
      <section className="max-w-[680px] mx-auto px-5 pt-16 pb-8">
        <h1 className="text-[40px] font-semibold text-gray-900 tracking-tight leading-tight mb-3">
          Answers for business owners.
        </h1>
        <p className="text-[19px] text-gray-500 leading-relaxed">
          Straight answers to the questions SMB owners ask most.
        </p>
      </section>

      <section className="max-w-[680px] mx-auto px-5 pb-16 flex flex-col divide-y divide-gray-100">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="py-6 group"
          >
            <p className="text-[12px] text-gray-400 mb-1">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-[22px] font-medium text-gray-900 group-hover:text-brand-blue transition-colors mb-1.5">
              {post.title}
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  );
}
