import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogPreviewClient } from "@/components/home/BlogPreviewClient";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="section-light section-grain section-y relative">
      <div className="container relative z-10">
        <div className="section-header flex flex-col items-center gap-6">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
              Blog
            </p>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl lg:text-4xl">
              Repères techniques pour vos décisions de chantier
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-text sm:text-base">
              Articles rédigés pour les promoteurs, entrepreneurs et maîtres
              d’ouvrage qui veulent comprendre les essais avant de décider.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full shrink-0 sm:w-fit">
            <Link href="/blog">
              Lire le blog
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>

        <BlogPreviewClient posts={posts} />
      </div>
    </section>
  );
}
