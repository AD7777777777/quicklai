// ============================================================
//  Shared JSON-LD schema builders (AEO)
//  Every page uses these so structured data stays consistent and
//  all entities link back to one Organization via @id.
// ============================================================

import { SITE } from "@/lib/config";

const ORG_ID = `${SITE.url}/#organization`;

// Breadcrumbs: pass [{ name, path }] — path is relative, e.g. "/services".
// For Hebrew pages, pass locale: "he" so "Home" reads "בית" and links to /he.
export function breadcrumbSchema(trail, locale = "en") {
  const homeName = locale === "he" ? "בית" : "Home";
  const homeUrl = locale === "he" ? `${SITE.url}/he` : SITE.url;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName, item: homeUrl },
      ...trail.map((t, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: t.name,
        item: `${SITE.url}${t.path}`,
      })),
    ],
  };
}

// Generic page schema. `type` can be WebPage, AboutPage, ContactPage,
// CollectionPage — matching the actual purpose of the page.
export function pageSchema({ type = "WebPage", path, name, description, inLanguage = "en" }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE.url}${path}#webpage`,
    url: `${SITE.url}${path}`,
    name,
    description,
    inLanguage,
    isPartOf: { "@id": inLanguage === "he" ? `${SITE.url}/he/#website` : `${SITE.url}/#website` },
    publisher: { "@id": ORG_ID },
  };
}

// Service schema for each offering, linked to the Organization as provider.
// This is how an AI engine answers "who builds AI agents for small businesses".
export function serviceListSchema(services, locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} services`,
    inLanguage: locale,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
        audience: {
          "@type": "Audience",
          audienceType:
            locale === "he" ? "בעלי עסקים קטנים ובינוניים" : "Small and medium business owners",
        },
      },
    })),
  };
}

// Small helper so pages can render several schema blocks cleanly.
export function jsonLd(schema) {
  return { __html: JSON.stringify(schema) };
}
