import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import img1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import img2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import img3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import img4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";
import img5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";

// ─── Keyframe CSS (injected once) ───────────────────────────────────────────
const LANE_CSS = `
@keyframes lmih-up {
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
}
@keyframes lmih-down {
  from { transform: translateY(-50%); }
  to   { transform: translateY(0); }
}
`;

// ─── Lane data ───────────────────────────────────────────────────────────────
// Each lane is absolutely positioned on the left or right edge of the section.
// dir:"up"  → images drift upward  (enter from bottom)
// dir:"down"→ images drift downward (enter from top)
// delay is negative so the animation starts pre-scrolled (staggered appearance).
const LANE_GAP = 72; // px between images within a lane

const LANES = [
  {
    id: "l1",
    side: { left: "2%" },
    dir: "up" as const,
    speed: 26,   // seconds per full cycle
    delay: -8,   // negative = already in-progress at mount
    items: [
      { src: img1, w: 118, h: 190, rotate: -2.5 },
      { src: img3, w: 132, h: 132, rotate:  1.5 },
      { src: img5, w: 118, h: 148, rotate: -1   },
    ],
  },
  {
    id: "l2",
    side: { left: "17%" },
    dir: "down" as const,
    speed: 32,
    delay: -14,
    items: [
      { src: img2, w: 220, h: 140, rotate: -1.5 },
      { src: img4, w: 134, h: 134, rotate:  2   },
      { src: img1, w: 102, h: 164, rotate:  1   },
    ],
  },
  {
    id: "r1",
    side: { right: "17%" },
    dir: "up" as const,
    speed: 29,
    delay: -5,
    items: [
      { src: img4, w: 158, h: 158, rotate:  2   },
      { src: img2, w: 128, h: 168, rotate: -1.5 },
      { src: img3, w: 148, h: 148, rotate:  1   },
    ],
  },
  {
    id: "r2",
    side: { right: "2%" },
    dir: "down" as const,
    speed: 22,
    delay: -11,
    items: [
      { src: img5, w: 140, h: 186, rotate: -2   },
      { src: img1, w: 148, h: 148, rotate:  1.5 },
      { src: img3, w: 126, h: 140, rotate: -1   },
    ],
  },
];

// ─── GridLines helper ────────────────────────────────────────────────────────
function GridLines({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            borderLeft: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)"}`,
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}

// ─── Single scrolling lane ───────────────────────────────────────────────────
function Lane({ lane }: { lane: typeof LANES[0] }) {
  // Duplicate items so CSS animation can scroll through one full copy then loop
  const doubled = [...lane.items, ...lane.items];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        ...lane.side,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: LANE_GAP,
          paddingBottom: LANE_GAP,
          // Seamless loop: animation scrolls exactly -50% (one full copy of items)
          animation: `lmih-${lane.dir} ${lane.speed}s linear ${lane.delay}s infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt=""
            style={{
              width: item.w,
              height: item.h,
              objectFit: "cover",
              borderRadius: 10,
              transform: `rotate(${item.rotate}deg)`,
              flexShrink: 0,
              display: "block",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function LetsMakeItHappen() {
  const [formOpen, setFormOpen] = useState(false);
  const [name,    setName]    = useState("");
  const [company, setCompany] = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(26px, 2.8vw, 46px)",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    caretColor: "#ffffff",
    width: "100%",
    minWidth: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "10px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.8)",
    display: "block",
    marginBottom: "18px",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  };

  const optionalStyle: React.CSSProperties = {
    fontWeight: 400,
    textDecoration: "none",
    textTransform: "none",
    letterSpacing: 0,
    color: "rgba(255,255,255,0.4)",
  };

  const fieldStyle: React.CSSProperties = {
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    paddingBottom: "20px",
    marginBottom: "56px",
    minWidth: 0,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Inject lane keyframes once */}
      <style dangerouslySetInnerHTML={{ __html: LANE_CSS }} />

      {/* ── Hero section: text + auto-scrolling image lanes ── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#ECEEF2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",     // clips images outside bounds
        }}
      >
        <GridLines />

        {/* Image lanes (behind text) */}
        {LANES.map((lane) => (
          <Lane key={lane.id} lane={lane} />
        ))}

        {/* Centred text — always on top */}
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            {"Let\u2019s make"}
            <br />
            {"things happen."}
          </motion.h2>
        </div>
      </section>

      {/* ── Let's Talk bar ── */}
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
        <GridLines dark />
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
          {"Let\u2019s Talk"}
        </h2>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              maxWidth: "340px",
              lineHeight: "1.55",
            }}
          >
            {"We\u2019d love to understand what you\u2019re building."}
          </p>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7H12M12 7L7 2M12 7L7 12"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* ── Contact form overlay ── */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 300,
              background: "#0a0a0a",
              overflowY: "auto",
              overflowX: "hidden",
              paddingTop: "7vh",
              paddingBottom: "7vh",
              paddingLeft: "6vw",
              paddingRight: "6vw",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <style>{`.lmih-input::placeholder { color: rgba(255,255,255,0.22); }`}</style>
            <GridLines dark />

            {/* All form content sits directly here, no extra wrapper needed */}
            <div style={{ position: "relative", zIndex: 1 }}>

              {/* Header row: title | subtitle | [X] */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "32px",
                  marginBottom: "80px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(36px, 3.5vw, 64px)",
                    color: "#ffffff",
                    margin: 0,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {"Let's Talk"}
                </h2>

                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 15px)",
                    color: "rgba(255,255,255,0.45)",
                    margin: 0,
                    lineHeight: "1.6",
                    maxWidth: "260px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {"We'd love to understand what you're building."}
                </p>

                <button
                  onClick={() => setFormOpen(false)}
                  style={{
                    background: "none",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    padding: "9px 14px",
                    lineHeight: 1,
                    flexShrink: 0,
                    letterSpacing: "0.08em",
                  }}
                >
                  [ X ]
                </button>
              </div>

              {/* Fields grid — 2 columns */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "10vw",
                }}
              >
                {/* Row 1: Name | Email */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>WHO YOU ARE</label>
                  <input
                    className="lmih-input"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="[ Your Name ]"
                    style={inputStyle}
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>PRIMARY WAY TO RESPOND</label>
                  <input
                    className="lmih-input"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="[ Your Email ]"
                    style={inputStyle}
                  />
                </div>

                {/* Row 2: Company | Phone */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>
                    YOUR COMPANY{"  "}
                    <span style={optionalStyle}>(optional)</span>
                  </label>
                  <input
                    className="lmih-input"
                    value={company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                    placeholder="[ Company Name ]"
                    style={inputStyle}
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>FASTER REPLIES</label>
                  <input
                    className="lmih-input"
                    type="tel"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    placeholder="[ Your Phone Number ]"
                    style={inputStyle}
                  />
                </div>

                {/* Row 3: Message (full width) + submit */}
                <div
                  style={{
                    ...fieldStyle,
                    gridColumn: "1 / -1",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "32px",
                    marginBottom: 0,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <label style={labelStyle}>
                      HOW CAN WE HELP?{"  "}
                      <span style={optionalStyle}>(optional)</span>
                    </label>
                    <input
                      className="lmih-input"
                      value={message}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                      placeholder="[ Tell us briefly what you need — project, problem, or idea. ]"
                      style={{ ...inputStyle, fontSize: "clamp(22px, 2.5vw, 40px)" }}
                    />
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(28px, 3vw, 48px)",
                      color: "rgba(255,255,255,0.5)",
                      padding: "6px 14px",
                      flexShrink: 0,
                      lineHeight: 1,
                      transition: "color 0.15s, border-color 0.15s",
                      alignSelf: "flex-end",
                      marginBottom: "6px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                  >
                    [ ↵ ]
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
