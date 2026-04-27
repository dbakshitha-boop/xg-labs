import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import svgPaths from "../../imports/svg-u8a253v5v5";
import svgPaths2 from "../../imports/svg-qt598ft3du"; 
import { motion } from "motion/react";
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

function ArrowContainer() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <div className="content-stretch flex items-center relative shrink-0">
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
      <div className="content-stretch flex items-center relative shrink-0">
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
      <p className="font-['Cal_Sans',sans-serif] leading-[1.1] tracking-[-0.02em] not-italic relative shrink-0 text-[#414141] text-[80px] w-full">
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
  const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
    
  const yUp = scrollStep * -200;
  const yDown = scrollStep * 200;
  const yDownToTop = 400 - (scrollStep * 400);

  return (
    <div 
      className="absolute h-[1080px] left-[1304px] top-1/2 translate-y-[-50%] w-[1304px] overflow-hidden bg-white/5"
    >
      <motion.div 
        animate={{ y: yUp }}
        transition={transition}
        className="absolute content-stretch flex flex-col gap-[20px] h-auto items-start left-[20px] top-[-370px] w-[408px]"
      >
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage1} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage2} /></div>
        <div className="h-[440px] relative shrink-0 w-[408px]"><img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImage3} /></div>
      </motion.div>

      <motion.div 
        animate={{ y: yDown }}
        transition={transition}
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
        animate={{ y: yDownToTop }}
        transition={transition}
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

export function ScrollContainer({ onNext }: { onNext?: () => void }) {
    return (
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="absolute bottom-[40px] content-stretch flex items-center justify-between left-0 px-[80px] w-[1304px] z-20 cursor-pointer pointer-events-auto"
        onClick={onNext}
      >
        <ArrowContainer />
        <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[24px] text-black text-nowrap">Scroll</p>
      </motion.div>
    );
}

const NAV_ROUTES: Record<string, string> = {
  "Portfolio": "/portfolio",
  "Blog": "/blog",
  "Service": "/services",
};

const SERVICE_ITEMS: { label: string; slug: string; img: string }[] = [
  { label: "PERFORMANCE MARKETING", slug: "performance-marketing", img: "img1" },
  { label: "SEO",                   slug: "seo",                   img: "img2" },
  { label: "WEB DEVELOPMENT",       slug: "web-development",       img: "img3" },
  { label: "SOCIAL MEDIA MANAGEMENT", slug: "social-media-management", img: "img4" },
  { label: "CONTENT CREATION & VIDEO PRODUCTION", slug: "content-creation-video-production", img: "img5" },
  { label: "INFLUENCER MARKETING",  slug: "influencer-marketing",  img: "img6" },
  { label: "BRANDING",              slug: "branding",              img: "img7" },
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
};

export function TopBar() {
    const navigate = useNavigate();
    const [serviceOpen, setServiceOpen] = useState(false);
    const [hoveredSlug, setHoveredSlug] = useState<string>("performance-marketing");

    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseLeave={() => setServiceOpen(false)}
            className="absolute bg-white flex flex-col left-1/2 -translate-x-1/2 w-[1184px] top-[40px] z-50 pointer-events-auto shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)] rounded-[8px]"
        >
            {/* Main bar row */}
            <div className="flex items-center justify-between px-[24px] py-[12px] h-[74px]">
                <div className="h-[50px] w-[186px] relative shrink-0 cursor-pointer" onClick={() => navigate("/", { state: { skipLoading: true } })}>
                    <img alt="" className="absolute inset-0 object-contain w-full h-full" src={imgImage48} />
                </div>

                <div className="flex gap-1 xl:gap-4 items-center">
                    {["Our Edge", "Service", "Portfolio", "Blog", "Contact"].map(item => {
                        const isService = item === "Service";
                        const isActive = isService && serviceOpen;

                        if (isService) {
                            return (
                                <div
                                    key={item}
                                    className={`relative cursor-pointer rounded px-3 py-2 flex items-center gap-[6px] font-space text-sm font-medium uppercase transition-colors duration-200 ${
                                        isActive ? "bg-black text-white" : "bg-transparent text-black"
                                    }`}
                                    onClick={() => setServiceOpen(prev => !prev)}
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
                                        <path d="M2 4L6 8L10 4" stroke={isActive ? "#ffffff" : "#000000"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
                                onClick={() => { setServiceOpen(false); NAV_ROUTES[item] && navigate(NAV_ROUTES[item]); }}
                            >
                                <motion.span
                                    aria-hidden="true"
                                    variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "#000000", transformOrigin: "bottom right", transform: "skewX(-16deg)" }}
                                />
                                <motion.span
                                    aria-hidden="true"
                                    variants={{ rest: { scaleY: 0, opacity: 1 }, hover: { scaleY: 1, opacity: 0 } }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#02A884", transformOrigin: "bottom right", transform: "skewX(-16deg)", zIndex: 1 }}
                                />
                                <motion.span
                                    variants={{ rest: { color: "#000000" }, hover: { color: "#ffffff" } }}
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
                  <div style={{ position: 'relative', width: 134, height: 50 }}> 
                    <button
                      aria-label="Let's talk"
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
                        background: '#ffffff',
                        borderRadius: 42,
                        border: '1px solid #9A9A9A',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontFamily: 'Space Grotesk, Sora, sans-serif',
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: '14px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span style={{ display: 'block', lineHeight: '14px' }}>LET'S TALK</span>
                    </button>

                    {/* Overlapping black circle */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: -6,
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      background: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {/* Arrow centered inside circle (24x24) pointing right and nudged slightly */}
                      <svg width={24} height={24} viewBox="0 0 24 24" style={{ transform: 'translateX(4px)', position: 'relative' }} fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
            </div>

            {/* Service Dropdown Panel */}
            <motion.div
                initial={false}
                animate={{ height: serviceOpen ? "auto" : 0, opacity: serviceOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
            >
                <div style={{ display: "flex", alignItems: "stretch", padding: "8px 48px 32px 48px", gap: "64px" }}>
                    {/* Left: service list */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "340px" }}>
                        {SERVICE_ITEMS.map((svc, i) => (
                            <div
                                key={svc.slug}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    cursor: "pointer",
                                    borderBottom: i < SERVICE_ITEMS.length - 1 ? "1px solid #e8e8e8" : "none",
                                    transition: "color 0.15s",
                                }}
                                onMouseEnter={() => setHoveredSlug(svc.slug)}
                                onClick={() => {
                                    setServiceOpen(false);
                                    navigate("/services");
                                    setTimeout(() => {
                                        const el = document.getElementById(svc.slug);
                                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }, 80);
                                }}
                            >
                                <span style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: hoveredSlug === svc.slug ? "#1a1a1a" : "#aaaaaa",
                                    transition: "color 0.15s",
                                    textAlign: "right",
                                }}>
                                    {svc.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Right: crossfading image */}
                    <div style={{ width: "240px", flexShrink: 0, borderRadius: "10px", overflow: "hidden", height: "340px", position: "relative" }}>
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
            </motion.div>
        </motion.div>
    );
}

// --- Contact Section ---

function TitleTextFrame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[760px]" data-name="Title Text Frame">
      <p className="font-['Cal_Sans',sans-serif] leading-[1.1] tracking-[-0.02em] not-italic relative shrink-0 text-[#6e6e6e] text-[80px] w-full">Let's Talk</p>
    </div>
  );
}

function TitleFrame() {
  return (
    <div className="content-stretch flex gap-[200px] items-end relative shrink-0 w-[1553px]" data-name="Title Frame">
      <TitleTextFrame />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6e6e6e] text-[24px] w-[573px]">
        {`We'd love to understand what `}
        <br aria-hidden="true" />
        you're building.
      </p>
    </div>
  );
}

function FormColumnFrame() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px pb-[12px] pt-0 px-0 relative shrink-0" data-name="Form Column Frame">
      <div aria-hidden="true" className="absolute border-[#9a9a9a] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="[text-underline-position:from-font] decoration-solid font-['Sora:Regular',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#f7f8fa] text-[16px] text-nowrap tracking-[-0.32px] underline uppercase">{`WHO YOU ARE `}</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#414141] text-[48px] text-nowrap">[ Your Name ]</p>
    </div>
  );
}

function FormColumnFrame1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[12px] pt-0 px-0 relative shrink-0 w-[760px]" data-name="Form Column Frame">
      <div aria-hidden="true" className="absolute border-[#9a9a9a] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="[text-underline-position:from-font] decoration-solid font-['Sora:Regular',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#f7f8fa] text-[16px] text-nowrap tracking-[-0.32px] underline uppercase">primary way to respond</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#414141] text-[48px] text-nowrap">[ Your Email ]</p>
    </div>
  );
}

function FormRowFrame() {
  return (
    <div className="content-stretch flex gap-[200px] items-start relative shrink-0 w-full" data-name="Form Row Frame">
      <FormColumnFrame />
      <FormColumnFrame1 />
    </div>
  );
}

function LabelTextFrame() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 text-[#f7f8fa] text-[16px] text-nowrap tracking-[-0.32px] uppercase" data-name="Label Text Frame">
      <p className="[text-underline-position:from-font] decoration-solid font-['Sora:Regular',sans-serif] font-medium leading-[1.2] relative shrink-0 underline">YOUR COMPANY</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0">(optional)</p>
    </div>
  );
}

function FormColumnFrame2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[12px] pt-0 px-0 relative shrink-0 w-[760px]" data-name="Form Column Frame">
      <div aria-hidden="true" className="absolute border-[#9a9a9a] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <LabelTextFrame />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#414141] text-[48px] text-nowrap">[ Company Name ]</p>
    </div>
  );
}

function FormColumnFrame3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[12px] pt-0 px-0 relative shrink-0 w-[760px]" data-name="Form Column Frame">
      <div aria-hidden="true" className="absolute border-[#9a9a9a] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="[text-underline-position:from-font] decoration-solid font-['Sora:Regular',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#f7f8fa] text-[16px] text-nowrap tracking-[-0.32px] underline uppercase">Faster replies</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#414141] text-[48px] text-nowrap">[ Your Phone Number ]</p>
    </div>
  );
}

function FormRowFrame1() {
  return (
    <div className="content-stretch flex gap-[200px] items-end relative shrink-0 w-full" data-name="Form Row Frame">
      <FormColumnFrame2 />
      <FormColumnFrame3 />
    </div>
  );
}

function LabelTextFrame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 text-[#f7f8fa] text-[16px] text-nowrap tracking-[-0.32px] uppercase" data-name="Label Text Frame">
      <p className="[text-underline-position:from-font] decoration-solid font-['Sora:Regular',sans-serif] font-medium leading-[1.2] relative shrink-0 underline">How can we help?</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0">(optional)</p>
    </div>
  );
}

function FormColumnFrame4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow h-[103px] items-start min-h-px min-w-px pb-[12px] pt-0 px-0 relative shrink-0" data-name="Form Column Frame">
      <div aria-hidden="true" className="absolute border-[#9a9a9a] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <LabelTextFrame1 />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#414141] text-[48px] text-nowrap">{`[ Tell us briefly what you need  project, problem, or idea. ]`}</p>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_66_14158)" id="Icon container">
          <path d="M20 6.66675L20 33.3334M6.66666 20.0001L33.3333 20.0001" fill="var(--fill-0, #6E6E6E)\" stroke="var(--stroke-0, #6E6E6E)\" strokeWidth="2\" strokeLinecap="round" />
        </g>
        <defs>
          <clipPath id="clip0_66_14158">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FormCta1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity" data-name="Form CTA">
      <p className="font-['Sora:Light',sans-serif] font-light leading-[1.2] relative shrink-0 text-[#f7f8fa] text-[60px] text-nowrap tracking-[-2.4px]">[</p>
      <IconContainer1 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]\">
          <p className="font-['Sora:Light',sans-serif] font-light leading-[1.2] relative text-[#f7f8fa] text-[60px] text-nowrap tracking-[-2.4px]">[</p>
        </div>
      </div>
    </div>
  );
}

function FormRowFrame2() {
  return (
    <div className="content-stretch flex gap-[120px] items-end justify-end relative shrink-0 w-full" data-name="Form Row Frame">
      <FormColumnFrame4 />
      <FormCta1 />
    </div>
  );
}

function FormFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[120px] items-start relative shrink-0 w-full" data-name="Form Frame">
      <FormRowFrame />
      <FormRowFrame1 />
      <FormRowFrame2 />
    </div>
  );
}

function HeaderFrame() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Header Frame">
      <TitleFrame />
    </div>
  );
}

function ContactForm() {
  return (
    <div className="absolute content-stretch flex flex-col h-[880px] items-start justify-between left-[100px] top-1/2 translate-y-[-50%] w-[1720px]" data-name="Contact  form">
      <HeaderFrame />
      <FormFrame />
    </div>
  );
}

export function ContactSection() {
    return (
        <div className="absolute bg-[#060606] h-[1080px] left-[3912px] overflow-clip top-1/2 translate-y-[-50%] w-[1920px]">
            <ContactForm />
        </div>
    );
}