import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { cn } from "./ui/utils";
import { useCursor } from "./ui/CustomCursor";
import imgPerformance from "figma:asset/829c7dea73546d44cdf81f9fa2d6cd9ab132117d.png";
import imgSEO from "figma:asset/b5047b31ab40cf51abf5e89f3b5017013a810db8.png";
import imgBranding from "figma:asset/97255d534336f1ae220810ce0585cdde411c6098.png";
import hoverImage from "figma:asset/c47096a00cbb223b6c6e2a485653499e5b4c9291.png";
import imgPerformanceNew from "../assets/servicelist_topbar/Performance marketing_servicelist.jpeg";
import imgWebDevNew from "figma:asset/3928f5a725db8937d4474329e22213a3e4710bec.png";
import imgSEONew from "../assets/servicelist_topbar/SEO_servicelist.jpeg";
import imgSocialMediaNew from "figma:asset/06355012afb0087b8c9bfc9843e66981c1b4fc10.png";
import imgContentCreationNew from "../assets/servicelist_topbar/Contentcreation_servicelist.jpeg";
import imgInfluencerNew from "../assets/servicelist_topbar/Influencer_servicelist.jpeg";
import imgBrandingNew from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgFreeIPhone17Pro from "figma:asset/5b825e76949bb7e4a44591c49d22c2454be4fcbb.png";
import imgKraftPaperPostalBagAndSticker from "figma:asset/e99bbe75d12e6f0fde7bad8f2fe82a3e1af79637.png";
import imgLoadingScreen1 from "figma:asset/8cfd0d9e1f1eb6a0794e4dd6eaf7fd03d5fc8ac9.png";
import imgDuctTapeMockup from "figma:asset/60a79c2d680a8bef3af588bb3ff626d64a3d8125.png";
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

  return (
    <div
      onMouseEnter={() => setVariant('default')}
      className="w-full max-w-[1920px] mx-auto px-4 lg:px-0 py-20 flex flex-col font-sans bg-[#F7F8FA]"
    >
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
              setHasBeenRevealed(true);
            }, 400); // Slight delay for premium feel
          }
        },
        { threshold: 0.2 }
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
        "group relative w-full lg:!cursor-none transition-all duration-500",
        isDimmed ? "lg:blur-[2px] opacity-100" : "opacity-100",
        active ? "z-50" : "z-10"
      )}
      onMouseEnter={() => {
        if (!isMobile) {
          setHoveredIndex(index);
          setVariant('button');
          setText('Explore our work');
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setHoveredIndex(null);
          setVariant('default');
          setText(null);
          if (!hasBeenRevealed) setHasBeenRevealed(true);
        }
      }}
    >
      {/* Highlight Image */}
      <AnimatePresence>
        {active && (
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
                <div className="bg-white relative rounded-[8px] size-full overflow-hidden">
                  <div className="flex flex-col gap-[4px] p-[4px] size-full relative">
                    {/* Background Pattern */}
                    <div className="absolute h-[615px] left-[calc(50%+0.5px)] opacity-[0.06] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[346px] pointer-events-none">
                      <img src={imgLoadingScreen1} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" alt="" />
                    </div>

                    {/* Top Section - iPhone */}
                    <div className="bg-[rgba(247,228,70,0.25)] h-[180px] overflow-clip relative rounded-[4px] shrink-0 w-full">
                      <div className="absolute h-[251px] left-[calc(50%+0.5px)] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[334px]">
                        <img src={imgFreeIPhone17Pro} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" alt="" />
                      </div>
                    </div>

                    {/* Bottom Section - Team & Bag */}
                    <div className="flex gap-[10px] items-start relative shrink-0 w-full">
                      {/* Left Blue Box */}
                      <div className="bg-[#002ae8] h-[160px] overflow-clip relative rounded-[4px] shrink-0 w-[157.5px]">
                        <p className="absolute font-['Cal_Sans',sans-serif] leading-[1.2] left-[25.5px] not-italic text-[4px] text-center text-nowrap text-white top-[calc(50%-3px)] tracking-[-0.08px] translate-x-[-50%]">A TEAM OF</p>
                        <div className="absolute content-stretch flex items-center left-[42px] px-0 py-[10px] top-1/2 translate-y-[-50%]">
                          <div className="flex flex-col font-['Cal_Sans',sans-serif] items-start leading-[0.96] not-italic text-[24px] text-nowrap tracking-[-0.48px] w-[116px]">
                            <p className="relative shrink-0 text-[rgba(255,255,255,0.4)] text-center">LEADERS</p>
                            <p className="relative shrink-0 text-[rgba(255,255,255,0.4)] text-center">CREATORS</p>
                            <p className="bg-clip-text bg-gradient-to-b from-[rgba(255,255,255,0.5)] relative shrink-0 to-[#ffffff]" style={{ WebkitTextFillColor: "transparent" }}>
                              BUILDERS
                            </p>
                            <p className="relative shrink-0 text-white">THINKERS</p>
                            <p className="bg-clip-text bg-gradient-to-b from-[rgba(255,255,255,0.5)] relative shrink-0 text-center to-[rgba(255,255,255,0.25)]" style={{ WebkitTextFillColor: "transparent" }}>
                              EXPLORERS
                            </p>
                            <p className="relative shrink-0 text-[rgba(255,255,255,0.4)]">DOERS</p>
                            <p className="relative shrink-0 text-[rgba(255,255,255,0.4)]">CODERS</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Yellow Box */}
                      <div className="basis-0 bg-[rgba(247,228,70,0.25)] grow h-[160px] min-h-px min-w-px relative rounded-[4px] shrink-0">
                        <div className="absolute h-[236px] left-[calc(50%-8.25px)] top-[calc(50%-8px)] translate-x-[-50%] translate-y-[-50%] w-[316px]">
                          <img src={imgKraftPaperPostalBagAndSticker} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" alt="" />
                        </div>
                      </div>
                    </div>

                    {/* Duct Tape Overlay */}
                    <div className="absolute flex h-[267px] items-center justify-center left-[-10px] top-[231px] w-[355px] pointer-events-none z-20">
                      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                        <div className="h-[267px] relative w-[355px]">
                          <img src={imgDuctTapeMockup} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
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

      <div className="flex flex-col lg:flex-row bg-[#F7F8FA] transition-colors duration-500 px-6 lg:pl-[100px] lg:pr-[70px] gap-6 lg:gap-[80px]">

        {/* Left Column */}
        <div className="w-full lg:w-[350px] shrink-0 flex flex-col justify-between z-10 py-10 lg:py-[60px]">
          <div className="flex flex-col justify-start">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#414141] mb-2 uppercase font-['Sora',sans-serif]">
              {title}
            </h3>
            <p className="text-sm text-gray-500 max-w-full lg:max-w-[250px] leading-relaxed font-['Sora',sans-serif]">
              {subtitle}
            </p>
          </div>

          {/* State 2: "What We Deliver" section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="mt-6 lg:mt-0 hidden md:block"
          >
            <span className="font-bold text-[#00A88D] uppercase tracking-[0.2em] font-['Sora',sans-serif]" style={{ fontSize: "16px" }}>
              What We Deliver
            </span>
          </motion.div>
        </div>

        {/* Right Column: Content Lines & Deliverables */}
        <div className="w-full lg:flex-1 min-w-0 relative z-10 py-10 lg:py-[60px]" style={{ borderTop: "1px solid #6E6E6E", borderBottom: "1px solid #6E6E6E" }}>
          <div className="flex flex-col h-full">
            {/* Content Lines */}
            <div className="flex flex-col gap-0 mb-6 lg:mb-[60px] w-full z-30">
              {contentLines.map((line, idx) => (
                <div key={idx} className="relative leading-[1.2] tracking-[-0.02em] font-normal text-[#6E6E6E] font-['Sora',sans-serif] py-0 lg:py-[2px]" style={{ fontSize: "32px" }}>
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

            {/* State 2: Deliverables Grid */}
            <div className={cn(
              "flex flex-wrap gap-x-16 gap-y-4 pt-6 transition-all duration-500",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 lg:opacity-0"
            )}>
              {deliverables.map((item, i) => (
                <motion.div
                  key={`deliverable-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : -10 }}
                  transition={{ duration: 0.25, delay: active ? 0.2 + (i * 0.03) : 0, ease: [0.76, 0, 0.24, 1] }}
                  className="text-[#414141] font-medium font-['Sora',sans-serif] flex items-center gap-3"
                  style={{ fontSize: "20px", marginRight: "32px" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00A88D] shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

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

              {/* Highlight Background - Locked to Left -> Right Flow */}
              <motion.div
                className="absolute inset-y-0 left-0 right-0 bg-[#00A88D] z-10"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{
                  scaleX: isActive ? 1 : 0,
                }}
                style={{
                  originX: isActive ? 0 : 1 // Expand from left, retract to right
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
