import "./globals.css";
import { SITE } from "@/lib/config";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// AEO: Organization + WebSite schema tells AI crawlers exactly what Quicklai
// is, and ties it together as one consistent named entity (entity graph).
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  serviceType: "Business advisory for small and medium businesses",
  areaServed: "Worldwide",
  foundingDate: SITE.foundingYear,
  // sameAs links Quicklai to its profiles elsewhere so engines treat them as
  // one entity. Empty until you add real profiles in lib/config.js.
  ...(SITE.sameAs && SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  audience: {
    "@type": "Audience",
    audienceType: "Small and medium business owners",
  },
};

// Declaring the site itself as a named WebSite entity (recommended for AEO).
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
