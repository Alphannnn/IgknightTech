export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  authorAvatar: { from: string; to: string };
  date: string;
  readTime: string;
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    id: "no-microservices",
    title: "Why we don't write microservices anymore",
    excerpt:
      "We split into microservices because it was 2019. Then we spent three years feeling the cost. Here's what we learned, and how we structure backends in 2025.",
    category: "Engineering",
    categoryColor: "#7BB6FF",
    author: "Sarah Chen",
    authorAvatar: { from: "#7BB6FF", to: "#3B82F6" },
    date: "Mar 18, 2025",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "migrating-4m-users",
    title: "Migrating 4M users with zero downtime: a postmortem",
    excerpt:
      "Nine months, 180 services, and exactly zero customer-visible incidents. The technical and operational playbook from the Aurora Networks migration.",
    category: "Infrastructure",
    categoryColor: "#67E8F9",
    author: "Hiroshi Tanaka",
    authorAvatar: { from: "#67E8F9", to: "#0891B2" },
    date: "Mar 11, 2025",
    readTime: "18 min read",
  },
  {
    id: "hipaa-2025",
    title: "Building HIPAA-compliant systems in 2025",
    excerpt:
      "What the regulation actually requires, what auditors actually check, and the architecture choices that make the difference between a clean pass and three months of remediation.",
    category: "Compliance",
    categoryColor: "#34D399",
    author: "Priya Kothari",
    authorAvatar: { from: "#34D399", to: "#059669" },
    date: "Mar 4, 2025",
    readTime: "15 min read",
  },
  {
    id: "rsc-in-prod",
    title: "The state of React Server Components in production",
    excerpt:
      "After 18 months of shipping RSC at scale, here's where it shines, where it hurts, and the patterns we've evolved to handle the rough edges.",
    category: "Frontend",
    categoryColor: "#A78BFA",
    author: "Marcus Holloway",
    authorAvatar: { from: "#A78BFA", to: "#7C3AED" },
    date: "Feb 25, 2025",
    readTime: "10 min read",
  },
  {
    id: "trust-in-fintech",
    title: "Designing for trust in fintech mobile apps",
    excerpt:
      "Trust is built in microinteractions — confirmation flows, error states, and the second-and-a-half between tap and transaction. A field guide from rebuilding Vyra.",
    category: "Design",
    categoryColor: "#FCD34D",
    author: "James Whitfield",
    authorAvatar: { from: "#FCD34D", to: "#D97706" },
    date: "Feb 18, 2025",
    readTime: "9 min read",
  },
  {
    id: "ml-30-days",
    title: "How we ship ML to production in 30 days",
    excerpt:
      "The infrastructure, the team structure, and the discipline that turns 14 months of notebook research into models serving real traffic in a month.",
    category: "AI",
    categoryColor: "#F472B6",
    author: "David Park",
    authorAvatar: { from: "#A78BFA", to: "#7C3AED" },
    date: "Feb 4, 2025",
    readTime: "14 min read",
  },
];

export type Repo = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
};

export const REPOS: Repo[] = [
  {
    name: "igknight/observatory",
    description:
      "Production-grade observability toolkit — metrics, traces, and logs with sane defaults.",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: "2.4k",
    forks: "284",
  },
  {
    name: "igknight/ship-it",
    description:
      "Opinionated CLI for deploying to AWS, GCP, and Cloudflare from a single config file.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: "1.8k",
    forks: "172",
  },
  {
    name: "igknight/forge",
    description:
      "Design system starter — tokens, components, and Storybook scaffolding for new products.",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: "3.1k",
    forks: "412",
  },
  {
    name: "igknight/raglight",
    description:
      "Lightweight RAG framework with built-in evaluation, caching, and source citation.",
    language: "Python",
    languageColor: "#3572A5",
    stars: "1.2k",
    forks: "98",
  },
];

export type Talk = {
  date: string;
  month: string;
  year: string;
  conference: string;
  location: string;
  title: string;
  speaker: string;
  type: "Keynote" | "Talk" | "Workshop" | "Panel";
};

export const TALKS: Talk[] = [
  {
    date: "12",
    month: "Jun",
    year: "2025",
    conference: "React Summit",
    location: "Amsterdam",
    title: "Component patterns that scale across decades, not quarters",
    speaker: "Marcus Holloway",
    type: "Talk",
  },
  {
    date: "03",
    month: "May",
    year: "2025",
    conference: "Strange Loop",
    location: "St. Louis",
    title: "Designing systems that bend, not break",
    speaker: "Sarah Chen",
    type: "Keynote",
  },
  {
    date: "21",
    month: "Apr",
    year: "2025",
    conference: "DesignOps",
    location: "London",
    title: "Design systems for engineering teams",
    speaker: "Maya Goldberg",
    type: "Workshop",
  },
  {
    date: "08",
    month: "Mar",
    year: "2025",
    conference: "AWS re:Invent",
    location: "Las Vegas",
    title: "Zero-downtime migrations at planet scale",
    speaker: "Hiroshi Tanaka",
    type: "Talk",
  },
  {
    date: "14",
    month: "Feb",
    year: "2025",
    conference: "ML Summit",
    location: "Berlin",
    title: "From notebook to production: ML that actually ships",
    speaker: "David Park",
    type: "Panel",
  },
];
