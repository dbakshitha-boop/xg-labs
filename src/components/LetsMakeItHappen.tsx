import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { ContactFormContent } from "./ContactFormOverlay";

import img1 from "../assets/letsmakeithappenscroll/143ce4dc78b3934cc2b5dfa00d6839d1276386b9 (1).jpg";
import img3 from "../assets/letsmakeithappenscroll/5031ca01a26be2c1af7d3b272a6710097e75a24a.jpg";
import img4 from "../assets/letsmakeithappenscroll/83d5ee443165d83f8ef367de998615dcd02a8030.jpg";
import img5 from "../assets/letsmakeithappenscroll/909fc774b4c04c66a94c42415b5c1e63e9c52a20.jpg";
import img6 from "../assets/letsmakeithappenscroll/b02af7d4fc1674218c1fad477c943436f1779a18 (1).jpg";
import img7 from "../assets/letsmakeithappenscroll/df49a56c44261f37bec84fd5b5ee75f09b009a72.jpg";
import img8 from "../assets/letsmakeithappenscroll/e9d9e8c4ee32a3e2a198e44198854aecafe6f134.jpg";

// ─── GridLines ───────────────────────────────────────────────────────────────
function GridLines({ dark = false }: { dark?: boolean }) {
  const color = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, display: "flex", pointerEvents: "none", zIndex: 0 }}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: "100%", borderLeft: i === 0 ? "none" : `1px solid ${color}` }} />
      ))}
    </div>
  );
}

// ─── Image config ─────────────────────────────────────────────────────────────
// Each image travels from below the viewport ("105vh") to above it ("-50vh").
// scrollStart / scrollEnd control WHEN in the scroll that travel happens,
// creating images that move at noticeably different speeds.
//
// col 1 is used twice: img2 exits (0.48) before img8 enters (0.50) — no overlap.
// Wrapper = 400 vh → 300 vh of actual scroll.  All images done by ~0.92 * 300 = 276 vh.
type ImageConfig = {
  src: string;
  colIndex: number;
  scrollStart: number;
  scrollEnd: number;
};

// One image per column (0–6). img7 in col 6 exits at exactly 1.0 so the
// sticky section releases the moment the last image clears the top edge.
const IMAGE_CONFIGS: ImageConfig[] = [
  { src: img1, colIndex: 0, scrollStart: 0.02, scrollEnd: 0.34 }, // medium
  { src: img8, colIndex: 1, scrollStart: 0.06, scrollEnd: 0.44 }, // medium
  { src: img3, colIndex: 2, scrollStart: 0.04, scrollEnd: 0.24 }, // fast
  { src: img4, colIndex: 3, scrollStart: 0.12, scrollEnd: 0.58 }, // slow
  { src: img5, colIndex: 4, scrollStart: 0.16, scrollEnd: 0.38 }, // medium-fast
  { src: img6, colIndex: 5, scrollStart: 0.22, scrollEnd: 0.66 }, // slow
  { src: img7, colIndex: 6, scrollStart: 0.28, scrollEnd: 1.00 }, // very slow — last out
];

// ─── Traveling image ──────────────────────────────────────────────────────────
// The motion.div starts below the viewport and translates to above it.
// The gradient mask on the parent section fades it in at the bottom edge
// and fades it out at the top edge — no per-image opacity needed.
function ScrollImage({
  config,
  scrollYProgress,
}: {
  config: ImageConfig;
  scrollYProgress: MotionValue<number>;
}) {
  const { src, colIndex, scrollStart, scrollEnd } = config;

  const y = useTransform(
    scrollYProgress,
    [scrollStart, scrollEnd],
    ["105vh", "-50vh"],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `calc(${colIndex} * (100% / 7) + 10px)`,
        width: "calc(100% / 7 - 20px)",
        top: 0,
        height: "260px",
        zIndex: 5,
        pointerEvents: "none",
        y,
      }}
    >
      <img
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function LetsMakeItHappen() {
  const [formOpen, setFormOpen] = useState(false);

  // 400 vh wrapper → hero is sticky for 300 vh of actual scroll.
  // "Let's Talk" bar only enters the viewport after the hero releases.
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end end"],
  });


  return (
    <div style={{ position: "relative" }}>

      {/* ── Sticky hero — 400 vh scroll wrapper ── */}
      <div ref={heroWrapperRef} style={{ height: "400vh" }}>
        <section
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
            background: "#ECEEF2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // Gradient mask: images fade in softly from the bottom and fade out at the top.
            // The 15–85 % opaque band keeps the centred headline fully visible.
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <GridLines />

          {IMAGE_CONFIGS.map((config, i) => (
            <ScrollImage key={i} config={config} scrollYProgress={scrollYProgress} />
          ))}

          {/* Headline — z-index keeps it above the images */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
              pointerEvents: "none",
              padding: "0 40px",
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#414141",
                margin: 0,
              }}
            >
              Get Started
            </p>

            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(52px, 8vw, 112px)",
                lineHeight: "1.05",
                letterSpacing: "-0.03em",
                color: "#414141",
                margin: 0,
              }}
            >
              {"Let's make"}
              <br />
              {"things happen."}
            </h2>
          </div>
        </section>
      </div>

      {/* ── Let's Talk bar — visible only once the sticky hero releases ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setFormOpen(true)}
        style={{
          position: "relative",
          background: "#0e0e0e",
          padding: "44px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 72px)",
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.025em",
            lineHeight: 1,
          }}
        >
          {"Let's Talk"}
        </h2>
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "32px" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 16px)", color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: "340px", lineHeight: "1.55" }}>
            {"We'd love to understand what you're building."}
          </p>
          <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* ── Contact form overlay — uses shared ContactFormContent ── */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 300, background: "#0e0e0e",
              overflowY: "auto", overflowX: "hidden",
              display: "flex", flexDirection: "column",
            }}
          >
            <ContactFormContent onClose={() => setFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
