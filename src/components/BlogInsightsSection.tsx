import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { fetchArticles, getArticleId, type Article } from "../lib/api";

// Vertical offset for each card — creates the staggered waterfall layout
const OFFSETS = [0, 64, 16, 108, 48, 92, 24, 72];

function pad(n: number) {
  return String(n).padStart(3, "0");
}

export function BlogInsightsSection() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cards, setCards] = useState<Article[]>([]);

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
        paddingTop: "48px",
        paddingBottom: "60px",
        overflow: "hidden",
      }}
    >
      {/* ── Header row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "flex-start",
          padding: "0 72px 32px",
          gap: "48px",
        }}
      >
        {/* Left: kicker + headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
            Data.&nbsp; Creative.&nbsp; Strategy.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cal Sans', 'Sora' sans-serif",
              fontWeight: 700,
              fontSize: "46px",
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
            gap: "20px",
            paddingTop: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1vw, 15px)",
              lineHeight: "1.6",
              color: "#777777",
              margin: 0,
              textAlign: "left",
              maxWidth: "220px",
            }}
          >
            Actionable ideas backed by real results.
          </p>

          <button
            onClick={() => navigate("/blog")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1.5px solid #1a1a1a",
              borderRadius: "100px",
              background: "#ffffff",
              padding: "10px 14px 10px 20px",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              const circle = (e.currentTarget as HTMLButtonElement).querySelector(".btn-circle") as HTMLElement;
              if (circle) { circle.style.background = "#ffffff"; }
              const arrow = (e.currentTarget as HTMLButtonElement).querySelector(".btn-arrow") as HTMLElement;
              if (arrow) { arrow.style.stroke = "#1a1a1a"; }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a";
              const circle = (e.currentTarget as HTMLButtonElement).querySelector(".btn-circle") as HTMLElement;
              if (circle) { circle.style.background = "#1a1a1a"; }
              const arrow = (e.currentTarget as HTMLButtonElement).querySelector(".btn-arrow") as HTMLElement;
              if (arrow) { arrow.style.stroke = "#ffffff"; }
            }}
          >
            View Blogs
            <div
              className="btn-circle"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  className="btn-arrow"
                  d="M2 7H12M12 7L7 2M12 7L7 12"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "stroke 0.2s" }}
                />
              </svg>
            </div>
          </button>
        </motion.div>
      </div>

      {/* ── Card strip ── */}
      <div
        style={{
          overflowX: "auto",
          overflowY: "visible",
          paddingLeft: "72px",
          paddingRight: "72px",
          paddingBottom: "60px",
          paddingTop: "4px",
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
                style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}
              >
                {/* Number label */}
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    color: "#aaaaaa",
                    margin: 0,
                    paddingLeft: "2px",
                  }}
                >
                  {pad(i + 1)}
                </p>

                {/* Card — image on top, white text panel below */}
                <motion.div
                  onClick={() => navigate(`/blog/post/${getArticleId(article)}`)}
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(i)}
                  onHoverEnd={() => setHoveredCard(null)}
                  style={{
                    width: "calc((100vw - 144px - 2 * 24px) / 3)",
                    cursor: "pointer",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    background: "#ffffff",
                    position: "relative",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", height: "clamp(300px, 26vw, 420px)", flexShrink: 0 }}>
                    <motion.img
                      src={article.img}
                      alt={article.title}
                      variants={{ hover: { scale: 1.06 } }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        left: "18px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        margin: 0,
                        textShadow: "0 1px 6px rgba(0,0,0,0.55)",
                      }}
                    >
                      {article.label}
                    </p>
                  </div>

                  {/* Title panel */}
                  <motion.div
                    animate={{
                      backgroundColor: hoveredCard === i ? "#F2F2F2" : "#ffffff",
                    }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: "20px 18px 24px", border: "1px solid #9A9A9A", borderBottom: hoveredCard === i ? "none" : "1px solid #9A9A9A" }}
                  >
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
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

                  {/* Description — expands below on hover */}
                  <AnimatePresence initial={false}>
                    {hoveredCard === i && (
                      <motion.div
                        key="desc"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          overflow: "hidden",
                          background: "#F2F2F2",
                          borderLeft: "1px solid #9A9A9A",
                          borderRight: "1px solid #9A9A9A",
                          borderBottom: "1px solid #9A9A9A",
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
                          {article.description}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
