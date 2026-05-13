import {
  Code2,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  Palette,
  // capabilities
  LayoutGrid,
  Server,
  RefreshCw,
  BarChart3,
  Wrench,
  Gauge,
  Tablet,
  TrendingUp,
  Cpu,
  Database,
  Activity,
  GitBranch,
  Search,
  Layers,
  MousePointer,
  type LucideIcon,
} from "lucide-react";

export type ServiceCapability = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

export type ServiceProcessStep = {
  num: string;
  title: string;
  desc: string;
};

export type ServiceStackGroup = {
  category: string;
  items: string[];
};

export type ServiceOutcomes = {
  timeframe: string;
  delivers: string[];
};

export type Service = {
  id: string;
  title: string;
  navTag: string;
  tagline: string;
  description: string;
  longDescription: string;

  icon: LucideIcon;
  color: string;

  capabilities: ServiceCapability[];
  stackGroups: ServiceStackGroup[];
  outcomes: ServiceOutcomes;
  process: ServiceProcessStep[];
  relatedCases: string[];

  stat: { value: string; label: string };
};

export const SERVICES: Service[] = [
  {
    id: "custom-software",
    title: "Custom Software",
    navTag: "Engineering",
    tagline: "Bespoke products engineered around your business.",
    description:
      "From new product builds to legacy system rewrites — we ship custom software that fits exactly how your team works.",
    longDescription:
      "Most teams don't need another off-the-shelf tool — they need software that adapts to their workflow, not the other way around. We build custom platforms, internal tools, and APIs that fit the way your business actually operates, with engineering that scales as you grow.",
    icon: Code2,
    color: "#7BB6FF",
    capabilities: [
      { title: "Architecture & system design", desc: "Long-lived foundations — scalable from day one, simple to operate.", icon: LayoutGrid },
      { title: "Backend engineering",          desc: "APIs, services, queues, and data layers built for reliability.",       icon: Server },
      { title: "Frontend engineering",         desc: "Production-grade web apps, dashboards, and internal tools.",          icon: Globe },
      { title: "Migrations & refactoring",     desc: "Modernize legacy systems incrementally — without downtime.",          icon: RefreshCw },
    ],
    stackGroups: [
      { category: "Languages",      items: ["TypeScript", "Go", "Python", "Rust"] },
      { category: "Data",           items: ["PostgreSQL", "Redis"] },
      { category: "Infrastructure", items: ["AWS", "Docker", "Terraform"] },
    ],
    outcomes: {
      timeframe: "30 days",
      delivers: [
        "A working slice of your platform in staging, deployed through proper CI/CD.",
        "A written architecture doc your team can challenge, edit, and own.",
        "A quarter's worth of backlog scoped with hours and confidence levels — not vibes.",
      ],
    },
    process: [
      { num: "01", title: "Discover", desc: "We map your problem space, constraints, and existing systems." },
      { num: "02", title: "Architect", desc: "Design the right system shape — boring where possible, novel where it counts." },
      { num: "03", title: "Build",     desc: "Production-ready code from week one, with weekly demos and clean reviews." },
      { num: "04", title: "Scale",     desc: "Hand off cleanly or stay embedded — your call, our long-term support." },
    ],
    relatedCases: ["stratify", "helio"],
    stat: { value: "50+", label: "Products shipped" },
  },

  {
    id: "web-development",
    title: "Web Development",
    navTag: "Frontend",
    tagline: "Modern, performant web apps on a battle-tested stack.",
    description:
      "Marketing sites, SaaS dashboards, internal tools, and e-commerce — built fast, indexed by Google, loved by users.",
    longDescription:
      "Your website is your most-used product. We build web experiences that load instantly, rank well, and feel as polished as the best apps on the market — using a stack that your team can actually maintain after we hand it off.",
    icon: Globe,
    color: "#A78BFA",
    capabilities: [
      { title: "Marketing sites",        desc: "Fast, SEO-optimized landing pages built to convert.",            icon: Globe },
      { title: "SaaS dashboards",        desc: "Complex web apps with data visualization at scale.",              icon: BarChart3 },
      { title: "Internal tools",         desc: "Admin panels and operations tools your team will love.",          icon: Wrench },
      { title: "Performance & SEO",      desc: "Core Web Vitals in the green, indexability done right.",          icon: Gauge },
    ],
    stackGroups: [
      { category: "Frameworks", items: ["Next.js", "React"] },
      { category: "Languages",  items: ["TypeScript"] },
      { category: "Styling",    items: ["Tailwind CSS"] },
      { category: "Backend",    items: ["GraphQL", "tRPC"] },
      { category: "Content & hosting", items: ["Sanity", "Vercel"] },
    ],
    outcomes: {
      timeframe: "3 weeks",
      delivers: [
        "A live preview URL with your top five pages running on the new design system.",
        "Lighthouse scores above 95 across performance, accessibility, and SEO.",
        "Analytics wired up so every change is measurable from day one — not after launch.",
      ],
    },
    process: [
      { num: "01", title: "Discover", desc: "Audit your current site, map user journeys, identify the wins." },
      { num: "02", title: "Design",   desc: "Information architecture, design system, hi-fi mockups." },
      { num: "03", title: "Build",    desc: "Production code with progressive rollouts and instant previews." },
      { num: "04", title: "Optimize", desc: "Performance tuning, A/B tests, and analytics that prove impact." },
    ],
    relatedCases: ["helio", "brightline"],
    stat: { value: "98", label: "Avg Lighthouse score" },
  },

  {
    id: "mobile-apps",
    title: "Mobile Apps",
    navTag: "Mobile",
    tagline: "Native and cross-platform apps that feel right at home.",
    description:
      "iOS, Android, and React Native apps engineered for the platforms users expect — with the velocity teams need.",
    longDescription:
      "Mobile apps live or die by the details — animations, gestures, offline behavior, push reliability. We build apps that hit Apple's and Google's highest quality bars, whether you need pure native, fully cross-platform, or somewhere in between.",
    icon: Smartphone,
    color: "#34D399",
    capabilities: [
      { title: "iOS native",        desc: "Swift, SwiftUI, and the latest Apple frameworks — done right.",         icon: Smartphone },
      { title: "Android native",    desc: "Kotlin, Jetpack Compose, Material 3 — Google-flavored polish.",         icon: Tablet },
      { title: "React Native",      desc: "One codebase across platforms when the math actually works.",            icon: Code2 },
      { title: "Store optimization", desc: "Listings, ratings, and growth loops that compound over time.",          icon: TrendingUp },
    ],
    stackGroups: [
      { category: "iOS",            items: ["Swift", "SwiftUI"] },
      { category: "Android",        items: ["Kotlin", "Jetpack Compose"] },
      { category: "Cross-platform", items: ["React Native", "Expo"] },
      { category: "Services",       items: ["GraphQL", "Firebase"] },
    ],
    outcomes: {
      timeframe: "4 weeks",
      delivers: [
        "An internal TestFlight and Play Store build running on real devices.",
        "Core user flows working end-to-end, with crash and analytics SDKs already in place.",
        "A release plan covering store submission, phased rollout, and the KPIs we'll watch.",
      ],
    },
    process: [
      { num: "01", title: "Discover", desc: "Platform strategy — native, cross-platform, or hybrid. We make the call together." },
      { num: "02", title: "Design",   desc: "Platform-appropriate UX. iOS feels like iOS, Android feels like Android." },
      { num: "03", title: "Build",    desc: "Engineering plus QA on real devices, internal beta builds shipped weekly." },
      { num: "04", title: "Launch",   desc: "Store submission, phased rollout, and post-launch monitoring." },
    ],
    relatedCases: ["vyra"],
    stat: { value: "4.7", label: "Avg App Store rating" },
  },

  {
    id: "ai-data",
    title: "AI & Data",
    navTag: "Intelligence",
    tagline: "Production ML and intelligent automation — not slideware.",
    description:
      "Real ML in production: pipelines, RAG systems, vector search, and observability that catches drift before customers do.",
    longDescription:
      "Most AI projects fail to leave the notebook. We help teams cross that gap — building ML infrastructure that actually ships, with the operational maturity to keep models healthy in production for years.",
    icon: Sparkles,
    color: "#FCD34D",
    capabilities: [
      { title: "ML pipelines",       desc: "Training, deployment, retraining, and rollback — automated end-to-end.", icon: Cpu },
      { title: "RAG systems",        desc: "Knowledge-grounded LLM apps that cite their sources.",                    icon: Sparkles },
      { title: "Data engineering",   desc: "Pipelines, warehouses, and lakehouse architectures that scale.",          icon: Database },
      { title: "Analytics & BI",     desc: "Dashboards and reporting that earn an executive's trust.",                icon: BarChart3 },
    ],
    stackGroups: [
      { category: "Languages",     items: ["Python"] },
      { category: "ML frameworks", items: ["PyTorch", "TensorFlow"] },
      { category: "Platforms",     items: ["AWS SageMaker", "Pinecone"] },
      { category: "Data & pipelines", items: ["dbt", "Snowflake", "Airflow"] },
    ],
    outcomes: {
      timeframe: "30 days",
      delivers: [
        "Your first model in production behind a feature flag, serving real traffic.",
        "A training pipeline that re-runs on schedule with automatic rollback paths.",
        "Observability dashboards covering drift, latency, and per-tenant inference cost.",
      ],
    },
    process: [
      { num: "01", title: "Audit",   desc: "What models exist, what data feeds them, where the gaps are." },
      { num: "02", title: "Build",   desc: "Pipelines, infra, and the ML platform that turns research into product." },
      { num: "03", title: "Deploy",  desc: "Models in production behind feature flags with safe rollback paths." },
      { num: "04", title: "Monitor", desc: "Drift detection, performance dashboards, and incident playbooks." },
    ],
    relatedCases: ["kepler"],
    stat: { value: "30 days", label: "Avg time to production" },
  },

  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    navTag: "Infrastructure",
    tagline: "Resilient infrastructure and zero-downtime deployments.",
    description:
      "Cloud architecture, IaC, CI/CD, and SRE — built so your team ships faster and sleeps better.",
    longDescription:
      "Infrastructure is invisible when it's done well. We design and operate cloud platforms that scale predictably, deploy reliably, and don't wake your team up at 3am — with practices and tooling your engineers can own going forward.",
    icon: Cloud,
    color: "#60A5FA",
    capabilities: [
      { title: "Cloud architecture",      desc: "AWS, GCP, or multi-cloud — chosen for your reality, not buzzwords.",  icon: Cloud },
      { title: "Infrastructure as Code",  desc: "Terraform-first. Every change reviewable, every state reproducible.", icon: Server },
      { title: "CI/CD pipelines",         desc: "Automated, fast, and trustworthy — ship every commit safely.",        icon: GitBranch },
      { title: "Observability & SRE",     desc: "Metrics, logs, traces, and on-call practices that actually work.",    icon: Activity },
    ],
    stackGroups: [
      { category: "Cloud",          items: ["AWS", "GCP"] },
      { category: "IaC",            items: ["Terraform", "Pulumi"] },
      { category: "Orchestration",  items: ["Kubernetes", "ArgoCD"] },
      { category: "Observability & edge", items: ["Datadog", "Cloudflare"] },
    ],
    outcomes: {
      timeframe: "6 weeks",
      delivers: [
        "Your full infrastructure declared in Terraform — reviewable and reproducible.",
        "CI/CD pipelines that ship every commit to staging in under ten minutes.",
        "On-call runbooks and dashboards your engineers can use on day one.",
      ],
    },
    process: [
      { num: "01", title: "Audit",    desc: "Map current infrastructure, costs, risks, and incident history." },
      { num: "02", title: "Architect", desc: "Design the right cloud topology — simpler is almost always better." },
      { num: "03", title: "Migrate",  desc: "Phased migration with blue-green deploys and rollback at every step." },
      { num: "04", title: "Operate",  desc: "Runbooks, dashboards, and the on-call practices your team can own." },
    ],
    relatedCases: ["aurora", "stratify"],
    stat: { value: "99.99%", label: "Avg uptime delivered" },
  },

  {
    id: "product-design",
    title: "Product Design",
    navTag: "Design",
    tagline: "Human-centered UI/UX backed by real research.",
    description:
      "From research to prototype to design system — we craft interfaces that your users actually understand.",
    longDescription:
      "Design isn't decoration. It's how your product becomes usable, learnable, and lovable. We pair deep user research with craft-level visual design, plus the design systems that let your team scale that quality long after we hand off.",
    icon: Palette,
    color: "#F472B6",
    capabilities: [
      { title: "UX research",      desc: "Interviews, usability tests, surveys — evidence over opinion.",         icon: Search },
      { title: "UI design",        desc: "Interfaces engineered for clarity, speed, and brand consistency.",       icon: Palette },
      { title: "Design systems",   desc: "Reusable components, design tokens, documentation your devs use.",      icon: Layers },
      { title: "Prototyping",      desc: "Interactive prototypes for validating ideas before writing code.",       icon: MousePointer },
    ],
    stackGroups: [
      { category: "Design",         items: ["Figma", "FigJam", "Framer"] },
      { category: "Collaboration",  items: ["Notion", "Linear"] },
      { category: "Hand-off",       items: ["Storybook"] },
      { category: "Research",       items: ["Maze", "Lookback"] },
    ],
    outcomes: {
      timeframe: "4 weeks",
      delivers: [
        "A high-fidelity prototype tested with at least eight real users.",
        "A design system with tokens, components, and engineer-ready documentation.",
        "A measurable hypothesis behind every screen — not just designer instinct.",
      ],
    },
    process: [
      { num: "01", title: "Research", desc: "User interviews, journey mapping, and the questions that shape decisions." },
      { num: "02", title: "Design",   desc: "From low-fi sketches to high-fi screens, iteratively with your team." },
      { num: "03", title: "Validate", desc: "Prototypes tested with real users before a single line of code." },
      { num: "04", title: "Hand-off", desc: "Design tokens, specs, and a system your engineers can build on." },
    ],
    relatedCases: ["brightline"],
    stat: { value: "+27pts", label: "Avg retention lift" },
  },
];
