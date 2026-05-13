import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPostBySlug } from "@/lib/blog";
import BlogForm, { type BlogFormInitial } from "../BlogForm";

type Params = Promise<{ slug: string }>;

export default async function EditBlogPostPage({ params }: { params: Params }) {
  await requireAdmin();
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const initial: BlogFormInitial = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryColor: post.categoryColor,
    author: post.author,
    authorRole: post.authorRole,
    avatarFrom: post.authorAvatar.from,
    avatarTo: post.authorAvatar.to,
    date: post.rawDate.toISOString().slice(0, 10),
    readTime: post.readTime,
    image: post.image ?? "",
    featured: post.featured,
    status: post.status,
    body: post.body,
  };

  return <BlogForm initial={initial} />;
}
