import { listPublishedPosts } from "@/lib/blog";
import ResourcesClient from "./ResourcesClient";

// ISR: served from edge cache, regenerated on demand every 60s. Admin edits
// also trigger revalidatePath("/resources") in lib/blog.ts so changes appear
// without waiting for the next revalidation tick.
export const revalidate = 60;

export default async function ResourcesPage() {
  const posts = await listPublishedPosts();
  return <ResourcesClient posts={posts} />;
}
