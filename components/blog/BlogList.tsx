"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { formatBlogDate } from "@/lib/blog-format";

export type BlogCardPost = {
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  slug: string;
  readingMinutes: number;
};

type BlogListProps = {
  posts: BlogCardPost[];
};

export function BlogList({ posts }: BlogListProps) {
  return (
    <section className="bg-offwhite section-y">
      <div className="container">
        <Reveal className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
            Blog
          </p>
          <h1 className="mt-3 text-balance text-3xl sm:text-4xl lg:text-5xl">
            Repères techniques pour le BTP
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-text sm:text-base">
            Articles pour promoteurs, entrepreneurs et particuliers : étude de
            sol, béton, pressiomètre et réparation de fissures.
          </p>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <article className="group flex h-full flex-col overflow-hidden border border-navy/10 bg-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-navy/5"
                >
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <time
                    dateTime={post.date}
                    className="text-xs uppercase tracking-[0.12em] text-slate-text"
                  >
                    {formatBlogDate(post.date)} · {post.readingMinutes} min
                  </time>
                  <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-navy">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-red-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-text">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 text-sm font-semibold text-navy hover:text-red-accent"
                  >
                    Lire l’article
                  </Link>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
