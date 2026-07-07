// Reusable FAQ block. Renders visible Q&A AND injects FAQPage schema.
// AI answer engines pull heavily from FAQ-structured content, so every
// key page should include one of these.

export default function FAQ({ items }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="max-w-[680px] mx-auto px-5 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-[28px] font-semibold text-gray-900 tracking-tight mb-8 text-center">
        Frequently asked questions
      </h2>
      <div className="flex flex-col divide-y divide-gray-100">
        {items.map((item, i) => (
          <div key={i} className="py-5">
            <h3 className="text-[17px] font-medium text-gray-900 mb-2">
              {item.q}
            </h3>
            <p className="text-[15px] text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
