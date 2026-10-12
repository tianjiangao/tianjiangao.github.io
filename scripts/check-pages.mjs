import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
const output = resolve(
    import.meta.dirname,
    "..",
    process.env.PAGES_OUT_DIR || "dist-pages",
  ),
  base = process.env.PAGES_BASE || "/";
async function files(dir) {
  const list = [];
  for (const f of await readdir(dir, { withFileTypes: true }))
    if (f.isDirectory()) list.push(...(await files(resolve(dir, f.name))));
    else list.push(resolve(dir, f.name));
  return list;
}
const htmlFiles = (await files(output)).filter((f) => f.endsWith("index.html"));
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if ((html.match(/<h1\b/g) || []).length !== 1)
    throw new Error(file + ": expected one H1");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length)
    throw new Error(file + ": duplicate ID");
  if (
    !html.includes('rel="canonical"') ||
    !html.includes("og:description") ||
    !html.includes("hreflang")
  )
    throw new Error(file + ": missing SEO metadata");
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    let value = m[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    if (value.startsWith("#")) {
      if (!ids.includes(value.slice(1)))
        throw new Error(file + ": missing anchor " + value);
      continue;
    }
    value = value.split("#")[0].split("?")[0];
    if (!value) continue;
    if (value.startsWith("/")) {
      if (!value.startsWith(base))
        throw new Error(file + ": incompatible base " + value);
      value = resolve(output, value.slice(base.length));
    } else value = resolve(dirname(file), value);
    if (!value.startsWith(output + "/") && value !== output)
      throw new Error("Path escaped output");
    try {
      await stat(value);
    } catch {
      throw new Error(file + ": missing file " + value);
    }
  }
}
for (const file of ["tianjian-gao-resume-zh.pdf", "tianjian-gao-resume-en.pdf"])
  if (
    !(await readFile(resolve(output, file)))
      .subarray(0, 5)
      .equals(Buffer.from("%PDF-"))
  )
    throw new Error("Invalid CV PDF");
console.log(
  `Checked ${htmlFiles.length} pages: paths, assets, anchors, CV PDFs, unique IDs and metadata.`,
);
