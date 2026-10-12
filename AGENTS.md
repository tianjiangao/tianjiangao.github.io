# Personal website maintenance

Preserve the Song-inspired visual language: ivory, ink, ochre red, pale gold, WenKai/Song typography, Cloudy Mountains, generous margins, and fine rules. Use the existing React components.

Personal data lives in app/profile.ts; bilingual UI copy in app/site-copy.ts; projects in app/projects.ts; experience in app/content.ts. Published WeChat titles/links live in app/published-writing.ts. Never infer article bodies, dates, summaries, evidence URLs, credentials, or project outcomes. Keep Chinese and English facts aligned.

New writing belongs in content/articles/*.md. Use draft: true until the author approves publication. Real translations share translationKey. Tests and templates are not authored publications.

Run npm run typecheck, npm test, npm run build:pages, and npm run check:pages after substantive changes. Use npm run preview for browser checks. Keep GitHub Pages paths valid and test Chinese/English at desktop and mobile widths.

Do not replace or expand the existing contact backend without explicit user approval. Local CORS failures are expected; keep the production origin allowlist unchanged. Do not commit secrets or internal files.

Default to local or a review branch. Push/merge/publish only when the user explicitly authorizes publication for the current change.
