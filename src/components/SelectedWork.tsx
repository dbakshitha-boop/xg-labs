import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { useNavigate } from "react-router-dom";
import imgC5 from "../assets/selectedwork_SLAM.jpeg";
import imgC6 from "../assets/selectedwork_KH2.png";
import imgC7 from "../assets/selectedwork_Gowheels.jpeg";
import { useCursor } from "./ui/CustomCursor";

// "Let's Talk" style animated pill button (teal + black sweep fill, sliding text, arrow badge)
const AnimatedViewButton = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      style={{ position: "relative", height: 36, display: "inline-flex" }}
    >
      <button
        aria-label={label}
        onClick={onClick}
        style={{
          height: 36,
          paddingTop: 9,
          paddingRight: 26,
          paddingBottom: 9,
          paddingLeft: 14,
          display: "inline-flex",
          alignItems: "center",
          background: "#ffffff",
          borderRadius: 42,
          border: "1px solid #9A9A9A",
          cursor: "pointer",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal fill — leads left to right */}
        <motion.span
          aria-hidden
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "absolute", inset: 0,
            background: "#02A884",
            transformOrigin: "left center",
            zIndex: 1, pointerEvents: "none",
          }}
        />
        {/* Black fill — trails left to right */}
        <motion.span
          aria-hidden
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
          style={{
            position: "absolute", inset: 0,
            background: "#0a0a0a",
            transformOrigin: "left center",
            zIndex: 2, pointerEvents: "none",
          }}
        />
        {/* Text — slides up from bottom on hover */}
        <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, height: "1em" }}>
          <motion.span
            variants={{ rest: { y: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
            style={{
              display: "block",
              fontFamily: "'Cal Sans', sans-serif",
              fontSize: 14, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              whiteSpace: "nowrap", color: "#414141",
            }}
          >
            {label}
          </motion.span>
          <motion.span
            aria-hidden
            variants={{ rest: { y: "100%", transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.19 } } }}
            style={{
              position: "absolute", top: 0, left: 0,
              display: "block",
              fontFamily: "'Cal Sans', sans-serif",
              fontSize: 14, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              whiteSpace: "nowrap", color: "#ffffff",
            }}
          >
            {label}
          </motion.span>
        </div>
      </button>
      {/* Circle — overlays oval's right edge */}
      <motion.div
        variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }}
        transition={{ duration: 0.18 }}
        style={{
          position: "absolute", top: 2, right: -10,
          width: 32, height: 32, borderRadius: 32,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 4,
        }}
      >
        <motion.div variants={{ rest: { color: "#ffffff" }, hover: { color: "#000000" } }} transition={{ duration: 0.18 }} style={{ display: "flex" }}>
          <ArrowRight size={20} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const projects = [
  {
    id: 1,
    title: ["High-Impact", "Social Contents"],
    client: "SLAM",
    type: "Lifestyle & Fitness Studio",
    date: "SEP 2025",
    shortDescription: (
      <>
        A premium lifestyle and fitness studio focused on modern training experiences and community-driven workouts.
      </>
    ),
    longDescription: (
      <>
        We built a consistent content and video production system to elevate SLAM’s social presence, improve engagement, and enhance brand quality across multiple locations.
        Executed for SLAM Kattupakkam, Pudur, and Gerugambakkam.
      </>
    ),
    tags: ["Content Creation", "Video Production", "Social Media Management"],
    image: imgC5,
  },
  {
    id: 2,
    title: ["E-commerce Growth", "& Sales Acceleration"],
    client: "Kalki Handicraft",
    type: "E-commerce Lifestyle Brand",
    date: "DEC 2024",
    shortDescription: (
      <>
        An eco-friendly wooden handicraft brand with in-house manufacturing and a strong offline retail presence.
      </>
    ),
    longDescription: (
      <>
        We helped Kalki transition into e-commerce through influencer campaigns, creative content, and performance-driven Meta ads — focused on driving sales and online growth.
      </>
    ),
    tags: ["Performance Marketing", "Influencer Marketing", "Creative Production"],
    image: imgC6,
  },
  {
    id: 3,
    title: ["Brand Identity", "& Visual System Design"],
    client: "Go Wheels",
    type: "Mobility & Transportation Platform",
    date: "JUN 2025",
    shortDescription: (
      <>
        A Malaysia-based bus ride-hailing platform designed to make occasional mass commuting simple and accessible.
      </>
    ),
    longDescription: (
      <>
          We built a complete visual identity for Go Wheels, a Malaysia-based bus mobility platform, creating a brand kit and mascot designed to connect with local audiences and support market entry.
      </>
    ),
    tags: ["Branding", "Visual Identity", "Mascot Design"],
    image: imgC7,
  },
];

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setVariant, setText } = useCursor();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth eased tween transition
  const transition = {
    duration: 0.95,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  };

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Update active index based on scroll position
  useEffect(() => {
    if (!isDesktop) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        projects.length - 1,
        Math.floor(latest * projects.length)
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isDesktop]);

  // Helper for text animations
  const getTextAnimation = (index: number) => {
    const diff = index - activeIndex;
    let y = "100%";
    let opacity = 0;

    if (diff === 0) {
      y = "0%";
      opacity = 1;
    } else if (diff < 0) {
      y = "-100%";
      opacity = 0; // Fade out previous
    } else {
      y = "100%";
      opacity = 0;
    }
    
    return { y, opacity };
  };

  return (
    <section
      id="selected-work"
      ref={containerRef}
      className="w-full bg-[#F7F8FA] relative"
      style={{ height: isDesktop ? `${projects.length * 160}vh` : 'auto' }}
    >
      {/* Mobile/Tablet View (< 1024px) */}
      <div
        className="flex flex-col lg:hidden w-full px-4 md:px-8"
        style={{ paddingTop: 24, paddingBottom: 64, gap: 28 }}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center" style={{ marginTop: 12, marginBottom: 4 }}>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-black font-space">
            Selected Work
          </h2>
          <AnimatedViewButton label="View Cases" onClick={() => navigate('/portfolio')} />
        </div>

        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="flex flex-col gap-6 cursor-pointer"
            onClick={() => navigate('/portfolio')}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Mobile Image */}
            <motion.div
              className="rounded-[12px] overflow-hidden shadow-lg"
              style={{ width: "55%", margin: "0 auto", aspectRatio: "4 / 5" }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={project.image}
                alt={project.client}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Mobile Content */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-2xl font-normal text-[#060606] font-['Cal_Sans',sans-serif] leading-tight mb-2 uppercase">
                    {project.title.join(" ")}
                  </h3>
                  <div className="flex flex-col">
                    <span className="text-lg text-[#5F5F5F] font-['Sora',sans-serif]">{project.client}</span>
                    <span className="text-sm text-[#9A9A9A] font-['Sora',sans-serif]">{project.type}</span>
                  </div>
                </div>
                <span className="text-xl font-normal text-[#9A9A9A] font-['Cal_Sans',sans-serif] whitespace-nowrap shrink-0">{project.date}</span>
              </div>

              <p className="text-sm text-[#414141] leading-relaxed font-['Sora',sans-serif]">
                {project.longDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop View (>= 1024px) */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-10 xl:px-[60px] 2xl:px-[100px] font-sans h-full max-h-[900px] flex flex-col justify-center">
          {/* Header - Fixed Position */}
          <div className="flex justify-between items-center mb-8 md:mb-12 xl:mb-16">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-black font-space">
              Selected Work
            </h2>
            <AnimatedViewButton label="View Cases" onClick={() => navigate('/portfolio')} />
          </div>

          {/* Main Content Grid */}
          <div
            className="flex flex-row items-center justify-center cursor-pointer"
            style={{ columnGap: "clamp(0px, 0.3vw, 6px)" }}
            onClick={() => navigate('/portfolio')}
            onMouseEnter={() => {
              setVariant('button');
              setText('VIEW');
            }}
            onMouseLeave={() => {
              setVariant('default');
              setText(null);
            }}
          >
            
            {/* Left Column: Title (top=image top), Short Desc + Index/Client (bottom=image bottom) */}
            <div className="w-full lg:flex-1 flex flex-col justify-between h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[665px] order-1" style={{ maxWidth: "clamp(190px, 16vw, 290px)", paddingBottom: "64px", marginLeft: "16px" }}>

              {/* Title — aligns with top margin of image. min-h (not a fixed clipping
                  height) since some titles wrap to 3 lines at narrower breakpoints. */}
              <div className="relative min-h-[180px] lg:min-h-[210px] xl:min-h-[240px] w-full overflow-visible">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="absolute top-0 left-0 w-full h-full flex flex-col items-start text-left"
                    initial={false}
                    animate={getTextAnimation(index)}
                    transition={transition}
                  >
                    <h3 className="font-normal text-[#414141] font-['Cal_Sans',sans-serif] leading-tight uppercase" style={{ marginTop: "28px", fontSize: "clamp(18px, 1.9vw, 27px)", overflowWrap: "break-word" }}>
                      {project.title[0]}
                      <br />
                      {project.title[1]}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {/* Bottom group — brand/type + index, on the same line */}
              <div className="relative w-full" style={{ minHeight: "64px" }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="absolute bottom-0 left-0 w-full flex flex-row items-baseline justify-start gap-4 xl:gap-6"
                    initial={false}
                    animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 26 }}
                    transition={transition}
                  >
                    <span className="text-5xl lg:text-6xl font-['Sora',sans-serif] font-light leading-none tracking-tight shrink-0" style={{ color: "#5F5F5F", marginLeft: "-220px" }}>
                      {index + 1}/{projects.length}
                    </span>
                    <div className="flex flex-col items-start text-left" style={{ marginLeft: "100px", flexShrink: 0, whiteSpace: "nowrap" }}>
                      <h4 className="text-lg xl:text-xl font-semibold text-[#5F5F5F] font-['Sora',sans-serif] leading-tight">
                        {project.client}
                      </h4>
                      {project.type && (
                        <p className="text-xs text-[#9A9A9A] font-['Sora',sans-serif] uppercase tracking-wide mt-1">
                          {project.type}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Center Column: Image Stack */}
            <div className="lg:flex-1 flex justify-center items-center order-2 h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[665px]" style={{ minWidth: "260px", maxWidth: "clamp(300px, 27vw, 460px)" }}>
              <div className="relative w-full aspect-[480/665] max-h-full max-w-full rounded-[12px]">
                {projects.map((project, index) => {
                  const relativeIndex = index - activeIndex;
                  
                  let zIndex = 40 - relativeIndex;
                  let yOffset = 0;
                  let width = "100%";
                  let opacity = 1;
                  
                  if (relativeIndex < 0) {
                    yOffset = -800;
                    opacity = 0; // Fade out as it flies up
                    width = "100%";
                    zIndex = 41;
                  } else if (relativeIndex === 0) {
                    yOffset = 0;
                    width = "100%";
                    opacity = 1;
                  } else {
                    yOffset = relativeIndex * 15; // Increased spacing
                    width = `${100 - (relativeIndex * 8)}%`; // Subtler width change
                    if (100 - (relativeIndex * 8) < 50) width = "50%";
                  }

                  const isVisible = relativeIndex >= -1 && relativeIndex < 4;

                  return (
                    <motion.div
                      key={project.id}
                      className="absolute h-[calc(100%-36px)] rounded-[12px] overflow-hidden left-0 right-0 mx-auto shadow-2xl origin-bottom"
                      initial={false}
                      animate={{
                        y: yOffset,
                        width: width,
                        opacity: opacity,
                        zIndex: zIndex,
                        scale: relativeIndex === 0 ? 1 : 0.95 + (relativeIndex * 0.01), // Subtle scale difference
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
                      }}
                      style={{
                        display: isVisible ? "block" : "none"
                      }}
                    >
                      <motion.div 
                        className="w-full h-full overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                         <img 
                            alt={project.client} 
                            className="w-full h-full object-cover" 
                            src={project.image} 
                         />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div className="relative w-full lg:flex-1 flex flex-col h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[665px] order-3" style={{ maxWidth: "clamp(230px, 20vw, 340px)", marginLeft: "48px" }}>

              {/* Date — at image top */}
              <div className="relative w-full" style={{ minHeight: "48px" }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="absolute top-0 right-0 w-full flex justify-end"
                    initial={false}
                    animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 12 }}
                    transition={transition}
                  >
                    <span className="text-[40px] font-normal font-['Cal_Sans',sans-serif]" style={{ color: "#9A9A9A" }}>
                      {project.date}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Long Description — vertically centered on the image */}
              <div className="relative w-full" style={{ flex: 1, minHeight: 0 }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
                    initial={false}
                    animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 10 }}
                    transition={{ ...transition, duration: 0.8, delay: index === activeIndex ? 0.4 : 0 }}
                  >
                    <p className="text-lg text-[#414141] font-['Sora',sans-serif]" style={{ lineHeight: 1.9 }}>
                      {project.longDescription}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* ROLE + Tags — aligned with bottom of card image */}
              <div className="flex flex-col gap-4" style={{ marginBottom: "48px" }}>
                <span className="text-base font-bold text-[#414141] uppercase tracking-widest font-['Sora',sans-serif]">Role</span>
                <div className="relative" style={{ minHeight: "80px" }}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="absolute top-0 left-0 w-full flex flex-row flex-wrap items-center"
                      style={{ columnGap: "12px", rowGap: "8px" }}
                      initial={false}
                      animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 10 }}
                      transition={transition}
                    >
                      {project.tags.map((tag, i) => (
                        <span key={i} className="font-bold text-[#6E6E6E] uppercase font-['Cal_Sans',sans-serif]" style={{ fontSize: "13px", letterSpacing: "0.08em", lineHeight: 1 }}>
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}