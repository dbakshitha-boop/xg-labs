import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { fetchArticles, getArticleId, type Article } from "../lib/api";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

// Vertical offset for each card — creates the staggered waterfall layout
const OFFSETS = [0, 64, 16, 108, 48, 92, 24, 72];

function pad(n: number) {
  return String(n).padStart(3, "0");
}

export function BlogInsightsSection() {
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [overlayRect, setOverlayRect] = useState<{ left: number; top: number; width: number } | null>(null);
  const [cards, setCards] = useState<Article[]>([]);

  // Measures the hovered card's title panel relative to the section, so the
  // expanding description overlay (rendered outside the horizontally-scrolling
  // strip) can be positioned to line up underneath it without ever being a
  // descendant of that strip — a descendant would get clipped, since a
  // horizontally-scrolling element (overflow-x: auto) forces vertical overflow
  // to clip too, no matter what overflow-y is set to.
  const measureOverlay = (i: number) => {
    const cardEl = cardRefs.current[i];
    const sectionEl = trackRef.current;
    if (!cardEl || !sectionEl) return;
    const cardRect = cardEl.getBoundingClientRect();
    const sectionRect = sectionEl.getBoundingClientRect();
    setOverlayRect({
      left: cardRect.left - sectionRect.left,
      top: cardRect.bottom - sectionRect.top,
      width: cardRect.width,
    });
  };

  // The card animates upward on hover (to level with card 001), so a one-off
  // measurement taken right as the hover starts captures the stale pre-shift
  // position. Tracking every frame for as long as a card is hovered keeps the
  // overlay glued to the card regardless of that animation, horizontal
  // scrolling, or anything else moving it.
  useEffect(() => {
    if (hoveredCard === null) return;
    let raf: number;
    const tick = () => {
      measureOverlay(hoveredCard);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredCard]);

  useEffect(() => {
    fetchArticles().then(data => setCards(data.slice(0, 7))).catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const stripY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={trackRef}
      style={{
        background: "#ffffff",
        paddingTop: isMobile ? "20px" : "48px",
        paddingBottom: isMobile ? "24px" : "60px",
        position: "relative",
      }}
    >
      {/* ── Header row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          alignItems: "flex-start",
          padding: isMobile ? "0 20px 24px" : "0 72px 32px",
          gap: isMobile ? "16px" : "48px",
        }}
      >
        {/* Left: kicker + headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "10px" : "20px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Data. Creative. Strategy.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? "30px" : "46px",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#5F5F5F",
              margin: 0,
              maxWidth: "1000px",
            }}
          >
            Insights that help brands grow smarter and scale faster.
          </motion.h2>
        </div>

        {/* Right: tagline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: isMobile ? "12px" : "20px",
            paddingTop: isMobile ? "0px" : "8px",
          }}
        >
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: "1.6",
              color: "#777777",
              margin: 0,
              textAlign: "left",
              whiteSpace: "nowrap",
            }}
          >
            Actionable ideas backed by real results.
          </p>

          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            onClick={() => navigate("/blog")}
            style={{ position: "relative", height: isMobile ? 34 : 42, display: "inline-flex", cursor: "pointer" }}
          >
            <button
              style={{
                height: isMobile ? 34 : 42,
                paddingTop: isMobile ? 8 : 10,
                paddingBottom: isMobile ? 8 : 10,
                paddingLeft: isMobile ? 14 : 16,
                paddingRight: isMobile ? 24 : 30,
                display: "inline-flex",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: 42,
                border: "1.5px solid #1a1a1a",
                cursor: "pointer",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.span
                aria-hidden
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
              />
              <motion.span
                aria-hidden
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
                style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
              />
              <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
                <motion.span
                  variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: isMobile ? 12 : 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#414141" }}
                >
                  View Blogs
                </motion.span>
                <motion.span
                  aria-hidden
                  variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: isMobile ? 12 : 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
                >
                  View Blogs
                </motion.span>
              </div>
            </button>
            <motion.div
              variants={{ rest: { background: "#0a0a0a" }, hover: { background: "#02A884" } }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", top: 0, right: isMobile ? -9 : -13, width: isMobile ? 30 : 42, height: isMobile ? 30 : 42, borderRadius: 42, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
            >
              <motion.svg
                width={isMobile ? 20 : 20}
                height={isMobile ? 20 : 20}
                viewBox="0 0 24 24"
                fill="none"
                variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#0a0a0a" } }}
                transition={{ duration: 0.2 }}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Card strip ── */}
      <motion.div
        ref={scrollRef}
        style={{
          overflowX: "auto",
          // Note: since overflowX is "auto", the browser forces this "visible" to
          // compute as "auto" too (per spec, mismatched x/y overflow can't have a
          // truly-visible axis), so anything that overflows this element's box
          // vertically gets clipped instead of spilling out. The expanding
          // description is rendered outside this container entirely (see below)
          // so it never needs extra room reserved here — paddingBottom just
          // covers the tallest staggered card's offset.
          overflowY: "visible",
          paddingLeft: isMobile ? "20px" : "72px",
          paddingRight: isMobile ? "20px" : "72px",
          paddingTop: "4px",
          paddingBottom: (isMobile ? 24 : 40) + Math.max(...OFFSETS),
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <motion.div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
            width: "max-content",
            y: stripY,
          }}
        >
          {cards.map((article, i) => {
            const offset = OFFSETS[i % OFFSETS.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: offset + 30 }}
                whileInView={{ opacity: 1, y: offset }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}
              >
                {/* Lifts the card back up to y:0 (level with card 001) while it's expanded,
                    instead of letting the expanded description push it further down. */}
                <motion.div
                  animate={{ y: hoveredCard === i ? -offset : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {/* Number + label row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "2px" }}>
                    <p
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        letterSpacing: "0.06em",
                        color: "#6E6E6E",
                        margin: 0,
                      }}
                    >
                      {pad(i + 1)}
                    </p>
                    <motion.p
                      animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "#9A9A9A",
                        margin: 0,
                      }}
                    >
                      {article.label}
                    </motion.p>
                  </div>

                  {/* Card — image on top, white text panel below */}
                  <motion.div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => navigate(`/blog/post/${getArticleId(article)}`)}
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(i)}
                  onHoverEnd={() => setHoveredCard(null)}
                  style={{
                    width: isMobile ? "min(72vw, 270px)" : "calc((100vw - 144px - 2 * 24px) / 3)",
                    cursor: "pointer",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    background: "#ffffff",
                    position: "relative",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", height: isMobile ? "clamp(260px, 24vw, 360px)" : "clamp(300px, 26vw, 420px)", flexShrink: 0 }}>
                    <motion.img
                      src={article.img}
                      alt={article.title}
                      variants={{ hover: { scale: 1.06 } }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>

                  {/* Title panel */}
                  <div style={{ border: "1px solid #9A9A9A", borderBottom: hoveredCard === i ? "none" : "1px solid #9A9A9A" }}>
                    <motion.div
                      animate={{
                        backgroundColor: hoveredCard === i ? "#F2F2F2" : "#ffffff",
                      }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{ padding: "20px 18px 24px" }}
                    >
                      <p
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontWeight: 700,
                          fontSize: "clamp(12px, 1vw, 14px)",
                          lineHeight: "1.4",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "#1a1a1a",
                          margin: 0,
                        }}
                      >
                        {article.title}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Expanding description — a sibling of the scroll container (not a
          descendant), positioned via measurement, so it can visually spill
          below the strip without being clipped or growing any scrolling
          element's box (which would otherwise push the footer down). */}
      <AnimatePresence initial={false}>
        {hoveredCard !== null && overlayRect && cards[hoveredCard] && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: overlayRect.left,
              top: overlayRect.top,
              width: overlayRect.width,
              overflow: "hidden",
              background: "#F2F2F2",
              border: "1px solid #9A9A9A",
              borderTop: "none",
              zIndex: 30,
            }}
          >
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#666666",
                margin: 0,
                padding: "3px 18px 20px",
              }}
            >
              {cards[hoveredCard].description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
