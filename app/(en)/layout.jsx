import "../globals.css";
import { SITE } from "@/lib/config";
import BackgroundLine from "@/components/BackgroundLine";

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
    images: [
      {
        url: `${SITE.url}/og-en.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [`${SITE.url}/og-en.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Explicit backup for the automatic favicon.ico/icon.png/apple-icon.png
  // file-convention detection — this project uses two independent root
  // layouts (multiple-root-layouts pattern) rather than one shared root,
  // which is a less common setup, so this makes the icons resolve
  // correctly regardless of any edge case there.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
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
    <html lang="en" dir="ltr">
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
      <body className="font-sans">
        <BackgroundLine />
        {children}
      </body>
    </html>
  );
}

