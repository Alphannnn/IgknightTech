export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    eyebrow: "Legal · Privacy",
    intro:
      "We collect the smallest amount of information that lets us do good work for you, we tell you what we have, and we delete it when you ask. This page is the long version.",
    lastUpdated: "March 1, 2025",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you contact us, schedule a call, or subscribe to the newsletter, we collect the information you choose to provide — typically your name, work email, company, and the substance of your message. When you visit the site, our hosting provider logs standard request metadata (IP address, user-agent, referrer) for thirty days to detect abuse.",
        ],
        list: [
          "Contact details you submit (name, email, company)",
          "Free-text content of your message",
          "Server access logs (30-day retention)",
          "Aggregate analytics (no third-party trackers)",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "Your contact details are used to reply to you and, with your consent, to follow up about a project. We do not sell, rent, or share your information with marketing partners — full stop. We do not run remarketing pixels, behavioral ads, or third-party trackers.",
        ],
      },
      {
        heading: "Subprocessors",
        paragraphs: [
          "We use a small number of operational vendors to deliver our service. We sign Data Processing Agreements with each and never share more than the minimum required.",
        ],
        list: [
          "Email delivery: Postmark (transactional) · Resend (newsletter)",
          "Calendar / scheduling: Cal.com",
          "Hosting & CDN: Vercel · Cloudflare",
          "Internal collaboration: Linear · Slack · Notion",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "Inbound contact messages are kept for 24 months unless you ask us to delete them sooner. Newsletter subscribers can unsubscribe at any time using the footer of any email. Server logs are rotated every 30 days.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under GDPR, CCPA, and similar laws, you can request a copy of the data we hold about you, ask us to correct it, or ask us to delete it. Email privacy@igknight.tech and we will reply within seven business days.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this policy or about your data: privacy@igknight.tech. We read every message.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    eyebrow: "Legal · Terms",
    intro:
      "These terms cover use of our website and the public-facing material on it. Project engagements are governed by a separate, signed Master Services Agreement.",
    lastUpdated: "March 1, 2025",
    sections: [
      {
        heading: "Acceptance",
        paragraphs: [
          "By accessing igknight.tech you agree to these terms. If you don't agree, please don't use the site. We may update these terms from time to time; substantive changes will be announced in the footer and via the newsletter.",
        ],
      },
      {
        heading: "Content & ownership",
        paragraphs: [
          "Articles, code samples, design illustrations, and other content on the site are © Igknight Tech and our authors. You're welcome to quote excerpts with attribution and a link back. Open-source code we publish is governed by its own license — typically MIT — stated in each repository.",
        ],
      },
      {
        heading: "Permitted use",
        paragraphs: [
          "You may browse, read, save, and share the site for personal or professional purposes. You may not scrape the site at scale, attempt to bypass any access controls, or use the site to send spam, malware, or unsolicited commercial messages.",
        ],
      },
      {
        heading: "Warranties & liability",
        paragraphs: [
          "The site is provided on an 'as is' and 'as available' basis. We work to keep it accurate and online, but make no warranty of fitness for any particular purpose. Where law allows, our aggregate liability arising out of your use of the site is limited to USD 100.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of Delaware, United States. Any disputes arising under them will be resolved in the state and federal courts located in New Castle County, Delaware.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    eyebrow: "Legal · Cookies",
    intro:
      "We use a small number of strictly necessary cookies and no advertising or behavioral tracking. This page lists exactly what we use and why.",
    lastUpdated: "March 1, 2025",
    sections: [
      {
        heading: "Strictly necessary",
        paragraphs: [
          "These cookies are required for the site to function. They cannot be disabled without breaking the site, and they don't track you across other sites.",
        ],
        list: [
          "session — short-lived identifier for keeping forms working across page transitions (24 hours)",
          "theme — your preferred light/dark setting, if any (12 months)",
          "csrf — anti-forgery token on form submissions (per session)",
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          "We use a privacy-respecting analytics service that counts page views in aggregate. We do not store IP addresses, do not assign individual user IDs, do not use third-party cookies, and do not share data with marketing platforms.",
        ],
      },
      {
        heading: "What we don't use",
        paragraphs: [
          "No remarketing pixels. No third-party advertising tags. No cross-site behavioral profiles. No social-network sharing trackers. If you've installed a privacy extension, it will have nothing to report on this site.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can block or delete cookies in your browser's settings. Doing so for our strictly-necessary cookies will affect form submissions but won't otherwise change your experience on the site.",
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "Security & reliability",
    eyebrow: "Legal · Security",
    intro:
      "Security is part of how we engineer, not an afterthought we bolt on. This page is a plain-English summary of our security posture, our certifications, and how we respond when something goes wrong.",
    lastUpdated: "March 1, 2025",
    sections: [
      {
        heading: "Certifications",
        paragraphs: [
          "We maintain the following independent attestations. Reports are available under NDA to active and prospective clients.",
        ],
        list: [
          "SOC 2 Type II — annual audit, latest period covers 2024",
          "ISO 27001 — certified information security management system",
          "GDPR — Article 28-compliant Data Processing Addendum available",
          "HIPAA — Business Associate Agreement available for healthcare engagements",
        ],
      },
      {
        heading: "Data protection",
        paragraphs: [
          "All client data is encrypted at rest using AES-256 and in transit using TLS 1.3. Encryption keys are rotated annually and managed via the cloud provider's HSM-backed key management service. Production access is gated by hardware-key MFA and reviewed quarterly.",
        ],
      },
      {
        heading: "Reliability",
        paragraphs: [
          "Our infrastructure runs multi-region with automated failover. We publish a public status page that you can subscribe to. Our internal SLO for client-facing services is 99.95% monthly uptime, measured externally and reviewed in monthly engineering retrospectives.",
        ],
      },
      {
        heading: "Incident response",
        paragraphs: [
          "Every incident affecting client data triggers a runbook owned by our SRE team. Affected clients are notified within four hours of confirmation. A written postmortem with root cause and remediation timeline is provided within ten business days — and we publish a sanitized version on the engineering blog whenever the lesson generalizes.",
        ],
      },
      {
        heading: "Responsible disclosure",
        paragraphs: [
          "If you've found a security issue, please email security@igknight.tech. We acknowledge reports within one business day, keep you in the loop on remediation, and credit responsible reporters in our public security log unless asked otherwise.",
        ],
      },
    ],
  },
];
