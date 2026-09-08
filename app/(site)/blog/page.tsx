import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.blog;

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogList posts={posts} />;
}
