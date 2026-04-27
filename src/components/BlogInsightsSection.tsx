import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ARTICLES } from "./BlogPage";

// Vertical offset for each card — creates the staggered waterfall layout
const OFFSETS = [0, 64, 16, 108, 48, 92, 24, 72];

// Which articles to show (use first 6 non-featured + featured at front)
const CARDS = ARTICLES.slice(0, 7);

function pad(n: number) {
  return String(n).padStart(3, "0");
}

export function BlogInsightsSection() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  // Subtle vertical parallax on the whole card strip
  const stripY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={trackRef}
      style={{
        background: "#ffffff",
        paddingTop: "80px",
        paddingBottom: "120px",
        overflow: "hidden",
      }}
    >
      {/* ── Header row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "flex-start",
          padding: "0 72px 56px",
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
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.2em",
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
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 52px)",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
              color: "#1a1a1a",
              margin: 0,
              maxWidth: "560px",
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
            alignItems: "flex-end",
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
              textAlign: "right",
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

      {/* ── Scrollable card strip ── */}
      <div
        style={{
          overflowX: "auto",
          overflowY: "visible",
          paddingLeft: "72px",
          paddingRight: "72px",
          paddingBottom: "24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          // extra height so staggered cards don't clip
          paddingTop: "16px",
        }}
        className="hide-scrollbar"
      >
        <motion.div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            width: "max-content",
            y: stripY,
          }}
        >
          {CARDS.map((article, i) => {
            const offset = OFFSETS[i % OFFSETS.length];
            const globalIdx = ARTICLES.indexOf(article);

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

                {/* Card */}
                <motion.div
                  onClick={() => navigate(`/blog/post/${globalIdx}`)}
                  whileHover="hover"
                  style={{
                    position: "relative",
                    width: "clamp(240px, 22vw, 300px)",
                    height: "clamp(320px, 30vw, 400px)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {/* Image */}
                  <motion.img
                    src={article.img}
                    alt={article.title}
                    variants={{
                      hover: { scale: 1.06 },
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {/* Dark gradient overlay — always visible at bottom */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Title caption */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 18px",
                    }}
                  >
                    {/* Category label */}
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                        margin: "0 0 8px",
                      }}
                    >
                      {article.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(12px, 1vw, 14px)",
                        lineHeight: "1.35",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        margin: 0,
                      }}
                    >
                      {article.title}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
