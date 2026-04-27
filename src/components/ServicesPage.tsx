import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";

import img1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import img2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import img3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import img4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";
import img5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
interface ServiceData {
  title: string;
  description: string;
  images: string[];
  items: string[];
}

const SERVICES: ServiceData[] = [
  {
    title: "PERFORMANCE MARKETING",
    description:
      "We build paid growth systems focused on conversions, efficiency, and measurable ROI \u2014 not vanity metrics. Every campaign is structured, optimized, and scaled using real data.",
    images: [img1, img3, img2, img5, img4],
    items: [
      "PAID STRATEGY & FUNNEL AUDIT",
      "AD CREATIVE DEVELOPMENT",
      "CAMPAIGN SETUP & STRUCTURING",
      "OPTIMIZING & TESTING",
      "PERFORMANCE TRACKING & SCALING",
    ],
  },
  {
    title: "SEO",
    description:
      "We build sustainable search visibility through technical precision and content strategy \u2014 converting organic traffic into consistent, compounding business growth.",
    images: [img4, img2, img1, img3, img5],
    items: [
      "SEO AUDIT & STRATEGY",
      "ON-PAGE OPTIMISATION",
      "TECHNICAL SEO",
      "KEYWORD RESEARCH & MAPPING",
      "CONTENT SEO & LINK BUILDING",
    ],
  },
  {
    title: "WEB DEVELOPMENT",
    description:
      "We design and build performance-focused landing pages, funnels, and web experiences optimised for conversion \u2014 every pixel earns its place.",
    images: [img2, img5, img4, img1, img3],
    items: [
      "UI/UX DESIGN",
      "LANDING PAGE DEVELOPMENT",
      "FUNNEL ARCHITECTURE",
      "SPEED & PERFORMANCE OPTIMISATION",
      "CRO TESTING",
    ],
  },
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    description:
      "We manage your brand presence across platforms with consistent, strategic content \u2014 building community and protecting reputation at scale.",
    images: [img3, img1, img5, img2, img4],
    items: [
      "CONTENT SCHEDULING & PUBLISHING",
      "COMMUNITY MANAGEMENT",
      "PLATFORM STRATEGY",
      "MONTHLY REPORTING",
      "REPUTATION MANAGEMENT",
    ],
  },
  {
    title: "CONTENT CREATION & VIDEO PRODUCTION",
    description:
      "We produce content and videos built to capture attention and drive action \u2014 from short-form reels to long-form brand films.",
    images: [img5, img4, img3, img1, img2],
    items: [
      "SHORT-FORM CONTENT & REELS",
      "BRAND VIDEO PRODUCTION",
      "AD CREATIVE DEVELOPMENT",
      "UGC CAMPAIGNS",
      "PHOTOGRAPHY & VISUALS",
    ],
  },
  {
    title: "INFLUENCER MARKETING",
    description:
      "We run influencer campaigns with 1,000+ creators \u2014 micro to macro \u2014 built around strategy, relevance, and measurable reach.",
    images: [img2, img3, img1, img4, img5],
    items: [
      "INFLUENCER STRATEGY & PLANNING",
      "CREATOR SOURCING & VETTING",
      "CAMPAIGN MANAGEMENT",
      "CONTRACT & DELIVERABLE HANDLING",
      "PERFORMANCE REPORTING",
    ],
  },
  {
    title: "BRANDING",
    description:
      "We build brand identities that are distinct, strategic, and built to scale \u2014 from logos and systems to full brand guidelines.",
    images: [img4, img1, img2, img5, img3],
    items: [
      "LOGO DESIGN & IDENTITY",
      "BRAND SYSTEM DEVELOPMENT",
      "BRAND GUIDELINES",
      "MASCOT & CHARACTER DESIGN",
      "INDUSTRIAL & PACKAGING DESIGN",
    ],
  },
];

// ─── Accordion row ────────────────────────────────────────────────────────────
function AccordionRow({
  label,
  open,
  onToggle,
  isLast,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div
      style={{ borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.1)" }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          gap: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(11px, 0.9vw, 13px)",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            textAlign: "left",
          }}
        >
          {label}
        </span>
        <motion.div
          style={{
            width: 28,
            height: 28,
            border: "1.5px solid rgba(0,0,0,0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            {/* Horizontal bar — always visible */}
            <path d="M1 6H11" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            {/* Vertical bar — hidden when open */}
            <motion.path
              d="M6 1V11"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#777777",
                lineHeight: "1.65",
                paddingBottom: "20px",
                margin: 0,
              }}
            >
              Strategic approach to {label.toLowerCase()} — built to deliver
              measurable results at every stage of growth.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Image mosaic (left column) ───────────────────────────────────────────────
function ServiceMosaic({ images }: { images: string[] }) {
  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "180px 160px",
        gap: "6px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* large first tile spans 2 rows */}
      <div style={{ gridRow: "1 / 3", gridColumn: "1", overflow: "hidden" }}>
        <img
          src={images[0]}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ overflow: "hidden" }}>
        <img src={images[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ overflow: "hidden" }}>
        <img src={images[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ overflow: "hidden" }}>
        <img src={images[3]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ overflow: "hidden" }}>
        <img src={images[4] ?? images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
}

// ─── Single service section ───────────────────────────────────────────────────
function ServiceSection({
  service,
  index,
}: {
  service: ServiceData;
  index: number;
}) {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  const sectionId = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const stickyTop = 214 + index * 8;

  return (
    <div
      id={sectionId}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: index + 1,
        scrollMarginTop: `${stickyTop}px`,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          maxWidth: "1184px",
          width: "calc(100% - 80px)",
          margin: "0 auto",
          paddingTop: "60px",
          paddingRight: "60px",
          paddingBottom: "40px",
          paddingLeft: "60px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.22)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* ── Header row: title + description ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "80px",
            alignItems: "flex-start",
            marginBottom: "40px",
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(22px, 2.2vw, 34px)",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              margin: 0,
              lineHeight: "1.1",
            }}
          >
            {service.title}
          </h2>

          {/* Description + CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.1vw, 17px)",
                color: "#555555",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {service.description}
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* VIEW CASES */}
              <button
                onClick={() => navigate("/portfolio")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1.5px solid #1a1a1a",
                  borderRadius: "100px",
                  background: "#ffffff",
                  padding: "12px 14px 12px 22px",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.background = "#1a1a1a";
                  b.style.color = "#ffffff";
                  (b.querySelector(".vc-circle") as HTMLElement).style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.background = "#ffffff";
                  b.style.color = "#1a1a1a";
                  (b.querySelector(".vc-circle") as HTMLElement).style.background = "#1a1a1a";
                }}
              >
                View Cases
                <div
                  className="vc-circle"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {/* LET'S TALK */}
              <button
                onClick={() => navigate("/")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "none",
                  borderRadius: "100px",
                  background: "#1a1a1a",
                  padding: "12px 14px 12px 22px",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#333333")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a")
                }
              >
                {"Let\u2019s Talk"}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#02A884",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Content row: single image + accordion ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "48px",
            alignItems: "flex-start",
          }}
        >
          {/* Left: single image */}
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              height: "340px",
            }}
          >
            <img
              src={service.images[0]}
              alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Right: accordion */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {service.items.map((item, i) => (
              <AccordionRow
                key={i}
                label={item}
                open={openIdx === i}
                onToggle={() => toggle(i)}
                isLast={i === service.items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────────
function ServicesHero() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        padding: "160px 72px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#02A884",
          margin: "0 0 20px",
        }}
      >
        What We Do
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(44px, 7vw, 100px)",
          lineHeight: "1.0",
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          color: "#ffffff",
          margin: 0,
          maxWidth: "900px",
        }}
      >
        Built to grow. <br />
        <span style={{ color: "rgba(255,255,255,0.35)" }}>Designed to last.</span>
      </motion.h1>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ServicesPage() {
  return (
    <div style={{ background: "#060606", minHeight: "100vh" }}>
      {/* Nav - sticky at top, provides containing block for absolute TopBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, height: "114px", pointerEvents: "none" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>
          <TopBar />
        </div>
      </div>

      {/* Stacking service cards */}
      <div style={{ paddingBottom: "200px", paddingLeft: "40px", paddingRight: "40px" }}>
        {SERVICES.map((svc, i) => (
          <ServiceSection key={svc.title} service={svc} index={i} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
