import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { formatBlogDate, type BlogPostMeta } from "@/lib/blog-format";

export { formatBlogDate, type BlogPostMeta };

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  slug: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parsePostFile(filename: string): {
  meta: BlogPostMeta;
  content: string;
} | null {
  const fullPath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const title = String(data.title ?? "").trim();
  const date = String(data.date ?? "").trim();
  const excerpt = String(data.excerpt ?? "").trim();
  const cover = String(data.cover ?? "").trim();
  const slug = String(data.slug ?? path.parse(filename).name).trim();

  if (!title || !date || !excerpt || !slug) {
    return null;
  }

  return {
    meta: {
      title,
      date,
      excerpt,
      cover: cover || "/designe/banner.png",
      slug,
      readingMinutes: estimateReadingMinutes(content),
    },
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  ensureBlogDir();

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => parsePostFile(file))
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .map((post) => post.meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  ensureBlogDir();

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  for (const file of files) {
    const parsed = parsePostFile(file);
    if (parsed?.meta.slug === slug) {
      return parsed;
    }
  }

  return null;
}
