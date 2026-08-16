import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll } from "motion/react";
import svgPaths from "../../imports/svg-0jzj7gw8ha";
import imgAndhraSH from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgGoWheels from "../../assets/3_gowheels.png";
import imgBrandopedia from "../../assets/2_brandopedia.png";
import imgKalki from "../../assets/4_kalki.png";

const CONTENT_DATA = [
  {
    id: "01",
    title: "Strategic Creativity",
    description: [
      "Ideas shaped by insight",
      "and built with purpose -",
      "never random, always intentional."
    ]
  },
  {
    id: "02",
    title: "Modern, Minimal Execution",
    description: [
      "Design and content crafted",
      "to cut through noise with",
      "clarity, simplicity, and impact."
    ]
  },
  {
    id: "03",
    title: "Fast, Focused Delivery",
    description: [
      "We work with speed and",
      "precision, without sacrificing",
      "thinking or quality."
    ]
  },
  {
    id: "04",
    title: "Growth-Driven Storytelling",
    description: [
      "Narratives and visuals",
      "engineered to attract attention,",
      "deepen engagement, and",
      "drive meaningful growth."
    ]
  }
];

const TOTAL_RECTS = 19 * 22;

// Grid of rectangles that fills based on progress
function RectangleGrid({ progress }: { progress: number }) {
  const cols = 19;
  const rows = 22;

  // Deterministic random order for filling
  const randomIndices = useMemo(() => {
    const indices = Array.from({ length: TOTAL_RECTS }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor((i * 12345 + 6789) % (i + 1)); 
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  const numFilled = Math.floor(progress * TOTAL_RECTS);
  const filledSet = useMemo(() => {
    return new Set(randomIndices.slice(0, numFilled));
  }, [numFilled, randomIndices]);

  return (
    <div className="absolute inset-0 grid grid-cols-19 grid-rows-22">
      {Array.from({ length: TOTAL_RECTS }).map((_, i) => {
        const isFilled = filledSet.has(i);
        return (
          <div
            key={i}
            className="border border-[rgba(0,0,0,0.05)] border-solid transition-colors duration-200 h-full w-full"
            style={{
              backgroundColor: isFilled ? '#d4deff' : 'transparent'
            }}
          />
        );
      })}
    </div>
  );
}

const IMAGES = [imgBrandopedia, imgGoWheels, imgKalki, imgAndhraSH];

// Restored specific rotations to hint at the stack depth
// Image 1: 343.7 deg (-16.3 deg)
// Image 2: 353.3 deg (-6.7 deg)
// Image 3: 350.9 deg (-9.1 deg)
// Image 4: 14.9 deg (+14.9 deg)
const CARD_ROTATIONS = [343.719, 353.296, 350.884, 14.924];

// Standardized dimensions for all cards
const CARD_WIDTH = 266;
const CARD_HEIGHT = 287;

// All positions are identical (centered), only zIndex differs to stack them.
const POSITIONS = [
  { zIndex: 40 }, // Front (Image 1)
  { zIndex: 30 }, // 2nd (Image 2)
  { zIndex: 20 }, // 3rd (Image 3)
  { zIndex: 10 }, // 4th (Image 4)
];

function CardStack({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-0">
      {IMAGES.map((src, index) => {
        const stackIndex = index - activeIndex;
        let targetPos;
        let isFalling = false;
        let isVisible = true;

        if (stackIndex < 0) {
          isFalling = true;
          targetPos = POSITIONS[0];
        } else if (stackIndex < POSITIONS.length) {
          targetPos = POSITIONS[stackIndex];
        } else {
          targetPos = POSITIONS[POSITIONS.length - 1];
          isVisible = false;
        }

        const rotation = CARD_ROTATIONS[index];

        return (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2"
            initial={false}
            animate={{
              x: "-50%",
              y: isFalling ? "200%" : "-50%", // Fall out of view
              zIndex: isFalling ? 50 : targetPos.zIndex,
              opacity: isFalling ? 0 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="flex-none"
              animate={{ rotate: rotation }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div
                className="relative rounded-[12px] shadow-[0px_3.4px_8.5px_0px_rgba(0,0,0,0.1)]"
                style={{ width: "290px", height: "314px" }}
              >
                <img 
                  alt="" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" 
                  src={src} 
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function RoundForImage({ activeIndex, circleSize }: { activeIndex: number; circleSize: string }) {
  return (
    <div className="absolute bg-[#f7f8fa] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full" style={{ width: circleSize, height: circleSize }} data-name="Round for image">
        <CardStack activeIndex={activeIndex} />
    </div>
  );
}

function ImageContainer({ progress, activeIndex, circleSize }: { progress: number, activeIndex: number, circleSize: string }) {
  return (
    <div className="h-full w-full overflow-hidden relative" data-name="Image Container">
      <div className="bg-[#e9f0ff] relative size-full" data-name="Right side">
        <RectangleGrid progress={progress} />
        <RoundForImage activeIndex={activeIndex} circleSize={circleSize} />
      </div>
    </div>
  );
}

function HeaderTextContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Header Text Container">
      <p className="font-['Cal_Sans',sans-serif] leading-[1.2] tracking-[-0.02em] not-italic relative shrink-0 text-[#414141] uppercase whitespace-normal" style={{ fontSize: "clamp(20px, 2.2vw, 32px)" }}>What makes us Different</p>
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] lg:gap-[20px] items-start relative shrink-0 w-full" data-name="Header Container">
      <HeaderTextContainer />
      <p className="font-['Sora',sans-serif] font-normal leading-[1.4] relative text-[#5f5f5f] tracking-normal w-full max-w-none line-clamp-3 lg:line-clamp-none" style={{ fontSize: "clamp(13px, 2vw, 28px)" }}>
        We blend strategy, design, and storytelling into work that feels modern, intentional, and built to move brands forward. Every idea is crafted with clarity and purpose — no noise, no filler, just high-impact creative that works.
      </p>
    </div>
  );
}

function RevealText({ children, delay = 0, isActive }: { children: React.ReactNode, delay?: number, isActive: boolean }) {
  return (
    <div className="relative inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em] font-['Sora',sans-serif]">
      {/* Text fades in smoothly as curtain exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isActive ? delay + 0.25 : 0 }}
        className="leading-[1.15]"
      >
        {children}
      </motion.div>

      {/* Teal curtain wipe */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 bg-[#00A88D] z-10"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isActive ? {
          scaleX: [0, 1, 1, 0],
          originX: [0, 0, 1, 1]
        } : { scaleX: 0 }}
        transition={{
          duration: 0.55,
          delay: delay,
          times: [0, 0.45, 0.55, 1],
          ease: [0.76, 0, 0.24, 1]
        }}
      />
    </div>
  );
}

function SubheaderContainer({ title, id }: { title: string, id: string }) {
  return (
    <div className="content-stretch flex font-['Cal_Sans',sans-serif] font-normal gap-[12px] lg:gap-[24px] items-start leading-[1.2] tracking-[-0.02em] relative shrink-0 text-[#060606] uppercase w-full" style={{ fontSize: "clamp(16px, 1.6vw, 24px)" }} data-name="Subheader Container">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">{title}</p>
    </div>
  );
}

function ContentContainer({ description, title, id, isInView }: { description: string[], title: string, id: string, isInView: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Content Container">
      <SubheaderContainer title={title} id={id} />
      <div className="flex flex-col w-full">
        {description.map((line, idx) => (
             <div key={idx} className="relative font-['Cal Sans',sans-serif] leading-[1.4] tracking-normal text-[#5f5f5f] w-full whitespace-normal" style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                <RevealText delay={idx * 0.1} isActive={isInView}>
                  {line}
                </RevealText>
             </div>
        ))}
      </div>
    </div>
  );
}

function RealContent({ activeIndex, isInView }: { activeIndex: number; isInView: boolean }) {
  const content = CONTENT_DATA[activeIndex] || CONTENT_DATA[CONTENT_DATA.length - 1];

  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-name="Real content">
      <motion.div
        key={`${content.id}-${isInView}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <ContentContainer
            title={content.title}
            description={content.description}
            id={content.id}
            isInView={isInView}
        />
      </motion.div>
    </div>
  );
}

function TextContainer({ activeIndex, isInView }: { activeIndex: number; isInView: boolean }) {
  return (
    <div className="content-stretch flex flex-col relative shrink-0 w-full h-full" style={{ padding: "clamp(24px, 4vw, 64px)", paddingTop: "clamp(32px, 4vw, 56px)", justifyContent: "flex-start", gap: "clamp(56px, 12vw, 190px)" }} data-name="Text Container">
      <HeaderContainer />
      <div>
        <RealContent activeIndex={activeIndex} isInView={isInView} />
      </div>
    </div>
  );
}

export function WhatMakesUsDifferent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [subProgress, setSubProgress] = useState(0);
  const [hasSeen, setHasSeen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Drive activeIndex / subProgress from scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const raw = latest * 4;
      const index = Math.min(Math.floor(raw), 3);
      const sub = (index === 3 && raw >= 4) ? 1 : raw % 1;
      setActiveIndex(index);
      setSubProgress(sub);
    });
  }, [scrollYProgress]);

  // hasSeen: true whenever the sticky container is actually covering the viewport.
  // Uses a scroll listener so it resets when the user leaves and replays on re-entry,
  // and also fires on smooth-scroll navigation (scrollYProgress stays 0 on arrival).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setHasSeen(rect.top <= 0 && rect.bottom > 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update(); // run once on mount in case page already scrolled here
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={containerRef} id="what-makes-us-different" className="relative h-[400vh]" data-name="Scroll Container">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <div className="content-stretch flex flex-col lg:flex-row items-stretch relative w-full h-full">
          {/* Image side */}
          <div
            className="w-full lg:w-1/2 relative overflow-hidden shrink-0"
            style={{ height: isMobile ? "48vh" : "100%" }}
          >
             <ImageContainer
               progress={subProgress}
               activeIndex={activeIndex}
               circleSize={isMobile ? "min(42vh, 76vw)" : "min(620px, 56vw)"}
             />
          </div>
          {/* Text side */}
          <div
            className="w-full lg:w-1/2 overflow-hidden flex flex-col shrink-0"
            style={{ height: isMobile ? "52vh" : "100%" }}
          >
            <TextContainer activeIndex={activeIndex} isInView={hasSeen} />
          </div>
        </div>
      </div>
    </div>
  );
}