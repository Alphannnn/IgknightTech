import type { Metadata } from "next";

const SITE_URL = "https://igknight.tech";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Long-form writing from the Igknight Tech team — postmortems, architecture notes, and the lessons we learned the hard way. Engineering, design, AI, infrastructure, and compliance.",
  keywords: [
    "engineering blog",
    "software architecture",
    "postmortems",
    "ML in production",
    "design tokens",
    "HIPAA",
    "React Server Components",
    "PostgreSQL",
    "Igknight Tech",
  ],
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    type: "website",
    title: "Blog · Igknight Tech",
    description:
      "Long-form writing from the team — postmortems and architecture notes, in public.",
    url: `${SITE_URL}/resources`,
    siteName: "Igknight Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Igknight Tech",
    description:
      "Long-form writing from the team — postmortems and architecture notes.",
    creator: "@igknighttech",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // schema.org Blog JSON-LD applied to the whole resources tree
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Igknight Tech Blog",
    url: `${SITE_URL}/resources`,
    description:
      "Long-form writing from the Igknight Tech team — postmortems, architecture notes, and the lessons we learned the hard way.",
    publisher: {
      "@type": "Organization",
      name: "Igknight Tech",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
