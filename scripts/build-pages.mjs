import { readFile, writeFile, mkdir, cp, readdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import { readArticles } from "./articles.mjs";
const root = resolve(import.meta.dirname, "..");
const base = process.env.PAGES_BASE || "/";
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base))
  throw new Error("PAGES_BASE must be / or a slash-delimited repository path");
const posts = await readArticles(root, process.env.ARTICLES_DIR);
const temp = resolve(root, ".sites-runtime/pages-render"),
  output = resolve(root, process.env.PAGES_OUT_DIR || "dist-pages");
await build({
  configFile: false,
  root,
  plugins: [react()],
  publicDir: false,
  build: {
    ssr: resolve(root, "github-pages/render.tsx"),
    outDir: temp,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "render.mjs" } },
  },
});
const { renderHome, renderArticle, profile } = await import(
  pathToFileURL(resolve(temp, "render.mjs")).href + "?t=" + Date.now()
);
const entry = resolve(root, "github-pages/index.html");
try {
  await writeFile(
    entry,
    '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>',
  );
  await build({
    configFile: false,
    root: resolve(root, "github-pages"),
    base,
    publicDir: false,
    plugins: [react()],
    build: {
      outDir: output,
      emptyOutDir: true,
      manifest: true,
      assetsDir: "bundles",
      target: "es2022",
    },
  });
} finally {
  await rm(entry, { force: true });
}
const manifest = JSON.parse(
  await readFile(resolve(output, ".vite/manifest.json"), "utf8"),
);
const main = manifest["index.html"];
const articleChunk = Object.values(manifest).find((v) =>
  v.src?.endsWith("article-page.tsx"),
);
for (const file of await readdir(resolve(root, "public/assets")))
  await cp(resolve(root, "public/assets", file), resolve(output, file), {
    recursive: true,
  });
// Maintain old public CV URLs and font paths; Vite bundles have their own directory.
for (const item of await readdir(resolve(output, "bundles"))) {
  if (item.endsWith(".css")) {
    const file = resolve(output, "bundles", item);
    await writeFile(
      file,
      (await readFile(file, "utf8")).replaceAll("/assets/", base),
    );
  }
}
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const json = (v) => JSON.stringify(v).replaceAll("<", "\\u003c");
const url = (path) => profile.site + base + path;
function html({
  lang,
  path,
  title,
  description,
  markup,
  data,
  other,
  article,
}) {
  const css = [
    ...(main.css || []),
    ...(article ? articleChunk?.css || [] : []),
  ];
  const translations =
    other !== undefined
      ? `<link rel="alternate" hreflang="${lang === "zh" ? "en" : "zh-CN"}" href="${esc(url(other))}">`
      : "";
  const structured = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        datePublished: article.date,
        author: { "@type": "Person", name: profile.name.en },
        url: url(path),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name.en,
        alternateName: profile.name.zh,
        url: profile.site,
        sameAs: [profile.github],
      };
  return `<!doctype html><html lang="${lang === "zh" ? "zh-CN" : "en"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(url(path))}">${translations}<link rel="alternate" hreflang="${lang === "zh" ? "zh-CN" : "en"}" href="${esc(url(path))}"><link rel="icon" href="${base}favicon.svg"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${article ? "article" : "website"}"><meta property="og:url" content="${esc(url(path))}"><meta property="og:locale" content="${lang === "zh" ? "zh_CN" : "en_US"}"><meta property="og:image" content="${url("cloudy-mountains.webp")}"><meta property="og:image:alt" content="Mi Youren · Cloudy Mountains"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#fcfbf8"><link rel="preload" href="${base}wenkai.woff2" as="font" type="font/woff2" crossorigin>${css.map((f) => `<link rel="stylesheet" href="${base + f}">`).join("")}<script type="application/ld+json">${json(structured)}</script></head><body><div id="root">${markup}</div><script id="page-data" type="application/json">${json(data)}</script><script type="module" src="${base + main.file}"></script></body></html>`;
}
const paths = [];
async function emit(path, options) {
  const file = resolve(output, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html({ ...options, path }));
  paths.push(path);
}
for (const lang of ["zh", "en"])
  await emit(lang === "zh" ? "" : "en/", {
    lang,
    title: `${profile.name.zh} · ${profile.name.en}`,
    description: profile.description[lang],
    markup: renderHome(lang, base),
    data: { type: "home", lang, base },
    other: lang === "zh" ? "en/" : "",
  });
for (const article of posts) {
  const path =
    (article.lang === "en" ? "en/" : "") + "writing/" + article.slug + "/";
  const translation = posts.find(
    (p) =>
      article.translationKey &&
      p.translationKey === article.translationKey &&
      p.lang !== article.lang,
  );
  const rendered = renderArticle(article, base);
  await emit(path, {
    lang: article.lang,
    title: `${article.title} · ${profile.name.en}`,
    description: article.summary,
    markup: rendered.markup,
    data: {
      bodyHtml: rendered.bodyHtml,
      type: "article",
      lang: article.lang,
      base,
      article,
    },
    article,
    other: translation
      ? (translation.lang === "en" ? "en/" : "") +
        "writing/" +
        translation.slug +
        "/"
      : undefined,
  });
}
await writeFile(
  resolve(output, "404.html"),
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found · ${esc(profile.name.en)}</title></head><body style="background:#fcfbf8;color:#282824;font:18px/2 Georgia,serif;margin:10vh auto;max-width:600px;padding:24px"><h1>这一页暂未收录。<br>Page not found.</h1><p><a href="${base}">返回首页 / Return home</a></p></body></html>`,
);
await writeFile(resolve(output, ".nojekyll"), "");
await writeFile(
  resolve(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${url("sitemap.xml")}\n`,
);
await writeFile(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${esc(url(path))}</loc></url>`).join("")}</urlset>`,
);
await rm(resolve(output, ".vite"), { recursive: true, force: true });
console.log(
  `Pages build ready: ${paths.length} prerendered pages; ${posts.length} published articles; base=${base}`,
);
