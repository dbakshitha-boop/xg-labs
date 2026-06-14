import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useSpring, useMotionValue } from "motion/react";
import { useNavigate } from "react-router-dom";
import imgC4 from "figma:asset/85d6b6f33c8667ab02410e898c803bdf8b2f8acf.png";
import imgC3 from "figma:asset/cf73ccd40dc24f9d1feec565d29fe7d28fd3690b.png";
import imgC2 from "figma:asset/308a1ec46f49ee27f236c5b52a0022c154701558.png";
import imgC1 from "figma:asset/c6f75c6d8668e22eaf393503de064b054afa1040.png";
import imgC5 from "../assets/selectedwork_SLAM.jpeg";
import imgC6 from "../assets/selectedwork_KH.jpeg";
import imgC7 from "../assets/selectedwork_Gowheels.jpeg";
import { useCursor } from "./ui/CustomCursor";

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Magnetic strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.button>
  );
};

const projects = [
  {
    id: 1,
    title: ["High-Impact", "Social Contents"],
    client: "SLAM",
    type: "Lifestyle & Fitness Studio",
    date: "JUL 2024",
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
    type: "",
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
    type: "",
    date: "JUN 2024",
    shortDescription: (
      <>
        A Malaysia-based bus ride-hailing platform designed to make occasional mass commuting simple and accessible.
      </>
    ),
    longDescription: (
      <>
        We built a complete brand identity system for Go Wheels, including a visual brand kit and mascot, to create a relatable, modern, and consistent brand presence for a new market launch.
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

  // Smooth, elegant spring transition
  const transition = {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    mass: 1
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
      style={{ height: isDesktop ? `${projects.length * 100}vh` : 'auto' }}
    >
      {/* Mobile/Tablet View (< 1024px) */}
      <div className="lg:hidden w-full px-4 md:px-8 py-16 flex flex-col gap-24">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-black font-space">
            Selected Work
          </h2>
          <button className="group flex items-center gap-2 px-4 py-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-300">
            <span className="text-xs font-bold uppercase tracking-wide font-space">
              View All
            </span>
            <div className="bg-black text-white rounded-full p-1 group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowRight size={12} />
            </div>
          </button>
        </div>

        {projects.map((project, i) => (
          <div key={project.id} className="flex flex-col gap-6">
            {/* Mobile Image */}
            <div className="w-full aspect-[4/5] rounded-[12px] overflow-hidden shadow-lg">
              <img 
                src={project.image} 
                alt={project.client} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mobile Content */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-[#414141] font-space leading-tight mb-2">
                    {project.title.join(" ")}
                  </h3>
                  <div className="flex flex-col">
                    <span className="text-lg text-[#414141] font-sora">{project.client}</span>
                    <span className="text-sm text-gray-500 font-sora">{project.type}</span>
                  </div>
                </div>
                <span className="text-xl text-gray-400 font-sora">{project.date}</span>
              </div>

              <div className="h-px w-full bg-gray-200" />

              <p className="text-base text-[#414141] leading-relaxed font-sora">
                {project.shortDescription}
              </p>
               <p className="text-sm text-gray-500 leading-relaxed font-sora">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-bold text-gray-500 uppercase tracking-wider font-space bg-white px-3 py-1 rounded-full border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
            <MagneticButton className="group flex items-center gap-2 px-6 py-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-300 !cursor-none" onClick={() => navigate('/portfolio')}>
              <span className="text-sm font-bold uppercase tracking-wide font-space">
                View Work
              </span>
              <div className="bg-black text-white rounded-full p-1 group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowRight size={14} />
              </div>
            </MagneticButton>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-[40px] 2xl:gap-[60px]">
            
            {/* Left Column: Title (top=image top), Short Desc + Index/Client (bottom=image bottom) */}
            <div className="w-full lg:flex-1 lg:max-w-[360px] xl:max-w-[480px] 2xl:max-w-[560px] flex flex-col justify-between h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[665px] order-1 pb-6 xl:pb-8">

              {/* Title — aligns with top margin of image */}
              <div className="relative h-[180px] lg:h-[210px] xl:h-[240px] w-full overflow-hidden">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="absolute top-0 left-0 w-full h-full flex flex-col items-end text-right"
                    initial={false}
                    animate={getTextAnimation(index)}
                    transition={transition}
                  >
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#414141] font-space leading-tight uppercase">
                      {project.title[0]}
                      <br />
                      {project.title[1]}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {/* Bottom group — client/type + index */}
              <div className="flex flex-col gap-4 xl:gap-5">
                {/* Client + Type */}
                <div className="relative w-full" style={{ minHeight: "60px" }}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="absolute top-0 right-0 w-full flex flex-col items-end text-right"
                      initial={false}
                      animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 10 }}
                      transition={transition}
                    >
                      <h4 className="text-lg xl:text-xl font-semibold text-[#5F5F5F] font-['Sora',sans-serif] leading-tight">
                        {project.client}
                      </h4>
                      {project.type && (
                        <p className="text-xs text-gray-400 font-['Sora',sans-serif] uppercase tracking-wide mt-1">
                          {project.type}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Index */}
                <div className="relative" style={{ minHeight: "64px" }}>
                  {projects.map((_, index) => (
                    <motion.span
                      key={index}
                      className="absolute bottom-0 left-0 text-5xl lg:text-6xl font-['Sora',sans-serif] font-light leading-none tracking-tight" style={{ color: "#5F5F5F" }}
                      initial={false}
                      animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 12 }}
                      transition={transition}
                    >
                      {index + 1}/{projects.length}
                    </motion.span>
                  ))}
                </div>
              </div>

            </div>

            {/* Center Column: Image Stack */}
            <div 
                className="lg:flex-1 lg:min-w-[280px] lg:max-w-[400px] xl:max-w-[480px] flex justify-center items-center order-2 h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[665px]"
                onMouseEnter={() => {
                    setVariant('button');
                    setText('VIEW');
                }}
                onMouseLeave={() => {
                    setVariant('default');
                    setText(null);
                }}
            >
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
                        type: "spring",
                        stiffness: 120, // Snappier
                        damping: 15
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
            <div className="relative w-full lg:flex-1 lg:max-w-[360px] xl:max-w-[480px] 2xl:max-w-[560px] flex flex-col h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[665px] order-3">

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
                    <span className="text-[40px] font-bold font-['Sora',sans-serif]" style={{ color: "#9A9A9A" }}>
                      {project.date}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Long Description — in the middle, with gap from date */}
              <div className="relative w-full mt-auto pt-10 xl:pt-14" style={{ minHeight: "140px" }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                    initial={false}
                    animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
                    transition={transition}
                  >
                    <p className="text-lg lg:text-xl xl:text-[22px] text-gray-600 leading-relaxed font-['Sora',sans-serif]">
                      {project.longDescription}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* ROLE + Tags — slightly above image bottom margin */}
              <div className="mt-auto flex flex-col gap-2" style={{ marginBottom: "80px" }}>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-space">Role</span>
                <div className="relative" style={{ minHeight: "18px" }}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="absolute top-0 left-0 w-full flex flex-nowrap gap-5 justify-start"
                      initial={false}
                      animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 10 }}
                      transition={transition}
                    >
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-bold text-[#6E6E6E] uppercase tracking-wider font-['Cal_Sans',sans-serif] whitespace-nowrap">
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