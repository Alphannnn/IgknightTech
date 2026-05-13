export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  authorAvatar: { from: string; to: string };
  date: string;
  readTime: string;
  /**
   * Optional featured-image path (e.g. "/blog/<id>.jpg").
   * When present, BlogCover renders this on top of the generative fallback.
   * When the file is missing or the field is omitted, the generative cover
   * shows through automatically.
   */
  image?: string;
  featured?: boolean;
  body: { heading?: string; paragraphs: string[] }[];
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
    authorRole: "Co-founder · CEO",
    authorAvatar: { from: "#7BB6FF", to: "#3B82F6" },
    date: "Mar 18, 2025",
    readTime: "12 min read",
    image: "/blog/no-microservices.jpg",
    featured: true,
    body: [
      {
        paragraphs: [
          "In 2019 we split our flagship platform into seventeen services because that was the consensus answer. We deployed independently, owned our own data, and wore the badge proudly. Three years later we were spending more engineering hours on cross-service plumbing than on customer features. The math was decisive.",
          "What we got wrong wasn't the technology — service meshes work, eventual consistency is real, and async messaging is fine. What we got wrong was the cost of distributed reasoning. Every feature now needed a sequence diagram. Every incident needed three engineers in three repos. Every onboarding cost a week of context.",
        ],
      },
      {
        heading: "The modular monolith, ten years late",
        paragraphs: [
          "Today we default to a modular monolith. One repo, one deploy, strict internal module boundaries enforced at build time. We extract a service when a clear physical reason demands it — different scale, different language, different uptime profile — and not before.",
          "The trade-off is that you have to be disciplined about modules. We use static analysis to prevent cross-module imports outside published APIs, treat database access the same way, and review architecture every quarter. Once that discipline is real, the productivity delta over micro-services is enormous.",
        ],
      },
      {
        heading: "What we'd tell our 2019 selves",
        paragraphs: [
          "If you're tempted to split, ask whether you're solving an organizational problem, a scaling problem, or a fashion problem. Only the first two justify the cost. For the third, fix your modules first — almost every team can buy two more years on a clean monolith if they take encapsulation seriously.",
        ],
      },
    ],
  },
  {
    id: "migrating-4m-users",
    title: "Migrating 4M users with zero downtime: a postmortem",
    excerpt:
      "Nine months, 180 services, and exactly zero customer-visible incidents. The technical and operational playbook from the Aurora Networks migration.",
    category: "Infrastructure",
    categoryColor: "#67E8F9",
    author: "Hiroshi Tanaka",
    authorRole: "Co-founder · CTO",
    authorAvatar: { from: "#67E8F9", to: "#0891B2" },
    date: "Mar 11, 2025",
    readTime: "18 min read",
    image: "/blog/migrating-4m-users.jpg",
    body: [
      {
        paragraphs: [
          "Aurora Networks runs a regional internet backbone serving four million daily users. Their primary data center was reaching end-of-life and their SLA didn't allow a single second of downtime — not even for thirty seconds. We had nine months. The simplest plan didn't work, the second plan didn't work, and the plan that did work was almost embarrassingly conservative.",
        ],
      },
      {
        heading: "Inventory before architecture",
        paragraphs: [
          "We spent six weeks cataloguing every workload, dependency, SLA, and dataset. The point wasn't a diagram. The point was a confidence score — for each service, how sure were we about its real upstream and downstream connections? Anything below 80% confidence got an engineer to find out. By the end we had a map nobody had ever seen before, including Aurora's own SRE team.",
          "A useful surprise: 30% of the services we found were dead. Migrating them would have cost months. Deleting them cost a Slack thread.",
        ],
      },
      {
        heading: "Blue-green by region, slow by design",
        paragraphs: [
          "We stood up a parallel AWS environment with Terraform, then moved traffic five percent at a time using DNS and BGP. Each shift had a four-hour soak period. Each soak had a one-click rollback wired and tested. Most days we shifted nothing — we waited.",
          "The legacy stack stayed warm for twelve weeks past final cutover. The cost was real. The peace of mind it bought our oncall team made every dollar worth it.",
        ],
      },
      {
        heading: "Numbers",
        paragraphs: [
          "Nine months. 180 services. Zero customer-visible incidents. The annualized cost savings paid back our engagement before the year was out. The team Aurora now runs against the platform is two engineers smaller and on-call rotations are half what they were.",
        ],
      },
    ],
  },
  {
    id: "hipaa-2025",
    title: "Building HIPAA-compliant systems in 2025",
    excerpt:
      "What the regulation actually requires, what auditors actually check, and the architecture choices that make the difference between a clean pass and three months of remediation.",
    category: "Compliance",
    categoryColor: "#34D399",
    author: "Priya Kothari",
    authorRole: "Healthcare Engineering Lead",
    authorAvatar: { from: "#34D399", to: "#059669" },
    date: "Mar 4, 2025",
    readTime: "15 min read",
    image: "/blog/hipaa-2025.jpg",
    body: [
      {
        paragraphs: [
          "HIPAA isn't a checklist. Auditors don't show up with a clipboard of yes-or-no questions. They show up with a notebook and a curiosity about whether your engineers actually understand what they're protecting. The architectural decisions matter more than the documentation — but only if both are real.",
        ],
      },
      {
        heading: "What the regulation actually requires",
        paragraphs: [
          "HIPAA has three rules of interest to engineers: Privacy, Security, and Breach Notification. Most of what you read online treats these as procedural. They are not. The Security Rule alone has 22 implementation specifications, and 13 of them are 'addressable' — which doesn't mean optional, it means you have to document why your approach is at least as good.",
          "We build a control-by-control mapping for every client engagement. Each control lists the implementation, the responsible system, and the test that proves it works. Auditors love this document because it makes their job easy. Clients love it because it forces clarity early.",
        ],
      },
      {
        heading: "Architecture choices that pay back",
        paragraphs: [
          "Default to HIPAA-eligible managed services. AWS, GCP, and Azure all publish lists. Using anything outside the list requires a Business Associate Agreement with that vendor — a months-long conversation you can usually avoid by picking differently.",
          "Isolate PHI workloads in their own VPC, with their own IAM boundaries, audit logs that go to a separate account, and encryption keys you control. Network topology is half the security review.",
        ],
      },
      {
        heading: "The audit week",
        paragraphs: [
          "Internal pen test in week 14. External in week 16. Both done by people who have never seen the codebase. Findings get triaged into 'fix before launch' and 'fix in next sprint.' Our average engagement clears the external audit with zero must-fix findings — and the secret is just that we built it right the first time.",
        ],
      },
    ],
  },
  {
    id: "rsc-in-prod",
    title: "The state of React Server Components in production",
    excerpt:
      "After 18 months of shipping RSC at scale, here's where it shines, where it hurts, and the patterns we've evolved to handle the rough edges.",
    category: "Frontend",
    categoryColor: "#A78BFA",
    author: "Marcus Holloway",
    authorRole: "Head of Design",
    authorAvatar: { from: "#A78BFA", to: "#7C3AED" },
    date: "Feb 25, 2025",
    readTime: "10 min read",
    image: "/blog/rsc-in-prod.jpg",
    body: [
      {
        paragraphs: [
          "We've been shipping React Server Components in production since they hit stable. After eighteen months and a dozen projects, RSC is real — but it's also nothing like the marketing. The teams that succeed treat it as a serious architectural change. The teams that fail bolt it onto their existing app and wonder why nothing works the way the docs implied.",
        ],
      },
      {
        heading: "Where RSC genuinely shines",
        paragraphs: [
          "Content-heavy pages with little interactivity are the obvious win. Marketing sites, documentation, dashboards where most components are read-only — RSC reduces bundle size by 40 to 70% in our typical project, and the data-fetching colocation is a real productivity gain.",
          "Long lists with mixed data sources are the less-obvious win. Server components can fetch from three databases in parallel, render, and stream — without the client knowing or caring. That pattern was awkward in every prior React era.",
        ],
      },
      {
        heading: "Where it hurts",
        paragraphs: [
          "The component tree's server/client boundary leaks into your code. Once you accept that, the rest is fine. If you fight it — passing functions across the boundary, trying to share state — you'll spend a week per attempt before you give up and refactor.",
          "Third-party library compatibility is the second sharp edge. Anything that uses React Context, hooks, or browser APIs needs a 'use client' wrapper. We maintain a small internal shim layer for the worst offenders.",
        ],
      },
      {
        heading: "Patterns we've evolved",
        paragraphs: [
          "Keep the server component shell as thin as possible. Push interactivity into leaf client components. Treat 'use client' as a deliberate boundary, not a workaround. And ship a measurable bundle-size budget — RSC's biggest payoff is the kilobytes you don't ship, but only if you watch them.",
        ],
      },
    ],
  },
  {
    id: "trust-in-fintech",
    title: "Designing for trust in fintech mobile apps",
    excerpt:
      "Trust is built in microinteractions — confirmation flows, error states, and the second-and-a-half between tap and transaction. A field guide from rebuilding Vyra.",
    category: "Design",
    categoryColor: "#FCD34D",
    author: "James Whitfield",
    authorRole: "Mobile Engineering Lead",
    authorAvatar: { from: "#FCD34D", to: "#D97706" },
    date: "Feb 18, 2025",
    readTime: "9 min read",
    image: "/blog/trust-in-fintech.jpg",
    body: [
      {
        paragraphs: [
          "Trust in a fintech app is built in the second-and-a-half between tap and confirmation. Users won't read your privacy policy, won't notice your SOC 2 badge, and won't be impressed by your animations. What they will notice — every time — is the moment a transaction lands. If that moment feels firm and predictable, they trust you. If it feels uncertain, they don't.",
        ],
      },
      {
        heading: "Confirmation as a design problem",
        paragraphs: [
          "A confirmation isn't a checkmark — it's an act of legibility. When Vyra moved money, we showed the recipient, the exact amount, the source account, and the projected balance, all on one tap. No interstitial. No 'processing.' The transaction either committed in 800ms or it didn't, and the screen reflected reality without theater.",
          "The fastest path to trust is making the system never lie. If a transaction is queued, say so. If a balance is stale, say so. Users forgive latency. They don't forgive ambiguity.",
        ],
      },
      {
        heading: "Error states are the product",
        paragraphs: [
          "Most fintech apps spend 90% of design energy on the happy path and 5% on errors. Reverse the ratio. The user's perception of safety is built almost entirely from how the app behaves when something goes wrong — a declined card, a flagged transfer, a regional outage.",
          "Every error state in Vyra has a named owner on the design team. Every error state is exercised in the launch checklist. Every error state has a screenshot in the user research deck. It's the difference between an app users tolerate and an app users defend.",
        ],
      },
      {
        heading: "What we shipped",
        paragraphs: [
          "Twelve weeks of redesign — most of which was deletion. The biggest single change was removing the confirmation interstitial. Conversion on transfers jumped 14% within a week of launch, and support tickets about 'did my transfer go through?' fell by 73%.",
        ],
      },
    ],
  },
  {
    id: "ml-30-days",
    title: "How we ship ML to production in 30 days",
    excerpt:
      "The infrastructure, the team structure, and the discipline that turns 14 months of notebook research into models serving real traffic in a month.",
    category: "AI",
    categoryColor: "#F472B6",
    author: "David Park",
    authorRole: "Head of AI",
    authorAvatar: { from: "#A78BFA", to: "#7C3AED" },
    date: "Feb 4, 2025",
    readTime: "14 min read",
    image: "/blog/ml-30-days.jpg",
    body: [
      {
        paragraphs: [
          "Most ML teams ship one model in their first year. The notebooks pile up. The models work in eval. Production is a perpetual next quarter. We've helped a dozen teams break this cycle — and the answer isn't better engineers, it's a smaller first goal and a sharper definition of done.",
        ],
      },
      {
        heading: "The thirty-day rule",
        paragraphs: [
          "We give every ML engagement a fixed budget: thirty days from kickoff to a model serving real traffic behind a feature flag. Not a perfect model. Not the model the team is most excited about. The model that's most likely to land cleanly inside thirty days.",
          "The constraint forces decisions. You pick a smaller scope. You skip the framework debate. You accept that 'baseline + observability' beats 'best in class without monitoring' every time. Once the first model lands, the second is twice as fast — because the platform is already there.",
        ],
      },
      {
        heading: "What goes in the platform",
        paragraphs: [
          "Training: Airflow or Prefect, one of them, picked by the team's existing skills. Model registry: MLflow, even if you outgrow it later. Inference: a service behind your standard API gateway, not a custom stack. Observability: latency, drift, per-tenant cost — from day one.",
          "Anything cleverer than this is a debt your second model can pay for. The first model just needs to ship.",
        ],
      },
      {
        heading: "Why teams resist",
        paragraphs: [
          "Most resistance to the thirty-day rule comes from research-trained ML engineers who associate 'shipping early' with 'shipping bad.' The honest counter is that a baseline model in production teaches you more in a week than a perfect model in a notebook teaches you in a quarter. Every team we've worked with — without exception — has agreed in retrospect.",
        ],
      },
    ],
  },

  /* ───────────────────────── New articles below ───────────────────────── */

  {
    id: "estimating-software",
    title: "How we estimate software projects (and why most estimates are wrong)",
    excerpt:
      "Every estimate is wrong. The useful ones are wrong in known ways. A practical method we've refined across 50+ engagements — and the failure modes we learned to spot first.",
    category: "Engineering",
    categoryColor: "#7BB6FF",
    author: "Sarah Chen",
    authorRole: "Co-founder · CEO",
    authorAvatar: { from: "#7BB6FF", to: "#3B82F6" },
    date: "Mar 25, 2025",
    readTime: "11 min read",
    image: "/blog/estimating-software.jpg",
    body: [
      {
        paragraphs: [
          "Every software estimate is wrong. The useful estimates are wrong in known directions — early, late, scoped wrong, dependent on a fact you haven't checked yet — and they say so in the estimate itself. The useless estimates pretend to be facts.",
          "Over 50+ engagements we've refined a small set of practices that reliably produce estimates we're proud to sign up to. None of them are clever. All of them are uncomfortable to follow at first.",
        ],
      },
      {
        heading: "Estimate at the seam, not at the surface",
        paragraphs: [
          "The natural way to estimate is to read the spec, picture the work, and write down a number. This is wrong because the spec describes the destination, not the road. We estimate at the seam — the boundary between systems that have to talk to each other. Authentication crosses a seam. Reporting that joins two data sources crosses a seam. A button that just writes to your own database does not.",
          "Seams are where estimates rot, because they involve other teams, other timezones, partner APIs, legal review, security review, and at least one person you haven't met yet. List the seams first, estimate them at twice what feels reasonable, then estimate the rest of the work at half what feels reasonable. The total comes out closer to right than either approach alone.",
        ],
      },
      {
        heading: "Three numbers, not one",
        paragraphs: [
          "We deliver every estimate as three numbers: a 50% confidence date, an 80% confidence date, and a 'this is when we get worried' date. The 50% number is the marketing date — we say it out loud but commit to it carefully. The 80% number is the contract date — it's what clients build their plans around. The third number is what triggers the conversation about scope reduction.",
          "Three numbers force honesty. A single number always reads as a commitment, even when you intend it as a guess. Three numbers cannot read as a single commitment, so the client and the team can both be honest about what's known and what isn't.",
        ],
      },
      {
        heading: "The three-day reality check",
        paragraphs: [
          "Before we sign an estimate over six weeks long, we spend three days building the riskiest single piece of it. Not a prototype, not a spike — a real, deployable slice. If the riskiest piece comes together in three days, the estimate is roughly right. If it doesn't, the estimate is wrong, and we'd rather know that now than at the project's halfway point.",
          "Clients sometimes resist this — three days of paid work feels like overhead. The math is decisive: a three-day reality check has saved us from a multi-month overrun in roughly one in four engagements. The clients who said no to the check have all, without exception, regretted it.",
        ],
      },
      {
        heading: "When to refuse to estimate",
        paragraphs: [
          "Some asks are unestimable. 'How long to rebuild our entire platform' is unestimable in any honest way. 'How long to add a checkout flow that matches Shopify's' is unestimable until you've seen the existing code. We've learned to refuse — politely but firmly — when a client wants a number for something that's still a wish.",
          "The right response is to scope the work into something estimable, and then estimate that. 'I can give you a number for the discovery phase that will produce the number you actually want.' This sounds like a hedge. In practice, it's the only honest path. Every client who has accepted this answer has saved themselves a quarter or more.",
        ],
      },
    ],
  },

  {
    id: "plain-sql",
    title: "The unreasonable effectiveness of plain SQL",
    excerpt:
      "ORMs are fine. Until they aren't. After a decade of building data layers on every framework we could find, we keep coming back to plain SQL — and the patterns that make it pleasant.",
    category: "Engineering",
    categoryColor: "#67E8F9",
    author: "Hiroshi Tanaka",
    authorRole: "Co-founder · CTO",
    authorAvatar: { from: "#67E8F9", to: "#0891B2" },
    date: "Mar 21, 2025",
    readTime: "13 min read",
    image: "/blog/plain-sql.jpg",
    body: [
      {
        paragraphs: [
          "We've shipped projects on Rails Active Record, Django ORM, SQLAlchemy, Prisma, Drizzle, TypeORM, Sequelize, and a few I've already forgotten. Every one of them was lovely for the first six months. Every one of them, by year two, was the part of the codebase nobody wanted to touch.",
          "Today we default to plain SQL with a thin migration layer and a small set of conventions. This isn't an ORM-bashing post — ORMs are real engineering that solve real problems. It's a post about what we kept learning the hard way and finally decided to stop relearning.",
        ],
      },
      {
        heading: "Where ORMs go wrong at scale",
        paragraphs: [
          "ORMs optimize for the common case: a single table, a single record, written and read by a single language runtime. They get worse at every step away from that. Joins across more than two tables become awkward. Aggregations require escaping into raw SQL anyway. Performance debugging requires reading both your code and the ORM's generated query, which is twice the cognitive cost of just reading SQL.",
          "The break is rarely sudden. It's a slow accumulation of small workarounds. A `.raw()` here. A view added in a migration to hide a complex query. A custom finder that bypasses the ORM cache. By year three you have an ORM-shaped wrapper around what is, functionally, plain SQL — but without the legibility.",
        ],
      },
      {
        heading: "The pattern we settled on",
        paragraphs: [
          "Plain SQL queries live in `.sql` files next to the module that uses them. A tiny runtime function reads the file, substitutes parameters safely, and runs it. Type information for the result is generated from the database schema once per build — we use `pg-typed` for Postgres, but any schema-aware codegen works. The application code calls a typed function. The SQL is the file.",
          "The result is a query layer that's visible at the file system level. You can `grep` for any column name and find every place it's referenced. You can read a query without leaving your editor. New engineers don't have to learn the ORM's particular dialect, only SQL — which they'll need anyway.",
        ],
      },
      {
        heading: "Migrations are non-negotiable",
        paragraphs: [
          "Plain SQL doesn't mean plain everything. Migrations need real tooling — versioned, ordered, with up and down paths, run automatically in CI against a real Postgres. We use `node-pg-migrate` for Node projects and `goose` for Go ones. Both work the way you'd hope. The migration tool is the one place where a small abstraction earns its keep, because schema drift is the bug class that ruins quarters.",
          "We also commit to a rule: every migration must be reviewable as a standalone document. If you can't understand what a migration does by reading just the migration, it's too big. Small migrations land daily. Schema changes never block deploys.",
        ],
      },
      {
        heading: "What you give up",
        paragraphs: [
          "You lose the ability to swap databases trivially. We've never used this ability in production, but plenty of teams do. You lose the ability to lazily load relationships — but you also lose the bugs that come from accidental lazy loading. You lose some of the comfort of an active community of ORM users with the same problems as you. In return you get queries that are exactly what you wrote, performance that's exactly what your database can do, and a layer that ages well.",
          "We don't recommend plain SQL for everyone. Small teams with simple data, junior teams without a senior database engineer, projects with genuinely uncertain schema — ORMs probably win. For everything else, give plain SQL a fair shake. You may surprise yourself.",
        ],
      },
    ],
  },

  {
    id: "embarrassingly-simple-ml",
    title: "Why your first ML model should be embarrassingly simple",
    excerpt:
      "The first model in production teaches you more in a week than a perfect model in a notebook teaches you in a quarter. A practical case for shipping something terrible — on purpose — first.",
    category: "AI",
    categoryColor: "#F472B6",
    author: "David Park",
    authorRole: "Head of AI",
    authorAvatar: { from: "#A78BFA", to: "#7C3AED" },
    date: "Mar 14, 2025",
    readTime: "9 min read",
    image: "/blog/embarrassingly-simple-ml.jpg",
    body: [
      {
        paragraphs: [
          "Almost every ML team we've worked with shares the same pathology: they have a model that's 6% better than the baseline in evaluation, and zero models in production. We've helped a dozen teams fix this. The fix is always the same, and it always feels wrong to the team for the first week.",
          "The fix is to ship the worst-performing model that meets the absolute minimum bar of usefulness, route real traffic to it, and treat everything you learn next as the actual project. Eighteen months later, the teams that did this have working ML platforms. The teams that didn't are still polishing notebooks.",
        ],
      },
      {
        heading: "What 'embarrassingly simple' looks like",
        paragraphs: [
          "For most production ML tasks, your first model should be one of: a simple logistic regression, a small XGBoost ensemble, an off-the-shelf LLM with a basic prompt, or — and this is the one people resist most — a hand-written rule. Yes, a rule. If your task is 'flag the suspicious transactions,' a hand-written rule that flags transactions over a certain amount from a new device is a perfectly reasonable first model. It will catch more fraud than zero models do.",
          "The point isn't accuracy. The point is to get the operational layer in place: data pipelines that move features to the model, observability that catches drift, a retraining loop you can trigger on demand, a rollback path, a way to compare versions. None of this exists in a notebook. All of it has to exist before any model is genuinely 'in production.'",
        ],
      },
      {
        heading: "What you learn that the notebook can't tell you",
        paragraphs: [
          "Real traffic teaches you what your offline evaluation can't: which features have lower quality than you expected, which inputs your model has never seen before, which users are gaming whatever signal you're using, where the long tail of weird-but-legitimate behavior lives. Every one of these is invisible in a curated eval set.",
          "Your first model exists to surface these surprises while the team's emotional investment in the model is still low. When the surprises are bigger than your model can handle — and they will be — you can swap the model out without anyone getting precious about it. After the third or fourth model, your team has internalized the operational discipline. That's when you start chasing accuracy.",
        ],
      },
      {
        heading: "The trap of waiting",
        paragraphs: [
          "The strongest case against shipping early is 'we'll embarrass ourselves with a bad model.' This is almost always a misread of the audience. Internal users tolerate a bad model that's improving more than they tolerate a long silence. External users almost never notice the accuracy of a model — they notice the latency, the explanation, and whether it's useful for their task. None of those are improved by another week in a notebook.",
          "We have one rule for any ML engagement: a model serving real traffic by week four, behind a feature flag, observable, and rollbackable. Not better than the alternative. Just serving. Everything else flows from that constraint.",
        ],
      },
    ],
  },

  {
    id: "design-tokens-contracts",
    title: "Design tokens as engineering contracts",
    excerpt:
      "Design systems fail at hand-off. Tokens — treated as a versioned contract between design and engineering — fix that. How we structure them and the conventions that keep them honest.",
    category: "Design",
    categoryColor: "#FCD34D",
    author: "Marcus Holloway",
    authorRole: "Head of Design",
    authorAvatar: { from: "#A78BFA", to: "#7C3AED" },
    date: "Mar 7, 2025",
    readTime: "10 min read",
    image: "/blog/design-tokens-contracts.jpg",
    body: [
      {
        paragraphs: [
          "Most design systems work fine inside Figma and unravel the moment they cross into code. The same shade of blue appears as `#4F9EF8` in one component and `rgb(80, 158, 248)` in another. A spacing scale defined as 4-8-12-16 in the design file shows up in CSS as `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, but also as `4px`, `8px`, and a stray `0.4em` someone wrote in a hurry.",
          "Design tokens solve this — but only when they're treated as a versioned contract between design and engineering, not as a documentation artifact. The teams that get the most out of tokens treat them with the same discipline as an API.",
        ],
      },
      {
        heading: "What 'contract' means in practice",
        paragraphs: [
          "A design token is a contract if three things are true. First, both teams agree on the source of truth — there's one place tokens are defined, and changes anywhere else are bugs. Second, both teams agree on the naming. `color.brand.primary` means the same thing in Figma and in code. Third, changes go through versioning. You can't rename a token without considering what it breaks, the same way you can't rename an API endpoint without considering who calls it.",
          "Most teams stop at the first one. They publish tokens once, use them inconsistently, and call it a system. The discipline of treating tokens as an API — with deprecation paths, change reviews, and impact analysis — is what makes them load-bearing instead of decorative.",
        ],
      },
      {
        heading: "The structure we settled on",
        paragraphs: [
          "We group tokens into three tiers. Primitives are the raw values: `color.blue.500 = #4F9EF8`, `space.4 = 16px`. Semantics are the meaningful aliases: `color.brand.primary = color.blue.500`, `space.section = space.16`. Components consume only semantics, never primitives. This three-tier structure means we can rebrand by changing the semantic layer, retune the palette by changing primitives, or both — without rewriting components.",
          "The tooling is boring on purpose. We export from Figma to a JSON file, run it through Style Dictionary, and emit CSS variables, JS/TS exports, and a Figma library file in one build step. The export runs in CI on every merge. The contract is enforced because the build fails if a token is referenced that doesn't exist.",
        ],
      },
      {
        heading: "The hardest part is renaming",
        paragraphs: [
          "Tokens go wrong at renaming time. Designers want better names, engineers want stable ones. The compromise we've found works: token names are append-only by default. A rename creates a new token, marks the old one deprecated with a target removal date, and we hold the old name for at least one major release.",
          "This is annoying. It's also the only way to maintain the contract. Every team that's tried 'just rename the tokens, we'll fix the code later' has ended up with broken hand-offs and a design system the engineers stopped trusting. The two-name period costs nothing. The trust, once lost, costs months to rebuild.",
        ],
      },
      {
        heading: "When tokens stop being enough",
        paragraphs: [
          "Tokens handle color, spacing, type, radii, and motion durations well. They handle component-level decisions badly. A button has more state than tokens can express — focus rings, disabled treatments, loading states, icon spacing rules. These belong in components, not tokens.",
          "The trap is to keep adding tokens until they're a worse component library. The discipline is to know when to stop: tokens describe the alphabet, components describe the words. If you find yourself adding `color.button.primary.hover.borderTopRadius`, you've crossed the line. Take it back to the component.",
        ],
      },
    ],
  },
];
