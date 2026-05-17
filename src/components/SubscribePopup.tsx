import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SubscribePopupProps {
  open: boolean;
  onClose: () => void;
}

export function SubscribePopup({ open, onClose }: SubscribePopupProps) {
  const [email, setEmail] = useState("");

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  flex: 1,
                  border: "1.5px solid #C8CDD8",
                  borderRadius: "10px",
                  background: "#ffffff",
                  padding: "14px 18px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  color: "#1a1a1a",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              {/* Subscribe button */}
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#1a1a1a",
                  border: "none",
                  borderRadius: "100px",
                  height: "52px",
                  boxSizing: "border-box",
                  padding: "0 5px 0 22px",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Subscribe
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#02A884",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7H12M12 7L7 2M12 7L7 12"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>

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
