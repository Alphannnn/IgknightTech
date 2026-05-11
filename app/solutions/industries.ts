import {
  Rocket,
  Wallet,
  HeartPulse,
  ShoppingBag,
  Building2,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;

  challenges: { title: string; desc: string }[];
  capabilities: string[];
  compliance: string[];
  relatedCases: string[];
  stat: { value: string; label: string };
};

export const INDUSTRIES: Industry[] = [
  {
    id: "saas-startups",
    title: "SaaS & Startups",
    tagline: "From MVP to scale — with engineering you can grow with.",
    description:
      "We help SaaS companies move from first MVP to product-market fit to enterprise scale. Senior engineers who've shipped at every stage — helping you skip the most expensive mistakes.",
    icon: Rocket,
    color: "#7BB6FF",
    challenges: [
      { title: "MVPs that don't get thrown away",  desc: "We build foundations that survive the rewrite conversation." },
      { title: "Scaling without re-platforming",   desc: "Architectures that grow with you, not against you." },
      { title: "Speed without debt",                desc: "Engineering velocity that compounds instead of corroding." },
      { title: "Senior talent on-demand",           desc: "Embedded teams to fill the gaps your hiring pipeline can't." },
    ],
    capabilities: ["Product engineering", "Scaling infrastructure", "Growth analytics", "Embedded teams"],
    compliance: ["SOC 2 Type II"],
    relatedCases: ["stratify", "brightline"],
    stat: { value: "10×", label: "Avg user growth handled" },
  },
  {
    id: "fintech-banking",
    title: "Fintech & Banking",
    tagline: "Secure, compliant financial products — from day one.",
    description:
      "Fintech requires zero-error engineering. We build payment systems, consumer fintech apps, and back-office tools with the security and audit posture that regulators expect.",
    icon: Wallet,
    color: "#34D399",
    challenges: [
      { title: "Regulator-ready from the start",   desc: "Compliance baked into the architecture, not bolted on later." },
      { title: "Zero-error transaction systems",    desc: "Payment infrastructure where reliability is non-negotiable." },
      { title: "Fraud & abuse at scale",            desc: "ML-backed detection, KYC/AML pipelines, sanctions screening." },
      { title: "Banking partnership speed",         desc: "Move fast through partner integrations without breaking compliance." },
    ],
    capabilities: ["Payment infrastructure", "Fraud detection", "KYC/AML pipelines", "Banking partner integrations"],
    compliance: ["PCI DSS", "SOC 2 Type II", "ISO 27001"],
    relatedCases: ["vyra"],
    stat: { value: "$2B+", label: "Transaction volume processed" },
  },
  {
    id: "healthcare-medtech",
    title: "Healthcare & Med-Tech",
    tagline: "HIPAA-grade patient and provider experiences.",
    description:
      "Healthcare engineering means building for the highest privacy and audit standards. We design HIPAA-compliant patient portals, provider tools, and EHR integrations that pass external review on the first try.",
    icon: HeartPulse,
    color: "#F472B6",
    challenges: [
      { title: "PHI security & HIPAA",              desc: "Audit-ready from architecture review onward." },
      { title: "HL7 / FHIR integrations",           desc: "Connect to the EHR systems your clinicians already use." },
      { title: "Patient experience at scale",       desc: "Patient portals that actually patients want to use." },
      { title: "Telehealth-ready video",            desc: "Reliable, compliant video for clinical workflows." },
    ],
    capabilities: ["Patient portals", "Provider dashboards", "EHR integrations", "Telehealth platforms"],
    compliance: ["HIPAA", "HITRUST CSF", "SOC 2 Type II"],
    relatedCases: ["helio"],
    stat: { value: "250K+", label: "Patients onboarded" },
  },
  {
    id: "ecommerce-retail",
    title: "E-commerce & Retail",
    tagline: "Storefronts and platforms engineered to convert.",
    description:
      "Commerce lives or dies by milliseconds. We build headless storefronts, multi-channel platforms, and conversion-optimized experiences that scale through Black Friday without breaking a sweat.",
    icon: ShoppingBag,
    color: "#FCD34D",
    challenges: [
      { title: "Sub-second page loads",             desc: "Every 100ms costs revenue — we treat performance as a feature." },
      { title: "Headless & multi-channel",          desc: "One backend powering web, mobile, in-store, and partner channels." },
      { title: "Payments & fraud",                  desc: "Multiple processors, fallback flows, and abuse prevention built in." },
      { title: "Peak-traffic resilience",           desc: "Architectures designed for Black Friday from day one." },
    ],
    capabilities: ["Headless commerce", "Performance & SEO", "Payment integrations", "Inventory / OMS"],
    compliance: ["PCI DSS", "SOC 2 Type II"],
    relatedCases: ["brightline"],
    stat: { value: "<200ms", label: "Avg P95 page load" },
  },
  {
    id: "enterprise-smb",
    title: "Enterprise & SMB",
    tagline: "Internal tools, integrations, and custom workflows.",
    description:
      "Enterprise software lives between many systems. We build internal tools, integration platforms, and SSO-protected dashboards that turn fragmented data into operational leverage.",
    icon: Building2,
    color: "#A78BFA",
    challenges: [
      { title: "Legacy system integrations",        desc: "Modern interfaces wrapped around the systems you can't replace yet." },
      { title: "SSO & enterprise auth",             desc: "SAML, OIDC, SCIM — set up right the first time." },
      { title: "Custom workflows & approvals",      desc: "Tools that match how your organization actually operates." },
      { title: "Global team scale",                 desc: "Multi-region deployment, internationalization, RBAC at scale." },
    ],
    capabilities: ["Internal tools", "ETL pipelines", "SSO / SAML", "Workflow automation"],
    compliance: ["SOC 2 Type II", "ISO 27001", "GDPR"],
    relatedCases: ["stratify", "aurora"],
    stat: { value: "12+", label: "Enterprise clients" },
  },
  {
    id: "marketplaces-platforms",
    title: "Marketplaces & Platforms",
    tagline: "Multi-sided platforms that thrive at scale.",
    description:
      "Marketplaces are the hardest products to build. We engineer two-sided platforms, payment escrow, trust and safety systems, and the search infrastructure that lets liquidity find liquidity.",
    icon: Layers,
    color: "#60A5FA",
    challenges: [
      { title: "Two-sided liquidity",               desc: "Bootstrapping supply and demand without one starving the other." },
      { title: "Search & discovery at scale",       desc: "Sub-100ms search across millions of listings and intents." },
      { title: "Trust, safety, disputes",           desc: "Identity, ratings, and resolution workflows that scale." },
      { title: "Multi-currency payments",           desc: "Escrow, split payouts, and cross-border processing." },
    ],
    capabilities: ["Marketplace infrastructure", "Search systems", "Trust & safety", "Payment escrow"],
    compliance: ["PCI DSS", "Regional regulations"],
    relatedCases: ["aurora"],
    stat: { value: "4M+", label: "Daily users supported" },
  },
];
