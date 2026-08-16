import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { ContactFormOverlay } from "./ContactFormOverlay";
import { fetchArticle, fetchArticles, getArticleId, type Article } from "../lib/api";
import { Footer } from "./Footer";
import { PercentLoader } from "./ui/PercentLoader";
import csData from "../assets/Casestudy/b30ff235c69da552f698cd1e2529642679c62af5.jpg";
import csCrowd from "../assets/Casestudy/c5bb2f8721d702665ed2c54c04e3a840f4ee80ec.jpg";
import csCbarch from "../assets/Casestudy/6acebc26902290df1ec9cf1c48e8424f7f4aac7b.jpg";
import scrollFifthSip from "../assets/letsmakeithappenscroll/df49a56c44261f37bec84fd5b5ee75f09b009a72.jpg";

const PROCESS_STEPS = [
  { num: "01", title: "DISCOVER", body: "Research, analytics audit, user interviews, funnel review." },
  { num: "02", title: "DEFINE", body: "Brand pillars, UX architecture, conversion hypothesis." },
  { num: "03", title: "DESIGN", body: "Identity, UI, prototypes, and creative assets." },
  { num: "04", title: "DELIVER", body: "Handoff, campaign launch, measurement plan." },
];

const BULLET_POINTS = [
  "Funnel mapping & critical hypotheses",
  "Creative playbooks (video, social, ads)",
  "Landing page templates & measurement",
  "Landing page templates & measurement",
];

const STRIP_IMAGES = [csData, csCrowd, csCbarch, scrollFifthSip];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = String(d.getDate()).padStart(2, "0");
  return `${month} ${day}, ${d.getFullYear()}`;
}

export function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setFetchError(null);
    fetchArticle(id)
      .then(data => setArticle(data))
      .catch(err => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchArticles().then(setAllArticles).catch(() => {});
  }, []);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <PercentLoader loading={loading} />
    </div>
  );
  if (fetchError) return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e44", fontWeight: 600 }}>Failed to load article</p>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#888", fontSize: 13 }}>{fetchError}</p>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#aaa", fontSize: 12 }}>ID: {id}</p>
    </div>
  );
  if (!article) return null;

  const sections = article.content ?? [];
  const author = article.author;
  const rows: Article["content"][] = [];
  for (let i = 0; i < sections.length; i += 2) rows.push(sections.slice(i, i + 2));

  const sidePad = isMobile ? "40px" : "80px";

  const otherArticles = allArticles.filter((a) => getArticleId(a) !== id);
  const relatedPool = otherArticles.length ? otherArticles : allArticles;
  const relatedArticles = relatedPool.slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Sticky TopBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: "96px" }}>
          <TopBar />
        </div>
      </div>

      {/* Overline + meta + title */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: "1224px", width: isMobile ? "100%" : "calc(100% - 80px)", margin: "0 auto", padding: isMobile ? "24px 40px 0" : "32px 0 0" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
          <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "16px", letterSpacing: "-0.02em", textTransform: "uppercase" as const, color: "#6E6E6E", margin: 0 }}>
            {article.label || "Case Studies"}
          </p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "13px", color: "#6E6E6E", margin: 0, whiteSpace: "nowrap" as const }}>
            By {author?.name ?? "Xg Labs"} &nbsp;&nbsp;{formatDate(article.date)}&nbsp;&nbsp;{article.readTime}
          </p>
        </div>

        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: isMobile ? "clamp(24px, 7vw, 32px)" : "clamp(28px, 3vw, 40px)",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            color: "#414141",
            margin: "0 0 24px",
            maxWidth: "900px",
          }}
        >
          {article.title}
        </h1>
      </motion.header>

      {/* Hero image with LATEST badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: "1224px", width: isMobile ? "100%" : "calc(100% - 80px)", margin: "0 auto", padding: isMobile ? "0 40px" : "0" }}
      >
        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              background: "#02A884",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              padding: "9px 16px",
              borderRadius: "0 0 10px 0",
            }}
          >
            Latest
          </div>
          <img
            src={article.img}
            alt={article.title}
            style={{ width: "100%", height: isMobile ? "200px" : "380px", objectFit: "cover", display: "block" }}
          />
        </div>
      </motion.div>

      {/* Description */}
      {article.description && (
        <div style={{ maxWidth: "1224px", width: isMobile ? "100%" : "calc(100% - 80px)", margin: "0 auto", padding: isMobile ? "24px 40px 0" : "24px 0 0" }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isMobile ? "16px" : "18px", lineHeight: "1.7", color: "#6E6E6E", margin: 0, maxWidth: "760px" }}>
            {article.description}
          </p>
        </div>
      )}

      {/* Info Bar */}
      {(article.infoBar?.role || article.infoBar?.timeline) && (
        <div style={{ maxWidth: "1224px", width: isMobile ? "100%" : "calc(100% - 80px)", margin: "0 auto", padding: isMobile ? "24px 40px 0" : "32px 0 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "20px" : "48px", borderTop: "1px solid #e0e0e0", paddingTop: "24px" }}>
            {article.infoBar.role && (
              <div>
                <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#414141", margin: "0 0 8px" }}>
                  Role & Deliverables
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "1.6", color: "#6E6E6E", margin: 0 }}>
                  {article.infoBar.role}
                </p>
              </div>
            )}
            {article.infoBar.timeline && (
              <div>
                <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#414141", margin: "0 0 8px" }}>
                  Timeline
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "1.6", color: "#6E6E6E", margin: 0 }}>
                  {article.infoBar.timeline}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content — paired columns */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: "1224px", width: isMobile ? "100%" : "calc(100% - 80px)", margin: "0 auto", padding: isMobile ? "32px 40px 64px" : "48px 0 88px" }}
      >
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "28px" : "64px",
              marginBottom: rowIdx === rows.length - 1 ? 0 : (isMobile ? "28px" : "44px"),
            }}
          >
            {row.map((sec, colIdx) => (
              <div key={colIdx}>
                {sec.heading && (
                  <p
                    style={{
                      fontFamily: "'Cal Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      color: "#414141",
                      margin: "0 0 12px",
                    }}
                  >
                    {sec.heading}
                  </p>
                )}
                {sec.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.7",
                      color: "#5F5F5F",
                      margin: pIdx === sec.paragraphs.length - 1 ? 0 : "0 0 12px",
                    }}
                  >
                    {para}
                  </p>
                ))}
                {sec.blockquote && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "14px 18px",
                      background: "#F7F8FA",
                      borderRadius: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#414141",
                        margin: 0,
                      }}
                    >
                      {sec.blockquote}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.main>

      {/* ── CTA Banner ── */}
      <section style={{ background: "#0a0a0a", padding: isMobile ? "40px 40px" : "56px 80px", display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, alignItems: "center", justifyContent: isMobile ? "center" : "space-between", flexWrap: "wrap", gap: isMobile ? "24px" : "16px" }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isMobile ? "clamp(22px, 6vw, 28px)" : "clamp(24px, 2.6vw, 38px)", lineHeight: "1.2", letterSpacing: "-0.01em", color: "#F7F8FA", margin: 0, textAlign: isMobile ? "center" as const : "left" as const }}>
          Want a two-week creative audit for your brand?
        </h3>
        <motion.div initial="rest" whileHover="hover" whileTap="hover" animate="rest" style={{ position: "relative", height: 52, display: "inline-flex", flexShrink: 0 }}>
          <button onClick={() => setFormOpen(true)} style={{ height: 52, paddingTop: 12, paddingRight: 40, paddingBottom: 12, paddingLeft: 22, display: "inline-flex", alignItems: "center", background: "#000000", borderRadius: 42, border: "1.5px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const }}>
            <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
            <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: "absolute", inset: 0, background: "#000000", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, fontSize: 16, height: "1em" }}>
              <motion.span variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 16, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#F7F8FA" }}>Book a Call</motion.span>
              <motion.span aria-hidden variants={{ rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 16, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#F7F8FA" }}>Book a Call</motion.span>
            </div>
          </button>
          <motion.div variants={{ rest: { background: "#02A884" }, hover: { background: "#02A884" } }} transition={{ duration: 0.18 }} style={{ position: "absolute", top: 5, right: -12, width: 42, height: 42, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
            <motion.svg width={18} height={18} viewBox="0 0 24 24" fill="none" variants={{ rest: { stroke: "#F7F8FA" }, hover: { stroke: "#000000" } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></motion.svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Quote + Image Strip ── */}
      <section style={{ background: "#F7F8FA" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingTop: "72px", paddingBottom: "44px", paddingLeft: sidePad, paddingRight: sidePad, textAlign: "center" as const }}
        >
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(20px, 2.6vw, 36px)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#A3A3A3",
              margin: "0 auto",
            }}
          >
            {article.quoteText ? (
              article.quoteText
            ) : (
              <>
                We aligned product messaging with performance
                <br />
                creative so campaigns matched the app experience —
                <br />
                <span style={{ color: "#636363" }}>
                  reducing drop-off and increasing conversion efficiency.
                </span>
              </>
            )}
          </p>
        </motion.div>

        {/* Bullet points row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: isMobile ? "14px" : "0", paddingTop: "0", paddingBottom: "36px", paddingLeft: sidePad, paddingRight: sidePad, textAlign: isMobile ? "center" as const : "left" as const }}>
          {BULLET_POINTS.map((item, i) => (
            <p key={i} style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isMobile ? "15px" : "clamp(15px, 1.2vw, 18px)", lineHeight: "1.5", color: "#414141", margin: 0, paddingLeft: isMobile ? 0 : "16px", paddingRight: isMobile ? 0 : "20px" }}>
              {"· "}{item}
            </p>
          ))}
        </div>

        {/* 4-image strip — edge to edge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: isMobile ? "12px" : "0", paddingLeft: isMobile ? sidePad : 0, paddingRight: isMobile ? sidePad : 0 }}
        >
          {STRIP_IMAGES.map((src, i) => (
            <div key={i} style={{ aspectRatio: isMobile ? "16/9" : "3/4", overflow: "hidden", borderRadius: isMobile ? "12px" : 0 }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Process Overview ── */}
      <section style={{ background: "#ffffff", paddingTop: isMobile ? "48px" : "80px", paddingBottom: isMobile ? "28px" : "40px", paddingLeft: sidePad, paddingRight: sidePad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr", gap: isMobile ? "12px" : "48px", marginBottom: isMobile ? "28px" : "48px" }}>
          <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#414141", margin: 0 }}>
            Process Overview
          </p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isMobile ? "14px" : "clamp(15px, 1.1vw, 18px)", lineHeight: "1.6", color: "#5F5F5F", margin: 0 }}>
            We followed a structured, four-step approach that aligned brand, product, and strategy — moving from insight to execution with clarity and intention.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "12px" }}>
          {(article.process?.length
            ? article.process.map((p, i) => ({
                num: p.number ?? String(i + 1).padStart(2, "0"),
                title: (p.title || "").toUpperCase(),
                body: p.description,
              }))
            : PROCESS_STEPS
          ).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "#F7F8FA", borderRadius: "12px", padding: isMobile ? "18px 16px" : "24px 20px", display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: isMobile ? "13px" : "clamp(14px, 1.2vw, 16px)", letterSpacing: "-0.01em", color: "#414141", margin: 0 }}>
                {step.num} {step.title}
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isMobile ? "12px" : "13px", lineHeight: "1.55", color: "#5F5F5F", margin: 0 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Custom Sections ── */}
      {article.customSections?.map((section, si) => (
        <section key={si} style={{ background: "#ffffff", paddingTop: isMobile ? "8px" : "16px", paddingBottom: isMobile ? "28px" : "40px", paddingLeft: sidePad, paddingRight: sidePad }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr", gap: isMobile ? "12px" : "48px" }}>
            <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#414141", margin: 0 }}>
              {section.title}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(2, 1fr)", gap: "20px 32px" }}>
              {section.items.map((item, ii) => (
                <div key={ii}>
                  <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#6E6E6E", margin: "0 0 6px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "1.6", color: "#414141", margin: 0 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Overall Impact ── */}
      {article.impactStats && article.impactStats.length > 0 && (
        <section style={{ background: "#F7F8FA", paddingTop: isMobile ? "40px" : "64px", paddingBottom: isMobile ? "40px" : "64px", paddingLeft: sidePad, paddingRight: sidePad }}>
          <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 32px)", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#414141", textAlign: "center" as const, margin: "0 0 32px" }}>
            Overall Impact
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${Math.min(article.impactStats.length, 4)}, 1fr)`, gap: "24px", textAlign: "center" as const, maxWidth: isMobile ? undefined : `${Math.min(article.impactStats.length, 4) * 220}px`, margin: isMobile ? undefined : "0 auto" }}>
            {article.impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1, color: "#414141", margin: "0 0 8px" }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "13px", color: "#6E6E6E", margin: 0 }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Related Blogs ── */}
      {relatedArticles.length > 0 && (
        <section style={{ padding: isMobile ? "32px 40px 64px" : "40px 80px 100px", background: "#ffffff" }}>
          <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: isMobile ? "18px" : "13px", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#6E6E6E", margin: "0 0 28px" }}>
            Related Blogs
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, flexWrap: isMobile ? "nowrap" as const : "wrap" as const, gap: isMobile ? "16px" : "20px" }}>
            {relatedArticles.map((post, i) => (
              <motion.div
                key={getArticleId(post) + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/blog/post/${getArticleId(post)}`)}
                style={isMobile
                  ? { width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "14px", cursor: "pointer", border: "1px solid #5F5F5F", borderRadius: "12px", padding: "12px", boxSizing: "border-box" as const }
                  : { width: "calc(25% - 15px)", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", border: "1px solid #5F5F5F", borderRadius: "12px", padding: "10px", boxSizing: "border-box" as const }
                }
              >
                <div style={{ width: isMobile ? "110px" : "100%", flexShrink: 0, aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", background: "#e0e0e0" }}>
                  <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "8px" : "10px", minWidth: 0 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: isMobile ? "16px" : "clamp(16px, 1.3vw, 19px)", lineHeight: "1.3", color: "#1a1a1a", margin: 0 }}>
                    {post.title}
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: isMobile ? "14px" : "clamp(11px, 0.85vw, 13px)", lineHeight: "1.55", color: "#888888", margin: 0 }}>
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <ContactFormOverlay open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
