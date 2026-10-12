import { renderToString } from "react-dom/server";
import Home from "../app/page";
import ArticlePage from "../app/article-page";
import { ArticleMarkdown } from "../app/article-markdown";
import { profile } from "../app/profile";
import type { Article, Language } from "../app/article-types";
export function renderHome(lang: Language, base: string) {
  return renderToString(
    <Home
      initialLanguage={lang}
      pagesBase={base}
      assetsBase={base}
      contactEndpoint={profile.contactEndpoint}
      inboxHref={profile.inbox}
    />,
  );
}
export function renderArticle(article: Article, base: string) {
  const bodyHtml = renderToString(
    <ArticleMarkdown article={article} base={base} />,
  );
  return {
    markup: renderToString(
      <ArticlePage article={article} bodyHtml={bodyHtml} base={base} />,
    ),
    bodyHtml,
  };
}
export { profile };
