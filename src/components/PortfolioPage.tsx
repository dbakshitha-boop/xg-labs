import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Transition } from "motion/react";
import { useNavigate as useRouterNavigate } from "react-router-dom";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";
import { useContactForm } from "./ContactFormContext";
import { fetchWorks } from "../lib/api";
import type { Work } from "../lib/api";
import image1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import image5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";
import image3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import image2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import image4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const STRIP_CARDS = [
  { img: image1 }, { img: image2 }, { img: image3 }, { img: image4 }, { img: image5 },
];

const FILTERS = ["ALL", "STRATEGY", "CREATIVE", "PERFORMANCE", "BRANDING", "PRODUCT"];

const METRIC_CARDS = [
  { img: image2, metric: "4.2× ROAS",              description: "Delivered through performance-led creative and optimized paid campaigns." },
  { img: image3, metric: "45% Higher Organic Reach", description: "Achieved with consistent content systems and modern storytelling." },
  { img: image4, metric: "3.1× Engagement Rate",   description: "Driven by targeted influencer campaigns and strategic content distribution." },
];

type ProjectCard = {
  img: string;
  category: string;
  description: string;
  tags: string;
  filters: string[];
  workId: string;
};

const FALLBACK_CARDS: ProjectCard[] = [
  { img: image1, category: "WEBSITE + VISUAL IDENTITY",    description: "A modern digital presence and clean identity system built for clarity.", tags: "BRANDING / WEB",        filters: ["BRANDING"],    workId: "0" },
  { img: image2, category: "PRODUCT EXPERIENCE + REBRAND", description: "A bold product refresh that improved conversion and user clarity.",       tags: "MARKETING / STRATEGY",  filters: ["STRATEGY"],    workId: "1" },
  { img: image3, category: "BRANDING FOR DIGITAL",         description: "A high-performing content system that scaled across ads & social.",       tags: "CONTENT / PERFORMANCE", filters: ["PERFORMANCE"], workId: "2" },
];

const FILTER_KEYWORDS = ["STRATEGY", "CREATIVE", "PERFORMANCE", "BRANDING", "PRODUCT"];
function deriveFilters(tags: string): string[] {
  const upper = tags.toUpperCase();
  const found = FILTER_KEYWORDS.filter((k) => upper.includes(k));
  return found.length ? found : ["CREATIVE"];
}

// ─── Animation constants ──────────────────────────────────────────────────────

const T: Transition = { duration: 1.0, ease: [0.16, 1, 0.3, 1] };
const CAROUSEL_TRANSITION: Transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] };

// Section 0: fades out; the 2 middle images animate via layoutId — that IS the expansion
const s0Variants = {
  initial: (dir: number) => ({ opacity: 0 }),
  animate: { opacity: 1 },
  exit:    (dir: number) => ({ opacity: 0 }),
};

// Section 1: fades in from s0 (layoutId images handle the movement); slides from s2
const s1Variants = {
  initial: (dir: number) => dir >= 0
    ? { opacity: 0, y: "0%" }
    : { opacity: 1, y: "100%" },
  animate: { opacity: 1, y: "0%" },
  exit:    (dir: number) => dir >= 0
    ? { opacity: 1, y: "-100%" }
    : { opacity: 0, y: "0%" },
};

// Section 2: pure y-slide
const s2Variants = {
  initial: (dir: number) => ({ y: dir >= 0 ? "100%" : "-100%", opacity: 1 }),
  animate: { y: "0%", opacity: 1 },
  exit:    (dir: number) => ({ y: dir >= 0 ? "-100%" : "100%", opacity: 1 }),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PortfolioPage() {
  const routerNavigate = useRouterNavigate();
  const { open: openContactForm } = useContactForm();
  const [works, setWorks] = useState<Work[]>([]);
  useEffect(() => { fetchWorks().then(setWorks).catch(() => {}); }, []);

  // Section state: 0 = intro/strip, 1 = metrics carousel, 2 = filter + cards
  const [nav, setNav] = useState({ section: 0, dir: 1 });
  const { section, dir } = nav;

  const [carouselStart, setCarouselStart] = useState(0);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [trackX, setTrackX] = useState(0);
  const [cardPxWidth, setCardPxWidth] = useState(0);

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const blockNav = useRef(false);
  const dragStartY = useRef<number | null>(null);
  const sectionRef = useRef(section);
  const navigateRef = useRef<(to: number) => void>(() => {});

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxCarouselStart = METRIC_CARDS.length - 2;

  // ── Section navigation ────────────────────────────────────────────────────
  const navigate = useCallback((to: number) => {
    if (blockNav.current || to === section || to < 0 || to > 2) return;
    blockNav.current = true;
    setNav({ section: to, dir: to > section ? 1 : -1 });
    // Must be >= animation duration (1000ms) so the lock never releases mid-transition
    setTimeout(() => { blockNav.current = false; }, 1100);
  }, [section]);

  // Keep refs current so stable callbacks (wheel, auto-advance) always see latest values
  useEffect(() => { sectionRef.current = section; }, [section]);
  useEffect(() => { navigateRef.current = navigate; }, [navigate]);

  // ── Carousel ──────────────────────────────────────────────────────────────
  const nextCard = useCallback(() => {
    setCarouselStart(s => (s >= maxCarouselStart ? 0 : s + 1));
  }, [maxCarouselStart]);

  const prevCard = useCallback(() => {
    setCarouselStart(s => (s <= 0 ? maxCarouselStart : s - 1));
  }, [maxCarouselStart]);

  // Section 1: hold still → slide carousel → navigate to section 2
  useEffect(() => {
    if (section !== 1) return;
    const t = setTimeout(() => {
      if (carouselStart >= maxCarouselStart) navigateRef.current(2);
      else nextCard();
    }, 2500);
    return () => clearTimeout(t);
  }, [section, carouselStart, nextCard, maxCarouselStart]);

  // Pixel-accurate card width — no gap so each card = exactly half the container
  const updateTrackX = useCallback(() => {
    const el = carouselContainerRef.current;
    if (!el) return;
    const w = el.offsetWidth / 2;
    setCardPxWidth(w);
    setTrackX(-carouselStart * w);
  }, [carouselStart]);

  useEffect(() => { updateTrackX(); }, [updateTrackX]);

  useEffect(() => {
    const el = carouselContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateTrackX);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateTrackX]);

  // ── Wheel navigation — registered once; reads live values through refs ───
  useEffect(() => {
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - last < 400) return;
      if (Math.abs(e.deltaY) < 30) return;
      const sec = sectionRef.current;
      if (sec === 2 && e.deltaY < 0 && section2Ref.current && section2Ref.current.scrollTop > 4) return;
      if (sec === 2 && e.deltaY > 0) return;
      last = now;
      if (e.deltaY > 0) navigateRef.current(sec + 1);
      else navigateRef.current(sec - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Touch / pointer drag for section changes ──────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => { dragStartY.current = e.clientY; };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.clientY;
    if (Math.abs(delta) > 60) {
      const sec = sectionRef.current;
      if (delta > 0) {
        navigateRef.current(sec + 1);
      } else {
        if (sec === 2 && section2Ref.current && section2Ref.current.scrollTop > 4) { dragStartY.current = null; return; }
        navigateRef.current(sec - 1);
      }
    }
    dragStartY.current = null;
  };

  // ── Filtered cards ────────────────────────────────────────────────────────
  const allCards: ProjectCard[] = works.length > 0
    ? works.map((w) => ({
        img: w.heroImage,
        category: w.heroSubtitle,
        description: w.title,
        tags: w.heroTags,
        filters: deriveFilters(w.heroTags),
        workId: w._id,
      }))
    : FALLBACK_CARDS;

  const visibleCards = activeFilter === "ALL"
    ? allCards
    : allCards.filter((c) => c.filters.includes(activeFilter));

  // ─── Mobile layout (scrollable, no animated sections) ───────────────────
  if (isMobile) {
    return (
      <div style={{ minHeight: "100dvh", background: "#E9F0FF", overflowY: "auto" }}>
        {/* TopBar */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, height: "114px" }}>
          <TopBar />
        </div>

        {/* Hero text */}
        <div style={{ padding: "32px 40px 28px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(32px, 9vw, 48px)", lineHeight: "94%", letterSpacing: "-0.04em", textTransform: "uppercase", color: "#414141", margin: "0 0 16px" }}>
            A curated selection of our most impactful projects.
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "140%", color: "#414141", margin: "0 0 24px" }}>
            Creative, digital, and performance work built to move brands forward.
          </p>
          <motion.div initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", height: 50, display: "inline-flex" }}>
            <button
              onClick={() => openContactForm()}
              style={{ height: 50, paddingTop: 12, paddingRight: 34, paddingBottom: 12, paddingLeft: 16, display: "inline-flex", alignItems: "center", background: "#ffffff", borderRadius: 42, border: "1px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const }}
            >
              {/* Teal fill — leads left to right */}
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
              {/* Black fill — trails */}
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
              {/* Text slides up on hover */}
              <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
                <motion.span variants={{ rest: { y: 0 }, hover: { y: "-100%" } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#414141" }}>
                  Become Client
                </motion.span>
                <motion.span aria-hidden variants={{ rest: { y: "100%" }, hover: { y: 0 } }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#ffffff" }}>
                  Become Client
                </motion.span>
              </div>
            </button>
            {/* Circle arrow — black → teal on hover */}
            <motion.div variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }} transition={{ duration: 0.3 }} style={{ position: "absolute", top: 0, right: -16, width: 50, height: 50, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
              <svg width={22} height={22} viewBox="0 0 24 24" style={{ display: "block" }} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Metric cards */}
        {METRIC_CARDS.map((card, i) => (
          <div key={i}>
            <div style={{ overflow: "hidden", height: "240px", margin: "0 40px", borderRadius: "12px" }}>
              <img src={card.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "20px 40px 32px" }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 5.5vw, 28px)", lineHeight: "1.05", letterSpacing: "-0.02em", color: "#060606", margin: "0 0 8px" }}>
                {card.metric}
              </h3>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", lineHeight: "1.6", color: "#555555", margin: 0 }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}

        {/* Project cards */}
        <div style={{ padding: "40px 40px 80px" }}>
          {/* Filter pills — horizontal scroll */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", marginBottom: "32px", paddingBottom: "4px", scrollbarWidth: "none" as any }}>
            {FILTERS.map(f => {
              const active = activeFilter === f;
              return (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, padding: "8px 18px", borderRadius: "100px", border: active ? "none" : "1.5px solid #414141", background: active ? "#060606" : "transparent", color: active ? "#ffffff" : "#414141", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, cursor: "pointer" }}>
                  {f}
                </button>
              );
            })}
          </div>
          {/* Cards list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {visibleCards.map((card, i) => (
              <div key={card.workId} onClick={() => routerNavigate(`/blog/case-study/${card.workId}`)} style={{ display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer" }}>
                <div style={{ width: "100%", aspectRatio: "400 / 237", borderRadius: "9.47px", overflow: "hidden", position: "relative", background: "#d5d5d5" }}>
                  <img src={card.img} alt={card.category} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#888888", margin: 0 }}>{card.category}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(16px, 4vw, 22px)", lineHeight: "130%", letterSpacing: "-0.01em", color: "#060606", margin: 0 }}>{card.description}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#414141", margin: 0 }}>{card.tags}</p>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{ height: "100dvh", overflow: "hidden", background: "#E9F0FF", userSelect: "none" }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Nav */}
      <div style={{ position: "relative", zIndex: 100, height: "114px" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <TopBar />
        </div>
      </div>

      {/* Section viewport — sync mode so sections animate simultaneously, no gap */}
      <div style={{ position: "relative", height: "calc(100dvh - 114px)", overflow: "hidden" }}>
        <AnimatePresence custom={dir} mode="sync">

          {/* ── Section 0: Full-height strip, text overlay at bottom ── */}
          {section === 0 && (
            <motion.div
              key="s0"
              custom={dir}
              variants={s0Variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={T}
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}
            >
              {/* Text — takes remaining space */}
              <div style={{ flex: 1, padding: isMobile ? "32px 40px 24px" : "32px 60px 24px", display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "center", justifyContent: "center", gap: isMobile ? "20px" : "16px" }}>
                <h1 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: isMobile ? "clamp(32px, 9vw, 52px)" : "clamp(24px, 4.5vw, 60px)",
                  lineHeight: "94%",
                  letterSpacing: "-0.04em",
                  textAlign: isMobile ? "left" : "center",
                  textTransform: "uppercase",
                  color: "#414141",
                  margin: 0,
                }}>
                  A curated selection of our most impactful projects.
                </h1>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: isMobile ? "14px" : "clamp(13px, 1.4vw, 18px)",
                  lineHeight: "140%",
                  textAlign: isMobile ? "left" : "center",
                  color: "#414141",
                  maxWidth: isMobile ? "none" : "600px",
                  margin: 0,
                }}>
                  Creative, digital, and performance work built to move brands forward.
                </p>
              </div>

              {/* Image — strip on desktop, single full-bleed on mobile */}
              {isMobile ? (
                <div style={{ height: "48%", flexShrink: 0, overflow: "hidden" }}>
                  <img src={STRIP_CARDS[0].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ) : (
                <div style={{ height: "48%", flexShrink: 0, overflow: "hidden" }}>
                  <div style={{ display: "flex", gap: "3px", height: "100%", transform: "translateX(-12.5vw)" }}>
                    {STRIP_CARDS.map((card, i) => {
                      const lid = i === 1 ? "pf-img-0" : i === 2 ? "pf-img-1" : undefined;
                      return lid ? (
                        <motion.div
                          key={i}
                          layoutId={lid}
                          transition={{ layout: T }}
                          style={{
                            width: "25vw", flexShrink: 0, height: "100%",
                            overflow: "hidden", background: "#d0d0d0", position: "relative",
                          }}
                        >
                          <img src={card.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        </motion.div>
                      ) : (
                        <div key={i} style={{
                          width: "25vw", flexShrink: 0, height: "100%",
                          overflow: "hidden", background: "#d0d0d0", position: "relative",
                        }}>
                          <img src={card.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Section 1: Metrics Carousel ── */}
          {section === 1 && (
            <motion.div
              key="s1"
              custom={dir}
              variants={s1Variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={T}
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: isMobile ? "40px 40px 24px" : "40px 60px 24px", gap: "24px" }}
            >
              
              {/* Carousel track — zero gap so no background bleeds between cards */}
              <div ref={carouselContainerRef} style={{ flex: 1, minHeight: 0, overflow: "hidden", position: "relative" }}>
                <motion.div
                  animate={{ x: trackX }}
                  transition={CAROUSEL_TRANSITION}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.06}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) nextCard();
                    else if (info.offset.x > 50) prevCard();
                  }}
                  style={{ display: "flex", gap: "24px", height: "100%", cursor: "grab" }}
                >
                  {METRIC_CARDS.map((card, i) => {
                    const lid = i === 0 ? "pf-img-0" : i === 1 ? "pf-img-1" : undefined;
                    return (
                    <div key={i} style={{
                      minWidth: cardPxWidth > 0 ? `${cardPxWidth}px` : "50%",
                      flexShrink: 0, height: "100%",
                      display: "flex", flexDirection: "column", gap: "14px",
                      paddingRight: 0,
                      paddingLeft: 0,
                      boxSizing: "border-box",
                    }}>
                      <motion.div
                        layoutId={lid}
                        transition={{ layout: T }}
                        style={{ flex: 1, borderRadius: "8px", overflow: "hidden", position: "relative", minHeight: 0 }}
                      >
                        <img src={card.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      </motion.div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2.4vw, 36px)", lineHeight: "1.05", letterSpacing: "-0.02em", color: "#060606", margin: 0 }}>
                        {card.metric}
                      </h3>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(12px, 1vw, 15px)", lineHeight: "1.6", color: "#555555", margin: 0 }}>
                        {card.description}
                      </p>
                    </div>
                  );
                  })}
                </motion.div>
              </div>

            </motion.div>
          )}

          {/* ── Section 2: Filters + Portfolio Grid ── */}
          {section === 2 && (
            <motion.div
              key="s2"
              custom={dir}
              variants={s2Variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={T}
              style={{ position: "absolute", inset: 0, zIndex: 1 }}
            >
              <div ref={section2Ref} style={{ height: "100%", overflowY: "auto" }}>
                {/* Padded content area */}
                <div style={{ padding: isMobile ? "40px 40px 80px" : "40px 60px 80px" }}>
                  {/* Filter pills */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px" }}>
                    {FILTERS.map(f => {
                      const active = activeFilter === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setActiveFilter(f)}
                          style={{
                            padding: "10px 22px", borderRadius: "100px",
                            border: active ? "none" : "1.5px solid #414141",
                            background: active ? "#060606" : "transparent",
                            color: active ? "#ffffff" : "#414141",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 600, fontSize: "13px",
                            letterSpacing: "0.06em", textTransform: "uppercase" as const,
                            cursor: "pointer", transition: "all 0.2s ease",
                          }}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>

                  {/* Cards grid */}
                  <motion.div layout style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "40px" : "40px 24px" }}>
                    <AnimatePresence mode="popLayout">
                      {visibleCards.map((card, i) => (
                        <motion.div
                          key={card.workId}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ delay: (i % 3) * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => routerNavigate(`/blog/case-study/${card.workId}`)}
                          style={{ display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer" }}
                        >
                          <div style={{ width: "100%", aspectRatio: "400 / 237", borderRadius: "9.47px", overflow: "hidden", position: "relative", background: "#d5d5d5" }}>
                            <img src={card.img} alt={card.category} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#888888", margin: 0 }}>
                            {card.category}
                          </p>
                          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(16px, 1.4vw, 22px)", lineHeight: "130%", letterSpacing: "-0.01em", color: "#060606", margin: 0 }}>
                            {card.description}
                          </p>
                          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#414141", margin: 0 }}>
                            {card.tags}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Footer sits outside the padded wrapper so it spans full width */}
                <Footer />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
