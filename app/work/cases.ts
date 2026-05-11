import {
  Smartphone,
  Layers,
  HeartPulse,
  BarChart3,
  Sparkles,
  Network,
  type LucideIcon,
} from "lucide-react";

export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  service: string;
  headline: string;
  description: string;
  longDescription: string;

  duration: string;
  teamSize: string;
  year: string;

  tech: string[];

  challenge: {
    title: string;
    body: string;
    pain: string[];
  };

  approach: {
    title: string;
    body: string;
    steps: { num: string; title: string; description: string }[];
  };

  results: { value: string; label: string; description: string }[];

  quote: {
    text: string;
    author: string;
    role: string;
    avatar: { from: string; to: string };
  };

  color: string;
  icon: LucideIcon;
  stat: { value: string; label: string };
  featured?: boolean;
};

export const CASES: CaseStudy[] = [
  {
    id: "stratify",
    client: "Stratify",
    industry: "SaaS",
    service: "Platform Engineering",
    headline: "Backend rebuild that 4×'d throughput",
    description:
      "Rebuilt Stratify's monolithic backend into a service-oriented platform on Go and Kubernetes. Conversions are up 38% and the team ships features twice as fast.",
    longDescription:
      "Stratify is a B2B booking platform serving 4,000+ enterprise customers. After 10× growth in 18 months, their Ruby monolith was buckling — peak latency was past 4 seconds and deploy cycles took 45 minutes. We rebuilt the platform service-by-service over 16 weeks, with zero customer-visible downtime.",

    duration: "16 weeks",
    teamSize: "7 engineers",
    year: "2024",

    tech: ["Go", "PostgreSQL", "Kubernetes", "Redis", "Datadog", "Terraform"],

    challenge: {
      title: "A monolith hitting its limits",
      body: "Stratify had grown 10× in 18 months. The Ruby monolith couldn't keep up — request times climbed past 4 seconds at peak, and any deploy became a half-day operation with rollbacks measured in hours.",
      pain: [
        "P95 latency above 4 seconds at peak hours",
        "Deploy cycles averaging 45 minutes per release",
        "Single-AZ failures took down the entire app",
        "Onboarding new engineers took 6+ weeks",
      ],
    },

    approach: {
      title: "Strangler-fig migration to Go services",
      body: "Instead of a risky full rewrite, we extracted services one at a time — starting with auth and billing, then expanding into the busiest product paths. Every move went out behind a feature flag with gradual traffic shifts.",
      steps: [
        { num: "01", title: "Map the seams",       description: "Two weeks of profiling identified seven highest-impact service boundaries." },
        { num: "02", title: "Build the gateway",   description: "An Envoy-based gateway let us route traffic per-endpoint as services came online." },
        { num: "03", title: "Extract incrementally", description: "Each service shipped behind feature flags. Rolling traffic shifts validated every move." },
        { num: "04", title: "Decommission safely",  description: "Old endpoints stayed warm for four weeks post-migration before being torn down." },
      ],
    },

    results: [
      { value: "4×",     label: "Throughput gain",     description: "P95 latency fell from 4.2s to 410ms at peak load." },
      { value: "+38%",   label: "Conversion lift",     description: "Faster pages translated directly to higher signup completion." },
      { value: "8 min",  label: "Avg deploy time",     description: "Down from 45 minutes — engineers now ship 4× more often." },
      { value: "$2.1M",  label: "Annual infra savings", description: "Right-sized fleet plus better caching cut AWS spend by 32%." },
    ],

    quote: {
      text: "Igknight rebuilt our entire booking platform in six weeks. Conversions are up 38% and our team finally trusts the codebase again.",
      author: "Sarah Chen",
      role: "CTO, Stratify",
      avatar: { from: "#7BB6FF", to: "#3B82F6" },
    },

    color: "#7BB6FF",
    icon: Layers,
    stat: { value: "4×", label: "Performance gain" },
    featured: true,
  },

  {
    id: "vyra",
    client: "Vyra",
    industry: "Fintech",
    service: "Mobile",
    headline: "Mobile rebuild from 3.6 to 4.7 stars",
    description:
      "Complete React Native rewrite of Vyra's consumer fintech app — new onboarding, redesigned core flows, and a migration with zero regressions.",
    longDescription:
      "Vyra is a consumer fintech serving 1.2M users across Latin America. Their iOS and Android codebases had drifted apart over five years — features shipped on one platform months before the other. We rebuilt both apps as a single React Native codebase, redesigned the core flows, and migrated existing users without a single account-related support escalation.",

    duration: "20 weeks",
    teamSize: "5 engineers + 2 designers",
    year: "2024",

    tech: ["React Native", "TypeScript", "GraphQL", "Firebase", "Detox"],

    challenge: {
      title: "Two diverging codebases, one frustrated team",
      body: "iOS and Android had drifted apart. Features shipped 3+ months apart, the team was paying double for every change, and App Store ratings had slid from 4.4 to 3.6 over 18 months.",
      pain: [
        "Native iOS and Android codebases drifting apart",
        "Releases shipping months apart across platforms",
        "App Store rating dropped from 4.4 to 3.6",
        "Crash-free rate stuck around 96%",
      ],
    },

    approach: {
      title: "One codebase, redesigned end-to-end",
      body: "We rebuilt the apps in React Native with shared business logic, a modular feature architecture, and a fresh design system. Both platforms now ship the same week, with the same features and the same quality.",
      steps: [
        { num: "01", title: "Audit & inventory",   description: "Three weeks reverse-engineering both apps and prioritizing what to keep vs. cut." },
        { num: "02", title: "Design system",       description: "Built a token-based design system that maps cleanly to native components." },
        { num: "03", title: "Migrate by surface",  description: "Each tab shipped behind a feature flag. Power users opted in before general release." },
        { num: "04", title: "Decommission",        description: "Old apps stayed available for 60 days. Final cutover happened on a Tuesday morning." },
      ],
    },

    results: [
      { value: "3.6 → 4.7", label: "App Store rating",  description: "Across both stores, sustained six months post-launch." },
      { value: "+212%",     label: "Downloads",           description: "Driven by both new acquisition and existing-user re-engagement." },
      { value: "1",         label: "Codebase",            description: "iOS, Android, and tablet all ship from one repo on the same day." },
      { value: "99.7%",     label: "Crash-free sessions", description: "Up from 96.2% before the rebuild." },
    ],

    quote: {
      text: "Our mobile rewrite was complex — they handled the migration without a single regression and our App Store rating went from 3.6 to 4.7.",
      author: "James Whitfield",
      role: "Founder, Vyra",
      avatar: { from: "#FCD34D", to: "#D97706" },
    },

    color: "#FCD34D",
    icon: Smartphone,
    stat: { value: "+212%", label: "Downloads" },
  },

  {
    id: "helio",
    client: "Helio Health",
    industry: "Healthcare",
    service: "Web Platform",
    headline: "HIPAA-grade patient portal at scale",
    description:
      "Designed and built Helio's patient-facing portal and provider tools on a HIPAA-eligible AWS stack. Onboarded 250K+ patients in the first quarter.",
    longDescription:
      "Helio Health serves outpatient clinics across 14 states. They needed a HIPAA-compliant patient portal with a matching provider dashboard — and they needed to launch in a strict window driven by an insurance partnership. We delivered an audit-ready system in 18 weeks, with a security posture that passed external review on the first attempt.",

    duration: "18 weeks",
    teamSize: "6 engineers + 1 security lead",
    year: "2024",

    tech: ["Next.js", "Node.js", "AWS HIPAA", "DynamoDB", "Cognito", "WAF"],

    challenge: {
      title: "Healthcare-grade compliance, startup-grade timeline",
      body: "Helio needed both a patient-facing portal and a provider dashboard launched in time for a major insurance partnership. The stack had to satisfy HIPAA, SOC 2, and a third-party security audit — without a year-long compliance project.",
      pain: [
        "Hard deadline tied to a partnership launch",
        "HIPAA Business Associate Agreement requirements",
        "No in-house security or compliance expertise",
        "Needed both patient and provider experiences",
      ],
    },

    approach: {
      title: "Compliance-first architecture",
      body: "We built on HIPAA-eligible AWS services from day one, with audit logging, encryption at rest and in transit, and explicit data classification. Compliance was a build constraint, not a retrofit.",
      steps: [
        { num: "01", title: "Compliance review",   description: "Mapped every PHI touchpoint and selected HIPAA-eligible services accordingly." },
        { num: "02", title: "Architecture design", description: "Isolated workloads in dedicated VPCs with strict IAM boundaries and audit trails." },
        { num: "03", title: "Build & internal audit", description: "Engineering and security reviewed every PR. External pen test in week 14." },
        { num: "04", title: "Launch & monitor",    description: "Phased rollout to 12 clinics first, then nationwide over 4 weeks." },
      ],
    },

    results: [
      { value: "250K+",   label: "Patients onboarded", description: "Across 14 states in the first quarter post-launch." },
      { value: "First-try", label: "Audit pass",         description: "Cleared external HIPAA security audit without remediation findings." },
      { value: "99.99%",  label: "Uptime SLA",         description: "Met every month since launch with multi-region failover." },
      { value: "4 weeks", label: "Ahead of schedule",  description: "Delivered before the partnership deadline, with buffer for surprises." },
    ],

    quote: {
      text: "Beautifully crafted, performant, and shipped on time. The bar they set has changed how we evaluate every other vendor.",
      author: "Priya Kothari",
      role: "VP Engineering, Helio Health",
      avatar: { from: "#34D399", to: "#059669" },
    },

    color: "#34D399",
    icon: HeartPulse,
    stat: { value: "250K+", label: "Patients onboarded" },
  },

  {
    id: "brightline",
    client: "Brightline",
    industry: "SaaS",
    service: "Design & Engineering",
    headline: "Dashboard redesign that lifted retention by 27pts",
    description:
      "Full design-system overhaul and dashboard rewrite. Retention climbed from 41% to 68% in the first quarter post-launch.",
    longDescription:
      "Brightline is a workflow analytics platform for operations teams. Their dashboard had grown organically over five years — every customer request added a new chart, panel, or filter. Power users loved it. Everyone else churned. We rebuilt the dashboard from the user up, with a fresh design system and validated through 9 weeks of structured user testing.",

    duration: "14 weeks",
    teamSize: "3 designers + 4 engineers",
    year: "2024",

    tech: ["React", "TypeScript", "Figma", "Storybook", "PostHog"],

    challenge: {
      title: "Power users loved it. New users churned.",
      body: "Brightline's analytics dashboard had become a maze. Activation rate had dropped to 31% and retention to 41% — but their largest enterprise accounts threatened to leave if anything changed. We needed to redesign without alienating either side.",
      pain: [
        "30-day retention had fallen to 41%",
        "Time-to-value was over 12 days",
        "23 unique chart components, mostly duplicates",
        "Enterprise accounts resistant to change",
      ],
    },

    approach: {
      title: "Research, design system, gradual rollout",
      body: "We started with 6 weeks of user research across both new and power users. Built a fresh design system, rewrote the dashboard, and rolled out gradually with opt-in betas before mandatory cutover.",
      steps: [
        { num: "01", title: "User research",   description: "Interviewed 24 users across cohorts. Mapped jobs-to-be-done for each persona." },
        { num: "02", title: "Design system",   description: "Built 12 core components covering 95% of dashboard surfaces — down from 23 duplicates." },
        { num: "03", title: "Refactor",         description: "Rewrote dashboard with the new system. Old version stayed accessible via a toggle." },
        { num: "04", title: "Validate",        description: "Ran a 6-week A/B test before defaulting all users to the new experience." },
      ],
    },

    results: [
      { value: "41 → 68%",  label: "30-day retention",   description: "27-point lift sustained through 6 months of measurement." },
      { value: "-47%",       label: "Time-to-value",     description: "First insight reached in under 6 days, down from 12." },
      { value: "+23",        label: "NPS points",         description: "Even power users reported the new dashboard as faster to navigate." },
      { value: "12",         label: "Components shipped", description: "Down from 23 duplicates — design and engineering velocity both doubled." },
    ],

    quote: {
      text: "They redesigned our entire dashboard experience. User retention went from 41% to 68% in the first quarter post-launch.",
      author: "Tomás Reyes",
      role: "CEO, Brightline",
      avatar: { from: "#FB923C", to: "#C2410C" },
    },

    color: "#FB923C",
    icon: BarChart3,
    stat: { value: "41 → 68%", label: "User retention" },
  },

  {
    id: "kepler",
    client: "Kepler AI",
    industry: "AI / Data",
    service: "ML Engineering",
    headline: "ML pipeline shipped to prod in 30 days",
    description:
      "End-to-end ML platform — data ingestion, training pipeline, RAG-powered inference, and observability. No buzzwords, just shipped infra.",
    longDescription:
      "Kepler AI had a research team building models nobody could deploy. We came in for a 30-day sprint and shipped their first three models to production with full observability, automatic retraining triggers, and a RAG layer connecting to their internal knowledge base.",

    duration: "30 days",
    teamSize: "3 ML engineers",
    year: "2024",

    tech: ["Python", "PyTorch", "SageMaker", "Pinecone", "Airflow", "MLflow"],

    challenge: {
      title: "Great research, nothing in production",
      body: "Kepler's data science team had spent 14 months building models that worked beautifully in notebooks and never reached customers. There was no path from prototype to production — and the team's anxiety was starting to leak into morale.",
      pain: [
        "18 trained models, zero in production",
        "Manual data pipelines breaking weekly",
        "No model versioning or rollback strategy",
        "Inference cost projections were unworkable",
      ],
    },

    approach: {
      title: "Production-first ML platform",
      body: "We built the platform their research deserved — automated training pipelines, model versioning, RAG-powered inference, and observability that catches drift before customers do.",
      steps: [
        { num: "01", title: "Audit the ML stack",  description: "Catalogued 18 models, ranked by business value, and picked three to ship first." },
        { num: "02", title: "Build the pipeline",   description: "Airflow-orchestrated training, with MLflow versioning and automatic retraining triggers." },
        { num: "03", title: "RAG integration",      description: "Pinecone vector store connected to internal docs for grounded responses." },
        { num: "04", title: "Observability",        description: "Drift detection, latency monitoring, and per-customer inference logs from day one." },
      ],
    },

    results: [
      { value: "30 days",  label: "To production",       description: "Three models live and serving real traffic by week four." },
      { value: "18",       label: "Models deployable",   description: "Platform scales to the rest of their model library without rebuild." },
      { value: "<100ms",   label: "P95 inference",       description: "Across all three production models, including the RAG-powered one." },
      { value: "-64%",     label: "Inference cost",       description: "Vs. their first projections, thanks to model distillation and caching." },
    ],

    quote: {
      text: "Their engineers shipped our AI pipeline in production within 30 days. No hand-waving, no buzzword salad — just clean, working ML infra.",
      author: "David Park",
      role: "Director of Data, Kepler AI",
      avatar: { from: "#A78BFA", to: "#7C3AED" },
    },

    color: "#A78BFA",
    icon: Sparkles,
    stat: { value: "30 days", label: "To production" },
  },

  {
    id: "aurora",
    client: "Aurora Networks",
    industry: "Infrastructure",
    service: "Cloud & DevOps",
    headline: "Zero-downtime migration for 4M daily users",
    description:
      "Migrated Aurora's legacy data center to a multi-region AWS architecture serving 4M+ daily users — without a single user-visible interruption.",
    longDescription:
      "Aurora Networks operates a regional internet backbone serving 4 million daily users. Their primary data center was reaching end-of-life and a migration couldn't take the service offline — not even for 30 seconds. We architected a multi-region AWS migration with blue-green deployments and traffic shaping that moved every workload without a customer-visible blip.",

    duration: "9 months",
    teamSize: "4 engineers + 1 SRE",
    year: "2023",

    tech: ["AWS", "Terraform", "Datadog", "Cloudflare", "Kubernetes"],

    challenge: {
      title: "Migrate everything. Drop nothing.",
      body: "Aurora needed out of their aging data center, but their SLA didn't allow a single second of downtime. Customers ran businesses on their network — even a brief interruption meant SLA penalties and reputation damage that would take years to recover from.",
      pain: [
        "Legacy data center reaching end-of-life",
        "4M daily users, zero downtime tolerance",
        "Hardware contracts expiring in 12 months",
        "No prior multi-region operational experience",
      ],
    },

    approach: {
      title: "Blue-green migration, region by region",
      body: "We stood up a parallel AWS environment with Terraform, gradually shifted traffic using DNS and BGP routing, and kept the legacy stack warm as a fallback for 12 weeks after the final cutover.",
      steps: [
        { num: "01", title: "Inventory",        description: "Catalogued every workload, dependency, and SLA. Estimated 180 distinct services." },
        { num: "02", title: "Pilot region",     description: "us-east-1 came online with 5% of traffic for two weeks to validate everything." },
        { num: "03", title: "Phased migration", description: "Each service migrated independently with DNS-based traffic shaping. 6 month rollout." },
        { num: "04", title: "Decommission",     description: "Legacy stayed running for 12 weeks post-cutover. Then a single command turned it off." },
      ],
    },

    results: [
      { value: "0",       label: "Minutes of downtime", description: "Across 9 months and 180 service migrations." },
      { value: "4M",      label: "Users migrated",      description: "Without a single SLA violation or paged incident." },
      { value: "$1.8M",   label: "Annual savings",      description: "Cloud spend, even at full scale, came in below legacy data center costs." },
      { value: "99.99%",  label: "SLA met",             description: "Across all 12 months post-migration. Better than pre-migration." },
    ],

    quote: {
      text: "Cloud migration without downtime, on a system serving 4M users daily. I genuinely don't know how they pulled it off.",
      author: "Hiroshi Tanaka",
      role: "Principal Engineer, Aurora Networks",
      avatar: { from: "#67E8F9", to: "#0891B2" },
    },

    color: "#67E8F9",
    icon: Network,
    stat: { value: "0", label: "Minutes of downtime" },
  },
];

export const INDUSTRIES = [
  "All",
  "SaaS",
  "Fintech",
  "Healthcare",
  "AI / Data",
  "Infrastructure",
] as const;
