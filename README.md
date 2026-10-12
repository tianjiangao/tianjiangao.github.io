# 高天健 · Tianjian Gao Eric

宋式极简个人网站：React、Vite 和预渲染静态 HTML，免费发布到 GitHub Pages。既有配色、米友仁《云山图》、字体、画卷欣赏、中英文及深色模式保留。

## 本地运行

需要 Node.js 22.13+。首次运行 `npm ci`，之后：

```sh
npm run typecheck
npm test
npm run build:pages
npm run check:pages
npm run preview
```

本地地址默认 `http://127.0.0.1:8767/`。`PORT=8769 npm run preview` 可换端口。修改后重新构建并刷新浏览器；`npm run dev` 一次完成构建和启动预览。没有数据库、付费服务或私有 Token 的安装要求。

## 源码组织

- `app/profile.ts`：公开身份、联系地址和 SEO 文案。
- `app/site-copy.ts`：中英文首页及界面文案。
- `app/content.ts`：真实经历、教育和技能。
- `app/projects.ts`：结构化项目说明。
- `app/page.tsx`、`app/globals.css`：主页与设计系统。
- `app/article-page.tsx`、`app/article-markdown.tsx`：长文布局与构建时 Markdown 渲染。
- `content/articles/*.md`：自己写的文章。详见 `content/README.md`。
- `github-pages/`：React 客户端及预渲染入口。
- `scripts/`：生成文章目录、构建、检查和本地预览。
- `.github/workflows/pages.yml`：PR 检查及 main 自动发布。

文章正文在构建时渲染，浏览器不下载 Markdown 解析器、语法高亮器或数学解析器。首页只加载主页交互；文章页按需加载阅读交互及数学样式。新文章有独立 HTML、中英文元信息和可直接访问的地址。

## 源码管理与发布

此目录规范管理前端源码，不含现有 Sites 后端、数据库、账户身份或凭据。构建产物由 GitHub Actions 生成，`website-source.zip` 不再是主要维护方式。

将修改加入一个独立分支，检查 PR 的构建；得到作者发布授权后，在 GitHub 仓库 Settings → Pages 将 Source 从 Deploy from a branch 改为 GitHub Actions，再合并到 main。main 的提交触发构建、检查及发布，PR 仅检查，不部署。部署产物只包含 `dist-pages`；源码、草稿和测试文件不进入站点。首次切换应记录原 main 提交，以便恢复旧发布方式。网站内容从 app/ 和 content/ 更新，避免手改构建产物。

标准地址仍是 https://tianjiangao.github.io/。如需项目路径测试，使用 `PAGES_BASE=/portfolio/ npm run build:pages`，检查命令及预览也设置同一环境变量。生产构建使用默认 `/`。

## 留言依赖

表单保留既有外部 Sites 接口和站主收件箱，没有新建或迁移后端。该接口允许正式 GitHub Pages 来源，本地 localhost 直接提交会被 CORS 拒绝；这不是前端表单丢失。不要为预览扩大生产允许来源。

本次连接检查包含：预检 204、非法输入 400，以及一条明确标记的测试留言返回 201 / ok。网络超时和失败保留用户输入，并提示通过邮件联系。Sites 项目管理连接当前尚未恢复，需在后续后端维护前处理；成功连接测试不代表永久可用。不要未经确认替换服务。

## 素材与署名

米友仁《云山图》来自 The Metropolitan Museum of Art 的 Public Domain 收藏。来源见 `public/assets/ART-CREDITS.txt`；自托管字体遵循对应 OFL 文件。照片和 CV 为本人既有公开素材；原始上传文件未修改。站点使用较小 WebP 头像以减少加载流量。

部署流程依据 [GitHub 官方 Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。Markdown 使用 [react-markdown](https://github.com/remarkjs/react-markdown) 的安全渲染；构建路径遵循 [Vite base 配置](https://vite.dev/guide/build#public-base-path)。
