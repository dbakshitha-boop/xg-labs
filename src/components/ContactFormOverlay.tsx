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
    fontSize: "clamp(22px, 2.6vw, 38px)",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    caretColor: "#ffffff",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "’Space Grotesk’, sans-serif",
    fontWeight: 700,
    fontSize: "13px",
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
      <style>{`
        .cf-input::placeholder { color: rgba(255,255,255,0.22); }
        @media (max-width: 767px) {
          .cf-header-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .cf-fields-grid { grid-template-columns: 1fr !important; }
          .cf-body { padding: 32px 24px 40px !important; }
          .cf-title { font-size: 40px !important; }
        }
      `}</style>
      <GridLines dark />

      {/* Light strip — only in overlay mode */}
      {!embedded && (
        <div
          style={{
            background: "#0a0a0a",
            height: "72px",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <GridLines dark />
        </div>
      )}

      {/* Form body */}
      <div
        className={embedded ? "" : "cf-body"}
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
        {/* Header row — 2-col grid matching the fields below */}
        <div
          className="cf-header-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "56px",
            marginBottom: "52px",
          }}
        >
          {/* Left: title */}
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

          {/* Right: description + close — aligns with right column fields */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
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
                  flexShrink: 0,
                }}
              >
                [X]
              </button>
            )}
          </div>
        </div>

        {/* Fields grid */}
        <div
          className="cf-fields-grid"
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
              onBlur={() => setEmailTouched(true)}
              placeholder="[ Your Email ]"
              style={{ ...inputStyle, borderBottom: emailError ? "1px solid #ff4d4d" : undefined }}
            />
            {emailError && (
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#ff4d4d", margin: "6px 0 0", letterSpacing: "0.04em" }}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Faster Replies</label>
            <input
              className="cf-input"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
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
              disabled={submitting || submitted}
              onClick={async () => {
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
              }}
              style={{
                background: "none",
                border: "none",
                cursor: submitting || submitted ? "default" : "pointer",
                fontFamily: "’Space Grotesk’, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: submitted ? "#02A884" : submitting ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.55)",
                letterSpacing: "0.12em",
                paddingBottom: "10px",
                flexShrink: 0,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { if (!submitting && !submitted) (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { if (!submitting && !submitted) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
            >
              {submitted ? "[SENT ✓]" : submitting ? "[SENDING...]" : "[ENTER]"}
            </button>
            {submitError && (
              <p style={{ fontFamily: "’Space Grotesk’, sans-serif", fontSize: "12px", color: "#ff4d4d", margin: "0 0 10px", letterSpacing: "0.04em" }}>
                {submitError}
              </p>
            )}
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
