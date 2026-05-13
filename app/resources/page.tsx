import { listPublishedPosts } from "@/lib/blog";
import ResourcesClient from "./ResourcesClient";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const posts = await listPublishedPosts();
  return <ResourcesClient posts={posts} />;
}
