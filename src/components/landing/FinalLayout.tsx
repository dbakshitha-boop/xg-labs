import React, { useState, useRef, useEffect } from "react";
import { ContactFormContent } from "../ContactFormOverlay";
import { useContactForm } from "../ContactFormContext";
import { useNavigate } from "react-router-dom";
import svgPaths from "../../imports/svg-u8a253v5v5";
import svgPaths2 from "../../imports/svg-qt598ft3du";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "motion/react";
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
import pm from "../../assets/servicelist_topbar/Performance marketing_servicelist.jpeg";
import cc from "../../assets/servicelist_topbar/Contentcreation_servicelist.jpeg";
import influencer from "../../assets/servicelist_topbar/Influencer_servicelist.jpeg";
import SEO from "../../assets/servicelist_topbar/SEO_servicelist.jpeg";
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

function TextContainer() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute content-stretch flex flex-col gap-[24px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] text-center"
      data-name="Text Container"
    >
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#414141] text-[24px] tracking-[-0.96px] w-full">STRATEGY FIRST</p>
      <p className="font-['Cal_Sans',sans-serif] leading-[1.1] tracking-[-0.02em] not-italic relative shrink-0 text-[#060606] text-[96px] uppercase w-full">Strategy Over Everything</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#414141] text-[24px] tracking-[-0.96px] w-full">
        {`We align strategy, creative, and execution to `}
        <br aria-hidden="true" />
        drive measurable growth.
      </p>
    </motion.div>
  );
}

function ArrowContainer({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <div
        className="content-stretch flex items-center relative shrink-0 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
      >
        <div className="flex items-center justify-center relative shrink-0 size-[40px]">
          <div className="flex-none rotate-[270deg]">
            <div className="relative size-[40px]">
              <svg className="block size-full" fill="none" viewBox="0 0 40 40">
                <rect height="39" rx="19.5" stroke="var(--stroke-0, black)" width="39" x="0.5" y="0.5" />
                <path d={svgPaths.p3c0a3b80} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex items-center relative shrink-0 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onNext?.(); }}
      >
        <div className="flex items-center justify-center relative shrink-0 size-[40px]">
          <div className="flex-none rotate-[90deg]">
            <div className="relative size-[40px]">
              <svg className="block size-full" fill="none" viewBox="0 0 40 40">
                <rect height="39" rx="3.5" stroke="var(--stroke-0, black)" width="39" x="0.5" y="0.5" />
                <path d={svgPaths.p47d4600} fill="var(--fill-0, black)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Sora:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5f5f5f] text-[32px] tracking-[-0.64px] uppercase w-full">
        <p className="leading-[1.1]">WE'RE XG LABS</p>
      </div>
      <p className="font-bold font-['Cal_Sans',sans-serif] leading-[1.1] tracking-[-0.02em] not-italic relative shrink-0 text-[#414141] text-[80px] w-full">
        A creative partner for brands who refuse to be{" "}
        <span className="relative inline-block mx-1 px-4">
          <span className="relative z-10 text-white">ordinary.</span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ originX: 0 }}
            className="absolute inset-0 bg-[#00A88D]"
          />
        </span>
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-1/2 text-center top-[calc(50%-70.5px)] translate-x-[-50%] translate-y-[-50%] w-[1050px]">
      <Frame4 />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6e6e6e] text-[24px] w-[746px]">We turn ideas into visuals that move people — and move brands forward.Every piece we create is intentional, expressive, and designed to hit with purpose.</p>
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
    <div className="absolute bg-[#f7f8fa] h-[1080px] left-[2608px] overflow-hidden top-1/2 translate-y-[-50%] w-[1304px]">
      {/* Grid Background */}
      <div className="absolute h-[1080px] left-1/2 opacity-5 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1304px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGrid} />
      </div>

      {/* Ellipse */}
      <div className="absolute h-[1076px] left-[calc(50%-29.5px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1075px]">
        <svg className="block size-full" fill="none" viewBox="0 0 1075 1076">
          <ellipse cx="537.5" cy="538" fill="white" rx="537.5" ry="538" />
        </svg>
      </div>

      {/* Scattered Card Images */}
      <div className="absolute inset-0 pointer-events-none">
        <CardImages isVisible={isVisible} />
      </div>

      {/* Text Content */}
      <Frame5 />
    </div>
  );
}

// --- Vertical Content (The Footer/Next Section) ---

export function VerticalContent() {
  return null;
}

// --- Exported Components ---

export function FinalGrid() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none">
      <div className="absolute h-[1080px] left-1/2 opacity-[0.02] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1304px]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </motion.div>
  )
}

export function FinalCircle() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 size-[1016px] top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none"
    >
      <svg className="block size-full" fill="none" viewBox="0 0 1016 1016">
        <circle cx="508" cy="508" fill="var(--fill-0, white)" opacity="0.5" r="508" />
      </svg>
    </motion.div>
  )
}

export function FinalOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
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

      <TextContainer />
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

  return (
    <div
      className="absolute h-[1080px] top-1/2 translate-y-[-50%] w-[1304px] overflow-hidden bg-white/5"
      style={{ left: "70vw" }}
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute content-stretch flex flex-col gap-[20px] h-auto items-start left-[20px] top-[-370px] w-[408px]"
      >
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage1} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage2} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage3} /></div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute content-stretch flex flex-col gap-[20px] h-auto items-start left-[448px] top-[-600px] w-[408px]"
      >
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage4} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage5} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px] overflow-clip">
          <img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage6} />
          <div className="absolute h-[510px] left-0 top-0 w-[408px]" />
        </div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage7} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage5} /></div>
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute content-stretch flex flex-col gap-[20px] h-auto items-start left-[876px] top-[-370px] w-[408px]"
      >
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage8} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage9} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage10} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage11} /></div>
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
      className="absolute bottom-[40px] content-stretch flex items-center justify-between left-0 px-[80px] z-20 pointer-events-auto"
      style={{ width: "70vw" }}
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
  img4: imgImage3,
  img5: imgImage4,
  img6: imgImage5,
  img7: imgImage6,
  pm,
  SEO,
  cc,
  influencer,
};

export function TopBar({ dark = false }: { dark?: boolean }) {
  const navigate = useNavigate();
  const [serviceOpen, setServiceOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string>("performance-marketing");
  const [hidden, setHidden] = useState(false);
  const { open: openContactForm } = useContactForm();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setHidden(false);
      } else if (currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseLeave={() => setServiceOpen(false)}
      className={`absolute flex flex-col left-1/2 -translate-x-1/2 top-[40px] z-50 pointer-events-auto rounded-[8px] ${dark ? "ring-1 ring-white/[0.15]" : "bg-white shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)]"}`}
      style={{ width: "min(1224px, calc(100% - 80px))", ...(dark ? { background: "#2A2A2A" } : {}) }}
    >
      {/* Main bar row */}
      <div className="flex items-center justify-between px-[24px] py-[8px] h-[74px]">
        <div className="shrink-0 cursor-pointer" onClick={() => navigate("/", { state: { skipLoading: true } })}>
          <img alt="" style={{ height: "68px", width: "auto", display: "block" }} src={imgImage12} />
        </div>

        <div className="flex gap-1 xl:gap-4 items-center">
          {["Our Edge", "Service", "Portfolio", "Blog", "Contact"].map(item => {
            const isService = item === "Service";
            const isActive = isService && serviceOpen;

            if (isService) {
              return (
                <div
                  key={item}
                  className={`relative cursor-pointer rounded px-3 py-2 flex items-center gap-[6px] font-space text-sm font-medium uppercase transition-colors duration-200 ${isActive ? "bg-black text-white" : "bg-transparent"}`}
                  style={{ color: dark ? "#9A9A9A" : undefined }}
                  onClick={() => navigate("/services")}
                  onMouseEnter={() => setServiceOpen(true)}
                >
                  {item}
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "block",
                      flexShrink: 0,
                    }}
                  >
                    <path d="M2 4L6 8L10 4" stroke={isActive ? "#ffffff" : dark ? "#9A9A9A" : "#000000"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              );
            }

            return (
              <motion.div
                key={item}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative cursor-pointer rounded px-3 py-2"
                onClick={() => {
                  setServiceOpen(false);
                  if (item === "Contact") {
                    const footerEl = document.getElementById("footer");
                    if (footerEl) {
                      document.body.style.overflow = "auto";
                      footerEl.scrollIntoView({ behavior: "smooth" });
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
                <motion.span
                  aria-hidden="true"
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "#000000", transformOrigin: "bottom center", borderRadius: "6px" }}
                />
                <motion.span
                  aria-hidden="true"
                  variants={{ rest: { scaleY: 0, opacity: 1 }, hover: { scaleY: 1, opacity: 0 } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#02A884", transformOrigin: "bottom center", borderRadius: "6px 6px 0 0", zIndex: 1 }}
                />
                <motion.span
                  variants={{ rest: { color: dark ? "#9A9A9A" : "#000000" }, hover: { color: "#ffffff" } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 font-space text-sm font-medium uppercase"
                >
                  {item}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center">
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{ position: 'relative', width: 134, height: 50 }}
          >
            {/* Black fill that pans out from left on hover */}
            <motion.span
              aria-hidden
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: 0, left: 0, bottom: 0,
                width: 134,
                background: '#000000',
                borderRadius: 42,
                transformOrigin: 'left center',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            <button
              aria-label="Let's talk"
              onClick={() => openContactForm()}
              style={{
                width: 134,
                height: 50,
                paddingTop: 12,
                paddingRight: 28,
                paddingBottom: 12,
                paddingLeft: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: dark ? '#3a3a3a' : '#ffffff',
                borderRadius: 42,
                border: dark ? '1px solid rgba(255,255,255,0.25)' : '1px solid #9A9A9A',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'Space Grotesk, Sora, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                lineHeight: '14px',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.span
                variants={{ rest: { color: dark ? '#9A9A9A' : '#000000' }, hover: { color: '#ffffff' } }}
                transition={{ duration: 0.3 }}
                style={{ display: 'block', lineHeight: '14px', position: 'relative', zIndex: 2 }}
              >
                LET'S TALK
              </motion.span>
            </button>

            {/* Overlapping arrow circle */}
            <motion.div
              variants={{ rest: { background: '#000000' }, hover: { background: '#02A884' } }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                right: -6,
                width: 50,
                height: 50,
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <motion.svg
                width={24} height={24} viewBox="0 0 24 24"
                style={{ transform: 'translateX(4px)', position: 'relative' }}
                fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <motion.path d="M5 12h14" variants={{ rest: { stroke: '#ffffff' }, hover: { stroke: '#000000' } }} transition={{ duration: 0.3 }} />
                <motion.path d="M13 5l7 7-7 7" variants={{ rest: { stroke: '#ffffff' }, hover: { stroke: '#000000' } }} transition={{ duration: 0.3 }} />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
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
              fontFamily: "'Space Grotesk', 'Cal Sans' sans-serif",
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
                    fontFamily: "'Space Grotesk', sans-serif",
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
            <div style={{ width: "140px", flexShrink: 0, borderRadius: "10px", overflow: "hidden", alignSelf: "stretch", position: "relative", minHeight: "160px" }}>
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
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "12px" }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: dark ? "rgba(255,255,255,0.4)" : "#888888",
              margin: 0,
            }}>
              Connect With
            </p>
            {[
              "+91 98765 43210",
              "hello@xglabs.agency",
              "Ramachantra Medical College, Porur Chennai",
            ].map((line) => (
              <p key={line} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: dark ? "rgba(255,255,255,0.7)" : "#1a1a1a",
                margin: 0,
                lineHeight: "1.5",
              }}>
                {line}
              </p>
            ))}
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
}

// --- Contact Section ---

export function ContactSection() {
  return (
    <div
      className="absolute h-[1080px] left-[3912px] overflow-clip top-1/2 translate-y-[-50%] w-[1304px]"
      style={{ background: "#0e0e0e", display: "flex", flexDirection: "column" }}
    >
      <ContactFormContent embedded />
    </div>
  );
}