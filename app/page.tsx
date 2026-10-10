"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { content } from "./content";
import { copy, interests } from "./site-copy";
import { projects, projectLabels } from "./projects";
import { profile } from "./profile";
import { WritingList } from "./writing-list";

type Language = "zh" | "en";
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className="arrow" aria-hidden="true">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
export type HomeProps = {
  contactEndpoint?: string;
  inboxHref?: string;
  assetsBase?: string;
  initialLanguage?: Language;
  pagesBase?: string;
};
export default function Home({
  contactEndpoint = "/api/contact",
  inboxHref = "/inbox",
  assetsBase = "/assets/",
  initialLanguage = "zh",
  pagesBase,
}: HomeProps = {}) {
  const artDialog = useRef<HTMLDialogElement>(null);
  const artTrigger = useRef<HTMLButtonElement>(null);
  const [lang, setLang] = useState<Language>(initialLanguage);
  const [interest, setInterest] = useState(0);
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");
  const [copied, setCopied] = useState(false);
  const d = content[lang],
    c = copy[lang];
  useEffect(() => {
    try {
      if (!pagesBase && localStorage.getItem("tianjian-language") === "en")
        setLang("en");
      setDark(localStorage.getItem("tianjian-theme") === "dark");
    } catch {}
  }, [pagesBase]);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("tianjian-language", lang);
    } catch {}
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("tianjian-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((n) => {
      n.classList.add("reveal-ready");
      io.observe(n);
    });
    return () => {
      io.disconnect();
      nodes.forEach((n) => n.classList.remove("reveal-ready"));
    };
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setFormError("");
    try {
      const response = await fetch(contactEndpoint, {
        signal: AbortSignal.timeout(15000),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !body.ok) {
        setFormError(
          body.error === "rate"
            ? c.rate
            : body.error === "validation"
              ? c.validation
              : c.failed,
        );
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setFormError(c.failed);
      setStatus("error");
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content / 跳转正文
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#home">
            <span className="wordmark-name">高天健</span>
            <span className="wordmark-latin">tianjiangao</span>
          </a>
          <nav
            id="main-navigation"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setMenu(false);
                document
                  .querySelector<HTMLButtonElement>(".menu-toggle")
                  ?.focus();
              }
            }}
            className={menu ? "nav open" : "nav"}
            aria-label={c.nav}
          >
            {["work", "about", "writing", "contact"].map((id, i) => (
              <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
                {d.nav[i]}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <button
              className="language"
              onClick={() => {
                if (pagesBase) {
                  window.location.href =
                    (lang === "zh" ? pagesBase + "en/" : pagesBase) +
                    window.location.hash;
                } else setLang(lang === "zh" ? "en" : "zh");
              }}
              aria-label={lang === "zh" ? "Switch to English" : "切换为中文"}
            >
              {lang === "zh" ? "EN" : "中文"}
            </button>
            <button
              className="theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label={c.theme}
              aria-pressed={dark}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M12 5a7 7 0 0 1 0 14z" fill="currentColor" />
              </svg>
            </button>
            <button
              className="menu-toggle"
              aria-label={c.menu}
              aria-controls="main-navigation"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <main id="main" className="shell">
        <section className="hero" id="home">
          <div className="hero-landscape" aria-hidden="true">
            <img
              src={`${assetsBase}cloudy-mountains.webp`}
              alt=""
              width="2220"
              height="954"
              fetchPriority="high"
            />
          </div>
          <div className="hero-text">
            <p className="intro-label">{c.hello}</p>
            <div className="name-row">
              <h1>{lang === "zh" ? profile.name.zh : profile.name.en}</h1>
            </div>
            <p className="english-name">
              {lang === "zh" ? profile.name.en : profile.name.zh}
            </p>
            <p className="hero-subtitle">{c.subtitle}</p>
            <p className="hero-bio">{c.bio}</p>
            <blockquote className="motto">
              <span className="motto-label">
                {lang === "zh" ? "自勉" : "A guiding principle"}
              </span>
              <p>
                {lang === "zh" ? (
                  <>
                    做对的事情，
                    <br />
                    把事情做对。
                  </>
                ) : (
                  <>
                    Do the right things.
                    <br />
                    Do things right.
                  </>
                )}
              </p>
            </blockquote>
            <div className="hero-links">
              <a className="inline-link" href="#work">
                {lang === "zh" ? "精选实践" : "Explore selected work"}
                <Arrow />
              </a>
              <a
                className="quiet-link"
                href={`${assetsBase}tianjian-gao-resume-${lang}.pdf`}
                download
              >
                {c.download}
                <span aria-hidden="true">↓</span>
              </a>
              <a className="quiet-link" href="#contact">
                {c.contact}
                <Arrow diagonal />
              </a>
            </div>
            <div className="hero-meta">
              <span>{c.place}</span>
              <span className="availability">
                <i />
                {c.available}
              </span>
            </div>
          </div>
          <button
            className="artwork-credit"
            ref={artTrigger}
            onClick={() => artDialog.current?.showModal()}
            aria-label={
              lang === "zh"
                ? "展开米友仁《云山图》"
                : "Open Cloudy Mountains by Mi Youren"
            }
          >
            {lang === "zh" ? "米友仁 · 云山图" : "Mi Youren · Cloudy Mountains"}
            <span>{lang === "zh" ? "展卷 ↗" : "View scroll ↗"}</span>
          </button>
        </section>
        <section className="section work reveal" id="work">
          <div className="section-head">
            <h2>{c.workTitle}</h2>
            <span className="section-index">{lang === "zh" ? "壹" : "01"}</span>
          </div>
          <div className="section-content">
            <p className="section-note">{c.workNote}</p>
            <div className="work-list">
              {projects[lang].map((p, i) => (
                <details
                  id={p.id}
                  className={i < 3 ? "work-item featured-work" : "work-item"}
                  key={p.id}
                  open={i === 0}
                >
                  <summary>
                    <span className="work-number">0{i + 1}</span>
                    <div className="work-heading">
                      <h3>{p.title}</h3>
                      <span>
                        {p.type} · {p.period}
                      </span>
                      <p className="project-lede">{p.summary}</p>
                    </div>
                    <span className="work-status">{p.status}</span>
                    <span className="expand-mark" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="work-body">
                    <p className="project-state">{p.status}</p>
                    <dl className="project-facts">
                      {(
                        [
                          "background",
                          "problem",
                          "role",
                          "approach",
                          "outcome",
                          "evidence",
                        ] as const
                      ).map((key) => (
                        <div key={key}>
                          <dt>{projectLabels[lang][key]}</dt>
                          <dd>{p[key]}</dd>
                        </div>
                      ))}
                    </dl>
                    {!!p.links?.length && (
                      <div className="project-links">
                        {p.links
                          .filter(
                            (link) =>
                              /^https?:\/\//.test(link.url) ||
                              /^\/[^/]/.test(link.url),
                          )
                          .map((link) => (
                            <a
                              key={link.url}
                              href={
                                link.url.startsWith("/")
                                  ? assetsBase + link.url.slice(1)
                                  : link.url
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                      </div>
                    )}
                    <div className="skills-inline">{p.tags.join(" / ")}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="section about reveal" id="about">
          <div className="section-head">
            <h2>{c.aboutTitle}</h2>
            <span className="section-index">{lang === "zh" ? "贰" : "02"}</span>
          </div>
          <div className="section-content">
            <div className="about-profile">
              <div className="about-copy">
                <p className="about-intro">{c.about}</p>
                <p className="about-perspective">
                  {lang === "zh"
                    ? "我也关心技术如何进入产业、形成商业价值。金融与商业分析让我换一个角度理解工程。我把成为 polymath 视为长期追求：在持续深入 AI 的同时，积累产业判断、金融理解与国际化视野。"
                    : "Industry and financial research give me another perspective on engineering: how a technical idea becomes useful, reaches customers, and fits into a business. Becoming a polymath is a long-term aspiration—building technical depth alongside industry judgment, financial understanding, and an international outlook."}
                </p>
              </div>
              <figure className="about-portrait">
                <img
                  src={`${assetsBase}portrait.webp`}
                  alt={d.portrait}
                  width="720"
                  height="720"
                  loading="lazy"
                />
                <figcaption>
                  {lang === "zh"
                    ? "高天健 · 北京"
                    : "Tianjian Gao Eric · Beijing"}
                </figcaption>
              </figure>
            </div>
            <div
              className="interest-tabs"
              role="tablist"
              aria-label={
                lang === "zh" ? "我的兴趣与特点" : "Interests & strengths"
              }
            >
              {interests[lang].map((item, i) => (
                <button
                  id={"interest-tab-" + i}
                  key={i}
                  role="tab"
                  tabIndex={interest === i ? 0 : -1}
                  aria-selected={interest === i}
                  aria-controls="interest-panel"
                  onClick={() => setInterest(i)}
                  onKeyDown={(e) => {
                    let next = i;
                    if (e.key === "ArrowRight") next = (i + 1) % 3;
                    else if (e.key === "ArrowLeft") next = (i + 2) % 3;
                    else if (e.key === "Home") next = 0;
                    else if (e.key === "End") next = 2;
                    else return;
                    e.preventDefault();
                    setInterest(next);
                    document.getElementById("interest-tab-" + next)?.focus();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div
              id="interest-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={"interest-tab-" + interest}
              className="interest-panel"
              key={interest + "-" + lang}
            >
              <h3>{interests[lang][interest].title}</h3>
              <div>
                <p>{interests[lang][interest].body}</p>
                <p className="evidence">{interests[lang][interest].evidence}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section experience reveal" id="experience">
          <div className="section-head">
            <h2>{c.experience}</h2>
            <span className="section-index">{lang === "zh" ? "叁" : "03"}</span>
          </div>
          <div className="section-content">
            <p className="section-note">{c.experienceNote}</p>
            <div className="experience-list">
              {d.experience.map((e, i) => (
                <article key={e[0] + e[2]} className="experience-row">
                  <div className="experience-date">
                    {e[2]}
                    {i === 0 && (
                      <span>{lang === "zh" ? "目前" : "CURRENT"}</span>
                    )}
                  </div>
                  <div className="experience-main">
                    <h3>
                      {e[0]}
                      <span>{e[1]}</span>
                    </h3>
                    <p>{e[3]}</p>
                  </div>
                </article>
              ))}
            </div>{" "}
            <div className="education-block" id="education">
              <h3 className="subsection-title">{c.education}</h3>
              <div className="section-content">
                <div className="education-grid">
                  <div className="education-main">
                    <h3>{d.university}</h3>
                    <p>
                      {d.degree}
                      <br />
                      {d.minor}
                    </p>
                    <span className="education-date">2023.09 — 2027.07</span>
                    <p className="personal-note">{d.personal}</p>
                  </div>
                  <div className="skill-list">
                    {d.skills.map((s) => (
                      <div className="skill-row" key={s[0]}>
                        <h3>{s[0]}</h3>
                        <p>{s[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section writing reveal" id="writing">
          <div className="section-head">
            <h2>{lang === "zh" ? "文章与研究" : "Writing & research"}</h2>
            <span className="section-index">{lang === "zh" ? "肆" : "04"}</span>
          </div>
          <div className="section-content">
            <WritingList lang={lang} base={pagesBase || "/"} />
          </div>
        </section>
        <section className="section contact reveal" id="contact">
          <div className="section-head">
            <h2>{c.contact}</h2>
            <span className="section-index">{lang === "zh" ? "伍" : "05"}</span>
          </div>
          <div className="section-content">
            <div className="contact-intro">
              <p>{c.contactBody}</p>
              <div>
                <a className="email" href={"mailto:" + profile.email}>
                  {profile.email}
                  <Arrow diagonal />
                </a>
                <div className="contact-small">
                  <button onClick={copyEmail}>
                    {copied ? c.copied : c.copy}
                  </button>
                  <a
                    href={`${assetsBase}tianjian-gao-resume-${lang === "zh" ? "en" : "zh"}.pdf`}
                    download
                  >
                    {c.other} ↓
                  </a>
                  <a
                    href={`${assetsBase}tianjian-gao-resume-${lang}.pdf`}
                    download
                  >
                    {c.download} ↓
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
            <details className="message-box">
              <summary>
                {c.sendTitle}
                <span className="expand-mark" aria-hidden="true">
                  +
                </span>
              </summary>
              <form onSubmit={submit} className="message-form">
                <div className="form-row">
                  <label>
                    {c.name}
                    <input
                      name="name"
                      required
                      maxLength={80}
                      autoComplete="name"
                      disabled={status === "sending"}
                    />
                  </label>
                  <label>
                    {c.email}
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      disabled={status === "sending"}
                    />
                  </label>
                </div>
                <label>
                  {c.topic}
                  <select name="topic" disabled={status === "sending"}>
                    {["career", "collaboration", "conversation"].map((t, i) => (
                      <option key={t} value={t}>
                        {c.topics[i]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {c.message}
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    placeholder={c.messagePlaceholder}
                    disabled={status === "sending"}
                  />
                </label>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <div className="form-bottom">
                  <p>{c.privacy}</p>
                  <button
                    type="submit"
                    className="send-button"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? c.sending : c.submit}
                    <Arrow />
                  </button>
                </div>
                <p
                  className={"form-status " + status}
                  role="status"
                  aria-live="polite"
                >
                  {status === "success"
                    ? c.success
                    : status === "error"
                      ? formError
                      : ""}
                </p>
              </form>
            </details>
          </div>
        </section>
      </main>
      <dialog
        className="art-dialog"
        ref={artDialog}
        aria-labelledby="art-dialog-title"
        onClose={() => artTrigger.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) artDialog.current?.close();
        }}
      >
        <div className="art-dialog-header">
          <h2 id="art-dialog-title">
            {lang === "zh" ? "米友仁 · 云山图" : "Mi Youren · Cloudy Mountains"}
          </h2>
          <button
            onClick={() => artDialog.current?.close()}
            aria-label={lang === "zh" ? "关闭画卷" : "Close scroll"}
          >
            ×
          </button>
        </div>
        <div className="scroll-view">
          <img
            src={`${assetsBase}cloudy-mountains.webp`}
            alt={
              lang === "zh"
                ? "米友仁《云山图》全卷"
                : "Cloudy Mountains, complete image"
            }
            width="2220"
            height="954"
          />
        </div>
        <div className="art-dialog-caption">
          <p>
            {lang === "zh"
              ? "南宋 · 纸本水墨。大都会艺术博物馆藏。"
              : "Southern Song · Ink on paper. Collection of The Metropolitan Museum of Art."}
          </p>
          <a
            href="https://www.metmuseum.org/art/collection/search/40007"
            target="_blank"
            rel="noreferrer"
          >
            The Metropolitan Museum of Art · Public Domain ↗
          </a>
        </div>
      </dialog>
      <footer className="shell footer">
        <span>© {new Date().getFullYear()} Tianjian Gao Eric</span>
        <div>
          <a href={inboxHref}>{c.admin}</a>
          <a href="#home">{c.back} ↑</a>
        </div>
      </footer>
    </>
  );
}
