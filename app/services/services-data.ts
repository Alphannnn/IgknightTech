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
  stack: string[];
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
    stack: ["TypeScript", "Go", "Python", "Rust", "PostgreSQL", "Redis", "AWS", "Docker"],
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
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "GraphQL", "tRPC", "Sanity"],
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
    stack: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "React Native", "Expo", "GraphQL", "Firebase"],
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
    stack: ["Python", "PyTorch", "TensorFlow", "AWS SageMaker", "Pinecone", "dbt", "Snowflake", "Airflow"],
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
    stack: ["AWS", "GCP", "Terraform", "Kubernetes", "Datadog", "Cloudflare", "ArgoCD", "Pulumi"],
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
    stack: ["Figma", "FigJam", "Framer", "Notion", "Linear", "Storybook", "Maze", "Lookback"],
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
