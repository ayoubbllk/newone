"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import type { BlogPostMeta } from "@/lib/blog-format";
import { formatBlogDate } from "@/lib/blog-format";

type BlogPreviewClientProps = {
  posts: BlogPostMeta[];
};

export function BlogPreviewClient({ posts }: BlogPreviewClientProps) {
  return (
    <RevealStagger className="mt-12 grid gap-6 md:grid-cols-3">
      {posts.map((post) => (
        <RevealItem key={post.slug} interactive>
          <article className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white">
            <div className="relative mb-0 aspect-[16/9] overflow-hidden bg-navy/5">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <time
                dateTime={post.date}
                className="text-xs uppercase tracking-[0.12em] text-slate-text"
              >
                {formatBlogDate(post.date)}
              </time>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-navy">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-red-accent"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-text">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-all duration-300 hover:gap-2.5 hover:text-red-accent"
              >
                Lire l’article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
