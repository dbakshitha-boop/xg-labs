import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";
import { useContactForm } from "./ContactFormContext";

import svcPerformanceMarketing from "../assets/service section - xg web/Performance Marketing.png";
import svcSEO from "../assets/service section - xg web/SEO.png";
import svcWebDevelopment from "../assets/service section - xg web/Web Development.png";
import svcSocialMedia from "../assets/service section - xg web/Social Media Management.png";
import svcContentCreation from "../assets/service section - xg web/Content Creation & VP.png";
import svcInfluencer from "../assets/service section - xg web/Influencer Marketing.png";
import svcBranding from "../assets/service section - xg web/Branding.png";

import mobilePerformanceMarketing from "../assets/service section - xg web (311 x 250 px)/Performance Marketing.png";
import mobileSEO from "../assets/service section - xg web (311 x 250 px)/SEO.png";
import mobileWebDevelopment from "../assets/service section - xg web (311 x 250 px)/Web Development.png";
import mobileSocialMedia from "../assets/service section - xg web (311 x 250 px)/Social Media Management.png";
import mobileContentCreation from "../assets/service section - xg web (311 x 250 px)/Content Creation & VP.png";
import mobileInfluencer from "../assets/service section - xg web (311 x 250 px)/Influencer Marketing.png";
import mobileBranding from "../assets/service section - xg web (311 x 250 px)/Branding.png";

// ─── Data ────────────────────────────────────────────────────────────────────
interface ServiceItem {
  label: string;
  description: string;
}

interface ServiceData {
  title: string;
  description: string;
  images: string[];
  mobileImage: string;
  items: ServiceItem[];
}

const SERVICES: ServiceData[] = [
  {
    title: "PERFORMANCE MARKETING",
    description:
      "We build paid growth systems focused on conversions, efficiency, and measurable ROI — not vanity metrics. Every campaign is structured, optimized, and scaled using real data.",
    mobileImage: mobilePerformanceMarketing,
    images: [svcPerformanceMarketing],
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
    mobileImage: mobileSEO,
    images: [svcSEO],
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
    mobileImage: mobileWebDevelopment,
    images: [svcWebDevelopment],
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
    mobileImage: mobileSocialMedia,
    images: [svcSocialMedia],
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
    mobileImage: mobileContentCreation,
    images: [svcContentCreation],
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
    mobileImage: mobileInfluencer,
    images: [svcInfluencer],
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
    mobileImage: mobileBranding,
    images: [svcBranding],
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
  labelSize = "16px",
}: {
  label: string;
  description: string;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
  labelSize?: string;
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
            fontWeight: 500,
            fontSize: labelSize,
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

// ─── Mobile service card (vertical scroll layout) ────────────────────────────
function MobileServiceCard({ service }: { service: ServiceData }) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Padded top section: title + description + buttons */}
      <div style={{ padding: "24px 20px 20px" }}>
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Cal Sans', sans-serif",
          fontWeight: 400,
          fontSize: 28,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "#414141",
          margin: "0 0 10px",
          lineHeight: "1",
        }}
      >
        {service.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#6E6E6E",
          lineHeight: "1",
          letterSpacing: "-0.04em",
          margin: "0 0 18px",
        }}
      >
        {service.description}
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* View Cases */}
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          onClick={() => navigate("/blog/case-study/0")}
          style={{ position: "relative", height: 32, display: "inline-flex", cursor: "pointer" }}
        >
          <button
            style={{
              height: 32,
              paddingLeft: 8,
              paddingRight: 28,
              display: "inline-flex",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: 32,
              border: "1.5px solid #1a1a1a",
              cursor: "pointer",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
            />
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
              style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
            />
            <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 11 }}>
              <motion.span
                variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#1a1a1a" }}
              >
                View Cases
              </motion.span>
              <motion.span
                aria-hidden
                variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
              >
                View Cases
              </motion.span>
            </div>
          </button>
          <motion.div
            variants={{ rest: { background: "#0a0a0a" }, hover: { background: "#02A884" } }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", top: 0, right: -9, width: 32, height: 32, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Let's Talk */}
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          onClick={() => openContactForm()}
          style={{ position: "relative", height: 32, display: "inline-flex", cursor: "pointer" }}
        >
          <button
            style={{
              height: 32,
              paddingLeft: 8,
              paddingRight: 28,
              display: "inline-flex",
              alignItems: "center",
              background: "#0a0a0a",
              borderRadius: 32,
              border: "1.5px solid #0a0a0a",
              cursor: "pointer",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
            />
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
              style={{ position: "absolute", inset: 0, background: "#ffffff", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
            />
            <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 11 }}>
              <motion.span
                variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
              >
                {"Let's Talk"}
              </motion.span>
              <motion.span
                aria-hidden
                variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#5f5f5f" }}
              >
                {"Let's Talk"}
              </motion.span>
            </div>
          </button>
          <motion.div
            variants={{ rest: { background: "#02A884" }, hover: { background: "#0a0a0a" } }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", top: 0, right: -9, width: 32, height: 32, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.3 }} d="M5 12h14" />
              <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.3 }} d="M13 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      </div>{/* end padded top section */}

      {/* Service image — 311×250 mobile-specific asset, inset with card corner radius */}
      <div style={{ padding: "0 16px" }}>
        <img
          src={service.mobileImage}
          alt={service.title}
          style={{ width: "100%", height: 250, objectFit: "cover", display: "block", borderRadius: 16 }}
        />
      </div>

      {/* Accordion */}
      <div style={{ padding: "4px 20px 28px" }}>
        {service.items.map((item, i) => (
          <AccordionRow
            key={i}
            label={item.label}
            description={item.description}
            open={openIdx === i}
            onToggle={() => toggle(i)}
            isLast={i === service.items.length - 1}
            labelSize="16px"
          />
        ))}
      </div>
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

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* View Cases */}
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                onClick={() => navigate("/blog/case-study/0")}
                style={{ position: "relative", height: 36, display: "inline-flex", cursor: "pointer" }}
              >
                <button
                  style={{
                    height: 36,
                    paddingLeft: 12,
                    paddingRight: 38,
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#ffffff",
                    borderRadius: 36,
                    border: "1.5px solid #1a1a1a",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
                  />
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
                    style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
                  />
                  <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 13 }}>
                    <motion.span
                      variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ display: "block", fontFamily: "’Space Grotesk’, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#1a1a1a" }}
                    >
                      View Cases
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "’Space Grotesk’, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
                    >
                      View Cases
                    </motion.span>
                  </div>
                </button>
                <motion.div
                  variants={{ rest: { background: "#0a0a0a" }, hover: { background: "#02A884" } }}
                  transition={{ duration: 0.3 }}
                  style={{ position: "absolute", top: 0, right: -11, width: 36, height: 36, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Let’s Talk — black oval, white text, teal circle, black arrow → hover: white bg, grey text, black circle, white arrow */}
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                onClick={() => openContactForm()}
                style={{ position: "relative", height: 36, display: "inline-flex", cursor: "pointer" }}
              >
                <button
                  style={{
                    height: 36,
                    paddingLeft: 12,
                    paddingRight: 38,
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#0a0a0a",
                    borderRadius: 36,
                    border: "1.5px solid #0a0a0a",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
                  />
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
                    style={{ position: "absolute", inset: 0, background: "#ffffff", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
                  />
                  <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 13 }}>
                    <motion.span
                      variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ display: "block", fontFamily: "’Space Grotesk’, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
                    >
                      {"Let’s Talk"}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "’Space Grotesk’, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#5f5f5f" }}
                    >
                      {"Let’s Talk"}
                    </motion.span>
                  </div>
                </button>
                <motion.div
                  variants={{ rest: { background: "#02A884" }, hover: { background: "#0a0a0a" } }}
                  transition={{ duration: 0.3 }}
                  style={{ position: "absolute", top: 0, right: -11, width: 36, height: 36, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.3 }} d="M5 12h14" />
                    <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.3 }} d="M13 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
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
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  const [isGrid, setIsGrid] = useState(false);
  const gridThreshold = (total - 1) / total;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    if (isMobile) {
      const sectionId = SERVICES[idx]?.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (sectionId) document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const vh = window.innerHeight;
    const top = 114 + (idx / total) * (total - 1) * vh;
    requestAnimationFrame(() => window.scrollTo({ top, behavior: "smooth" }));
  }, [location, total, isMobile]);

  if (isMobile) {
    return (
      <div style={{ background: "#060606" }}>
        {/* Sticky nav */}
        <div style={{ position: "sticky", top: 0, zIndex: 200, height: "114px", pointerEvents: "none" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>
            <TopBar />
          </div>
        </div>

        {/* Mobile service cards */}
        <div style={{ padding: "20px 40px 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {SERVICES.map((svc) => {
            const sectionId = svc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <div key={svc.title} id={sectionId}>
                <MobileServiceCard service={svc} />
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    );
  }

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
