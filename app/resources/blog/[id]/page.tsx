import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { db } from "@/lib/db";
import { getPostBySlug, listPublishedPosts } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";
import { ArrowLeft } from "lucide-react";

const SITE_URL = "https://igknight.tech";

// Force dynamic rendering — DB-backed content can change between requests.
export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

/**
 * Per-article SEO metadata. Reads from the DB.
 */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getPostBySlug(id);

  if (!article) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/resources/blog/${article.slug}`;
  const isoDate = article.rawDate.toISOString();

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      article.category,
      "engineering blog",
      "software development",
      article.author,
      "igknight tech",
    ],
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [article.author],
      tags: [article.category],
      siteName: "Igknight Tech",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      creator: "@igknighttech",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const article = await getPostBySlug(id);

  if (!article) {
    return (
      <>
        <Navbar />
        <NotFoundBody />
        <Footer />
      </>
    );
  }

  // Pull every published slug to compute prev/next, related, and the index counter.
  const all = await listPublishedPosts();
  const idx = all.findIndex((p) => p.slug === article.slug);
  const totalCount = all.length;
  const prev = all[(idx - 1 + totalCount) % totalCount];
  const next = all[(idx + 1) % totalCount];
  const related = all.filter((p) => p.slug !== article.slug).slice(0, 3);

  // Increment view-style tasks could go here too. For now, just structured data:

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: [
      {
        "@type": "Person",
        name: article.author,
        jobTitle: article.authorRole,
        affiliation: {
          "@type": "Organization",
          name: "Igknight Tech",
          url: SITE_URL,
        },
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Igknight Tech",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: article.rawDate.toISOString(),
    dateModified: article.rawDate.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/resources/blog/${article.slug}`,
    },
    articleSection: article.category,
    keywords: [article.category, "Igknight Tech", article.author].join(", "),
    inLanguage: "en-US",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/resources` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/resources/blog/${article.slug}`,
      },
    ],
  };

  // Touch the unused import to silence the lint warning if any. (Drop later.)
  void db;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <BlogPostClient
        article={article}
        idx={idx}
        totalCount={totalCount}
        prev={prev}
        next={next}
        related={related}
      />
    </>
  );
}

function NotFoundBody() {
  return (
    <div className="min-h-[60vh] bg-white flex items-center justify-center text-center px-5">
      <div>
        <div className="text-slate-400 text-sm font-bold uppercase tracking-[0.22em]">
          404 · Not found
        </div>
        <h1 className="mt-3 text-slate-900 text-4xl font-extrabold tracking-tight">
          Article not found
        </h1>
        <p className="mt-3 text-slate-500 max-w-md mx-auto">
          We may have moved or retired this piece. Browse the rest of the
          writing instead.
        </p>
        <Link
          href="/resources"
          className="mt-6 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>
      </div>
    </div>
  );
}
