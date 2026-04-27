import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";



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

// ─── Main component ──────────────────────────────────────────────────────────
export function LetsMakeItHappen() {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(22px, 2.6vw, 38px)",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    caretColor: "#ffffff",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    display: "block",
    marginBottom: "6px",
  };

  const fieldStyle: React.CSSProperties = {
    borderBottom: "1px solid rgba(255,255,255,0.14)",
    paddingBottom: "10px",
    marginBottom: "36px",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* ── Hero section: text ── */}
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
              inset: 0,
              zIndex: 300,
              background: "#0e0e0e",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <GridLines dark />

            {/* Light strip decoratively mirrors the section above */}
            <div
              style={{
                background: "#ECEEF2",
                height: "72px",
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <GridLines />
            </div>

            {/* Form body */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                flex: 1,
                padding: "52px 72px 72px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "52px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h2
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(40px, 5.5vw, 80px)",
                      color: "#ffffff",
                      margin: 0,
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}
                  >
                    {"Let\u2019s Talk"}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(13px, 1vw, 16px)",
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {"We\u2019d love to understand what you\u2019re building."}
                  </p>
                </div>

                <button
                  onClick={() => setFormOpen(false)}
                  style={{
                    background: "none",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.06em",
                    padding: "6px 12px",
                    lineHeight: 1,
                  }}
                >
                  [X]
                </button>
              </div>

              {/* Fields grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "56px",
                }}
              >
                <div style={fieldStyle}>
                  <label style={labelStyle}>Who you are</label>
                  <input
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="[ Your Name ]"
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Your Company</label>
                  <input
                    value={company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                    placeholder="[ Company Name ]"
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>How do we reach you</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="[ Your Email ]"
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={{ ...labelStyle, opacity: 0 }}>—</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    placeholder="[ Your Phone Number ]"
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    ...fieldStyle,
                    gridColumn: "1 / -1",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "24px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>What you are building</label>
                    <input
                      value={message}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                      placeholder="[ Tell us about your project ]"
                      style={inputStyle}
                    />
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.12em",
                      paddingBottom: "10px",
                      flexShrink: 0,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)")
                    }
                  >
                    [ENTER]
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
