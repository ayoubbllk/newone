import type { MDXComponents } from "mdx/types";

export const blogMdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-navy"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-mt-28 font-display text-xl font-semibold tracking-tight text-navy"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-4 text-base leading-relaxed text-slate-text" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-text"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-text"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-navy" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-red-accent underline-offset-4 hover:underline"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-amber-tech bg-offwhite px-5 py-4 text-navy"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm text-slate-text"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="border-b border-navy/20" {...props} />,
  th: (props) => (
    <th className="px-3 py-2 font-display font-semibold text-navy" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-navy/10 px-3 py-2 align-top" {...props} />
  ),
};
