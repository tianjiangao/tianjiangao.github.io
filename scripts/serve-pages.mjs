import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(process.env.PAGES_OUT_DIR || "dist-pages"),
  port = Number(process.env.PORT || 8767);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const base = process.env.PAGES_BASE || "/";
    if (base !== "/") {
      if (!pathname.startsWith(base)) throw new Error("Not found");
      pathname = pathname.slice(base.length);
    }
    let file = resolve(
      root,
      "." + (pathname.startsWith("/") ? pathname : "/" + pathname),
    );
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Not found");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Page not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(
    `Local: http://127.0.0.1:${port}${process.env.PAGES_BASE || "/"}`,
  ),
);
