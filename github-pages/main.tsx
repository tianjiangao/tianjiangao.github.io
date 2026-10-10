import { hydrateRoot } from "react-dom/client";
import Home from "../app/page";
import { profile } from "../app/profile";
import type { Article, Language } from "../app/article-types";
import "../app/globals.css";
const page = JSON.parse(document.getElementById("page-data")!.textContent!) as {
  type: "home" | "article";
  lang: Language;
  base: string;
  article?: Article;
  bodyHtml?: string;
};
const root = document.getElementById("root")!;
if (page.type === "article") {
  const { default: ArticlePage } = await import("../app/article-page");
  hydrateRoot(
    root,
    <ArticlePage
      article={page.article!}
      bodyHtml={page.bodyHtml!}
      base={page.base}
    />,
  );
} else {
  hydrateRoot(
    root,
    <Home
      assetsBase={page.base}
      pagesBase={page.base}
      initialLanguage={page.lang}
      contactEndpoint={profile.contactEndpoint}
      inboxHref={profile.inbox}
    />,
  );
}
