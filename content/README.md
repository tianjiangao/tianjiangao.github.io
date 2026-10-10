# 写作与项目维护

正文来源是自己的 Markdown 文件；这里没有为填充页面而生成的文章。

1. 将 `content/templates/article.md` 复制到 `content/articles/`，用短的英文文件名命名。
2. 填写 `slug`（小写英文及连字符）、`title`、`date`（YYYY-MM-DD）、`lang`（zh 或 en）、`category`、`summary`。
3. 在 Markdown 正文中写入自己的内容。`draft: true` 不会生成公开页面；明确改为 `draft: false` 才会进入构建。
4. 中英文译文使用相同 `translationKey`，并分别设置语言。无译文时不会出现指向不存在译文的链接。
5. 正文支持标题、引用、列表、链接、表格、代码块、行内 `$...$` 和块级 `$$...$$` 数学公式。代码块写明语言，例如 python、typescript、bash。原始 HTML 不会执行或渲染。
6. 图片放在 `public/assets/`，Markdown 使用 `/filename.webp` 并提供图片说明作为 alt。构建会兼容 GitHub Pages 的根路径或 `PAGES_BASE` 项目路径。
7. 运行 `npm run build:pages`，再运行 `npm run check:pages`，打开本地预览检查。

文章地址：中文 `/writing/slug/`，英文 `/en/writing/slug/`。直接打开和刷新均由独立静态 HTML 支持，不依赖 SPA 404 重定向。

给 Codex 的示例指令：

> 将我下面提供的真实笔记整理为中英文 Markdown 文章，保留事实及引用，不添加未提供的实验结果。先以草稿保存到 content/articles，检查手机排版；未经我确认，不发布。

> 将我提供的项目经历更新到 app/projects.ts 的中英文数据中，区分职责、方法、结果与进度；只添加我提供的真实公开链接，先在本地预览。

个人信息修改 `app/profile.ts`；首页与界面文案修改 `app/site-copy.ts`；经历、教育和技能修改 `app/content.ts`；项目修改 `app/projects.ts`。文章目录由构建生成 `app/articles.generated.ts`，不要手工编辑。

不要在这些公开源文件中放入密钥、内部报告、客户资料、敏感日志或未获授权的图片。

项目若有已获授权的公开附件，可在该项目对象中增加 `links` 数组，每个条目包含 `label` 和 `url`。网址必须是真实的 HTTP(S) 链接；本站附件用 `/filename.pdf`，文件放在 `public/assets/`。当前项目均未提供公开附件，因此没有虚构的链接按钮。更新项目时，同时维护中英文内容、时间和进度。
