export type BlogPostMeta = {
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  slug: string;
  readingMinutes: number;
};

export function formatBlogDate(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat("fr-DZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
