import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

interface ContactFormOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function ContactFormContent({ onClose, embedded = false }: { onClose?: () => void; embedded?: boolean }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "’Space Grotesk’, sans-serif",
    fontWeight: 300,
    fontSize: "clamp(22px, 2.6vw, 38px)",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    caretColor: "#ffffff",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "’Space Grotesk’, sans-serif",
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
    <>
      <style>{`.cf-input::placeholder { color: rgba(255,255,255,0.22); }`}</style>
      <GridLines dark />

      {/* Light strip — only in overlay mode */}
      {!embedded && (
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
      )}

      {/* Form body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          padding: embedded ? "0 80px" : "52px 72px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: embedded ? "center" : "flex-start",
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
                fontFamily: "’Space Grotesk’, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(40px, 5.5vw, 80px)",
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              {"Let’s Talk"}
            </h2>
            <p
              style={{
                fontFamily: "’Space Grotesk’, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1vw, 16px)",
                color: "rgba(255,255,255,0.4)",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {"We’d love to understand what you’re building."}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "’Space Grotesk’, sans-serif",
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
          )}
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
              className="cf-input"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="[ Your Name ]"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Your Company</label>
            <input
              className="cf-input"
              value={company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
              placeholder="[ Company Name ]"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>How do we reach you</label>
            <input
              className="cf-input"
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
              className="cf-input"
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
                className="cf-input"
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
                fontFamily: "’Space Grotesk’, sans-serif",
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
    </>
  );
}

export function ContactFormOverlay({ open, onClose }: ContactFormOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
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
          <ContactFormContent onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
