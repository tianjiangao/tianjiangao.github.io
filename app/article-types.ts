export type Language = "zh" | "en";
export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  lang: Language;
  category: string;
  summary: string;
  translationKey?: string;
};
export type Article = ArticleMeta & { body: string };
export function articlePath(post: ArticleMeta, base = "/") {
  return `${base}${post.lang === "en" ? "en/" : ""}writing/${post.slug}/`;
}
