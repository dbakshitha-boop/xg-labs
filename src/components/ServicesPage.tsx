import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useNavigationType } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";
import { useContactForm } from "./ContactFormContext";
import xgLogoWhite from "../assets/2.png";

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
  rowPadding = "14px 0",
  circleSize = 28,
}: {
  label: string;
  description: string;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
  labelSize?: string;
  rowPadding?: string;
  circleSize?: number;
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
          padding: rowPadding,
          gap: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "'Cal Sans', sans-serif",
            fontWeight: 400,
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
            width: circleSize,
            height: circleSize,
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.08)",
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
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#6E6E6E",
                letterSpacing: "-0.04em",
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
function MobileServiceCard({ service, active = true }: { service: ServiceData; active?: boolean }) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Touch has no hover state. The "Let's Talk" button starts already in its
  // hover look (no animated entry), then eases backward into rest once this
  // card swipes into place.
  const [talkPulsing, setTalkPulsing] = useState(true);
  useEffect(() => {
    if (!active) return;
    const settleTimer = setTimeout(() => setTalkPulsing(false), 700);
    return () => clearTimeout(settleTimer);
  }, [active]);

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  return (
    <div
      style={{
        background: "#F7F8FA",
        borderRadius: 16,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Padded top section: title + description + buttons */}
      <div style={{ padding: "20px 20px 14px" }}>
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Cal Sans'",
          fontWeight: 400,
          fontSize: 21,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "#414141",
          margin: "0 0 8px",
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
          fontSize: 13,
          color: "#6E6E6E",
          lineHeight: "1.4",
          letterSpacing: "-0.04em",
          margin: "0 0 16px",
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
          style={{ position: "relative", height: 28, display: "inline-flex", cursor: "pointer" }}
        >
          <button
            style={{
              height: 28,
              paddingLeft: 12,
              paddingRight: 22,
              display: "inline-flex",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: 42,
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
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
            />
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
              style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
            />
            <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 11 }}>
              <motion.span
                variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#1a1a1a" }}
              >
                View Cases
              </motion.span>
              <motion.span
                aria-hidden
                variants={{ rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
              >
                View Cases
              </motion.span>
            </div>
          </button>
          <motion.div
            variants={{ rest: { background: "#0a0a0a" }, hover: { background: "#02A884" } }}
            transition={{ duration: 0.18 }}
            style={{ position: "absolute", top: 0, right: -9, width: 28, height: 28, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
          >
            <motion.svg width={16} height={16} viewBox="0 0 24 24" fill="none" variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Let's Talk */}
        <motion.div
          initial="hover"
          whileHover="hover"
          animate={talkPulsing ? "hover" : "rest"}
          onClick={() => openContactForm()}
          style={{ position: "relative", height: 28, display: "inline-flex", cursor: "pointer" }}
        >
          <button
            style={{
              height: 28,
              paddingLeft: 12,
              paddingRight: 22,
              display: "inline-flex",
              alignItems: "center",
              background: "#0a0a0a",
              borderRadius: 42,
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
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
            />
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
              style={{ position: "absolute", inset: 0, background: "#ffffff", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
            />
            <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 11 }}>
              <motion.span
                variants={{ rest: { y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
              >
                {"Let's Talk"}
              </motion.span>
              <motion.span
                aria-hidden
                variants={{ rest: { y: "100%", transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0", textTransform: "uppercase", whiteSpace: "nowrap", color: "#5f5f5f" }}
              >
                {"Let's Talk"}
              </motion.span>
            </div>
          </button>
          <motion.div
            variants={{ rest: { background: "#02A884" }, hover: { background: "#0a0a0a" } }}
            transition={{ duration: 0.26 }}
            style={{ position: "absolute", top: 0, right: -9, width: 28, height: 28, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.26 }} d="M5 12h14" />
              <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.26 }} d="M13 5l7 7-7 7" />
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
          style={{ width: "100%", height: 190, objectFit: "cover", display: "block", borderRadius: 16 }}
        />
      </div>

      {/* Accordion */}
      <div style={{ padding: "4px 20px 12px" }}>
        {service.items.map((item, i) => (
          <AccordionRow
            key={i}
            label={item.label}
            description={item.description}
            open={openIdx === i}
            onToggle={() => toggle(i)}
            isLast={i === service.items.length - 1}
            labelSize="13px"
            rowPadding="10px 0"
            circleSize={24}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Stacked-deck transform ────────────────────────────────────────────────
// Cards already scrolled past don't just shrink in place — each one steps up
// and back a little further than the last, so a few of them peek out above
// the active card like a real card pile. Depth is capped so cards beyond it
// sit exactly on top of the last visible layer (hidden underneath it) rather
// than continuing to shrink indefinitely.
function stackedTransform(
  relative: number,
  { yStep = 14, scaleStep = 0.045, opacityStep = 0.05, maxDepth = 3 } = {}
): { y: string; scale: number; opacity: number } {
  if (relative > 0) return { y: "100%", scale: 1, opacity: 0 }; // not yet reached
  if (relative === 0) return { y: "0%", scale: 1, opacity: 1 }; // current
  const depth = Math.min(-relative, maxDepth); // already passed
  return {
    y: `${-depth * yStep}px`,
    scale: 1 - depth * scaleStep,
    opacity: 1 - depth * opacityStep,
  };
}

// ─── Single card (absolutely positioned inside shared deck) ──────────────────
function CardSlide({
  service,
  index,
  total,
  activeIndex,
}: {
  service: ServiceData;
  index: number;
  total: number;
  activeIndex: number;
}) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const accordionColRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = useState<number | null>(null);

  // Keep the image height in sync with the accordion column, including
  // while an item is animating open/closed, so the image grows/shrinks with it.
  useEffect(() => {
    const el = accordionColRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height;
      if (height) setAccordionHeight(height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const relative = index - activeIndex;
  const isActive = relative === 0;

  // Not yet reached: waiting off-screen below.
  // Already passed: stacked behind the current card, each one further back
  // peeking out a little more above it.
  // Current: fully in place, front and center.
  const { y, scale, opacity } = stackedTransform(relative);

  // The "Let's Talk" button starts already in its hover look (no animated
  // entry), then eases backward into rest once this card scrolls into place —
  // a nudge, independent of whether the user is actually hovering it.
  const [talkPulsing, setTalkPulsing] = useState(true);
  useEffect(() => {
    if (!isActive) return;
    const settleTimer = setTimeout(() => setTalkPulsing(false), 700);
    return () => clearTimeout(settleTimer);
  }, [isActive]);

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  const sectionId = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <motion.div
      id={sectionId}
      initial={false}
      animate={{ y, scale, opacity }}
      transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: index + 1,
        transformOrigin: "top center",
      }}
    >
      <div
        style={{
          background: "#F7F8FA",
          borderRadius: "24px",
          width: "100%",
          paddingTop: "60px",
          paddingRight: "80px",
          paddingBottom: "52px",
          paddingLeft: "80px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.28)",
          boxSizing: "border-box",
        }}
      >
        {/* Row 1: title + description + buttons */}
        <div style={{ display: "flex", gap: "110px", alignItems: "flex-start", marginBottom: "44px" }}>
          <div style={{ width: "280px", flexShrink: 0, marginLeft: "-24px" }}>
            <h2
              style={{
                fontFamily: "'Cal Sans', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(16px, 1.5vw, 23px)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "#414141",
                margin: 0,
                lineHeight: "1.1",
              }}
            >
              {service.title}
            </h2>
          </div>

          <div style={{ flex: 1, maxWidth: "620px", display: "flex", flexDirection: "column", gap: "32px" }}>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1vw, 15px)",
                color: "#6E6E6E",
                letterSpacing: "-0.04em",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {service.description}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* View Cases */}
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                onClick={() => navigate("/blog/case-study/0")}
                style={{ position: "relative", height: 40, display: "inline-flex", cursor: "pointer" }}
              >
                <button
                  style={{
                    height: 40,
                    paddingLeft: 10,
                    paddingRight: 34,
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#ffffff",
                    borderRadius: 42,
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
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
                  />
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                    style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
                  />
                  <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 15 }}>
                    <motion.span
                      variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                      style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#1a1a1a" }}
                    >
                      View Cases
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{ rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                      style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
                    >
                      View Cases
                    </motion.span>
                  </div>
                </button>
                <motion.div
                  variants={{ rest: { background: "#0a0a0a" }, hover: { background: "#02A884" } }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: 1, right: -9, width: 38, height: 38, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
                >
                  <motion.svg width={20} height={20} viewBox="0 0 24 24" fill="none" variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </motion.div>

              {/* Let’s Talk — black oval, white text, teal circle, black arrow → hover: white bg, grey text, black circle, white arrow */}
              <motion.div
                initial="hover"
                whileHover="hover"
                animate={talkPulsing ? "hover" : "rest"}
                onClick={() => openContactForm()}
                style={{ position: "relative", height: 40, display: "inline-flex", cursor: "pointer" }}
              >
                <button
                  style={{
                    height: 40,
                    paddingLeft: 10,
                    paddingRight: 34,
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#0a0a0a",
                    borderRadius: 42,
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
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }}
                  />
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                    style={{ position: "absolute", inset: 0, background: "#ffffff", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }}
                  />
                  <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: 15 }}>
                    <motion.span
                      variants={{ rest: { y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                      style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}
                    >
                      {"Let’s Talk"}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{ rest: { y: "100%", transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
                      style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#5f5f5f" }}
                    >
                      {"Let’s Talk"}
                    </motion.span>
                  </div>
                </button>
                <motion.div
                  variants={{ rest: { background: "#02A884" }, hover: { background: "#0a0a0a" } }}
                  transition={{ duration: 0.26 }}
                  style={{ position: "absolute", top: 1, right: -9, width: 38, height: 38, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
                >
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.26 }} d="M5 12h14" />
                    <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.26 }} d="M13 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Row 2: image height tracks the accordion column, growing/shrinking as items expand */}
        <div style={{ display: "flex", gap: "110px", alignItems: "flex-start" }}>
          <div style={{ width: "280px", flexShrink: 0, marginLeft: "-24px", borderRadius: "12px", overflow: "hidden", height: accordionHeight ? `${accordionHeight}px` : "auto" }}>
            <img
              src={service.images[0]}
              alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div ref={accordionColRef} style={{ flex: 1, maxWidth: "620px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {service.items.map((item, i) => (
              <AccordionRow
                key={i}
                label={item.label}
                description={item.description}
                open={openIdx === i}
                onToggle={() => toggle(i)}
                isLast={i === service.items.length - 1}
                labelSize="18px"
                rowPadding="20px 0"
                circleSize={30}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Grid card (final overview, accordion-enabled) ────────────────────────────
function GridServiceCard({ service, compact = false }: { service: ServiceData; compact?: boolean }) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Trimmed a notch for short (non-maximized) desktop windows — see the
  // `isShortWindow` comment at the call site for why.
  const cardPad = compact ? "10px" : "16px";
  const cardGap = compact ? "6px" : "10px";
  const titleWidth = compact ? "72px" : "90px";
  const titleSize = compact ? "9px" : "10px";
  const descSize = compact ? "8px" : "9px";
  const btnHeight = compact ? 18 : 22;
  const btnTextHeight = compact ? 7 : 8;
  const btnFontSize = compact ? 7 : 8;
  const imgWidth = compact ? "64px" : "90px";
  const rowPad = compact ? "4px 0" : "6px 0";
  const itemLabelSize = compact ? "7px" : "8px";
  const itemToggleSize = compact ? "9px" : "11px";
  const itemDescSize = compact ? "6px" : "7px";

  return (
    <div style={{ background: "#F7F8FA", borderRadius: "12px", padding: cardPad, display: "flex", flexDirection: "column", gap: cardGap, boxSizing: "border-box", height: "100%", overflow: "hidden" }}>
      {/* Title + description + buttons */}
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ width: titleWidth, flexShrink: 0 }}>
          <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: titleSize, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#414141", margin: 0, lineHeight: "1.3" }}>
            {service.title}
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: descSize, color: "#6E6E6E", letterSpacing: "-0.04em", lineHeight: "1.5", margin: 0 }}>
            {service.description}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* View Cases */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              onClick={() => navigate("/blog/case-study/0")}
              style={{ position: "relative", height: btnHeight, display: "inline-flex", cursor: "pointer" }}
            >
              <button
                style={{
                  height: btnHeight,
                  paddingLeft: 8,
                  paddingRight: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#ffffff",
                  borderRadius: 42,
                  border: "1px solid #1a1a1a",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: btnTextHeight }}>
                  <motion.span variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: btnFontSize, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#1a1a1a" }}>View Cases</motion.span>
                  <motion.span aria-hidden variants={{ rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: btnFontSize, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}>View Cases</motion.span>
                </div>
              </button>
              <motion.div variants={{ rest: { background: "#0a0a0a" }, hover: { background: "#02A884" } }} transition={{ duration: 0.18 }} style={{ position: "absolute", top: 0, right: -5, width: 20, height: 20, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                <motion.svg width={11} height={11} viewBox="0 0 24 24" fill="none" variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
                </motion.svg>
              </motion.div>
            </motion.div>

            {/* Let's Talk */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              onClick={() => openContactForm()}
              style={{ position: "relative", height: btnHeight, display: "inline-flex", cursor: "pointer" }}
            >
              <button
                style={{
                  height: btnHeight,
                  paddingLeft: 8,
                  paddingRight: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#0a0a0a",
                  borderRadius: 42,
                  border: "1px solid #0a0a0a",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: "absolute", inset: 0, background: "#ffffff", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: btnTextHeight }}>
                  <motion.span variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: btnFontSize, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}>{"Let’s Talk"}</motion.span>
                  <motion.span aria-hidden variants={{ rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: btnFontSize, fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#5f5f5f" }}>{"Let’s Talk"}</motion.span>
                </div>
              </button>
              <motion.div variants={{ rest: { background: "#02A884" }, hover: { background: "#0a0a0a" } }} transition={{ duration: 0.18 }} style={{ position: "absolute", top: 0, right: -5, width: 20, height: 20, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.18 }} d="M5 12h14" />
                  <motion.path variants={{ rest: { stroke: "#000000" }, hover: { stroke: "#ffffff" } }} transition={{ duration: 0.18 }} d="M13 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image + accordion */}
      <div style={{ display: "flex", gap: "12px", flex: 1 }}>
        <div style={{ width: imgWidth, flexShrink: 0, borderRadius: "6px", overflow: "hidden" }}>
          <img src={service.images[0]} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ flex: 1 }}>
          {service.items.map((item, i) => (
            <div key={i} style={{ borderBottom: i < service.items.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: rowPad, gap: "4px" }}
              >
                <span style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: itemLabelSize, letterSpacing: "0", textTransform: "uppercase", color: "#5F5F5F", textAlign: "left" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: itemToggleSize, color: "#9A9A9A", lineHeight: 1, flexShrink: 0 }}>{openIdx === i ? "−" : "+"}</span>
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
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: itemDescSize, color: "#6E6E6E", letterSpacing: "-0.04em", lineHeight: "1.5", margin: "0 0 5px" }}>
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

// ─── Mobile card (same stack/peel step effect as the desktop CardSlide) ──────
function MobileCardSlide({
  service,
  index,
  total,
  activeIndex,
}: {
  service: ServiceData;
  index: number;
  total: number;
  activeIndex: number;
}) {
  const relative = index - activeIndex;
  const isActive = relative === 0;

  const { y, scale, opacity } = stackedTransform(relative, { yStep: 10, scaleStep: 0.035, opacityStep: 0.04 });

  return (
    <motion.div
      initial={false}
      animate={{ y, scale, opacity }}
      transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
      style={{
        position: "absolute",
        top: 16,
        left: 0,
        right: 0,
        zIndex: index + 1,
        transformOrigin: "top center",
      }}
    >
      <MobileServiceCard service={service} active={isActive} />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const STEP_LOCK_MS = 750;
const SWIPE_THRESHOLD = 40;
// Trackpad "flicks" fire a long tail of wheel events (momentum scrolling) well
// after the physical gesture ends. Events closer together than this count as
// the same gesture — only the first one in a burst steps the deck; the rest
// are swallowed (not re-armed) until the stream goes quiet for this long.
const GESTURE_IDLE_MS = 220;
// Hard minimum dwell time on the grid finale before a forward scroll can
// release into the footer — see exitBoundaryCooldownUntilRef.
const EXIT_BOUNDARY_COOLDOWN_MS = 900;
// Persists the deck's last position across a "View Works"/"Let's talk" trip
// away and a browser-back return to this page (see the slideIndex init below).
const SERVICES_SLIDE_INDEX_KEY = "xg-services-slide-index";

// Grid finale — instead of all 9 tiles popping in as one flat fade, each one
// cascades in slightly after the last via staggerChildren, so the reveal
// reads as a wave rather than a single abrupt pop.
const GRID_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.045, delayChildren: 0.08 },
  },
};
const GRID_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export function ServicesPage() {
  const total = SERVICES.length;
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const { open: openContactForm } = useContactForm();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  // The grid finale's cards live inside a fixed calc(100vh - 96px) deck (see
  // below) split into 3 equal rows — a shrunk (non-maximized) desktop window
  // gives each row less height, but the card's title/description block and
  // its 5 fixed-size accordion rows don't shrink with it, so the accordion's
  // last rows (and sometimes the image) get clipped by the card's own
  // overflow:hidden. Below a short-window threshold, GridServiceCard dials
  // its own padding/gaps/font-sizes down a notch so everything fits again.
  const [isShortWindow, setIsShortWindow] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight < 760 : false
  );

  // slideIndex ranges 0..total on desktop (total = the finale grid) and
  // 0..total-1 on mobile (no grid finale there). One scroll/swipe tick = one step.
  //
  // Landing here via the browser's back/forward button ("POP") restores
  // wherever the deck was left — e.g. clicking "View Works" off the grid
  // finale and then hitting back should land back on the grid, not reset to
  // the first card — by reading the last position persisted below. This has
  // to take priority over location.state.serviceIndex on a POP: several links
  // (footer, landing page service cards) navigate here with an explicit
  // serviceIndex, and that state stays attached to the history entry forever
  // — without this ordering, going back would keep re-reading whatever
  // service the page was ORIGINALLY opened to rather than where it was left.
  // A fresh forward visit (nav link, direct URL) has no persisted position to
  // restore, so it honors an explicit serviceIndex, or otherwise starts at
  // the first card.
  const [slideIndex, setSlideIndex] = useState<number>(() => {
    if (navigationType === "POP") {
      const stored = Number(sessionStorage.getItem(SERVICES_SLIDE_INDEX_KEY));
      if (Number.isFinite(stored) && stored > 0) return Math.min(stored, total);
    }
    const idx = (location.state as { serviceIndex?: number } | null)?.serviceIndex;
    return idx != null ? Math.min(Math.max(idx, 0), total) : 0;
  });

  // Keep that persisted position current as the user scrolls through the deck.
  useEffect(() => {
    sessionStorage.setItem(SERVICES_SLIDE_INDEX_KEY, String(slideIndex));
  }, [slideIndex]);

  const isMobileRef = useRef(isMobile);
  const slideIndexRef = useRef(slideIndex);
  const isAnimatingRef = useRef(false);
  // Minimum time the exit boundary (the grid finale) must be dwelt on before
  // any wheel input is allowed to release forward into the footer — set the
  // instant step() lands there. A trackpad's momentum tail after a big flick
  // can have gaps between its decelerating ticks that exceed GESTURE_IDLE_MS,
  // so the gesture-freshness check alone can misread the tail as a new
  // gesture and release immediately; this is a hard backstop under it.
  const exitBoundaryCooldownUntilRef = useRef(0);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);
  useEffect(() => { slideIndexRef.current = slideIndex; }, [slideIndex]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsShortWindow(window.innerHeight < 760);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Guarantee the deck starts pinned at the top so the wheel/touch lock's
  // scrollY === 0 check is accurate from the first tick, regardless of any
  // stray scroll position left over from a prior route or restoration.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Clamp slideIndex when the mobile/desktop max changes (e.g. window resize
  // crossing the breakpoint while sitting on the desktop-only grid finale).
  useEffect(() => {
    const max = isMobile ? total - 1 : total;
    setSlideIndex((i) => Math.min(i, max));
  }, [isMobile, total]);

  // Jump to the target service card whenever location.state carries a
  // serviceIndex — on mount, and on every same-page navigate (e.g. clicking
  // a service link from the footer while already on /services). Skipped on a
  // POP (browser back/forward): that's the persisted-position restore's job
  // (see the slideIndex init above) — location.state.serviceIndex there is
  // just whatever this history entry originally carried, not a fresh request.
  useEffect(() => {
    if (navigationType === "POP") return;
    const idx = (location.state as { serviceIndex?: number } | null)?.serviceIndex;
    if (idx == null) return;
    setSlideIndex(Math.min(Math.max(idx, 0), total));
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, [location, total, navigationType]);

  // Scroll-locked navigation: while the deck is pinned at the top of the page
  // (scrollY === 0), scrolling/swiping DOWN advances exactly one slide
  // (service card, then — on desktop — the finale grid), and UP brings back
  // the previous one (grid → last card → ... → first card). At the first
  // slide, upward input simply does nothing (nothing above it to reveal). At
  // the last slide, the next downward tick releases the lock and lets the
  // page scroll normally into the footer.
  useEffect(() => {
    function step() {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setSlideIndex((prev) => {
        const max = isMobileRef.current ? total - 1 : total;
        const next = Math.min(prev + 1, max);
        slideIndexRef.current = next;
        if (next === max && prev < max) {
          exitBoundaryCooldownUntilRef.current = Date.now() + EXIT_BOUNDARY_COOLDOWN_MS;
        }
        return next;
      });
      window.setTimeout(() => { isAnimatingRef.current = false; }, STEP_LOCK_MS);
    }

    function stepBack() {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setSlideIndex((prev) => {
        const next = Math.max(prev - 1, 0);
        slideIndexRef.current = next;
        return next;
      });
      window.setTimeout(() => { isAnimatingRef.current = false; }, STEP_LOCK_MS);
    }

    function atExitBoundary() {
      const max = isMobileRef.current ? total - 1 : total;
      return slideIndexRef.current >= max;
    }

    function atEntryBoundary() {
      return slideIndexRef.current <= 0;
    }

    // A trackpad flick keeps firing wheel events (momentum) long after the
    // physical gesture ends. gestureActive collapses that whole burst — plus
    // its momentum tail — into a single step, resetting only once the event
    // stream has gone quiet for GESTURE_IDLE_MS. gestureDir additionally
    // makes a reversal mid-burst (rare, but possible on a trackpad) count as
    // a fresh gesture rather than being swallowed by the outgoing one.
    let gestureActive = false;
    let gestureDir = 0;
    let gestureTimer: ReturnType<typeof window.setTimeout> | null = null;
    function markGestureAlive() {
      if (gestureTimer != null) window.clearTimeout(gestureTimer);
      gestureTimer = window.setTimeout(() => { gestureActive = false; gestureDir = 0; }, GESTURE_IDLE_MS);
    }

    function onWheel(e: WheelEvent) {
      if (window.scrollY > 0.5) return;
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (dir === 0) return;
      const isNewGesture = !gestureActive || dir !== gestureDir;

      if (dir > 0 && atExitBoundary()) {
        // The same flick that just landed here (e.g. on the grid finale) keeps
        // firing momentum wheel events afterward — those must NOT also release
        // into the footer, or the grid blows past before it's even seen. A
        // trackpad's decelerating momentum tail can pause for longer than
        // GESTURE_IDLE_MS between ticks, so on top of requiring a genuinely
        // new gesture, a flat cooldown since arrival is enforced regardless —
        // neither the tail end of that flick nor an immediate next scroll can
        // release before the grid has actually had a moment to be seen.
        if (!isNewGesture || Date.now() < exitBoundaryCooldownUntilRef.current) {
          e.preventDefault();
          return;
        }
        return; // fresh gesture, cooldown elapsed — let the page scroll into the footer
      }
      if (dir < 0 && atEntryBoundary()) return; // nothing before the first card

      e.preventDefault(); // swallow the whole gesture, including its momentum tail
      gestureActive = true;
      gestureDir = dir;
      markGestureAlive();
      if (isNewGesture) (dir > 0 ? step() : stepBack());
    }

    let touchStartY: number | null = null;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0]?.clientY ?? null;
    }
    function onTouchMove(e: TouchEvent) {
      if (touchStartY == null || window.scrollY > 0.5) return;
      const dy = touchStartY - (e.touches[0]?.clientY ?? touchStartY);
      if (dy === 0) return;
      if (dy > 0) {
        if (!atExitBoundary()) e.preventDefault(); // upward swipe (finger up = content down) drives the deck forward
      } else if (!atEntryBoundary()) {
        e.preventDefault(); // downward swipe (finger down = content up) drives the deck backward
      }
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStartY == null || window.scrollY > 0.5) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const dy = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;
      if (dy > 0) {
        if (atExitBoundary()) return;
        step();
      } else {
        if (atEntryBoundary()) return;
        stepBack();
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (gestureTimer != null) window.clearTimeout(gestureTimer);
    };
  }, [total]);

  const isGrid = !isMobile && slideIndex >= total;
  const activeIndex = Math.min(slideIndex, total - 1);

  if (isMobile) {
    return (
      <div style={{ background: "#060606" }}>
        {/* Sticky nav */}
        <div style={{ position: "sticky", top: 0, zIndex: 200, height: "76px", pointerEvents: "none" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>
            <TopBar dark logoSrc={xgLogoWhite} />
          </div>
        </div>

        {/* One-screen deck — wheel/swipe locked, one tick per card */}
        <div
          style={{
            position: "relative",
            height: "calc(100vh - 76px)",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative", height: "100%", width: "calc(100% - 56px)", margin: "0 auto", boxSizing: "border-box" }}>
            {SERVICES.map((svc, i) => (
              <MobileCardSlide
                key={svc.title}
                service={svc}
                index={i}
                total={total}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#060606" }}>
      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 200, height: "96px", pointerEvents: "none" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>
          <TopBar dark logoSrc={xgLogoWhite} />
        </div>
      </div>

      {/* One-screen deck — wheel/swipe locked, one tick per card then the grid finale */}
      <div
        style={{
          position: "relative",
          height: "calc(100vh - 96px)",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "24px",
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
                    activeIndex={activeIndex}
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
                variants={GRID_CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="hidden"
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
                  <motion.div key={svc.title} variants={GRID_ITEM_VARIANTS} style={{ height: "100%" }}>
                    <GridServiceCard service={svc} compact={isShortWindow} />
                  </motion.div>
                ))}

                {/* View Works */}
                <motion.div
                  variants={GRID_ITEM_VARIANTS}
                  onClick={() => navigate("/portfolio")}
                  style={{ background: "#F7F8FA", borderRadius: "12px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", cursor: "pointer", paddingBottom: "12px", paddingRight: "16px" }}
                >
                  <span style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.17vw, 80px)", lineHeight: "1.2", letterSpacing: "0em", color: "rgba(0,0,0,0.15)", userSelect: "none", textAlign: "right" }}>
                    View Works
                  </span>
                </motion.div>

                {/* Let's Talk */}
                <motion.div
                  variants={GRID_ITEM_VARIANTS}
                  onClick={() => openContactForm()}
                  style={{ background: "#F7F8FA", borderRadius: "12px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", cursor: "pointer", paddingBottom: "12px", paddingRight: "16px" }}
                >
                  <span style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.17vw, 80px)", lineHeight: "1.2", letterSpacing: "0em", color: "#636363", userSelect: "none", textAlign: "right" }}>
                    Let's talk
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
