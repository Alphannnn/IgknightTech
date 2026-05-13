import { requireAdmin } from "@/lib/auth";
import BlogForm, { type BlogFormInitial } from "../BlogForm";

export default async function NewBlogPostPage() {
  await requireAdmin();

  const initial: BlogFormInitial = {
    slug: "",
    title: "",
    excerpt: "",
    category: "Engineering",
    categoryColor: "#7BB6FF",
    author: "",
    authorRole: "",
    avatarFrom: "#7BB6FF",
    avatarTo: "#3B82F6",
    date: new Date().toISOString().slice(0, 10),
    readTime: "5 min read",
    image: "",
    featured: false,
    status: "draft",
    body: [{ paragraphs: [] }],
  };

  return <BlogForm initial={initial} />;
}
