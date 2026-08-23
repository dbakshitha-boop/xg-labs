import React, { useState, useRef, useEffect } from "react";
import { ContactFormContent } from "../ContactFormOverlay";
import { useContactForm } from "../ContactFormContext";
import { useNavigate } from "react-router-dom";
import svgPaths from "../../imports/svg-u8a253v5v5";
import svgPaths2 from "../../imports/svg-qt598ft3du";
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame } from "motion/react";
import CardImages from "../../imports/CardImages";

// Raster Images
import imgGrid from "figma:asset/b002c02688ea7a2210a114325101549e34a2e548.png";
import imgImage from "figma:asset/3c2c8cefce5b34701acad992ed09e777d455d5d9.png";
import imgImage1 from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import imgImage2 from "figma:asset/57b2a045a1c474c35c83405b1c0e732165941c8c.png";
import imgImage3 from "figma:asset/06355012afb0087b8c9bfc9843e66981c1b4fc10.png";
import imgImage4 from "figma:asset/3928f5a725db8937d4474329e22213a3e4710bec.png";
import imgImage5 from "figma:asset/7fb04902ca908bbcead7b1bfd2272d87b766cc5b.png";
import imgImage6 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgImage7 from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";
import imgImage8 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgImage9 from "figma:asset/83d4a69b3e9c8f0a9728fcee74adb0198bf260f8.png";
import imgImage10 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgImage11 from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png";
import imgImage48 from "figma:asset/f302e7d71b5ba9d33f529d7d6f3a6b94232703c5.png";
import imgImage12 from "../../assets/logo.jpeg";
import pm from "../../assets/service section - xg web/Performance Marketing.png";
import cc from "../../assets/service section - xg web/Content Creation & VP.png";
import influencer from "../../assets/service section - xg web/Influencer Marketing.png";
import SEO from "../../assets/service section - xg web/SEO.png";
import svcWebDev from "../../assets/service section - xg web/Web Development.png";
import svcSocialMedia from "../../assets/service section - xg web/Social Media Management.png";
import svcBranding from "../../assets/service section - xg web/Branding.png";
// --- Existing Components ---

function WeAre() {
  return (
    <div className="absolute h-[51px] left-[336px] overflow-clip top-[420px] w-[141px]">
      <p className="absolute font-space font-medium leading-[normal] left-[141px] text-[#9a9a9a] text-[40px] text-nowrap text-right top-[-131px] translate-x-[-100%] uppercase">{`WE ARE `}</p>
    </div>
  );
}

function TaglineContainer() {
  return (
    <div className="absolute h-[102px] left-[calc(50%+0.5px)] overflow-clip top-[calc(50%+121px)] translate-x-[-50%] translate-y-[-50%] w-[609px]">
      <p className="absolute font-space font-medium leading-[normal] left-[calc(50%+304.5px)] text-[#9a9a9a] text-[40px] text-right top-[calc(50%+131px)] translate-x-[-100%] uppercase w-[609px]">
        Where strategy
        <br aria-hidden="true" />
        meets creative energy
      </p>
    </div>
  );
}

function TextContainer({ skipIntro = false }: { skipIntro?: boolean } = {}) {
  return (
    <motion.div
      initial={skipIntro ? false : { scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute content-stretch flex flex-col gap-[24px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] text-center"
      data-name="Text Container"
    >
      <p className="font-['Sora',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#414141] text-[24px] tracking-[-0.96px] w-full">STRATEGY FIRST</p>
      <div
        className="font-['Cal_Sans'] font-[900] not-italic relative shrink-0 text-[#060606] text-[80px] uppercase w-full text-center mt-[-12px]"
        style={{ WebkitTextStroke: "2.5px #060606", letterSpacing: "-0.005em" }}
      >
        <span style={{ display: "block", lineHeight: 0.85 }}>From Vision To</span>
        <span style={{ display: "block", lineHeight: 0.85, marginTop: "0.1em" }}>Velocity</span>
      </div>
      <p className="font-['Sora',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#414141] text-[24px] tracking-[-0.96px] w-full text-center">
        We align strategy, creative, and performance
        <br />
        to accelerate growth.
      </p>
    </motion.div>
  );
}

function ArrowContainer({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div
        className="content-stretch flex items-center relative shrink-0 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
        onMouseEnter={() => setHoverPrev(true)}
        onMouseLeave={() => setHoverPrev(false)}
      >
        <div className="flex items-center justify-center relative shrink-0 size-[40px]">
          <div className="flex-none rotate-[270deg]">
            <div className="relative size-[40px]">
              <svg className="block size-full" fill="none" viewBox="0 0 40 40">
                <rect
                  height="39"
                  rx={hoverPrev ? 3.5 : 19.5}
                  stroke="black"
                  fill="black"
                  fillOpacity={hoverPrev ? 1 : 0}
                  width="39"
                  x="0.5"
                  y="0.5"
                  style={{ transition: "rx 0.45s cubic-bezier(0.16, 1, 0.3, 1), fill-opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <path
                  d={svgPaths.p3c0a3b80}
                  stroke={hoverPrev ? "white" : "black"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  style={{ transition: "stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex items-center relative shrink-0 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onNext?.(); }}
        onMouseEnter={() => setHoverNext(true)}
        onMouseLeave={() => setHoverNext(false)}
      >
        <div className="flex items-center justify-center relative shrink-0 size-[40px]">
          <div className="flex-none rotate-[90deg]">
            <div className="relative size-[40px]">
              <svg className="block size-full" fill="none" viewBox="0 0 40 40">
                <rect
                  height="39"
                  rx={hoverNext ? 19.5 : 3.5}
                  stroke="black"
                  fill="black"
                  fillOpacity={hoverNext ? 1 : 0}
                  width="39"
                  x="0.5"
                  y="0.5"
                  style={{ transition: "rx 0.45s cubic-bezier(0.16, 1, 0.3, 1), fill-opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <path
                  d={svgPaths.p47d4600}
                  fill={hoverNext ? "white" : "black"}
                  style={{ transition: "fill 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4({ isVisible }: { isVisible?: boolean }) {
  // "ordinary." reads black while the panel is still sliding in, then flips to
  // white once it has fully landed (matching the 1.2s horizontal panel transition).
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setLanded(false);
      return;
    }
    const timer = setTimeout(() => setLanded(true), 500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full text-center">
        <p className="font-['Sora',sans-serif] font-normal text-[32px] leading-[1.1] tracking-[-0.02em] uppercase text-[#5f5f5f]">WE'RE XG LABS</p>
      </div>
      <p className="font-['Cal_Sans',sans-serif] font-normal not-italic relative shrink-0 text-[#414141] text-center w-full uppercase" style={{ fontSize: '50px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
        A creative partner for brands<br />who refuse to be{" "}
        <span className="relative inline-block mx-1 px-4">
          <span
            className="relative z-10"
            style={{ color: landed ? "#ffffff" : "#414141", transition: "color 0.15s ease" }}
          >
            ordinary.
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            style={{ originX: 0 }}
            className="absolute inset-0 bg-[#00A88D]"
          />
        </span>
      </p>
    </div>
  );
}

function Frame5({ isVisible }: { isVisible?: boolean }) {
  return (
    <div className="absolute flex flex-col gap-[28px] items-center left-1/2 text-center -translate-x-1/2 -translate-y-1/2 z-10" style={{ top: 'calc(50% - 48px)', width: "min(900px, calc(100% - 20px))" }}>
      <Frame4 isVisible={isVisible} />
      <p className="font-['Sora',sans-serif] font-normal text-center relative shrink-0 text-[#6e6e6e] mx-auto" style={{ fontSize: '20px', lineHeight: '1.5', letterSpacing: '0', maxWidth: '650px', marginTop: '28px' }}>We turn ideas into visuals that move people — and move brands forward. Every piece we create is intentional, expressive, and designed to hit with purpose.</p>
    </div>
  );
}

function Image12() {
  return (
    <div className="h-[337.434px] relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Image13() {
  return (
    <div className="h-[337.43px] relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.89px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage8} />
    </div>
  );
}

function Image14() {
  return (
    <div className="h-[337.434px] overflow-clip relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
      <div className="absolute h-[391.117px] left-0 top-0 w-[312.893px]" />
    </div>
  );
}

function Image15() {
  return (
    <div className="h-[337.434px] relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage10} />
    </div>
  );
}

function Image16() {
  return (
    <div className="h-[337.434px] relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage11} />
    </div>
  );
}

function Image17() {
  return (
    <div className="h-[337.434px] relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage7} />
    </div>
  );
}

export function AboutSection({ scrollStep }: { scrollStep: number }) {
  const isVisible = scrollStep === 2;

  return (
    <div className="absolute bg-[#f7f8fa] h-[1080px] overflow-hidden top-1/2 translate-y-[-50%]" style={{ left: "140vw", width: "70vw" }}>
      {/* Grid Background */}
      <div className="absolute h-[1080px] left-1/2 opacity-5 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGrid} />
      </div>

      {/* Circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "900px", height: "900px" }}>
        <svg className="block w-full h-full" fill="none" viewBox="0 0 1040 1040">
          <circle cx="520" cy="520" fill="white" r="520" />
        </svg>
      </div>

      {/* Scattered Card Images — same tight overlapping pile as the mobile version, scaled up to match this section's 900px circle */}
      <div className="absolute inset-0 pointer-events-none">
        <CardImages isVisible={isVisible} scale={1.7} top={720} />
      </div>

      {/* Text Content */}
      <Frame5 isVisible={isVisible} />
    </div>
  );
}

// --- Vertical Content (The Footer/Next Section) ---

export function VerticalContent() {
  return null;
}

// --- Exported Components ---

export function FinalGrid({ skipIntro = false }: { skipIntro?: boolean } = {}) {
  return (
    <motion.div initial={skipIntro ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </motion.div>
  )
}

export function FinalCircle({ skipIntro = false }: { skipIntro?: boolean } = {}) {
  return (
    <motion.div
      initial={skipIntro ? false : { scale: 0.45, opacity: 0 }}
      animate={{ scale: 0.8, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 size-[1016px] top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none"
    >
      <svg className="block size-full" fill="none" viewBox="0 0 1016 1016">
        <circle cx="508" cy="508" fill="var(--fill-0, white)" opacity="1" r="508" />
      </svg>
    </motion.div>
  )
}

export function FinalOverlay({ skipIntro = false }: { skipIntro?: boolean } = {}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div initial={skipIntro ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <WeAre />
        <TaglineContainer />

        <div className="absolute flex h-[11.604px] items-center justify-center left-[calc(50%+265.53px)] top-[550.32px] translate-x-[-50%] w-[11.071px]">
          <div className="flex-none rotate-[5.029deg]">
            <div className="h-[10.754px] relative w-[10.167px]">
              <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                <path d={svgPaths.p2cfc1400} opacity="0" stroke="var(--stroke-0, #02A884)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.58897" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <TextContainer skipIntro={skipIntro} />
    </div>
  );
}

export function WorkSection({ scrollStep = 0 }: { scrollStep?: number }) {
  const timeRef = useRef(0);

  // Spring-based scroll offset per column
  const spring1 = useSpring(scrollStep * -200, { stiffness: 60, damping: 20 });
  const spring2 = useSpring(scrollStep * 200,  { stiffness: 60, damping: 20 });
  const spring3 = useSpring(400 - scrollStep * 400, { stiffness: 60, damping: 20 });

  // Motion values for combined (spring + slow drift)
  const y1 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const y3 = useMotionValue(0);

  // Update spring targets when scrollStep changes
  useEffect(() => {
    spring1.set(scrollStep * -200);
    spring2.set(scrollStep * 200);
    spring3.set(400 - scrollStep * 400);
  }, [scrollStep, spring1, spring2, spring3]);

  // Slow sinusoidal drift layered on top of spring offset
  useAnimationFrame((_, delta) => {
    timeRef.current += delta * 0.001;
    const t = timeRef.current;
    y1.set(spring1.get() + Math.sin(t * 0.28) * 55);
    y2.set(spring2.get() + Math.sin(t * 0.22 + 1.5) * 45);
    y3.set(spring3.get() + Math.sin(t * 0.32 + 3.0) * 50);
  });

  // 40px left margin, 20px gaps between 3 cols, no right margin (next section provides the visual boundary)
  const colWidth = "calc((100% - 80px) / 3)";

  return (
    <div
      className="absolute h-[1080px] top-1/2 translate-y-[-50%] overflow-hidden"
      style={{ left: "70vw", width: "70vw" }}
    >
      <motion.div
        style={{ y: y1, left: "20px", width: colWidth }}
        className="absolute flex flex-col gap-[20px] h-auto items-start top-[-370px]"
      >
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage1} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage2} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage3} /></div>
      </motion.div>

      <motion.div
        style={{ y: y2, left: "calc(40px + (100% - 80px) / 3)", width: colWidth }}
        className="absolute flex flex-col gap-[20px] h-auto items-start top-[-600px]"
      >
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage4} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage5} /></div>
        <div className="h-[440px] relative shrink-0 w-full overflow-clip">
          <img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage6} />
        </div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage7} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage5} /></div>
      </motion.div>

      <motion.div
        style={{ y: y3, left: "calc(60px + (100% - 80px) * 2 / 3)", width: colWidth }}
        className="absolute flex flex-col gap-[20px] h-auto items-start top-[-370px]"
      >
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage8} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage9} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage10} /></div>
        <div className="h-[440px] relative shrink-0 w-full"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage11} /></div>
      </motion.div>
    </div>
  );
}

export function ScrollContainer({ onNext, onPrev, hideText }: { onNext?: () => void; onPrev?: () => void; hideText?: boolean }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-[40px] content-stretch flex items-center justify-between left-0 z-20 pointer-events-auto"
      style={{ width: "70vw", paddingLeft: "calc(max(20px, calc((70vw - min(1200px, calc(70vw - 40px))) / 2)) + 24px)", paddingRight: "40px" }}
    >
      <ArrowContainer onPrev={onPrev} onNext={onNext} />
      <motion.p
        animate={{ opacity: hideText ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans font-normal leading-[normal] relative shrink-0 text-[24px] text-black text-nowrap cursor-pointer"
        onClick={onNext}
      >
        Scroll to explore
      </motion.p>
    </motion.div>
  );
}

const NAV_ROUTES: Record<string, string> = {
  "Portfolio": "/portfolio",
  "Blog": "/blog",
  "Service": "/services",
};

const SERVICE_ITEMS: { label: string; slug: string; img: string }[] = [
  { label: "PERFORMANCE MARKETING", slug: "performance-marketing", img: "pm" },
  { label: "SEO", slug: "seo", img: "SEO" },
  { label: "WEB DEVELOPMENT", slug: "web-development", img: "img5" },
  { label: "SOCIAL MEDIA MANAGEMENT", slug: "social-media-management", img: "img4" },
  { label: "CONTENT CREATION & VIDEO PRODUCTION", slug: "content-creation-video-production", img: "cc" },
  { label: "INFLUENCER MARKETING", slug: "influencer-marketing", img: "influencer" },
  { label: "BRANDING", slug: "branding", img: "img7" },
];

// Map img keys to actual imports
const SERVICE_IMG_MAP: Record<string, string> = {
  img1: imgImage,
  img2: imgImage1,
  img3: imgImage2,
  img4: svcSocialMedia,
  img5: svcWebDev,
  img6: imgImage5,
  img7: svcBranding,
  pm,
  SEO,
  cc,
  influencer,
};

export function TopBar({ dark = false, containerWidth, logoSrc, refinedLetsTalk = false, barHeight = 56, skipIntro = false }: { dark?: boolean; containerWidth?: string; logoSrc?: string; refinedLetsTalk?: boolean; barHeight?: number; skipIntro?: boolean }) {
  const navigate = useNavigate();
  const [serviceOpen, setServiceOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string>("performance-marketing");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("xg-mobile-menu", { detail: { open: mobileMenuOpen } }));
  }, [mobileMenuOpen]);
  const { open: openContactForm } = useContactForm();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On mobile, the nav bar appears while the user scrolls up (back toward
  // the top) and hides while they scroll down (further into the page) — the
  // usual auto-hide nav pattern. Always visible near the very top of the
  // page, always visible on desktop, and always visible while the hamburger
  // menu is open.
  const [isMobileNav, setIsMobileNav] = useState(() => typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  useEffect(() => {
    const onResize = () => setIsMobileNav(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const [mobileNavScrollVisible, setMobileNavScrollVisible] = useState(true);
  useEffect(() => {
    if (!isMobileNav) { setMobileNavScrollVisible(true); return; }
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (y <= 20) { setMobileNavScrollVisible(true); return; }
      if (dy < -4) setMobileNavScrollVisible(true); // scrolling up
      else if (dy > 4) setMobileNavScrollVisible(false); // scrolling down
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileNav]);
  // Locked sections (e.g. LetsMakeItHappen) sometimes need to nudge the real scroll
  // position by a few px to align themselves right as they engage — a genuine native
  // scroll event indistinguishable, above, from the user scrolling up, which would
  // otherwise pop the nav bar open right as one of those sections locks in. Also covers
  // the contact form specifically staying open over one of these sections — the bar has
  // no business floating on top of it either way. Checked first and unconditionally
  // (not folded into the mobile-only OR-branch below) — desktop's own "always visible"
  // default (`!isMobileNav`) would otherwise short-circuit straight past it before this
  // ever got a say, which was silently limiting this suppression to mobile only.
  const [sectionLocked, setSectionLocked] = useState(false);
  useEffect(() => {
    const onLock = (e: Event) => setSectionLocked(Boolean((e as CustomEvent).detail?.locked));
    window.addEventListener("xg-section-lock", onLock);
    return () => window.removeEventListener("xg-section-lock", onLock);
  }, []);
  const mobileNavVisible = mobileMenuOpen || (!sectionLocked && (!isMobileNav || mobileNavScrollVisible));

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .topbar-row { height: 56px !important; padding-left: 14px !important; padding-right: 14px !important; }
          .topbar-logo { height: 42px !important; }
          .topbar-hamburger { width: 40px !important; height: 40px !important; gap: 4px !important; }
          .topbar-hamburger-bar { width: 16px !important; }
          .topbar-hamburger-bar-short { width: 11px !important; }
          .topbar-pill { left: 10px !important; width: calc(100vw - 20px) !important; }
        }
      `}</style>
      {/* ── Mobile full-screen menu — sits behind the floating pill bar (which stays visible, hamburger morphed to X) ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{ background: dark ? "#2A2A2A" : "#ffffff" }}
          >
            <nav style={{ display: "flex", flexDirection: "column", padding: "88px 16px 40px", flex: 1, overflowY: "auto" }}>
              {["Our Edge", "Service", "Portfolio", "Blog", "Contact"].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item === "Service") navigate("/services");
                    else if (item === "Portfolio") navigate("/portfolio");
                    else if (item === "Blog") navigate("/blog");
                    else if (item === "Our Edge") {
                      const el = document.getElementById("selected-work");
                      if (el) { document.body.style.overflow = "auto"; el.scrollIntoView({ behavior: "smooth" }); }
                      else navigate("/", { state: { skipLoading: true, scrollToSection: "selected-work" } });
                    } else if (item === "Contact") {
                      window.dispatchEvent(new CustomEvent("xg-goto-footer"));
                      const footerEl = document.getElementById("footer");
                      if (footerEl) { document.body.style.overflow = "auto"; footerEl.scrollIntoView({ behavior: "auto" }); }
                      else navigate("/", { state: { skipLoading: true, scrollToFooter: true } });
                    }
                  }}
                  style={{ width: "100%", textAlign: "left", padding: "12px 0", border: "none", cursor: "pointer", fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "clamp(19px, 5vw, 23px)", textTransform: "uppercase", letterSpacing: "0.02em", color: dark ? "#9A9A9A" : "#414141", background: "none" }}
                >
                  {item}
                </motion.button>
              ))}

              <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "clamp(30px, 8.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: dark ? "#D6D6D6" : "#9A9A9A", margin: "40px 0 0" }}>
                We Build Brands That Perform
              </p>

              <div style={{ marginTop: "auto", paddingTop: "32px" }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "16px", letterSpacing: "0.03em", textTransform: "uppercase", color: dark ? "#9A9A9A" : "#414141", margin: "0 0 10px" }}>
                  Connect With
                </p>
                <a href="tel:+916369974530" style={{ display: "block", fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: dark ? "#F7F8FA" : "#6E6E6E", textDecoration: "none" }}>
                  +91 63699 74530
                </a>
                <a href="mailto:hello@xglabs.in" style={{ display: "block", fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: dark ? "#F7F8FA" : "#6E6E6E", textDecoration: "none" }}>
                  hello@xglabs.in
                </a>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: dark ? "#F7F8FA" : "#6E6E6E", margin: 0 }}>
                  Chennai, Tamil Nadu, India
                </p>

                <motion.div
                  initial="rest"
                  whileHover="hover"
                  whileTap="hover"
                  animate="rest"
                  style={{ position: "relative", height: 38, display: "inline-flex", marginTop: "18px", cursor: "pointer" }}
                >
                  <button
                    onClick={() => { setMobileMenuOpen(false); openContactForm(); }}
                    style={{ height: 38, paddingTop: 6, paddingRight: 24, paddingBottom: 6, paddingLeft: 16, display: "inline-flex", alignItems: "center", background: dark ? "transparent" : "#ffffff", borderRadius: 38, border: "1px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box", position: "relative", overflow: "hidden" }}
                  >
                    <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                    <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, fontSize: 13, height: "1em" }}>
                      <motion.span variants={{ rest: { y: 0, transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }} style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 13, lineHeight: 1, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", color: dark ? "#9A9A9A" : "#414141" }}>
                        Let's Talk
                      </motion.span>
                      <motion.span aria-hidden variants={{ rest: { y: "100%", transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }} style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 13, lineHeight: 1, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}>
                        Let's Talk
                      </motion.span>
                    </div>
                  </button>
                  <motion.div variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }} transition={{ duration: 0.18 }} style={{ position: "absolute", top: 1, right: -12, width: 32, height: 32, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                    <motion.svg width={16} height={16} viewBox="0 0 24 24" style={{ display: "block" }} fill="none" variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav bar (unchanged desktop layout) ── */}
      <motion.div
      initial={skipIntro ? false : { y: -16, opacity: 0 }}
      animate={{
        y: 0,
        opacity: mobileNavVisible ? 1 : 0,
        boxShadow: dark || mobileMenuOpen
          ? "none"
          : scrolled
            ? "0px 4px 24px 0px rgba(0,0,0,0.10)"
            : "0px 0px 15px 0px rgba(0,0,0,0.05)",
      }}
      transition={{
        y: { duration: 0.35, delay: 0.1, ease: "easeOut" },
        opacity: { duration: 0.35, delay: 0.1, ease: "easeOut" },
        boxShadow: { duration: 0.3, ease: "easeInOut" },
      }}
      onMouseLeave={() => setServiceOpen(false)}
      className={`fixed flex flex-col ${mobileMenuOpen ? "top-0" : isMobileNav ? "top-[26px]" : "top-[40px]"} z-50 ${mobileMenuOpen ? "rounded-none" : "rounded-[8px] topbar-pill"} ${dark ? "ring-1 ring-white/[0.15]" : "bg-white"}`}
      style={(() => {
        const pointerEvents = mobileNavVisible ? "auto" as const : "none" as const;
        if (mobileMenuOpen) {
          return { left: "0px", width: "100%", pointerEvents, ...(dark ? { background: "#2A2A2A" } : {}) };
        }
        const w = containerWidth ?? "100vw";
        const pad = containerWidth ? "40px" : "56px";
        const minW = containerWidth ? "1200px" : "1320px";
        const barW = `min(${minW}, calc(${w} - ${pad}))`;
        const barLeft = `max(20px, calc((${w} - ${barW}) / 2))`;
        return {
          left: barLeft,
          width: barW,
          pointerEvents,
          ...(dark ? { background: "#2A2A2A" } : {}),
        };
      })()}
    >
      {/* Main bar row */}
      <div className="topbar-row flex items-center justify-between px-[24px] py-[8px]" style={{ height: barHeight, ...(mobileMenuOpen ? { paddingLeft: 16, paddingRight: 16 } : {}) }}>
        <div className="shrink-0 cursor-pointer" onClick={() => navigate("/", { state: { skipLoading: true } })} onMouseEnter={() => setServiceOpen(false)}>
          {logoSrc ? (
            <img alt="Xg Labs" className="topbar-logo" src={logoSrc} style={{ height: "34px", width: "auto", display: "block" }} />
          ) : (
            <img alt="Xg Labs" className="topbar-logo" src={imgImage12} style={{ height: "42px", width: "auto", display: "block" }} />
          )}
        </div>

        {/* Desktop nav — hidden on mobile */}
        <div className="hidden lg:flex gap-2 xl:gap-6 items-center">
          {["Our Edge", "Service", "Portfolio", "Blog", "Contact"].map(item => {
            const isService = item === "Service";
            const isActive = isService && serviceOpen;

            if (isService) {
              return (
                <motion.div
                  key={item}
                  initial="rest"
                  whileHover="hover"
                  animate={isActive ? "hover" : "rest"}
                  className="relative cursor-pointer px-4 py-2 flex items-center gap-[6px] overflow-hidden"
                  style={{ borderRadius: "6px" }}
                  onClick={() => navigate("/services")}
                  onMouseEnter={() => setServiceOpen(true)}
                >
                  {/* Teal — leads */}
                  <motion.span
                    aria-hidden="true"
                    variants={{
                      rest: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                      hover: { clipPath: "polygon(0% 35%, 100% 0%, 100% 100%, 0% 100%)" },
                    }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", inset: 0, background: "#02A884", zIndex: 1 }}
                  />
                  {/* Black — trails, ends fully covering */}
                  <motion.span
                    aria-hidden="true"
                    variants={{
                      rest: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                      hover: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    style={{ position: "absolute", inset: 0, background: "#0a0a0a", zIndex: 2 }}
                  />
                  <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1.2, height: "1.2em" }}>
                    <motion.span
                      variants={{ rest: { y: 0, transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }}
                      style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", color: dark ? "#9A9A9A" : "#414141", whiteSpace: "nowrap" }}
                      className="text-sm font-semibold uppercase"
                    >
                      {item}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{ rest: { y: "100%", transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }}
                      style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", color: "#ffffff", whiteSpace: "nowrap" }}
                      className="text-sm font-semibold uppercase"
                    >
                      {item}
                    </motion.span>
                  </div>
                  <motion.svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ position: "relative", zIndex: 3, flexShrink: 0, transform: isActive ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                  >
                    <motion.path
                      d="M2 4L6 8L10 4"
                      variants={{ rest: { stroke: dark ? "#9A9A9A" : "#414141" }, hover: { stroke: "#ffffff" } }}
                      transition={{ duration: 0.1, ease: "easeOut", delay: 0.12 }}
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative cursor-pointer px-4 py-2 overflow-hidden"
                style={{ borderRadius: "6px" }}
                onMouseEnter={() => setServiceOpen(false)}
                onClick={() => {
                  setServiceOpen(false);
                  if (item === "Contact") {
                    window.dispatchEvent(new CustomEvent("xg-goto-footer"));
                    const footerEl = document.getElementById("footer");
                    if (footerEl) {
                      document.body.style.overflow = "auto";
                      footerEl.scrollIntoView({ behavior: "auto" });
                    } else {
                      navigate("/", { state: { skipLoading: true, scrollToFooter: true } });
                    }
                  } else if (item === "Our Edge") {
                    const el = document.getElementById("selected-work");
                    if (el) {
                      document.body.style.overflow = "auto";
                      el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate("/", { state: { skipLoading: true, scrollToSection: "selected-work" } });
                    }
                  } else if (NAV_ROUTES[item]) {
                    navigate(NAV_ROUTES[item]);
                  }
                }}
              >
                {/* Teal — leads, no delay */}
                <motion.span
                  aria-hidden="true"
                  variants={{
                    rest: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                    hover: { clipPath: "polygon(0% 35%, 100% 0%, 100% 100%, 0% 100%)" },
                  }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", inset: 0, background: "#02A884", zIndex: 1 }}
                />
                {/* Black — trails 90 ms behind teal, ends fully covering */}
                <motion.span
                  aria-hidden="true"
                  variants={{
                    rest: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                    hover: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  style={{ position: "absolute", inset: 0, background: "#0a0a0a", zIndex: 2 }}
                />
                {/* Text slides up and out, revealing white text sliding up from below */}
                <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1.2, height: "1.2em" }}>
                  <motion.span
                    variants={{ rest: { y: 0, transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }}
                    style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", color: dark ? "#9A9A9A" : "#414141", whiteSpace: "nowrap" }}
                    className="text-sm font-medium uppercase"
                  >
                    {item}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    variants={{ rest: { y: "100%", transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }}
                    style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", color: "#ffffff", whiteSpace: "nowrap" }}
                    className="text-sm font-medium uppercase"
                  >
                    {item}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Let's Talk button — hidden on mobile */}
        <div className="hidden lg:flex items-center" onMouseEnter={() => setServiceOpen(false)}>
          <motion.div
            initial="rest" whileHover="hover" {...(refinedLetsTalk ? { whileTap: "hover" } : {})} animate="rest"
            style={{ position: 'relative', height: 36, display: 'inline-flex', flexShrink: 0, cursor: 'pointer' }}
          >
            <button aria-label="Let's talk" onClick={() => openContactForm()} style={{ height: 36, paddingTop: refinedLetsTalk ? 8 : 6, paddingRight: 22, paddingBottom: refinedLetsTalk ? 8 : 6, paddingLeft: 12, display: 'inline-flex', alignItems: 'center', background: dark ? 'rgba(255,255,255,0.08)' : '#ffffff', borderRadius: 42, border: dark ? '1px solid rgba(255,255,255,0.25)' : '1px solid #9A9A9A', cursor: 'pointer', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', inset: 0, background: '#02A884', transformOrigin: 'left center', zIndex: 1, pointerEvents: 'none' }} />
              <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: 'absolute', inset: 0, background: '#0a0a0a', transformOrigin: 'left center', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 3, overflow: 'hidden', lineHeight: 1, fontSize: 15, height: '1em' }}>
                <motion.span variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: '-100%', transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ display: 'block', fontFamily: "'Cal Sans', sans-serif", fontSize: 15, lineHeight: 1, fontWeight: 400, letterSpacing: '0em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: dark ? '#9A9A9A' : '#414141' }}>
                  Let's Talk
                </motion.span>
                <motion.span aria-hidden variants={{ rest: { y: '100%', transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }} style={{ position: 'absolute', top: 0, left: 0, display: 'block', fontFamily: "'Cal Sans', sans-serif", fontSize: 15, lineHeight: 1, fontWeight: 400, letterSpacing: '0em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#ffffff' }}>
                  Let's Talk
                </motion.span>
              </div>
            </button>
            <motion.div variants={{ rest: { background: '#000000' }, hover: { background: '#02A884' } }} transition={{ duration: 0.18 }} style={{ position: 'absolute', top: 2, right: -12, width: 32, height: 32, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
              <motion.svg width={18} height={18} viewBox="0 0 24 24" style={{ display: 'block' }} fill="none" variants={{ rest: { stroke: '#ffffff' }, hover: { stroke: '#000000' } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
        {/* Hamburger — visible only on mobile (<lg), styled as black circle; morphs into an X while the menu is open */}
        <button
          className="topbar-hamburger lg:hidden flex flex-col items-center justify-center shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          style={{
            width: 44,
            height: 44,
            borderRadius: mobileMenuOpen ? "12px" : "50%",
            background: "#0a0a0a",
            gap: 5,
            border: "none",
            cursor: "pointer",
          }}
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <>
              <span className="topbar-hamburger-bar" style={{ display: "block", width: 20, height: 2, borderRadius: 99, background: "#fff" }} />
              <span className="topbar-hamburger-bar-short" style={{ display: "block", width: 14, height: 2, borderRadius: 99, background: "#fff" }} />
              <span className="topbar-hamburger-bar" style={{ display: "block", width: 20, height: 2, borderRadius: 99, background: "#fff" }} />
            </>
          )}
        </button>
      </div>

      {/* Service Dropdown Panel */}
      <motion.div
        initial={false}
        animate={{ height: serviceOpen ? "auto" : 0, opacity: serviceOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden", background: dark ? "#2A2A2A" : "transparent" }}
      >
        <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", padding: "8px 24px 24px 24px" }}>

          {/* Far Left: tagline column */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-end" }}>
            <p style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: 600,
              fontSize: "26px",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              color: dark ? "rgba(255,255,255,0.4)" : "#6E6E6E",
              margin: 0,
            }}>
              <span style={{ display: "block" }}>We build</span>
              <span style={{ display: "block" }}>Brands</span>
              <span style={{ display: "block" }}>That perform</span>
            </p>
          </div>

          {/* Center: service list + image grouped */}
          <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>

            {/* Service list */}
            <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
              {SERVICE_ITEMS.map((svc, i) => (
                <div
                  key={svc.slug}
                  style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredSlug(svc.slug)}
                  onClick={() => {
                    setServiceOpen(false);
                    navigate("/services", { state: { serviceIndex: i } });
                  }}
                >
                  <span style={{
                    fontFamily: "'Cal Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: hoveredSlug === svc.slug ? (dark ? "#ffffff" : "#1a1a1a") : (dark ? "rgba(255,255,255,0.45)" : "#888888"),
                    transition: "color 0.15s",
                    display: "inline-block",
                    padding: "6px 0",
                    borderBottom: i < SERVICE_ITEMS.length - 1 ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#e8e8e8"}` : "none",
                    whiteSpace: "nowrap",
                  }}>
                    {svc.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Crossfading image */}
            <div style={{ width: "200px", flexShrink: 0, borderRadius: "10px", overflow: "hidden", alignSelf: "stretch", position: "relative", minHeight: "160px" }}>
              {SERVICE_ITEMS.map((svc) => (
                <img
                  key={svc.slug}
                  src={SERVICE_IMG_MAP[svc.img]}
                  alt={svc.label}
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: hoveredSlug === svc.slug ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              ))}
            </div>

          </div>

          {/* Right: Connect With */}
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "6px", marginLeft: "26px" }}>
            <p style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: dark ? "rgba(255,255,255,0.4)" : "#888888",
              margin: 0,
              marginBottom: "2px",
            }}>
              Connect With
            </p>
            {[
              "+91 63699 74530",
              "hello@xglabs.in",
              "Chennai, Tamil Nadu, India",
            ].map((line) => (
              <p key={line} style={{
                fontFamily: "'Cal Sans', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: dark ? "rgba(255,255,255,0.7)" : "#1a1a1a",
                margin: 0,
                lineHeight: "1.4",
              }}>
                {line}
              </p>
            ))}
          </div>

        </div>
      </motion.div>

    </motion.div>
    </>
  );
}

// --- Contact Section ---

export function ContactSection({ onClose, onFieldInteract }: { onClose?: () => void; onFieldInteract?: () => void }) {
  return (
    <div
      className="absolute h-[1080px] overflow-clip top-1/2 translate-y-[-50%]"
      style={{ left: "210vw", width: "100vw", background: "#0e0e0e", display: "flex", flexDirection: "column" }}
    >
      <ContactFormContent embedded onClose={onClose} onFieldInteract={onFieldInteract} />
    </div>
  );
}