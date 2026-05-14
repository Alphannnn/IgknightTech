import {
  Send,
  TrendingUp,
  Sparkles,
  Calendar,
  ShoppingBag,
  Users,
  CreditCard,
  Layers,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Case-study schema.

   Required fields: enough to render the listing card and the
   minimal detail page (id, client, url, industry, service, year,
   headline, description, longDescription, role, tech, color, icon).

   Optional fields (challenge / approach / results / quote /
   beforeAfter / stat / duration / teamSize / cover): only fill
   these when we have REAL data. The detail page conditionally
   renders each — empty sections are simply omitted, no placeholders.
   ───────────────────────────────────────────────────────────── */

export type CaseStudy = {
  id: string;
  client: string;
  url: string;
  industry: string;
  service: string;
  year: string;
  headline: string;
  description: string;
  longDescription: string;

  /** Your role / contributions on this project. */
  role: string[];

  /** Tech stack tags. Empty array is acceptable. */
  tech: string[];

  /** Cover image path. Defaults to a gradient placeholder when missing. */
  cover?: string;
  /** Optional gallery for the detail page. */
  screenshots?: string[];

  duration?: string;
  teamSize?: string;

  beforeAfter?: { metric: string; before: string; after: string }[];

  challenge?: {
    title: string;
    body: string;
    pain: string[];
  };

  approach?: {
    title: string;
    body: string;
    steps: { num: string; title: string; description: string }[];
  };

  results?: { value: string; label: string; description: string }[];

  quote?: {
    text: string;
    author: string;
    role: string;
    avatar: { from: string; to: string };
  };

  color: string;
  icon: LucideIcon;
  stat?: { value: string; label: string };
  featured?: boolean;
};

export const CASES: CaseStudy[] = [
  {
    id: "flote",
    client: "Flote",
    url: "https://flotelab.com/",
    industry: "SaaS",
    service: "Full-Stack Development",
    year: "2024",
    headline: "Product development for Flote",
    description:
      "Full-stack engineering for Flote — feature delivery, integrations, and platform scaling.",
    longDescription:
      "Contributed full-stack engineering across Flote's product surface — building and maintaining feature work, third-party integrations, and the infrastructure underneath. Collaborated cross-functionally to ship reliably and keep the platform responsive as it grew.",
    role: ["Full-Stack Engineering", "Integrations", "Platform"],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    cover: "/work/flote/cover.jpg",
    color: "#2783ED",
    icon: Sparkles,
    featured: true,
  },

  {
    id: "traded",
    client: "Traded",
    url: "https://traded.co/",
    industry: "Fintech",
    service: "Full-Stack Development",
    year: "2024",
    headline: "Trading platform with a seamless investor experience",
    description:
      "Built robust backend systems and intuitive interfaces for Traded — a platform that streamlines the trading process for users.",
    longDescription:
      "Contributed to the development of Traded, a platform designed to streamline the trading process for users. Worked with the team to implement robust backend solutions and intuitive user interfaces, ensuring a seamless trading experience for investors.",
    role: ["Backend Engineering", "Frontend Engineering", "Trading UX"],
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "WebSocket"],
    cover: "/work/traded/cover.jpg",
    color: "#10B981",
    icon: TrendingUp,
    featured: true,
  },

  {
    id: "zentap",
    client: "Zentap",
    url: "https://www.zentap.com/",
    industry: "Marketing",
    service: "Full-Stack Development",
    year: "2024",
    headline: "Marketing automation that streamlines workflows",
    description:
      "Led development for Zentap, a marketing automation platform built to streamline digital marketing workflows.",
    longDescription:
      "Played a pivotal role in leading the development efforts for Zentap, a marketing automation platform designed to streamline digital marketing workflows. Collaborated with cross-functional teams to implement innovative features and integrations, empowering businesses to enhance their marketing strategies and drive growth.",
    role: ["Lead Developer", "Full-Stack Engineering", "Integrations"],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    cover: "/work/zentap/cover.jpg",
    color: "#8B5CF6",
    icon: Send,
    featured: true,
  },

  {
    id: "upcomingevents",
    client: "Upcoming Events",
    url: "https://www.upcomingevents.com/philadelphia",
    industry: "Events",
    service: "Full-Stack Development",
    year: "2024",
    headline: "Event staffing platform, end-to-end",
    description:
      "Led the development of Upcoming Events — managed the full software lifecycle from inception to deployment.",
    longDescription:
      "Led the development efforts for the Event Staffing website. Managed all aspects of the project, applying expertise in agile methodologies to oversee the software development lifecycle from inception to deployment. Focused on delivering a user-centric platform, collaborated closely with cross-functional teams to gather requirements, design intuitive user interfaces, and implement robust backend solutions.",
    role: ["Lead Developer", "Project Management", "Agile / Scrum"],
    tech: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
    cover: "/work/upcomingevents/cover.jpg",
    color: "#F472B6",
    icon: Calendar,
    featured: true,
  },

  {
    id: "gooutfitter",
    client: "Go Outfitter",
    url: "https://www.gooutfitter.com/",
    industry: "E-commerce",
    service: "Full-Stack Development",
    year: "2023",
    headline: "Outdoor marketplace built to convert",
    description:
      "Full-stack contributions to Go Outfitter — an online marketplace for outdoor enthusiasts with intuitive navigation and secure payments.",
    longDescription:
      "Contributed to the development of Go Outfitter, an online marketplace for outdoor enthusiasts. Collaborated with the team to create a user-friendly platform with intuitive navigation and secure payment processing, enhancing the outdoor shopping experience for customers.",
    role: ["Full-Stack Engineering", "Payments", "Marketplace UX"],
    tech: ["React", "Next.js", "Node.js", "Stripe", "PostgreSQL"],
    cover: "/work/gooutfitter/cover.jpg",
    color: "#34D399",
    icon: ShoppingBag,
    featured: true,
  },

  {
    id: "eventstaffing",
    client: "Event Staffing",
    url: "https://eventstaffing.co.uk/",
    industry: "Events",
    service: "Full-Stack Development",
    year: "2023",
    headline: "Connecting organizers with event staff",
    description:
      "Designed intuitive interfaces and efficient backend systems for Event Staffing — a platform connecting organizers with crew.",
    longDescription:
      "Contributed as a member of the development team for Event Staffing, building a platform for connecting event organizers with staff. Worked on designing intuitive user interfaces and implementing efficient backend systems, facilitating seamless coordination for events.",
    role: ["UI / UX", "Backend Engineering", "Full-Stack"],
    tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    cover: "/work/eventstaffing/cover.jpg",
    color: "#FCD34D",
    icon: Users,
  },

  {
    id: "cancelo",
    client: "Cancelo.io",
    url: "https://cancelo.io/",
    industry: "SaaS",
    service: "Full-Stack Development",
    year: "2023",
    headline: "Subscription management, simplified",
    description:
      "Backend systems and intuitive UI for Cancelo — a subscription management platform that helps users control payments.",
    longDescription:
      "Played a key role in creating Cancelo, a subscription management platform. Contributed to building efficient backend systems and intuitive user interfaces, enabling users to easily manage their subscriptions and payments.",
    role: ["Backend Engineering", "Payments", "Frontend"],
    tech: ["React", "Node.js", "Stripe", "TypeScript", "PostgreSQL"],
    cover: "/work/cancelo/cover.jpg",
    color: "#FB7185",
    icon: CreditCard,
    featured: true,
  },

  {
    id: "assemble",
    client: "Assemble",
    url: "https://assemble.fyi/",
    industry: "SaaS",
    service: "Full-Stack Development",
    year: "2023",
    headline: "Collaborative workspace for remote teams",
    description:
      "Built intuitive UI and real-time collaboration features for Assemble's remote-team workspace platform.",
    longDescription:
      "As part of the development team for Assemble, helped create a collaborative workspace platform tailored for remote teams. Worked on building intuitive user interfaces and implementing seamless communication features, facilitating efficient collaboration among team members.",
    role: ["Frontend Engineering", "Real-time Collaboration", "UI / UX"],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "WebSocket"],
    cover: "/work/assemble/cover.jpg",
    color: "#818CF8",
    icon: Layers,
    featured: true,
  },
];

export const INDUSTRIES = [
  "All",
  "SaaS",
  "Fintech",
  "Marketing",
  "E-commerce",
  "Events",
] as const;
