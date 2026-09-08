import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { renderBlogMdx } from "@/components/blog/render-mdx";
import { Button } from "@/components/ui/button";
import { formatBlogDate, getAllPosts, getPostBySlug } from "@/lib/blog";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article introuvable" };

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: `/blog/${post.meta.slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      images: post.meta.cover ? [{ url: post.meta.cover }] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const mdx = await renderBlogMdx(post.content);

  return (
    <article className="bg-offwhite pb-20">
      <div className="bg-navy text-navy-foreground">
        <div className="container section-header py-10 sm:py-14">
          <nav
            aria-label="Fil d’Ariane"
            className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-navy-foreground/65"
          >
            <Link href="/" className="hover:text-navy-foreground">
              Accueil
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/blog" className="hover:text-navy-foreground">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-navy-foreground/90 line-clamp-1">
              {post.meta.title}
            </span>
          </nav>

          <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
            Article
          </p>
          <h1 className="mt-3 text-balance text-2xl font-bold tracking-tight text-navy-foreground sm:text-4xl lg:text-5xl">
            {post.meta.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-navy-foreground/75 sm:text-base">
            {post.meta.excerpt}
          </p>
          <p className="mt-5 text-sm text-navy-foreground/60">
            <time dateTime={post.meta.date}>
              {formatBlogDate(post.meta.date)}
            </time>
            {" · "}
            {post.meta.readingMinutes} min de lecture
          </p>
        </div>
      </div>

      <div className="container">
        <div className="relative mx-auto mt-0 aspect-[21/9] max-w-4xl overflow-hidden bg-navy/5 sm:-mt-6 sm:border sm:border-navy/10">
          <Image
            src={post.meta.cover}
            alt={post.meta.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Button asChild variant="outline" size="sm" className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
          </Button>

          <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-slate-text prose-a:text-red-accent prose-strong:text-navy prose-li:text-slate-text prose-blockquote:border-amber-tech prose-blockquote:text-navy">
            {mdx}
          </div>

          <div className="mt-12 border-t border-navy/10 pt-8">
            <Button asChild variant="cta">
              <Link href="/contact">Discuter de votre projet</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
