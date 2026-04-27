import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useCursor } from "./ui/CustomCursor";
import imgSML from "figma:asset/03355682553ef5be67447967b63be12b656b183b.png";
import imgAsh from "figma:asset/03f08e77f2789523074211d0a0c7a7d862b8e2bd.png";
import imgGo from "figma:asset/94bad9e61cac45ea000e3b8bcd636a4dd545d87e.png";
import imgPartner1 from "figma:asset/b19cf7f0df2f1c916a5443a7a1f2d72fb4f0a742.png";

const TechDecorations = ({ index }: { index: number }) => {
  const suffixes = ['SYS', 'IO', 'AI', 'LAB', 'INC', 'NET'];
  return (
    <>
      <div className="absolute top-3 left-3 text-[9px] font-mono text-white/30 tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 select-none">
        0{index + 1} <span className="text-white/10 mx-1">/</span> {suffixes[index]}
      </div>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
        <div className="flex gap-1">
            <div className="w-0.5 h-0.5 bg-blue-500/50 rounded-full" />
            <div className="w-0.5 h-0.5 bg-white/20 rounded-full" />
        </div>
      </div>
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
         <div className="w-2 h-2 border-t border-r border-blue-500/30" />
      </div>
      <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
         <div className="w-2 h-2 border-b border-l border-blue-500/30" />
      </div>
    </>
  );
};

export function TrustedBrands() {
  const { setVariant } = useCursor();
  
  const brands = [
    { name: "", image: null }, // Left Empty
    { name: "ANDHRA SPICY HOUSE", image: imgAsh },
    { name: "GOWHEELS", image: imgGo },
    { name: "KALKI HANDCRAFT", image: imgPartner1 }, 
    { name: "SLAM", image: imgSML },
    { name: "", image: null } // Right Empty
  ];

  // Parallax Scroll Logic
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  // Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20, mass: 0.8 };
  const fluidX = useSpring(mouseX, springConfig);
  const fluidY = useSpring(mouseY, springConfig);
  const spotlightX = useTransform(fluidX, (x) => x + 500);
  const spotlightY = useTransform(fluidY, (y) => y + 500);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Layout Logic
  const getLayoutClasses = (index: number) => {
      // Base layout
      let classes = "col-span-2 xl:col-span-1 border";

      // Handle Empty Frames (0 and 5) - Hidden on Mobile
      if (index === 0) return "hidden xl:block col-span-2 xl:col-span-1 border xl:border-r-0";
      if (index === 5) return "hidden xl:block col-span-2 xl:col-span-1 border";

      // Mobile Borders for Visible Items (1, 2, 3, 4)
      if (index === 1) classes += " border-r-0 border-b-0"; // Top Left
      else if (index === 2) classes += " border-b-0";       // Top Right
      else if (index === 3) classes += " border-r-0";       // Bottom Left
      
      // Desktop: All visible items (1-4) are middle items now, so remove right border
      // Also ensure bottom border is present (to override mobile removal)
      classes += " xl:border-b xl:border-r-0";
      
      return classes;
  };

  return (
    <section 
        onMouseEnter={() => setVariant('technical')}
        onMouseLeave={() => setVariant('default')}
        ref={sectionRef}
        className="w-full bg-[#050505] pt-32 pb-48 flex flex-col items-center select-none overflow-hidden relative cursor-none"
    >
       {/* Background Noise & Pattern */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
       </div>

       {/* Header with Entrance Animation */}
       <div className="relative z-20 mb-20 flex flex-col items-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm shadow-lg shadow-black/20"
          >
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse" />
             <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/70 uppercase font-space">
               Trusted Ecosystem
             </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 font-space max-w-2xl"
          >
            Engineering the future with <br className="hidden md:block" /> world-class partners.
          </motion.h2>
       </div>

       {/* Grid Container with Parallax */}
       <motion.div 
         style={{ y: parallaxY }}
         className="w-full relative overflow-hidden xl:h-[420px]"
       >
         <motion.div 
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-100px" }}
           variants={{
             hidden: { opacity: 0 },
             show: { opacity: 1, transition: { staggerChildren: 0.1 } }
           }}
           className="relative mx-auto w-full max-w-[400px] xl:max-w-none grid grid-cols-4 xl:grid-cols-6 xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:top-0 group/grid xl:w-[2520px]" 
           onMouseMove={handleMouseMove}
         >
            {/* Fluid Backlight (Desktop Only) */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover/grid:opacity-100 transition-opacity duration-500 pointer-events-none hidden xl:block"
              style={{
                background: useMotionTemplate`
                  radial-gradient(350px circle at ${fluidX}px ${fluidY}px, rgba(255, 255, 255, 0.3), transparent 100%)
                `
              }}
            />

            <div className="contents">
                {brands.map((brand, index) => {
                    const showContent = !!brand.name;
                    return (
                        <motion.div 
                            key={index}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 50 } }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                bg-neutral-900/20 backdrop-blur-md aspect-square flex items-center justify-center relative group/item hover:z-50 transition-all duration-300
                                ${getLayoutClasses(index)} border-white/10
                                shadow-[inset_0_0_30px_-10px_rgba(255,255,255,0.03)]
                            `}
                        >
                            {/* Spilling Glow Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_70%)] opacity-0 group-hover/item:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                            {showContent && brand.image && (
                                <motion.div 
                                    style={{ y: contentParallaxY }}
                                    className="relative z-40 w-full h-full flex items-center justify-center"
                                >
                                    {/* Tech Decorations (Hover) */}
                                    <TechDecorations index={index} />

                                    {/* Logo */}
                                    <div className="w-[88px] h-[88px] md:w-[140px] md:h-[140px] absolute transition-all duration-500 ease-out group-hover/item:opacity-0 group-hover/item:scale-75 group-hover/item:blur-sm">
                                        <img src={brand.image} alt={`${brand.name} Logo`} className="w-full h-full object-contain opacity-90 drop-shadow-lg" />
                                    </div>
                                    
                                    {/* Brand Name */}
                                    <div className="absolute opacity-0 scale-90 translate-y-4 group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-y-0 transition-all duration-500 ease-out flex flex-col items-center gap-2">
                                        <span className="text-white font-space text-lg md:text-xl font-medium tracking-widest uppercase text-center px-4">
                                            {brand.name}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Glow Grid (Desktop Only) */}
            <motion.div 
                className="absolute inset-0 hidden xl:grid grid-cols-4 xl:grid-cols-6 pointer-events-none z-20"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(300px circle at ${fluidX}px ${fluidY}px, black, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${fluidX}px ${fluidY}px, black, transparent)`
                }}
            >
                {brands.map((_, index) => (
                    <div key={`glow-${index}`} className={`w-full h-full ${getLayoutClasses(index)} border-white/60 bg-transparent`} />
                ))}
            </motion.div>

            {/* Spotlight (Desktop Only) */}
            <motion.div 
              className="absolute -inset-[500px] pointer-events-none z-30 opacity-0 group-hover/grid:opacity-100 transition-opacity duration-500 hidden xl:block"
              style={{
                background: useMotionTemplate`
                  radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, rgba(255, 255, 255, 0.1), transparent 80%)
                `
              }}
            />
         </motion.div>
       </motion.div>
    </section>
  );
}
