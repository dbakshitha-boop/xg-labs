import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { cn } from "./ui/utils";
import { useCursor } from "./ui/CustomCursor";
import imgPerformance from "figma:asset/829c7dea73546d44cdf81f9fa2d6cd9ab132117d.png";
import imgSEO from "figma:asset/b5047b31ab40cf51abf5e89f3b5017013a810db8.png";
import imgBranding from "figma:asset/97255d534336f1ae220810ce0585cdde411c6098.png";
import hoverImage from "figma:asset/c47096a00cbb223b6c6e2a485653499e5b4c9291.png";
import imgPerformanceNew from "../assets/service section - xg web/Performance Marketing.png";
import imgWebDevNew from "../assets/service section - xg web/Web Development.png";
import imgSEONew from "../assets/service section - xg web/SEO.png";
import imgSocialMediaNew from "../assets/service section - xg web/Social Media Management.png";
import imgContentCreationNew from "../assets/service section - xg web/Content Creation & VP.png";
import imgInfluencerNew from "../assets/service section - xg web/Influencer Marketing.png";
import imgBrandingNew from "../assets/service section - xg web/Branding.png";

import svgPaths from "./imports/svg-k2dl7joxgv";

interface ServiceItemProps {
  title: string;
  subtitle: string;
  contentLines: string[];
  deliverables: string[];
  image: string;
}

const services: ServiceItemProps[] = [
  {
    title: "PERFORMANCE MARKETING",
    subtitle: "(Meta Ads, Google Ads, LinkedIn Ads, full paid engine)",
    contentLines: [
      "Data-driven campaigns built for real",
      "growth — no waste, no guesswork."
    ],
    deliverables: ["Strategy & audit", "Creative production", "Campaign setup"],
    image: imgPerformanceNew,
  },
  {
    title: "SEO",
    subtitle: "(On-page, technical SEO, content optimization)",
    contentLines: [
      "Search visibility built to compound",
      "traffic and demand over time."
    ],
    deliverables: ["SEO audit", "On-page SEO", "Keyword strategy"],
    image: imgSEONew,
  },
  {
    title: "WEB DEVELOPMENT",
    subtitle: "(Landing pages, funnels, ad-focused builds)",
    contentLines: [
      "Fast, focused landing pages designed",
      "to convert traffic into action."
    ],
    deliverables: ["UI/UX design", "Landing pages", "Funnels"],
    image: imgWebDevNew,
  },
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    subtitle: "(Posting, scheduling, community & reputation management)",
    contentLines: [
      "Consistent brand presence managed",
      "with clarity and control."
    ],
    deliverables: ["Scheduling", "Community management", "Reputation handling"],
    image: imgSocialMediaNew,
  },
  {
    title: "CONTENT CREATION & VIDEO PRODUCTION",
    subtitle: "(Posts, carousels, reels, UGC, brand & ad videos)",
    contentLines: [
      "Content and videos built to attract",
      "attention and drive engagement."
    ],
    deliverables: ["Content creation", "Video production", "Ad creatives"],
    image: imgContentCreationNew,
  },
  {
    title: "INFLUENCER MARKETING",
    subtitle: "(1000+ creators, planning, coordination, management)",
    contentLines: [
      "Influencer campaigns executed with",
      "relevance, reach, and structure."
    ],
    deliverables: ["Influencer strategy", "Campaign management", "Reporting"],
    image: imgInfluencerNew,
  },
  {
    title: "BRANDING",
    subtitle: "(Logos, brand kits, mascots, industrial design)",
    contentLines: [
      "Brand identities built to stand",
      "out and scale consistently."
    ],
    deliverables: ["Brand identity", "Brand systems", "Guidelines"],
    image: imgBrandingNew,
  },
];

export function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setVariant } = useCursor();
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setVariant('default')}
      className="w-full max-w-[1920px] mx-auto px-4 lg:px-0 pt-6 pb-20 lg:py-20 flex flex-col lg:gap-[60px] font-sans bg-[#F7F8FA]"
    >
      {/* Mobile/tablet header — lg:hidden so desktop is untouched */}
      <div className="lg:hidden px-6 pt-4 pb-8 flex flex-col gap-3">
        <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "125%", letterSpacing: "-0.02em", textTransform: "uppercase", color: "#060606" }}>
          Everything your brand needs to grow built into one system
        </p>
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "135%", letterSpacing: "0%", color: "#5F5F5F" }}>
          Every service works together as one system, built to create clarity, momentum, and results.
        </p>
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "140%", letterSpacing: "0%", color: "#6E6E6E" }}>
          No noise. No guesswork.<br />Just structured creative and strategic execution.
        </p>
        <div style={{ marginTop: "12px" }}>
          <motion.div
            initial="rest" whileHover="hover" animate="rest"
            style={{ position: 'relative', height: 36, display: 'inline-flex', flexShrink: 0, cursor: 'pointer' }}
          >
            <button onClick={() => navigate("/services")} style={{ height: 36, paddingTop: 7, paddingRight: 26, paddingBottom: 7, paddingLeft: 14, display: 'inline-flex', alignItems: 'center', background: '#ffffff', borderRadius: 42, border: '1px solid #9A9A9A', cursor: 'pointer', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', inset: 0, background: '#02A884', transformOrigin: 'left center', zIndex: 1, pointerEvents: 'none' }} />
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: 'absolute', inset: 0, background: '#0a0a0a', transformOrigin: 'left center', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 3, overflow: 'hidden', lineHeight: 1, height: '1em' }}>
                <motion.span variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: '-100%', transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ display: 'block', fontFamily: "'Cal Sans', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#414141' }}>
                  View More
                </motion.span>
                <motion.span aria-hidden variants={{ rest: { y: '100%', transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ position: 'absolute', top: 0, left: 0, display: 'block', fontFamily: "'Cal Sans', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#ffffff' }}>
                  View More
                </motion.span>
              </div>
            </button>
            <motion.div variants={{ rest: { background: '#000000' }, hover: { background: '#02A884' } }} transition={{ duration: 0.18 }} style={{ position: 'absolute', top: 2, right: -10, width: 32, height: 32, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
              <motion.svg width={20} height={20} viewBox="0 0 24 24" style={{ display: 'block' }} fill="none" variants={{ rest: { stroke: '#ffffff' }, hover: { stroke: '#000000' } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Desktop header — hidden lg:flex so mobile is untouched */}
      <div className="hidden lg:flex items-start justify-between gap-4" style={{ paddingLeft: "100px", paddingRight: "70px", paddingBottom: "40px" }}>
        <div className="flex flex-col gap-3">
          <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "24px", lineHeight: "120%", letterSpacing: "-0.02em", textTransform: "uppercase", color: "#060606", whiteSpace: "nowrap" }}>
            Everything your brand needs to grow built into one system
          </p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: "130%", letterSpacing: "0%", color: "#5F5F5F", maxWidth: "720px" }}>
            Every service works together as one system, built to create clarity, momentum, and results.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 shrink-0 pt-1">
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "150%", letterSpacing: "0%", color: "#6E6E6E", whiteSpace: "nowrap" }}>
            No noise. No guesswork.<br />Just structured creative and <br />strategic execution.
          </p>
          <motion.div
            initial="rest" whileHover="hover" animate="rest"
            style={{ position: 'relative', height: 36, display: 'inline-flex', flexShrink: 0, cursor: 'pointer' }}
          >
            <button onClick={() => navigate("/services")} style={{ height: 36, paddingTop: 7, paddingRight: 26, paddingBottom: 7, paddingLeft: 14, display: 'inline-flex', alignItems: 'center', background: '#ffffff', borderRadius: 42, border: '1px solid #9A9A9A', cursor: 'pointer', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', inset: 0, background: '#02A884', transformOrigin: 'left center', zIndex: 1, pointerEvents: 'none' }} />
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: 'absolute', inset: 0, background: '#0a0a0a', transformOrigin: 'left center', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 3, overflow: 'hidden', lineHeight: 1, height: '1em' }}>
                <motion.span variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: '-100%', transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ display: 'block', fontFamily: "'Cal Sans', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#414141' }}>
                  View More
                </motion.span>
                <motion.span aria-hidden variants={{ rest: { y: '100%', transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ position: 'absolute', top: 0, left: 0, display: 'block', fontFamily: "'Cal Sans', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#ffffff' }}>
                  View More
                </motion.span>
              </div>
            </button>
            <motion.div variants={{ rest: { background: '#000000' }, hover: { background: '#02A884' } }} transition={{ duration: 0.18 }} style={{ position: 'absolute', top: 2, right: -10, width: 32, height: 32, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
              <motion.svg width={20} height={20} viewBox="0 0 24 24" style={{ display: 'block' }} fill="none" variants={{ rest: { stroke: '#ffffff' }, hover: { stroke: '#000000' } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
            delay: index < 3 ? index * 0.15 : 0
          }}
        >
          <ServiceCard
            {...service}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({
  title,
  subtitle,
  contentLines,
  deliverables,
  image,
  index,
  hoveredIndex,
  setHoveredIndex
}: ServiceItemProps & {
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const { setVariant, setText } = useCursor();
  const navigate = useNavigate();
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  const lineStagger = 0.15;

  const [isMobile, setIsMobile] = useState(false);
  const [autoReveal, setAutoReveal] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-reveal for mobile when in view
  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setAutoReveal(true);
            }, 300);
            setTimeout(() => {
              setHasBeenRevealed(true);
            }, 300 + 1400); // mark done after curtain + highlight fully finish
          }
        },
        { threshold: 0.15 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => observer.disconnect();
    }
  }, [isMobile]);

  const active = isHovered || (isMobile && autoReveal);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative w-full lg:!cursor-none transition-all duration-500 overflow-hidden cursor-pointer",
        isDimmed ? "lg:blur-[2px] opacity-100" : "opacity-100",
        active ? "z-50" : "z-10"
      )}
      onClick={() => navigate("/services", { state: { serviceIndex: index } })}
      onMouseEnter={() => {
        setHoveredIndex(index);
        if (!isMobile) {
          setVariant('button');
          setText('Explore our work');
        }
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        if (!hasBeenRevealed) setHasBeenRevealed(true);
        if (!isMobile) {
          setVariant('default');
          setText(null);
        }
      }}
    >
      {/* Highlight Image — desktop only */}
      <AnimatePresence>
        {!isMobile && active && (
          <motion.div
            className="absolute pointer-events-none z-0 overflow-hidden"
            style={{
              width: 267,
              height: 311,
              right: 60,
              top: "50%",
              borderRadius: 16,
            }}
            initial={{ opacity: 0, y: "-50%", rotate: 0, scale: 0.9 }}
            animate={{ opacity: 1, y: "-50%", rotate: 5, scale: 1 }}
            exit={{ opacity: 0, y: "-50%", rotate: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
              {/* Performance Marketing */}
              {index === 0 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={image} />
                </div>
              )}

              {/* SEO */}
              {index === 1 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover" src={image} />
                </div>
              )}

              {/* Web Development */}
              {index === 2 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={image} />
                </div>
              )}

              {/* Social Media Management */}
              {index === 3 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={image} />
                </div>
              )}

              {/* Content Creation */}
              {index === 4 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={image} />
                </div>
              )}

              {/* Influencer Marketing */}
              {index === 5 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={image} />
                </div>
              )}

              {/* Branding (Last Item) */}
              {index === 6 && (
                <div className="absolute inset-0">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={image} />
                </div>
              )}

              {/* Fallback for anything else (Safety) */}
              {index > 6 && (
                <img
                  src={image}
                  alt="Service Highlight"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

      {/* ── Mobile / tablet card layout ── */}
      <div className="lg:hidden bg-[#F7F8FA]" style={{ borderBottom: "1px solid #6E6E6E" }}>
        {/* gap between divider line above and this image */}
        <div className="flex justify-center" style={{ paddingTop: "24px", paddingLeft: "24px", paddingRight: "24px" }}>
          <div style={{ width: "300px", height: "300px", maxWidth: "100%", borderRadius: "16px", overflow: "hidden", flexShrink: 0 }}>
            <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
        <div className="flex flex-col gap-4" style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "20px", paddingBottom: "28px" }}>
          <div>
            <h3 className="font-['Sora',sans-serif] font-bold text-[14px] tracking-tight text-[#414141] uppercase mb-1">{title}</h3>
            <p className="font-['Sora',sans-serif] text-[12px] text-gray-500 leading-relaxed">{subtitle}</p>
          </div>
          {/* content lines — same curtain-sweep reveal as desktop, driven by auto-reveal-on-scroll */}
          <div className="flex flex-col gap-0">
            {contentLines.map((line, idx) => {
              const highlightText =
                index === 0 && idx === 1 ? "no waste, no guesswork." :
                index === 1 && idx === 1 ? "demand over time." :
                index === 2 && idx === 1 ? "convert traffic into action." :
                index === 3 && idx === 1 ? "clarity and control." :
                index === 4 && idx === 1 ? "attention and drive engagement." :
                index === 5 && idx === 1 ? "relevance, reach, and structure." :
                index === 6 && idx === 1 ? "scale consistently." : undefined;

              return (
                <motion.div
                  key={idx}
                  className="relative leading-[1.25] tracking-[-0.02em]"
                  style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "clamp(15px, 4vw, 18px)", color: "#6E6E6E" }}
                  animate={idx === 1 ? { x: active ? 0 : 80 } : { x: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    // Synced to RevealText's own reveal instant (delay + 0.35s) so the slide
                    // is actually visible while the text fades in, instead of finishing
                    // mostly-offscreen before RevealText even makes it opaque.
                    delay: active && !hasBeenRevealed ? idx * lineStagger + 0.35 : 0,
                  }}
                >
                  <RevealText
                    isActive={active}
                    hasBeenRevealed={hasBeenRevealed}
                    delay={idx * lineStagger}
                    highlight={highlightText}
                  >
                    {line}
                  </RevealText>
                </motion.div>
              );
            })}
          </div>
          {/* "What We Deliver" — hover-only reveal (not tied to scroll auto-reveal) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6E6E6E", marginBottom: "8px" }}>
              What We Deliver
            </p>
            <div className="flex flex-col gap-2">
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.25, delay: isHovered ? 0.2 + (i * 0.03) : 0, ease: [0.76, 0, 0.24, 1] }}
                  className="font-['Sora',sans-serif] font-medium text-[13px] text-[#414141] flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00A88D] shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Desktop card layout (unchanged) ── */}
      {!isMobile && (
      <div
        className="bg-[#F7F8FA] transition-colors duration-500"
        style={{
          display: "grid",
          paddingLeft: "100px",
          paddingRight: "70px",
          minHeight: "340px",
          gridTemplateColumns: "350px 1fr",
          columnGap: "80px",
          rowGap: "36px",
          alignContent: "center",
          alignItems: "start",
        }}
      >
        {/* Row 1, Col 1: Title + subtitle — aligned with content lines */}
        <div className="flex flex-col justify-start z-10">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#414141] mb-2 uppercase font-['Sora',sans-serif]">
            {title}
          </h3>
          <p className="text-base text-gray-500 max-w-full lg:max-w-[250px] leading-relaxed font-['Sora',sans-serif]">
            {subtitle}
          </p>
        </div>

        {/* Row 1, Col 2: Content Lines — aligned with title */}
        <div className="flex flex-col gap-0 w-full min-w-0 relative z-30">
          {contentLines.map((line, idx) => (
            <div key={idx} className="relative leading-[1.2] tracking-[-0.02em] font-normal text-[#6E6E6E] font-['Sora',sans-serif] py-0 lg:py-[2px]" style={{ fontSize: "clamp(18px, 4.5vw, 32px)" }}>
              <RevealText
                isActive={active}
                hasBeenRevealed={hasBeenRevealed}
                delay={idx * lineStagger}
                highlight={
                  index === 0 && idx === 1 ? "no waste, no guesswork." :
                    index === 1 && idx === 1 ? "demand over time." :
                      index === 2 && idx === 1 ? "convert traffic into action." :
                        index === 3 && idx === 1 ? "clarity and control." :
                          index === 4 && idx === 1 ? "attention and drive engagement." :
                            index === 5 && idx === 1 ? "relevance, reach, and structure." :
                              index === 6 && idx === 1 ? "scale consistently." :
                                undefined
                }
              >
                {line}
              </RevealText>
            </div>
          ))}
        </div>

        {/* Row 2, Col 1: "What We Deliver" — aligned with deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="hidden md:block z-10"
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "20px", lineHeight: "100%", letterSpacing: "-0.02em", textTransform: "uppercase", color: "#6E6E6E" }}>
            What We Deliver
          </span>
        </motion.div>

        {/* Row 2, Col 2: Deliverables Grid — aligned with "What We Deliver" */}
        <div className={cn(
          "flex flex-wrap gap-x-16 gap-y-4 min-w-0 relative z-10 transition-all duration-500",
          active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 lg:opacity-0"
        )}>
          {deliverables.map((item, i) => (
            <motion.div
              key={`deliverable-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : -10 }}
              transition={{ duration: 0.25, delay: active ? 0.2 + (i * 0.03) : 0, ease: [0.76, 0, 0.24, 1] }}
              className="text-[#414141] font-medium font-['Sora',sans-serif] flex items-center gap-3"
              style={{ fontSize: "clamp(14px, 3vw, 20px)", marginRight: "16px" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00A88D] shrink-0" />
              {item}
            </motion.div>
          ))}
        </div>

        {/* Divider line — spans just the right column at rest, extends to the text margin on hover */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-0"
            style={{ height: "1px", backgroundColor: "#6E6E6E", right: "70px" }}
            initial={false}
            animate={{ left: active ? 100 : 530 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </div>
      )}

    </motion.div>
  );
}

function RevealText({ children, isActive, hasBeenRevealed, highlight, delay = 0 }: { children: React.ReactNode, isActive: boolean, hasBeenRevealed: boolean, highlight?: string, delay?: number }) {
  const content = children as string;
  const isHighlighted = !!highlight;

  let before = content;
  let target = "";
  let after = "";

  if (highlight && content.toLowerCase().includes(highlight.toLowerCase())) {
    const lowerContent = content.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const index = lowerContent.indexOf(lowerHighlight);
    before = content.substring(0, index);
    target = content.substring(index, index + highlight.length);
    after = content.substring(index + highlight.length);
  }

  return (
    <div className="relative inline-block overflow-hidden align-bottom">
      {/* The Text Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: (isActive || hasBeenRevealed) ? 1 : 0 }}
        transition={{ duration: 0.01, delay: isActive && !hasBeenRevealed ? delay + 0.35 : 0 }}
        className="leading-[1.15] flex items-center py-[0.1em] relative z-10"
      >
        {isHighlighted ? (
          <>
            <span>{before}</span>
            <span className="relative inline-flex items-center px-1.5 mx-0.5">
              <motion.span
                animate={{ color: isActive ? "#ffffff" : "#6E6E6E" }}
                transition={{ duration: 0.3 }}
                className="relative z-20"
              >
                {target}
              </motion.span>

              {/* Highlight Background - Locked to Right -> Left Flow */}
              <motion.div
                className="absolute inset-y-0 left-0 right-0 bg-[#00A88D] z-10"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{
                  scaleX: isActive ? 1 : 0,
                }}
                style={{
                  originX: isActive ? 1 : 0 // Expand from right, retract to left
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                  delay: isActive && !hasBeenRevealed ? delay + 0.45 : 0
                }}
              />
            </span>
            <span>{after}</span>
          </>
        ) : (
          <span className="py-[0.1em]">{children}</span>
        )}
      </motion.div>

      {/* Initial Reveal Curtain - Strict Marking Sweep */}
      <AnimatePresence>
        {!hasBeenRevealed && isActive && (
          <motion.div
            key="reveal-curtain"
            className="absolute inset-y-[0.2em] left-0 right-0 bg-[#00A88D] z-30 pointer-events-none"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              originX: [0, 0, 1]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: delay,
              times: [0, 0.5, 1],
              ease: [0.76, 0, 0.24, 1]
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
