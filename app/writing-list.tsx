import { publishedWriting } from "./published-writing";
import { articles } from "./articles.generated";
import { articlePath, type Language } from "./article-types";
export function WritingList({ lang, base }: { lang: Language; base: string }) {
  const posts = articles.filter((post) => post.lang === lang);
  return (
    <>
      <p className="section-note">
        {lang === "zh"
          ? "技术笔记、产业观察与项目复盘，随学习与实践逐渐积累。"
          : "Technical notes, industry observations, and reflections on project work, built up over time."}
      </p>
      {posts.length ? (
        <div className="writing-list">
          {posts.map((post) => (
            <article key={post.slug} className="writing-entry">
              <div className="article-meta">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.category}</span>
              </div>
              <h3>
                <a href={articlePath(post, base)}>
                  {post.title}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </h3>
              <p>{post.summary}</p>
            </article>
          ))}
        </div>
      ) : !publishedWriting.length ? (
        <div className="writing-empty">
          <span className="folio-note">
            {lang === "zh"
              ? "留一页，给正在形成的思考。"
              : "A page for ideas still taking shape."}
          </span>
          <p>
            {lang === "zh"
              ? "目前还没有公开文章。准备好可分享的笔记后，我会从这里开始。"
              : "No articles have been published yet. This space will grow as I have work and notes ready to share."}
          </p>
        </div>
      ) : null}
      {publishedWriting.length > 0 && (
        <div className="published-writing">
          <h3 className="subsection-title">
            {lang === "zh" ? "公众号文章" : "Published on WeChat"}
          </h3>
          <p className="writing-source-note">
            {lang === "zh"
              ? "已发表的中文笔记"
              : "Originally published in Chinese. English titles below are translations of the titles."}
          </p>
          {publishedWriting.map((post) => (
            <article key={post.id} className="writing-entry">
              <div className="article-meta">
                <span>
                  {lang === "zh" ? "微信公众号 · 中文" : "WeChat · Chinese"}
                </span>
                {post.date && <time dateTime={post.date}>{post.date}</time>}
              </div>
              <h3>
                {post.url ? (
                  <a href={post.url} target="_blank" rel="noreferrer">
                    {lang === "zh" ? post.title : post.englishTitle} ↗
                  </a>
                ) : lang === "zh" ? (
                  post.title
                ) : (
                  post.englishTitle
                )}
              </h3>
              {lang === "en" && <p lang="zh-CN">{post.title}</p>}
            </article>
          ))}
        </div>
      )}
      {!!articles.length && (
        <p className="writing-language-note">
          {lang === "zh"
            ? "文章按原写作语言展示；有译文时可在文章页切换。"
            : "Articles appear in their original language, with a language switch where a translation is available."}
        </p>
      )}
    </>
  );
}
