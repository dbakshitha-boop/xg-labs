import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { submitContactForm } from "../lib/api";
import arrowIcon from "../assets/arrow-icon.png";
import closeIcon from "../assets/close-icon.png";


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

function CloseXIcon({ size = 30 }: { size?: number }) {
  return (
    <img
      src={closeIcon}
      alt=""
      width={size}
      height={size}
      style={{ display: "block", filter: "brightness(0) invert(1)", opacity: 0.75 }}
    />
  );
}

interface ContactFormOverlayProps {
  open: boolean;
  onClose: () => void;
}

function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export function ContactFormContent({ onClose, embedded = false, onFieldInteract }: { onClose?: () => void; embedded?: boolean; onFieldInteract?: () => void }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mobileValidationError, setMobileValidationError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    lineHeight: 1,
    color: "#ffffff",
    letterSpacing: "-0.01em",
    caretColor: "#ffffff",
    width: "100%",
    display: "block",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "’Cal Sans’, sans-serif",
    fontWeight: 400,
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
    paddingBottom: "4px",
    marginBottom: isMobile ? "28px" : "72px",
  };

  const handleSubmit = async () => {
    if (!email || !isValidEmail(email)) {
      setEmailTouched(true);
      setMobileValidationError("Please enter a valid email.");
      return;
    }
    setMobileValidationError(null);
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
        .cf-input::placeholder { color: #414141; font-family: 'Sora', sans-serif; font-weight: 400; }
        @media (max-width: 1023px) {
          .cf-fields-grid { grid-template-columns: 1fr !important; }
          .cf-fields-grid > div { margin-bottom: 28px !important; }
          .cf-title { font-size: 48px !important; white-space: nowrap !important; }
          .cf-header { grid-template-columns: 1fr !important; gap: 8px !important; }
          .cf-header-right { padding-top: 0 !important; }
          .cf-header-right > p { font-size: 15px !important; max-width: 100% !important; }
          .cf-close-btn { display: none !important; }
          .cf-last-field { flex-direction: column !important; align-items: stretch !important; }
          .cf-inline-submit { display: none !important; }
          .cf-mobile-actions { display: flex !important; }
          .cf-last-field .cf-input { font-size: 14px !important; }
        }
      `}</style>

      {/* Full layout */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: embedded ? "center" : "flex-start", gap: embedded ? "40px" : "0", padding: embedded ? "40px max(40px, calc((100% - 1224px) / 2)) 100px" : "60px max(40px, calc((100% - 1224px) / 2)) 72px" }}>

        {/* Header */}
        <div className="cf-header" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", columnGap: "72px", marginBottom: embedded ? "0" : "80px" }}>
          <h2
            className="cf-title"
            style={{ fontFamily: "’Cal Sans’, sans-serif", fontWeight: 400, fontStyle: "normal", fontSize: "80px", color: "#6E6E6E", margin: 0, letterSpacing: "-0.04em", lineHeight: "120%" }}
          >
            {"Let’s Talk"}
          </h2>

          <div className="cf-header-right" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", paddingTop: "20px" }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "18px", color: "#6E6E6E", margin: 0, lineHeight: 1.6, maxWidth: "240px" }}>
              {"We’d love to hear what you’re building."}
            </p>
            <motion.button
              onClick={() => onClose?.()}
              initial="rest"
              whileHover="hover"
              className="cf-close-btn"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, height: "72px", display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}
            >
              <LeftBracket color="#A3A3A3" />
              <motion.div
                variants={{ rest: { width: 30 }, hover: { width: 102 } }}
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
              <RightBracket color="#A3A3A3" />
            </motion.button>
          </div>
        </div>

        {/* Fields grid */}
        <div
          className="cf-fields-grid"
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", columnGap: "72px" }}
        >
          {/* Row 1: Name | Email */}
          <div style={fieldStyle}>
            <div style={{ marginBottom: "8px" }}>
              <span style={labelStyle}>Who you are</span>
            </div>
            <input className="cf-input" value={name} onChange={(e) => setName(e.target.value)} onFocus={onFieldInteract} placeholder="[ Your Name ]" style={inputStyle} />
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
              onFocus={onFieldInteract}
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
            <input className="cf-input" value={company} onChange={(e) => setCompany(e.target.value)} onFocus={onFieldInteract} placeholder="[ Company Name ]" style={inputStyle} />
          </div>

          <div style={fieldStyle}>
            <div style={{ marginBottom: "8px" }}>
              <span style={labelStyle}>Faster Replies</span>
            </div>
            <input className="cf-input" type="tel" inputMode="numeric" value={phone} onChange={handlePhoneChange} onFocus={onFieldInteract} placeholder="[ Your Phone Number ]" style={inputStyle} />
          </div>

          {/* Row 3: Message full width + submit */}
          <div className="cf-last-field" style={{ ...fieldStyle, gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "24px", marginBottom: 0 }}>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: "8px" }}>
                <span style={labelStyle}>How can we help?</span>
                <span style={optionalStyle}>(optional)</span>
              </div>
              <textarea
                className="cf-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                  onFocus={onFieldInteract}
                placeholder="[ Tell us briefly what you need — project, problem, or idea. ]"
                rows={1}
                style={{ ...inputStyle, resize: "none", display: "block", overflow: "hidden" }}
              />
            </div>

            {/* Submit button — hidden on mobile, shown in cf-mobile-actions instead */}
            <motion.button
              className="cf-inline-submit"
              disabled={submitting || submitted}
              onClick={handleSubmit}
              initial="rest"
              whileHover={!submitting && !submitted ? "hover" : "rest"}
              style={{
                background: "none", border: "none",
                cursor: submitting || submitted ? "default" : "pointer",
                padding: "0", flexShrink: 0, height: "72px",
                display: isMobile ? "none" : "flex", alignItems: "center", justifyContent: "center", gap: "2px",
              }}
            >
              <LeftBracket color={submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "#F7F8FA"} />
              <motion.div variants={{ rest: { width: 46 }, hover: { width: 116 } }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "52px", flexShrink: 0 }}>
                <motion.span variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }} transition={{ duration: 0.15 }} style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {submitted || submitting ? <span style={{ fontSize: "22px", fontWeight: 600, fontFamily: "’Space Grotesk’, sans-serif", lineHeight: 1, color: submitted ? "#02A884" : "rgba(255,255,255,0.3)" }}>{submitted ? "✓" : "·"}</span> : <img src={arrowIcon} alt="" width={46} height={46} style={{ display: "block", filter: "brightness(0) invert(1)", opacity: 0.75 }} />}
                </motion.span>
                {!submitting && !submitted && (
                  <motion.span variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.2, delay: 0.18 }} style={{ fontFamily: "’Space Grotesk’, sans-serif", fontWeight: 500, fontSize: "32px", lineHeight: "1", letterSpacing: "0", textTransform: "uppercase" as const, color: "#02A884", whiteSpace: "nowrap" as const, position: "absolute" as const }}>ENTER</motion.span>
                )}
              </motion.div>
              <RightBracket color={submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "#F7F8FA"} />
            </motion.button>
          </div>

          {/* Mobile-only bottom actions row: [×] left, [SEND] right */}
          {mobileValidationError && (
            <p className="cf-mobile-actions" style={{ display: isMobile ? "block" : "none", gridColumn: "1 / -1", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#ff4d4d", margin: "8px 0 0", letterSpacing: "0.04em" }}>
              {mobileValidationError}
            </p>
          )}
          <div className="cf-mobile-actions" style={{ display: isMobile ? "flex" : "none", gridColumn: "1 / -1", justifyContent: "space-between", alignItems: "center", paddingTop: "16px" }}>
            {/* Close/Next button */}
            <motion.button onClick={() => onClose?.()} initial="rest" whileHover="hover" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, height: "52px", display: "flex", alignItems: "center", gap: "4px" }}>
              <LeftBracket height={40} arm={8} color="#A3A3A3" />
              <CloseXIcon size={26} />
              <RightBracket height={40} arm={8} color="#A3A3A3" />
            </motion.button>
            {/* Submit */}
            <motion.button disabled={submitting || submitted} onClick={handleSubmit} initial="rest" whileHover={!submitting && !submitted ? "hover" : "rest"} style={{ background: "none", border: "none", cursor: submitting || submitted ? "default" : "pointer", padding: 0, height: "52px", display: "flex", alignItems: "center", gap: "4px" }}>
              <LeftBracket height={40} arm={8} color={submitted ? "#02A884" : "#F7F8FA"} />
              <span style={{ fontFamily: "’Space Grotesk’, sans-serif", fontWeight: 600, fontSize: "20px", letterSpacing: "0.1em", textTransform: "uppercase", color: submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "#ffffff" }}>
                {submitted ? "✓ Sent" : submitting ? "···" : "Send"}
              </span>
              <RightBracket height={40} arm={8} color={submitted ? "#02A884" : "#F7F8FA"} />
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
