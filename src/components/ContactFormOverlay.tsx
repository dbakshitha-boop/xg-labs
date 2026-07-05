import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { submitContactForm } from "../lib/api";

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

function LeftBracket({ height = 52, arm = 12, stroke = 2, color = "rgba(255,255,255,0.75)" }: { height?: number; arm?: number; stroke?: number; color?: string }) {
  return (
    <svg width={arm} height={height} viewBox={`0 0 ${arm} ${height}`} fill="none" style={{ display: "block", flexShrink: 0, overflow: "visible" }}>
      <path d={`M${arm} 0 H0 V${height} H${arm}`} stroke={color} strokeWidth={stroke} strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}

function RightBracket({ height = 52, arm = 12, stroke = 2, color = "rgba(255,255,255,0.75)" }: { height?: number; arm?: number; stroke?: number; color?: string }) {
  return (
    <svg width={arm} height={height} viewBox={`0 0 ${arm} ${height}`} fill="none" style={{ display: "block", flexShrink: 0, overflow: "visible" }}>
      <path d={`M0 0 H${arm} V${height} H0`} stroke={color} strokeWidth={stroke} strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}

function CloseXIcon({ size = 22, color = "rgba(255,255,255,0.75)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <line x1="20" y1="20" x2="80" y2="80" stroke={color} strokeWidth={14} strokeLinecap="square" />
      <line x1="80" y1="20" x2="20" y2="80" stroke={color} strokeWidth={14} strokeLinecap="square" />
    </svg>
  );
}

function PickaxeIcon({ size = 36, color = "rgba(255,255,255,0.75)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <g fill={color} transform="rotate(-30 32 32)">
        <rect x="29" y="18" width="6" height="34" />
        <rect x="18" y="14" width="28" height="6" />
        <rect x="14" y="18" width="6" height="6" />
        <rect x="10" y="24" width="6" height="6" />
        <rect x="46" y="18" width="6" height="6" />
        <rect x="52" y="24" width="6" height="6" />
      </g>
    </svg>
  );
}

interface ContactFormOverlayProps {
  open: boolean;
  onClose: () => void;
}

function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export function ContactFormContent({ onClose, embedded = false }: { onClose?: () => void; embedded?: boolean }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow digits, +, -, spaces, ( ) only
    const filtered = e.target.value.replace(/[^\d+\-\s()]/g, "");
    setPhone(filtered);
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "’Space Grotesk’, sans-serif",
    fontWeight: 300,
    fontSize: "clamp(18px, 2.2vw, 32px)",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    caretColor: "#ffffff",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "’Cal Sans’, sans-serif",
    fontWeight: 700,
    fontSize: "11px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#F7F8FA",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  };

  const optionalStyle: React.CSSProperties = {
    fontFamily: "’Space Grotesk’, sans-serif",
    fontWeight: 400,
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "rgba(247,248,250,0.45)",
    textDecoration: "none",
    marginLeft: "8px",
  };

  const fieldStyle: React.CSSProperties = {
    borderBottom: "1px solid #F7F8FA",
    paddingBottom: "10px",
    marginBottom: "72px",
  };

  const handleSubmit = async () => {
    if (!email || !isValidEmail(email)) { setEmailTouched(true); return; }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactForm({ name, company, email, phone, message });
      setSubmitted(true);
      setTimeout(() => onClose?.(), 1800);
    } catch (err: any) {
      setSubmitError(err.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .cf-input::placeholder { color: #414141; font-family: 'Sora', sans-serif; }
        @media (max-width: 767px) {
          .cf-fields-grid { grid-template-columns: 1fr !important; }
          .cf-title { font-size: 40px !important; }
        }
      `}</style>
      <GridLines dark />

      {/* Full layout */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: embedded ? "center" : "flex-start", gap: embedded ? "40px" : "0", padding: embedded ? "40px max(40px, calc((100% - 1224px) / 2)) 100px" : "60px max(40px, calc((100% - 1224px) / 2)) 72px" }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "72px", marginBottom: embedded ? "0" : "80px" }}>
          <h2
            className="cf-title"
            style={{ fontFamily: "’Cal Sans’, sans-serif", fontWeight: 400, fontStyle: "normal", fontSize: "80px", color: "#6E6E6E", margin: 0, letterSpacing: "-0.04em", lineHeight: "120%" }}
          >
            {"Let’s Talk"}
          </h2>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", paddingTop: "20px" }}>
            <p style={{ fontFamily: "’Space Grotesk’, sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6, maxWidth: "240px" }}>
              {"We’d love to hear what you’re doing."}
            </p>
            <motion.button
              onClick={() => onClose?.()}
              initial="rest"
              whileHover="hover"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, height: "72px", display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}
            >
              <LeftBracket />
              <motion.div
                variants={{ rest: { width: 22 }, hover: { width: 102 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "52px", flexShrink: 0 }}
              >
                <motion.span
                  variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
                  transition={{ duration: 0.15 }}
                  style={{ position: "absolute" }}
                >
                  <CloseXIcon />
                </motion.span>
                <motion.span
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.2, delay: 0.18 }}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "32px", lineHeight: "1", letterSpacing: "0", textTransform: "uppercase", color: "#FF0000", whiteSpace: "nowrap", position: "absolute" }}
                >
                  CLOSE
                </motion.span>
              </motion.div>
              <RightBracket />
            </motion.button>
          </div>
        </div>

        {/* Fields grid */}
        <div
          className="cf-fields-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "72px" }}
        >
          {/* Row 1: Name | Email */}
          <div style={fieldStyle}>
            <div style={{ marginBottom: "8px" }}>
              <span style={labelStyle}>Who you are</span>
            </div>
            <input className="cf-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="[ Your Name ]" style={inputStyle} />
          </div>

          <div style={fieldStyle}>
            <div style={{ marginBottom: "8px" }}>
              <span style={labelStyle}>Primary way to respond</span>
            </div>
            <input
              className="cf-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="[ Your Email ]"
              style={inputStyle}
            />
            {emailError && (
              <p style={{ fontFamily: "’Space Grotesk’, sans-serif", fontSize: "12px", color: "#ff4d4d", margin: "6px 0 0", letterSpacing: "0.04em" }}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Row 2: Company | Phone */}
          <div style={fieldStyle}>
            <div style={{ marginBottom: "8px" }}>
              <span style={labelStyle}>Your Company</span>
              <span style={optionalStyle}>(optional)</span>
            </div>
            <input className="cf-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="[ Company Name ]" style={inputStyle} />
          </div>

          <div style={fieldStyle}>
            <div style={{ marginBottom: "8px" }}>
              <span style={labelStyle}>Faster Replies</span>
            </div>
            <input className="cf-input" type="tel" inputMode="numeric" value={phone} onChange={handlePhoneChange} placeholder="[ Your Phone Number ]" style={inputStyle} />
          </div>

          {/* Row 3: Message full width + submit */}
          <div style={{ ...fieldStyle, gridColumn: "1 / -1", display: "flex", alignItems: "flex-end", gap: "24px", marginBottom: 0 }}>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: "8px" }}>
                <span style={labelStyle}>How can we help?</span>
                <span style={optionalStyle}>(optional)</span>
              </div>
              <input
                className="cf-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="[ Tell us briefly what you need — project, problem, or idea. ]"
                style={inputStyle}
              />
            </div>

            {/* Submit button */}
            <motion.button
              disabled={submitting || submitted}
              onClick={handleSubmit}
              initial="rest"
              whileHover={!submitting && !submitted ? "hover" : "rest"}
              style={{
                background: "none",
                border: "none",
                cursor: submitting || submitted ? "default" : "pointer",
                padding: "0",
                flexShrink: 0,
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
              }}
            >
              <LeftBracket color={submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)"} />
              <motion.div
                variants={{ rest: { width: 36 }, hover: { width: 116 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "52px", flexShrink: 0 }}
              >
                <motion.span
                  variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
                  transition={{ duration: 0.15 }}
                  style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {submitted || submitting ? (
                    <span style={{ fontSize: "22px", fontWeight: 600, fontFamily: "’Space Grotesk’, sans-serif", lineHeight: 1, color: submitted ? "#02A884" : "rgba(255,255,255,0.3)" }}>
                      {submitted ? "✓" : "·"}
                    </span>
                  ) : (
                    <PickaxeIcon color={submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)"} />
                  )}
                </motion.span>
                {!submitting && !submitted && (
                  <motion.span
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.2, delay: 0.18 }}
                    style={{ fontFamily: "’Space Grotesk’, sans-serif", fontWeight: 500, fontSize: "32px", lineHeight: "1", letterSpacing: "0", textTransform: "uppercase" as const, color: "#ffffff", whiteSpace: "nowrap" as const, position: "absolute" as const }}
                  >
                    ENTER
                  </motion.span>
                )}
              </motion.div>
              <RightBracket color={submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)"} />
            </motion.button>
          </div>

          {submitError && (
            <p style={{ gridColumn: "1 / -1", fontFamily: "’Space Grotesk’, sans-serif", fontSize: "12px", color: "#ff4d4d", margin: "8px 0 0", letterSpacing: "0.04em" }}>
              {submitError}
            </p>
          )}
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
