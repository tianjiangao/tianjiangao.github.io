import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

import type { Article } from "./article-types";
import type { Root, RootContent } from "mdast";
function headingId(text: string) {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-") || "section"
  );
}
// Assign IDs from the Markdown tree, ignoring headings inside fenced code blocks.
function headingsPlugin() {
  return (tree: Root) => {
    const ids = new Map<string, number>();
    function walk(node: Root | RootContent) {
      if (node.type === "heading") {
        const plain = (n: Root | RootContent): string =>
          "value" in n
            ? String(n.value)
            : "children" in n
              ? n.children.map(plain).join("")
              : "";
        const id = headingId(plain(node)),
          count = ids.get(id) || 0;
        ids.set(id, count + 1);
        node.data = {
          ...node.data,
          hProperties: {
            ...node.data?.hProperties,
            id: count ? `${id}-${count}` : id,
          },
        };
      }
      if ("children" in node) node.children.forEach(walk);
    }
    walk(tree);
  };
}

export function ArticleMarkdown({
  article,
  base,
}: {
  article: Article;
  base: string;
}) {
  return (
    <Markdown
      skipHtml
      remarkPlugins={[remarkGfm, remarkMath, headingsPlugin]}
      rehypePlugins={[
        [rehypeKatex, { strict: "warn", trust: false }],
        rehypeHighlight,
      ]}
      urlTransform={(url) => {
        const safe = defaultUrlTransform(url);
        return safe.startsWith("/") && !safe.startsWith("//")
          ? base + safe.slice(1)
          : safe;
      }}
      components={{
        h1: ({ children, id }) => <h2 id={id}>{children}</h2>,
        img: ({ alt, src }) => (
          <figure>
            <img src={src} alt={alt || ""} loading="lazy" />
            {alt && <figcaption>{alt}</figcaption>}
          </figure>
        ),
        table: ({ children }) => (
          <div className="table-scroll">
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {article.body}
    </Markdown>
  );
}
