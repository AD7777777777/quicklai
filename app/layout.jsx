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

// AEO: Organization + Service schema tells AI crawlers exactly what Quicklai is.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  serviceType: "Business advisory for small and medium businesses",
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Small and medium business owners",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
