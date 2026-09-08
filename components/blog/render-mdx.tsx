import { compileMDX } from "next-mdx-remote/rsc";

import { blogMdxComponents } from "@/components/blog/mdx-components";

export async function renderBlogMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: blogMdxComponents,
  });

  return content;
}
