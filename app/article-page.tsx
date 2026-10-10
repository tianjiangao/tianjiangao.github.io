"use client";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { profile } from "./profile";
import { type Article, articlePath } from "./article-types";
import { articles } from "./articles.generated";

export default function ArticlePage({
  article,
  bodyHtml,
  base = "/",
}: {
  article: Article;
  bodyHtml: string;
  base?: string;
}) {
  const [dark, setDark] = useState(false);
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const lang = article.lang,
    home = base + (lang === "en" ? "en/" : "");
  const translation = articles.find(
    (a) =>
      article.translationKey &&
      a.translationKey === article.translationKey &&
      a.lang !== lang,
  );
  useEffect(() => {
    try {
      setDark(localStorage.getItem("tianjian-theme") === "dark");
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("tianjian-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    setToc(
      [
        ...document.querySelectorAll<HTMLElement>(
          ".article-body h2,.article-body h3",
        ),
      ].map((h) => ({ id: h.id, text: h.textContent || "" })),
    );
  }, [article.slug]);
  return (
    <>
      <a className="skip" href="#article">
        {lang === "zh" ? "跳转正文" : "Skip to article"}
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href={home}>
            <span className="wordmark-name">高天健</span>
            <span className="wordmark-latin">tianjiangao</span>
          </a>
          <a className="article-return" href={home + "#writing"}>
            {lang === "zh" ? "← 文章与研究" : "← Writing & research"}
          </a>
          <div className="header-controls">
            {translation && (
              <a
                className="language"
                href={articlePath(translation, base)}
                hrefLang={translation.lang}
              >
                {lang === "zh" ? "EN" : "中文"}
              </a>
            )}
            <button
              className="theme-toggle"
              aria-label={
                lang === "zh" ? "切换明暗主题" : "Toggle light / dark theme"
              }
              aria-pressed={dark}
              onClick={() => setDark(!dark)}
            >
              ◐
            </button>
          </div>
        </div>
      </header>
      <main id="article" className="article-shell">
        <header className="article-heading">
          <div className="article-meta">
            <time dateTime={article.date}>{article.date}</time>
            <span>{article.category}</span>
            <span>{lang === "zh" ? "中文" : "English"}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <span className="article-author">
            {lang === "zh" ? profile.name.zh : profile.name.en}
          </span>
        </header>
        {toc.length > 1 && (
          <details className="article-toc">
            <summary>{lang === "zh" ? "本篇目录" : "On this page"}</summary>
            <nav aria-label={lang === "zh" ? "文章目录" : "Article contents"}>
              {toc.map((h) => (
                <a key={h.id} href={"#" + h.id}>
                  {h.text}
                </a>
              ))}
            </nav>
          </details>
        )}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
        <div className="article-end">
          <a href={home + "#writing"}>
            {lang === "zh" ? "← 返回文章与研究" : "← Back to writing"}
          </a>
          <a href={"mailto:" + profile.email}>
            {lang === "zh" ? "就这篇文章交流 ↗" : "Discuss this article ↗"}
          </a>
        </div>
      </main>
      <footer className="shell footer">
        <span>
          © {new Date().getFullYear()} {profile.name.en}
        </span>
        <a href={home}>{lang === "zh" ? "返回首页" : "Home"}</a>
      </footer>
    </>
  );
}
