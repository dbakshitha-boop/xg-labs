import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Transition } from "motion/react";
import { useNavigate as useRouterNavigate } from "react-router-dom";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";
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

const PROJECT_CARDS = [
  { img: image1, category: "WEBSITE + VISUAL IDENTITY",    description: "A modern digital presence and clean identity system built for clarity.", tags: "BRANDING / WEB",        filters: ["BRANDING"],     caseStudyId: 0 },
  { img: image2, category: "PRODUCT EXPERIENCE + REBRAND", description: "A bold product refresh that improved conversion and user clarity.",       tags: "MARKETING / STRATEGY",  filters: ["STRATEGY"],     caseStudyId: 1 },
  { img: image3, category: "BRANDING FOR DIGITAL",         description: "A high-performing content system that scaled across ads & social.",       tags: "CONTENT / PERFORMANCE", filters: ["PERFORMANCE"],  caseStudyId: 2 },
];

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
  const visibleCards = activeFilter === "ALL"
    ? PROJECT_CARDS
    : PROJECT_CARDS.filter(c => c.filters.includes(activeFilter));

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
              {/* Text — takes remaining space, text centered vertically in that space */}
              <div style={{ flex: 1, padding: "32px 60px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                <h1 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(24px, 4.5vw, 60px)",
                  lineHeight: "94%",
                  letterSpacing: "-0.04em",
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#414141",
                  margin: 0,
                }}>
                  A curated selection of our most impactful projects.
                </h1>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1.4vw, 18px)",
                  lineHeight: "140%",
                  textAlign: "center",
                  color: "#414141",
                  maxWidth: "600px",
                  margin: 0,
                }}>
                  Creative, digital, and performance work built to move brands forward.
                </p>
              </div>

              {/* Image strip — fixed at 48% of section height */}
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
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "40px 60px 24px", gap: "24px" }}
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
                  style={{ display: "flex", gap: 0, height: "100%", cursor: "grab" }}
                >
                  {METRIC_CARDS.map((card, i) => {
                    const lid = i === 0 ? "pf-img-0" : i === 1 ? "pf-img-1" : undefined;
                    return (
                    <div key={i} style={{
                      minWidth: cardPxWidth > 0 ? `${cardPxWidth}px` : "50%",
                      flexShrink: 0, height: "100%",
                      display: "flex", flexDirection: "column", gap: "14px",
                      paddingRight: i % 2 === 0 ? "10px" : "0",
                      paddingLeft:  i % 2 === 1 ? "10px" : "0",
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
                <div style={{ padding: "40px 60px 80px" }}>
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
                  <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px 24px" }}>
                    <AnimatePresence mode="popLayout">
                      {visibleCards.map((card, i) => (
                        <motion.div
                          key={card.category + i}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ delay: (i % 3) * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => routerNavigate(`/blog/case-study/${card.caseStudyId}`)}
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
