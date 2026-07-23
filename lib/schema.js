// ============================================================
//  Shared JSON-LD schema builders (AEO)
//  Every page uses these so structured data stays consistent and
//  all entities link back to one Organization via @id.
// ============================================================

import { SITE } from "@/lib/config";

const ORG_ID = `${SITE.url}/#organization`;

// Breadcrumbs: pass [{ name, path }] — path is relative, e.g. "/services".
export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
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
export function pageSchema({ type = "WebPage", path, name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE.url}${path}#webpage`,
    url: `${SITE.url}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

// Service schema for each offering, linked to the Organization as provider.
// This is how an AI engine answers "who builds AI agents for small businesses".
export function serviceListSchema(services) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} services`,
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
          audienceType: "Small and medium business owners",
        },
      },
    })),
  };
}

// Small helper so pages can render several schema blocks cleanly.
export function jsonLd(schema) {
  return { __html: JSON.stringify(schema) };
}
