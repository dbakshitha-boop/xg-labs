import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";
import { useContactForm } from "./ContactFormContext";

import img1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import img2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import img3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import img4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";
import img5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
interface ServiceItem {
  label: string;
  description: string;
}

interface ServiceData {
  title: string;
  description: string;
  images: string[];
  items: ServiceItem[];
}

const SERVICES: ServiceData[] = [
  {
    title: "PERFORMANCE MARKETING",
    description:
      "We build paid growth systems focused on conversions, efficiency, and measurable ROI — not vanity metrics. Every campaign is structured, optimized, and scaled using real data.",
    images: [img1, img3, img2, img5, img4],
    items: [
      { label: "Growth Strategy & Funnel Audit", description: "Identifies audience gaps, conversion bottlenecks, and revenue opportunities." },
      { label: "Paid Media Planning", description: "Selects the right platforms, budgets, and audience segments for maximum ROI." },
      { label: "Campaign Setup & Tracking", description: "Implements campaigns with accurate pixels, events, and attribution systems." },
      { label: "Ad Creative & Copy Development", description: "Creates conversion-focused messaging and visual assets." },
      { label: "Performance Optimisation & Scaling", description: "Continuously tests, improves, and scales winning campaigns." },
    ],
  },
  {
    title: "SEO",
    description:
      "We build sustainable search visibility through technical precision and content strategy — converting organic traffic into consistent, compounding business growth.",
    images: [img4, img2, img1, img3, img5],
    items: [
      { label: "SEO Audit & Roadmap", description: "Evaluates website performance and defines a long-term growth strategy." },
      { label: "Keyword Research & Intent Mapping", description: "Aligns search intent with high-value keywords across key pages." },
      { label: "On-Page SEO", description: "Optimises content structure, metadata, and internal linking." },
      { label: "Technical SEO", description: "Improves crawlability, indexing, speed, and site health." },
      { label: "Content & Authority Building", description: "Strengthens organic visibility through content and backlinks." },
    ],
  },
  {
    title: "WEB DEVELOPMENT",
    description:
      "We design and build performance-focused landing pages, funnels, and web experiences optimised for conversion — every pixel earns its place.",
    images: [img2, img5, img4, img1, img3],
    items: [
      { label: "UI/UX Design", description: "Creates intuitive experiences focused on usability and conversions." },
      { label: "Website & Landing Page Development", description: "Builds responsive websites and campaign-specific landing pages." },
      { label: "Conversion Funnel Architecture", description: "Designs user journeys that guide visitors towards action." },
      { label: "CMS & Integrations", description: "Connects websites with CRMs, analytics, forms, and automation tools." },
      { label: "Performance Optimisation", description: "Improves speed, responsiveness, and conversion rates." },
    ],
  },
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    description:
      "We manage your brand presence across platforms with consistent, strategic content — building community and protecting reputation at scale.",
    images: [img3, img1, img5, img2, img4],
    items: [
      { label: "Content Planning & Publishing", description: "Organises and schedules content across platforms consistently." },
      { label: "Community Management", description: "Engages audiences and manages interactions in real time." },
      { label: "Platform Strategy", description: "Develops channel-specific approaches aligned with business goals." },
      { label: "Social Listening & Reputation Management", description: "Monitors brand sentiment and customer feedback." },
      { label: "Performance Reporting", description: "Tracks key metrics and identifies opportunities for improvement." },
    ],
  },
  {
    title: "CONTENT CREATION & VIDEO PRODUCTION",
    description:
      "We produce content and videos built to capture attention and drive action — from short-form reels to long-form brand films.",
    images: [img5, img4, img3, img1, img2],
    items: [
      { label: "Content Strategy & Scripting", description: "Develops content themes, messaging, and creative direction." },
      { label: "Short-Form Content & Reels", description: "Produces platform-native content designed for engagement." },
      { label: "Brand Films & Video Production", description: "Creates high-quality videos that communicate brand value." },
      { label: "Photography & Creative Assets", description: "Captures visuals for campaigns, websites, and social media." },
      { label: "UGC & Creator Content", description: "Produces authentic creator-led content that builds trust." },
    ],
  },
  {
    title: "INFLUENCER MARKETING",
    description:
      "We run influencer campaigns with 1,000+ creators — micro to macro — built around strategy, relevance, and measurable reach.",
    images: [img2, img3, img1, img4, img5],
    items: [
      { label: "Influencer Strategy & Planning", description: "Defines creator profiles, objectives, and campaign direction." },
      { label: "Creator Discovery & Vetting", description: "Identifies relevant influencers based on audience quality and fit." },
      { label: "Campaign Execution & Management", description: "Coordinates content, timelines, and approvals." },
      { label: "Partnership & Deliverable Management", description: "Manages contracts, deliverables, and communication." },
      { label: "Campaign Analytics & Reporting", description: "Measures reach, engagement, and business impact." },
    ],
  },
  {
    title: "BRANDING",
    description:
      "We build brand identities that are distinct, strategic, and built to scale — from logos and systems to full brand guidelines.",
    images: [img4, img1, img2, img5, img3],
    items: [
      { label: "Brand Strategy & Positioning", description: "Defines purpose, audience, and market differentiation." },
      { label: "Logo & Visual Identity Design", description: "Creates memorable and scalable brand identities." },
      { label: "Brand Systems & Guidelines", description: "Establishes consistent rules for brand application." },
      { label: "Mascot & Character Design", description: "Develops distinctive assets that improve brand recall." },
      { label: "Packaging & Industrial Design", description: "Designs product experiences across physical touchpoints." },
    ],
  },
];

// ─── Accordion row ────────────────────────────────────────────────────────────
function AccordionRow({
  label,
  description,
  open,
  onToggle,
  isLast,
}: {
  label: string;
  description: string;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.1)" }}>
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
          padding: "14px 0",
          gap: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "'Cal Sans', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "1",
            letterSpacing: "0",
            color: "#5F5F5F",
            textTransform: "uppercase",
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
            <path d="M1 6H11" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
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
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Single card (absolutely positioned inside shared deck) ──────────────────
function CardSlide({
  service,
  index,
  total,
  scrollYProgress,
}: {
  service: ServiceData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const seg = 1 / total;
  const isLast = index === total - 1;

  // Slide in from below over its entry window
  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, seg] : [(index - 1) * seg, index * seg],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  // Scale down (peel away) over its exit window; last card never shrinks
  const scale = useTransform(
    scrollYProgress,
    [index * seg, (index + 1) * seg],
    [1, isLast ? 1 : 0.88]
  );

  // Stay invisible until the card starts entering, then instantly visible
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [(index - 1) * seg, (index - 1) * seg + seg * 0.04],
    index === 0 ? [1, 1] : [0, 1]
  );

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  const sectionId = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <motion.div
      id={sectionId}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: index + 1,
        y,
        scale,
        opacity,
        transformOrigin: "top center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          paddingTop: "52px",
          paddingRight: "60px",
          paddingBottom: "44px",
          paddingLeft: "60px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.28)",
          boxSizing: "border-box",
        }}
      >
        {/* Row 1: title + description + buttons */}
        <div style={{ display: "flex", gap: "48px", alignItems: "flex-start", marginBottom: "32px" }}>
          <div style={{ width: "280px", flexShrink: 0 }}>
            <h2
              style={{
                fontFamily: "’Space Grotesk’, sans-serif",
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
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
            <p
              style={{
                fontFamily: "’Space Grotesk’, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.1vw, 17px)",
                color: "#555555",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {service.description}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* View Cases */}
              <button
                onClick={() => navigate("/blog/case-study/0")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1.5px solid #1a1a1a",
                  borderRadius: "100px",
                  background: "#ffffff",
                  padding: "12px 14px 12px 22px",
                  cursor: "pointer",
                  fontFamily: "’Space Grotesk’, sans-serif",
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

              {/* Let’s Talk */}
              <button
                onClick={() => openContactForm()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "none",
                  borderRadius: "100px",
                  background: "#1a1a1a",
                  padding: "12px 14px 12px 22px",
                  cursor: "pointer",
                  fontFamily: "’Space Grotesk’, sans-serif",
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
                {"Let’s Talk"}
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

        {/* Row 2: image stretches to match accordion height */}
        <div style={{ display: "flex", gap: "48px", alignItems: "stretch" }}>
          <div style={{ width: "280px", flexShrink: 0, borderRadius: "12px", overflow: "hidden" }}>
            <img
              src={service.images[0]}
              alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            {service.items.map((item, i) => (
              <AccordionRow
                key={i}
                label={item.label}
                description={item.description}
                open={openIdx === i}
                onToggle={() => toggle(i)}
                isLast={i === service.items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Grid card (final overview, accordion-enabled) ────────────────────────────
function GridServiceCard({ service }: { service: ServiceData }) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div style={{ background: "#ffffff", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", height: "100%", overflow: "hidden" }}>
      {/* Title + description + buttons */}
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ width: "90px", flexShrink: 0 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", color: "#1a1a1a", margin: 0, lineHeight: "1.3" }}>
            {service.title}
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "9px", color: "#666", lineHeight: "1.5", margin: 0 }}>
            {service.description}
          </p>
          <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={() => navigate("/blog/case-study/0")} style={{ display: "flex", alignItems: "center", gap: "5px", border: "1px solid #1a1a1a", borderRadius: "100px", background: "#fff", padding: "4px 8px 4px 11px", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "7.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1a1a1a" }}>
              View Cases
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="6" height="6" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </button>
            <button onClick={() => openContactForm()} style={{ display: "flex", alignItems: "center", gap: "5px", border: "none", borderRadius: "100px", background: "#1a1a1a", padding: "4px 8px 4px 11px", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "7.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
              {"Let's Talk"}
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#02A884", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="6" height="6" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Image + accordion */}
      <div style={{ display: "flex", gap: "12px", flex: 1 }}>
        <div style={{ width: "90px", flexShrink: 0, borderRadius: "6px", overflow: "hidden" }}>
          <img src={service.images[0]} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ flex: 1 }}>
          {service.items.map((item, i) => (
            <div key={i} style={{ borderBottom: i < service.items.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", gap: "4px" }}
              >
                <span style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "8px", textTransform: "uppercase", color: "#5F5F5F", textAlign: "left" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "11px", color: "#9A9A9A", lineHeight: 1, flexShrink: 0 }}>{openIdx === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", color: "#777", lineHeight: "1.5", margin: "0 0 5px" }}>
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const total = SERVICES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();

  const [isGrid, setIsGrid] = useState(false);
  const gridThreshold = (total - 1) / total;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(Math.floor(v * total), total - 1));
    setIsGrid(v >= gridThreshold);
  });

  // Scroll to the target service card whenever location.state carries a serviceIndex.
  // Runs on mount AND on every same-page navigate (e.g. clicking from the footer
  // while already on /services). scrollYProgress goes 0→1 as scrollTop goes
  // 114 → 114+(total-1)*vh, so card i is at: 114 + i*(total-1)*vh/total.
  useEffect(() => {
    const idx = (location.state as { serviceIndex?: number } | null)?.serviceIndex;
    if (idx == null) return;
    const vh = window.innerHeight;
    const top = 114 + (idx / total) * (total - 1) * vh;
    requestAnimationFrame(() => window.scrollTo({ top, behavior: "smooth" }));
  }, [location, total]);

  return (
    <div style={{ background: "#060606" }}>
      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 200, height: "114px", pointerEvents: "none" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>
          <TopBar />
        </div>
      </div>

      {/* Scroll driver — one viewport-height per card */}
      <div ref={containerRef} style={{ height: `${total * 100}vh` }}>
        {/* One shared sticky deck */}
        <div
          style={{
            position: "sticky",
            top: "114px",
            height: "calc(100vh - 114px)",
            display: "flex",
            alignItems: "flex-start",
            paddingTop: "36px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Scroll indicator — hidden in grid mode */}
          <AnimatePresence>
            {!isGrid && (
              <motion.div
                key="indicator"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  right: "28px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 100,
                  width: "44px",
                }}
              >
                {SERVICES.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === activeIndex ? "38px" : "32px",
                      height: "2px",
                      borderRadius: "2px",
                      background: i === activeIndex ? "#ffffff" : i % 2 === 0 ? "#A3A3A3" : "#636363",
                      transition: "width 0.3s ease, background 0.3s ease",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stacked cards — fade out when grid mode */}
          <AnimatePresence>
            {!isGrid && (
              <motion.div
                key="stacked"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ position: "relative", maxWidth: "1224px", width: "calc(100% - 80px)", margin: "0 auto" }}
              >
                {SERVICES.map((svc, i) => (
                  <CardSlide
                    key={svc.title}
                    service={svc}
                    index={i}
                    total={total}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid view — fades in when all cards shown */}
          <AnimatePresence>
            {isGrid && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "8px",
                  bottom: "8px",
                  left: 0,
                  right: 0,
                  width: "min(1224px, calc(100% - 80px))",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gap: "16px",
                }}
              >
                {SERVICES.map((svc) => (
                  <GridServiceCard key={svc.title} service={svc} />
                ))}

                {/* View Works */}
                <div
                  onClick={() => navigate("/portfolio")}
                  style={{ background: "#ffffff", borderRadius: "12px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", cursor: "pointer", paddingBottom: "12px", paddingRight: "16px" }}
                >
                  <span style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.17vw, 80px)", lineHeight: "1.2", letterSpacing: "-0.04em", color: "rgba(0,0,0,0.15)", userSelect: "none", textAlign: "right" }}>
                    View Works
                  </span>
                </div>

                {/* Let's Talk */}
                <div
                  onClick={() => openContactForm()}
                  style={{ background: "#ffffff", borderRadius: "12px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", cursor: "pointer", paddingBottom: "12px", paddingRight: "16px" }}
                >
                  <span style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.17vw, 80px)", lineHeight: "1.2", letterSpacing: "-0.04em", color: "#636363", userSelect: "none", textAlign: "right" }}>
                    Let's talk
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
