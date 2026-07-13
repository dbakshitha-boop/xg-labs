import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { subscribeEmail } from "../lib/api";

interface SubscribePopupProps {
  open: boolean;
  onClose: () => void;
}

function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export function SubscribePopup({ open, onClose }: SubscribePopupProps) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailError = touched && email.length > 0 && !isValidEmail(email);
  const alreadySubscribed = error === "Already subscribed";

  const handleSubscribe = async () => {
    setTouched(true);
    if (!email || !isValidEmail(email)) return;
    setSubmitting(true);
    setError(null);
    try {
      await subscribeEmail(email);
      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.25)",
              zIndex: 500,
            }}
          />

          {/* Centering wrapper — static, no Framer transforms */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 501,
              width: "min(560px, 90vw)",
            }}
          >
          {/* Modal — animated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "#ECEEF2",
              border: "1px solid #C8CDD8",
              borderRadius: "16px",
              padding: "48px 44px 40px",
              width: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0px",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "18px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "22px",
                color: "#888888",
                lineHeight: 1,
                padding: "4px 6px",
              }}
            >
              ×
            </button>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                color: "#888888",
                margin: "0 0 16px",
                textAlign: "center",
              }}
            >
              Get updates that matter
            </p>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.8vw, 32px)",
                lineHeight: "130%",
                letterSpacing: "-0.02em",
                color: "#1a1a1a",
                margin: "0 0 32px",
                textAlign: "center",
                maxWidth: "440px",
              }}
            >
              Insights on strategy, design, and growth — shared occasionally. No spam. Unsubscribe anytime.
            </h2>

            {/* Email row */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "10px",
                width: "100%",
                marginBottom: "16px",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                onBlur={() => setTouched(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="you@company.com"
                disabled={submitting || submitted}
                style={{
                  flex: 1,
                  height: 48,
                  border: `1.5px solid ${emailError ? "#ff4d4d" : "#C8CDD8"}`,
                  borderRadius: "10px",
                  background: "#ffffff",
                  padding: "0 18px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  color: "#1a1a1a",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              {/* Subscribe button */}
              <motion.div
                initial="rest"
                animate={submitted ? "success" : "rest"}
                whileHover={submitting || submitted ? undefined : "hover"}
                whileTap={submitting || submitted ? undefined : "hover"}
                style={{
                  position: "relative",
                  height: 48,
                  display: "inline-flex",
                  flexShrink: 0,
                  pointerEvents: submitting || submitted ? "none" : "auto",
                }}
              >
                <motion.button
                  onClick={handleSubscribe}
                  disabled={submitting || submitted}
                  variants={{
                    rest: { backgroundColor: "#060606", borderColor: "#060606" },
                    hover: { backgroundColor: "rgba(0,0,0,0)", borderColor: "#9A9A9A" },
                    success: { backgroundColor: "#02A884", borderColor: "#02A884" },
                  }}
                  transition={{ duration: 0.18 }}
                  style={{
                    height: 48,
                    paddingTop: 0,
                    paddingRight: 34,
                    paddingBottom: 0,
                    paddingLeft: 18,
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: 100,
                    borderWidth: 1.5,
                    borderStyle: "solid",
                    cursor: submitting || submitted ? "default" : "pointer",
                    boxSizing: "border-box",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, fontSize: 17, height: "1em" }}>
                    <motion.span
                      variants={{
                        rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
                        hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } },
                        success: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 17, lineHeight: 1, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#F7F8FA" }}
                    >
                      {submitting ? "..." : "Subscribe"}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{
                        rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
                        hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } },
                        success: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      style={{ position: "absolute" as const, top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 17, lineHeight: 1, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, color: "#414141" }}
                    >
                      {submitted ? "Subscribed ✓" : submitting ? "..." : "Subscribe"}
                    </motion.span>
                  </div>
                </motion.button>
                <motion.div
                  variants={{ rest: { background: "#02A884" }, hover: { background: "#060606" }, success: { background: "#ffffff" } }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: 4, right: -12, width: 40, height: 40, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4, pointerEvents: "none" }}
                >
                  <motion.svg
                    width={15}
                    height={15}
                    viewBox="0 0 14 14"
                    fill="none"
                    variants={{ rest: { stroke: "#060606" }, hover: { stroke: "#F7F8FA" }, success: { stroke: "#02A884" } }}
                    transition={{ duration: 0.18 }}
                  >
                    <path d="M2 7H12M12 7L7 2M12 7L7 12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Validation / error feedback */}
            {emailError && (
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#ff4d4d", margin: "-8px 0 8px", alignSelf: "flex-start" }}>
                Please enter a valid email address.
              </p>
            )}
            {error && !emailError && (
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: alreadySubscribed ? "#02A884" : "#ff4d4d", margin: "-8px 0 8px", alignSelf: "flex-start" }}>
                {alreadySubscribed ? "You're already subscribed!" : error}
              </p>
            )}

            {/* Footer note */}
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "#888888",
                margin: 0,
                textAlign: "center",
              }}
            >
              We send updates only when we have something worth sharing.
            </p>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
