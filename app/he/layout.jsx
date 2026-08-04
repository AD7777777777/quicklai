import "../globals.css";
import { SITE } from "@/lib/content/he";
import BackgroundLine from "@/components/BackgroundLine";

// This is an independent ROOT layout (Next.js "multiple root layouts"
// pattern) — it sets its own <html lang="he" dir="rtl"> completely
// separately from app/(en)/layout.jsx. Browsers flow the whole page
// right-to-left automatically from the dir attribute.

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
    url: `${SITE.url}/he`,
    siteName: SITE.name,
    type: "website",
    locale: "he_IL",
    images: [
      {
        url: `${SITE.url}/og-he.png`,
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
    images: [`${SITE.url}/og-he.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Explicit backup for the automatic icon file-convention detection —
  // see app/(en)/layout.jsx for why this is added explicitly here too.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

// Same Organization entity (@id matches the English layout's) — one
// business, described in Hebrew here. inLanguage marks this description
// as the Hebrew version for engines serving Hebrew-speaking users.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  inLanguage: "he",
  serviceType: "ייעוץ עסקי לעסקים קטנים ובינוניים",
  areaServed: "Worldwide",
  foundingDate: SITE.foundingYear,
  ...(SITE.sameAs && SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  audience: {
    "@type": "Audience",
    audienceType: "בעלי עסקים קטנים ובינוניים",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/he/#website`,
  name: SITE.name,
  url: `${SITE.url}/he`,
  description: SITE.description,
  inLanguage: "he",
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function HebrewRootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
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
        <BackgroundLine locale="he" />
        {children}
      </body>
    </html>
  );
}
