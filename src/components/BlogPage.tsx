import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { ContactFormOverlay } from "./ContactFormOverlay";
import { SubscribePopup } from "./SubscribePopup";
import { Footer } from "./Footer";
import { fetchArticles, getArticleId, type Article } from "../lib/api";

// Articles are fetched from MongoDB — see src/lib/api.ts
export type { Article };


const BLOG_FILTERS = ["ALL", "STRATEGY", "CREATIVE", "PERFORMANCE", "BRANDING", "PRODUCT"];
const CARDS_PER_PAGE = 6;

export function BlogPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ctaHover, setCtaHover] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetchArticles()
      .then(data => setArticles(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("xg_subscribe_shown")) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("xg_subscribe_shown", "1");
      setSubscribeOpen(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  const gridArticles = articles.filter((a) => !a.featured);
  const filtered = gridArticles.filter((a) => {
    const matchFilter = activeFilter === "ALL" || (a as any).filter === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const pageCards = filtered.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#888" }}>Loading articles...</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e44" }}>Failed to load: {error}</p>
    </div>
  );

  if (!articles.length) return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#888" }}>No articles found. Check that VITE_API_URL is set correctly.</p>
    </div>
  );

  if (isMobile) {
    const mobileArticles = filtered.slice(0, currentPage * CARDS_PER_PAGE);
    const hasMore = currentPage * CARDS_PER_PAGE < filtered.length;
    return (
      <div style={{ minHeight: "100vh", background: "#F7F8FA" }}>
        {/* Sticky TopBar */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%", height: "114px" }}>
          <TopBar />
        </div>

        {/* Hero */}
        <section style={{ background: "#F7F8FA", padding: "48px 40px 52px" }}>
          <h1 style={{ fontFamily: "'Inter', 'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 8vw, 42px)", lineHeight: "1.05", letterSpacing: "-0.02em", textTransform: "uppercase", color: "#414141", margin: "0 0 20px" }}>
            Ideas that help brands grow smarter and scale faster.
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "160%", color: "#555555", margin: "0 0 28px" }}>
            Actionable insights from strategy, creative, and performance — written to make you think and execute better.
          </p>
          <motion.div initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", height: 44, display: "inline-flex" }}>
            <button onClick={() => setSubscribeOpen(true)} style={{ height: 44, paddingTop: 10, paddingRight: 30, paddingBottom: 10, paddingLeft: 14, display: "inline-flex", alignItems: "center", background: "#ffffff", borderRadius: 42, border: "1px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const }}>
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
                <motion.span variants={{ rest: { y: 0 }, hover: { y: "-100%" } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#414141" }}>Subscribe</motion.span>
                <motion.span aria-hidden variants={{ rest: { y: "100%" }, hover: { y: 0 } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#ffffff" }}>Subscribe</motion.span>
              </div>
            </button>
            <motion.div variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }} transition={{ duration: 0.3 }} style={{ position: "absolute", top: 0, right: -14, width: 44, height: 44, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured article — image + two buttons */}
        {articles[0] && (
          <section style={{ background: "#ffffff" }}>
            {/* Image with LATEST badge overlay, aligned to TopBar margins */}
            <div style={{ position: "relative", overflow: "hidden", margin: "0 40px", borderRadius: "12px" }}>
              <div style={{ position: "absolute", top: 0, left: 0, zIndex: 2, background: "#02A884", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "8px 14px", borderRadius: "0 0 8px 0" }}>
                Latest
              </div>
              <img src={articles[0].img} alt={articles[0].title} style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} />
            </div>
            {/* Text + buttons */}
            <div style={{ padding: "20px 40px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#5F5F5F", margin: 0 }}>{articles[0].label}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "#9E9E9E", margin: 0 }}>{articles[0].readTime}</p>
              </div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "22px", lineHeight: "120%", letterSpacing: "-0.03em", color: "#414141", margin: "0 0 10px" }}>
                {articles[0].title}
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", lineHeight: "160%", color: "#6E6E6E", margin: "0 0 20px" }}>
                {articles[0].description}
              </p>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
                {/* View Case Study — Let's Talk animation */}
                <motion.div initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", height: 36, display: "inline-flex" }}>
                  <button onClick={() => navigate("/blog/case-study/0")} style={{ height: 36, paddingTop: 8, paddingRight: 24, paddingBottom: 8, paddingLeft: 12, display: "inline-flex", alignItems: "center", background: "#ffffff", borderRadius: 42, border: "1px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const }}>
                    <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                    <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
                      <motion.span variants={{ rest: { y: 0 }, hover: { y: "-100%" } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#414141" }}>View Case Study</motion.span>
                      <motion.span aria-hidden variants={{ rest: { y: "100%" }, hover: { y: 0 } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#ffffff" }}>View Case Study</motion.span>
                    </div>
                  </button>
                  <motion.div variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }} transition={{ duration: 0.3 }} style={{ position: "absolute", top: 0, right: -12, width: 36, height: 36, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>
                  </motion.div>
                </motion.div>
                {/* Read Article — Let's Talk animation */}
                <motion.div initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", height: 36, display: "inline-flex" }}>
                  <button onClick={() => navigate(`/blog/post/${getArticleId(articles[0])}`)} style={{ height: 36, paddingTop: 8, paddingRight: 24, paddingBottom: 8, paddingLeft: 12, display: "inline-flex", alignItems: "center", background: "#ffffff", borderRadius: 42, border: "1px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const }}>
                    <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                    <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
                      <motion.span variants={{ rest: { y: 0 }, hover: { y: "-100%" } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#414141" }}>Read Article</motion.span>
                      <motion.span aria-hidden variants={{ rest: { y: "100%" }, hover: { y: 0 } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#ffffff" }}>Read Article</motion.span>
                    </div>
                  </button>
                  <motion.div variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }} transition={{ duration: 0.3 }} style={{ position: "absolute", top: 0, right: -12, width: 36, height: 36, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Filter row — active filter + search */}
        <section style={{ background: "#ffffff", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "10px 20px", position: "relative" as const }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button onClick={() => setFilterMenuOpen(o => !o)} style={{ width: 40, height: 40, borderRadius: "10px", background: "#1a1a1a", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                  <circle cx="8" cy="6" r="2" fill="#ffffff" stroke="none" /><circle cx="16" cy="12" r="2" fill="#ffffff" stroke="none" /><circle cx="10" cy="18" r="2" fill="#ffffff" stroke="none" />
                </svg>
              </button>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "-0.01em", color: "#1a1a1a" }}>{activeFilter}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #e0e0e0", borderRadius: "100px", padding: "7px 14px", background: "#f7f8fa", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#888" strokeWidth="1.5" />
                <path d="M10 10L12.5 12.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#888" }}>Search</span>
            </div>
          </div>
          {/* Filter dropdown */}
          {filterMenuOpen && (
            <>
              <div onClick={() => setFilterMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 20, zIndex: 50, background: "#ffffff", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", overflow: "hidden", minWidth: "160px" }}>
                {["STRATEGY", "CREATIVE", "PERFORMANCE", "BRANDING", "PRODUCT"].map(f => (
                  <button key={f} onClick={() => { setActiveFilter(f); setCurrentPage(1); setFilterMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left" as const, padding: "13px 20px", border: "none", background: activeFilter === f ? "#f0f0f0" : "transparent", fontFamily: "'Space Grotesk', sans-serif", fontWeight: activeFilter === f ? 700 : 400, fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#1a1a1a", cursor: "pointer" }}>
                    {f}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Article cards — full-bleed images */}
        <section style={{ background: "#ffffff" }}>
          {mobileArticles.map((article, i) => (
            <div key={article.title + i} onClick={() => navigate(`/blog/post/${getArticleId(article)}`)} style={{ cursor: "pointer", borderBottom: "1px solid #f0f0f0", paddingTop: "20px" }}>
              <div style={{ margin: "0 20px", aspectRatio: "16/9", overflow: "hidden", position: "relative", background: "#e0e0e0", borderRadius: "12px" }}>
                <img src={article.img} alt={article.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "14px 20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#5F5F5F", margin: 0 }}>{article.label}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "#9E9E9E", margin: 0 }}>{article.readTime}</p>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "17px", lineHeight: "130%", letterSpacing: "-0.01em", color: "#1a1a1a", margin: "0 0 8px" }}>
                  {article.title}
                </h3>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", lineHeight: "160%", color: "#6E6E6E", margin: 0 }}>
                  {article.description}
                </p>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 20px 40px" }}>
            <button onClick={() => hasMore && setCurrentPage(p => p + 1)} style={{ padding: "12px 48px", border: "1.5px solid #d0d0d0", borderRadius: "12px", background: "transparent", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.02em", color: "#414141", cursor: hasMore ? "pointer" : "default" }}>
              View More
            </button>
          </div>
        </section>

        {/* Case Studies + Search + Tags */}
        <section style={{ background: "#F7F8FA", padding: "48px 40px 40px" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#888", margin: "0 0 8px" }}>Case Studies</p>
          <h2 style={{ fontFamily: "'Cal Sans', 'Sora', sans-serif", fontWeight: 400, fontSize: "26px", lineHeight: "115%", letterSpacing: "-0.02em", color: "#414141", margin: "0 0 28px" }}>
            Monthly insights on strategy, creative and growth.
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #d0d0d0", borderRadius: "10px", background: "#ffffff", padding: "13px 16px", marginBottom: "20px" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#aaaaaa" strokeWidth="1.5" />
              <path d="M10 10L12.5 12.5" stroke="#aaaaaa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Search insights, topics, or keywords" style={{ border: "none", outline: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", color: "#1a1a1a", background: "transparent", width: "100%" }} />
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#6E6E6E", margin: "0 0 12px" }}>Popular Tags</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Branding", "Report", "Creative", "Branding", "Strategy"].map((tag, i) => (
              <button key={tag + i} style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid #D0D0D0", background: "#D6D6D6", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "13px", color: "#5F5F5F", cursor: "pointer" }}>
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* CTA Banner — teal */}
        <section style={{ background: "#02A884", padding: "64px 40px", position: "relative" as const, overflow: "hidden" as const, textAlign: "center" as const }}>
          {/* vertical lines decoration */}
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i + 1) * 14.28}%`, width: "1px", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
          ))}
          <h2 style={{ fontFamily: "'Cal Sans', 'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 7vw, 38px)", lineHeight: "115%", letterSpacing: "-0.02em", color: "#ffffff", margin: "0 0 14px", position: "relative" as const }}>
            Want insights tailored to your brand?
          </h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", lineHeight: "160%", color: "rgba(255,255,255,0.75)", margin: "0 0 32px", position: "relative" as const }}>
            We can build a custom workshop or audit based on these ideas.
          </p>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" as const }}>
            <motion.div initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", height: 50, display: "inline-flex" }}>
              <button onClick={() => setFormOpen(true)} style={{ height: 50, paddingTop: 12, paddingRight: 34, paddingBottom: 12, paddingLeft: 16, display: "inline-flex", alignItems: "center", background: "#ffffff", borderRadius: 42, border: "none", cursor: "pointer", boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const }}>
                <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
                  <motion.span variants={{ rest: { y: 0 }, hover: { y: "-100%" } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#1a1a1a" }}>Become Client</motion.span>
                  <motion.span aria-hidden variants={{ rest: { y: "100%" }, hover: { y: 0 } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#ffffff" }}>Become Client</motion.span>
                </div>
              </button>
              <motion.div variants={{ rest: { background: "#000000", color: "#ffffff" }, hover: { background: "#02A884", color: "#000000" } }} transition={{ duration: 0.3 }} style={{ position: "absolute", top: 0, right: -16, width: 50, height: 50, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Curated articles */}
        <section style={{ background: "#F7F8FA", padding: "48px 40px 80px" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#6E6E6E", margin: "0 0 8px" }}>Case Studies</p>
          <h2 style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "26px", lineHeight: "115%", letterSpacing: "-0.02em", color: "#414141", margin: "0 0 28px" }}>
            A curated article or resource the team recommends.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {articles.slice(1, 3).map((article, i) => (
              <div key={article.title + i} onClick={() => navigate(`/blog/post/${getArticleId(article)}`)} style={{ display: "flex", alignItems: "flex-start", gap: "14px", background: "#ffffff", borderRadius: "12px", padding: "14px", cursor: "pointer", border: "1px solid #eeeeee" }}>
                <div style={{ width: 100, height: 80, borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#e0e0e0" }}>
                  <img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "15px", lineHeight: "130%", letterSpacing: "-0.01em", color: "#414141", margin: "0 0 6px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                    {article.title}
                  </p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", lineHeight: "155%", color: "#6E6E6E", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
        <ContactFormOverlay open={formOpen} onClose={() => setFormOpen(false)} />
        <SubscribePopup open={subscribeOpen} onClose={() => { sessionStorage.setItem("xg_subscribe_shown", "1"); setSubscribeOpen(false); }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA" }}>

      {/* Sticky TopBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%", height: "114px" }}>
        <div style={{ position: "relative", width: "100%", height: "114px" }}>
          <TopBar />
        </div>
      </div>

      <div style={{ maxWidth: "1224px", width: "calc(100% - 80px)", margin: "0 auto" }}>
        {/* Hero */}
        <section
          style={{
            width: "100%",
            padding: "60px 0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter',  'Cal Sans', sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "45px",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#414141",
              margin: 0,
              width: "100%",
              maxWidth: "920px",
              textWrap: "balance",
            }}
          >
            Ideas that help brands grow smarter and scale faster.
          </motion.h1>

          {/* Right: Tagline + Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "6px", maxWidth: "340px" }}
          >
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "155%",
                color: "#555555",
                maxWidth: "400px",
                margin: 0,
              }}
            >
              Actionable insights from strategy, creative, and performance —{" "}
              written to make you think and execute better.
            </p>
            <button
              onClick={() => setSubscribeOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1.5px solid #1a1a1a",
                borderRadius: "100px",
                background: "transparent",
                padding: "4px 12px 4px 14px",
                cursor: "pointer",
                width: "fit-content",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "10px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#1a1a1a",
              }}
            >
              Subscribe
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </motion.div>
        </section>

        {/* Featured Article */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: "0 0 40px" }}
        >
          {/* LATEST badge + image */}
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
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "10px 18px",
                borderRadius: "0 0 10px 0",
              }}
            >
              Latest
            </div>
            <img
              src={articles[0].img}
              alt={articles[0].title}
              style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Featured article meta row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "100px",
              paddingTop: "36px",
              alignItems: "flex-start",
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6E6E6E",
                  margin: 0,
                }}
              >
                {articles[0].label}
              </p>
              <h2
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "38px",
                  lineHeight: "100%",
                  letterSpacing: "-0.04em",
                  color: "#414141",
                  margin: 0,

                }}
              >
                {articles[0].title}
              </h2>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  color: "#6E6E6E",
                  margin: 0,
                  marginBottom: "12px",
                  letterSpacing: "0.02em",
                  textAlign: "left",
                }}
              >
                {articles[0].readTime}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", alignItems: "flex-start" }}>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "165%",
                    color: "#6E6E6E",
                    margin: 0,
                    textAlign: "left",
                  }}
                >
                  {articles[0].description}
                </p>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "flex-start" }}>
                  <button
                    onClick={() => navigate("/blog/case-study/0")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1.5px solid #1a1a1a",
                      borderRadius: "100px",
                      background: "transparent",
                      padding: "4px 12px 4px 14px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.03em",
                      color: "#1a1a1a",
                    }}
                  >
                    View Case Study
                    <div style={{ width: "25px", height: "25px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6H10.5M10.5 6L6 1.5M10.5 6L6 10.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => articles[0] && navigate(`/blog/post/${getArticleId(articles[0])}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1.5px solid #1a1a1a",
                      borderRadius: "100px",
                      background: "#1a1a1a",
                      padding: "4px 12px 4px 14px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.03em",
                      color: "#ffffff",
                    }}
                  >
                    Read Article
                    <div style={{ width: "25px", height: "25px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6H10.5M10.5 6L6 1.5M10.5 6L6 10.5" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Filter row + Search */}
        <section style={{ padding: "16px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
              {BLOG_FILTERS.map((f) => {
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => { setActiveFilter(f); setCurrentPage(1); }}
                    style={{
                      border: "none",
                      padding: "8px 0",
                      background: "transparent",
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: active ? 700 : 400,
                      fontSize: "20px",
                      lineHeight: "100%",
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase" as const,
                      color: active ? "#1A1A1A" : "#6E6E6E",
                      cursor: "pointer"
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid #A3A3A3",
                borderRadius: "10px",
                padding: "10px 16px",
                background: "#F9F9F9",
                minWidth: "350px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#6E6E6E" strokeWidth="1.5" />
                <path d="M10 10L12.5 12.5" stroke="#6E6E6E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search Insights, Topics, or keywords"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  color: "#6E6E6E",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section style={{ padding: "40px 0 0", minHeight: "600px" }}>
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "56px 40px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {pageCards.map((article, i) => {
                
                return (
                  <motion.div
                    key={article.title + i}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: (i % 3) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => navigate(`/blog/post/${getArticleId(article)}`)}
                    style={{ display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer" }}
                  >
                    {/* Image — square aspect */}
                    <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", position: "relative", background: "#e0e0e0" }}>
                      <img src={article.img} alt={article.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    {/* Category + Read time on same row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#5F5F5F", margin: 0 }}>
                        {article.label}
                      </p>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "11px", color: "#5F5F5F", margin: 0 }}>
                        {article.readTime}
                      </p>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: "130%", letterSpacing: "-0.01em", color: "#414141", margin: 0 }}>
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "11px", lineHeight: "160%", color: "#6E6E6E", margin: 0, maxWidth: "370px" }}>
                      {article.description}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "48px 0 48px",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                border:"1px solid #9A9A9A",
                background: currentPage === page ? "#1a1a1a" : "#ffffff",
                color: currentPage === page ? "#ffffff" : "#414141",
                fontFamily: "'Space Grotesk','Cal Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: "0 24px",
              height: "44px",
              borderRadius: "10px",
              border: "1px solid #9A9A9A",
              background: "#ffffff",
              color: currentPage === totalPages ? "#cccccc" : "#414141",
              fontFamily: "'Space Grotesk', 'Cal Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              cursor: currentPage === totalPages ? "default" : "pointer",
              transition: "all 0.2s ease",
             }}
          >
            Next
          </button>
        </div>
      </div>

      {/* CTA Banner — green */}
      <section
        style={{
          background: "#02A884",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vertical panel lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${(i + 1) * 245.7}px`,
              width: "1px",
              background: "linear-gradient(180deg, #02A884 0%, rgba(247,248,250,0.4) 50.08%, #02A884 100%)",
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            maxWidth: "1224px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 2.6vw, 40px)",
              lineHeight: "115%",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: 0,
              maxWidth: "450px",
            }}
          >
            Want insights tailored to your brand?
          </h2>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(10px, 1.1vw, 13px)",
              lineHeight: "160%",
              color: "rgba(255,255,255,0.85)",
              margin: 0,
              maxWidth: "420px",
            }}
          >
            We can build a custom workshop or audit based on these ideas.
          </p>
          <motion.button
            onHoverStart={() => setCtaHover(true)}
            onHoverEnd={() => setCtaHover(false)}
            onClick={() => setFormOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              border: "1.5px solid #1a1a1a",
              borderRadius: "100px",
              background: "#ffffff",
              padding: "12px 20px 12px 26px",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: ctaHover ? "#ffffff" : "#1a1a1a",
              marginTop: "8px",
              position: "relative",
              overflow: "hidden",
              transition: "color 0.35s ease",
            }}
          >
            {/* Pan-out fill on hover */}
            <motion.span
              aria-hidden="true"
              initial={{ x: "-101%" }}
              animate={{ x: ctaHover ? "0%" : "-101%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#1a1a1a",
                borderRadius: "inherit",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>Become Client</span>
            <motion.div
              animate={{ background: ctaHover ? "#02A884" : "#1a1a1a" }}
              transition={{ duration: 0.35 }}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke={ctaHover ? "#1a1a1a" : "#ffffff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </section>

      <div style={{ maxWidth: "1224px", width: "calc(100% - 80px)", margin: "0 auto" }}>
        {/* Monthly Insights — search + popular tags */}
        <section
          style={{
            background: "#F7F8FA",
            padding: "72px 0 0",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "60px",
            alignItems: "flex-start",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "20px",
                  letterSpacing: "-2%",
                  textTransform: "uppercase",
                  color: "#888888",
                  margin: 0,
                }}
              >
                Case Studies
              </p>
              <h2
                style={{
                  fontFamily: "'Cal Sans','Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.4vw, 34px)",
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                  color: "#414141",
                  margin: 0,
                }}
              >
                Monthly insights on strategy, creative and growth.
              </h2>
            </div>

            {/* Search bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1.5px solid #d0d0d0",
                borderRadius: "10px",
                background: "#ffffff",
                padding: "13px 18px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#aaaaaa" strokeWidth="1.5" />
                <path d="M10 10L12.5 12.5" stroke="#aaaaaa" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search insights, Topics, or keywords"
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                  color: "#1a1a1a",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Right — Popular Tags */}
          <div
            style={{
              borderRadius: "14px",
              padding: "24px 24px 28px",
              background: "#F7F8FA",
              border: "1px solid #D8D8D8",
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: "-2%",
                textTransform: "uppercase",
                color: "#6E6E6E",
                margin: "0 0 16px",
              }}
            >
              Popular Tags
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {["Creative", "Creative", "Performance", "Strategy", "Strategy", "Branding"].map((tag, i) => (
                <button
                  key={tag + i}
                  style={{
                    padding: "10px 8px",
                    borderRadius: "8px",
                    border: "1px solid #D0D0D0",
                    background: "#D6D6D6",
                    fontFamily: "'Space Grotesk', Sora, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    letterSpacing: "-4%",
                    color: "#5F5F5F",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Curated Articles */}
        <section style={{ padding: "56px 0 100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: "-2%",
                textTransform: "uppercase",
                color: "#6E6E6E",
                margin: 0,
              }}
            >
              Case Studies
            </p>
            <h2
              style={{
                fontFamily: "'Cal Sans', sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "115%",
                letterSpacing: "-4%",
                color: "#414141",
                margin: 0,
              }}
            >
              A curated article or resource the team recommends.
            </h2>
          </div>

          {/* Horizontal article cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {articles.slice(1, 3).map((article, i) => (
              <motion.div
                key={article.title + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  border: "1px solid #eeeeee",
                }}
              >
                <div
                  style={{
                    width: "160px",
                    height: "120px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#e0e0e0",
                  }}
                >
                  <img
                    src={article.img}
                    alt={article.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(20px, 1.5vw, 28px)",
                      lineHeight: "130%",
                      letterSpacing: "-0.01em",
                      color: "#414141",
                      margin: 0,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(11px, 0.85vw, 13px)",
                      lineHeight: "155%",
                      color: "#6E6E6E",
                      margin: 0,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      letterSpacing: "-4%",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <ContactFormOverlay open={formOpen} onClose={() => setFormOpen(false)} />
      <SubscribePopup
        open={subscribeOpen}
        onClose={() => {
          sessionStorage.setItem("xg_subscribe_shown", "1");
          setSubscribeOpen(false);
        }}
      />
      <Footer />
    </div>
  );
}
