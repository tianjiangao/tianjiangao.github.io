import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readArticles } from "../scripts/articles.mjs";
const front = (extra = "") =>
  `---\nslug: test-note\ntitle: Test fixture\ndate: "2026-10-10"\nlang: en\ncategory: Test\nsummary: Not an authored article\n${extra}---\n\n## Heading\n\nBody.`;
async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), "tianjian-writing-"));
  try {
    await mkdir(join(root, "app"));
    await mkdir(join(root, "content/articles"), { recursive: true });
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}
test("drafts and files outside articles are excluded", () =>
  fixture(async (root) => {
    await writeFile(
      join(root, "content/articles/draft.md"),
      front("draft: true\n"),
    );
    await mkdir(join(root, "content/templates"));
    await writeFile(
      join(root, "content/templates/template.md"),
      front("draft: false\n"),
    );
    assert.deepEqual(await readArticles(root), []);
  }));
test("publishing requires explicit opt-in and safe routes", () =>
  fixture(async (root) => {
    const file = join(root, "content/articles/note.md");
    await writeFile(file, front());
    await assert.rejects(readArticles(root), /draft: false/);
    await writeFile(
      file,
      front("draft: false\n").replace("test-note", "../../private"),
    );
    await assert.rejects(readArticles(root), /invalid language or slug/);
  }));
test("body is kept out of the homepage metadata and translations stay unique", () =>
  fixture(async (root) => {
    await writeFile(
      join(root, "content/articles/note.md"),
      front("draft: false\ntranslationKey: shared\n"),
    );
    assert.equal((await readArticles(root))[0].body.includes("Body."), true);
    assert.equal(
      (
        await readFile(join(root, "app/articles.generated.ts"), "utf8")
      ).includes("Body."),
      false,
    );
    await writeFile(
      join(root, "content/articles/duplicate.md"),
      front("draft: false\ntranslationKey: shared\n").replace(
        "test-note",
        "another-note",
      ),
    );
    await assert.rejects(readArticles(root), /Duplicate translationKey/);
  }));
test("invalid calendar dates fail before output is built", () =>
  fixture(async (root) => {
    await writeFile(
      join(root, "content/articles/note.md"),
      front("draft: false\n").replace("2026-10-10", "2026-02-30"),
    );
    await assert.rejects(readArticles(root), /invalid date/);
  }));
