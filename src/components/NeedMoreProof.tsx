import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function NeedMoreProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Background color transition: Green to Black
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.75, 0.85],
    ["#00A88D", "#060606"]
  );

  // --- Animation Ranges ---
  // Initial zoom in (fontSize: 1600px -> target size)
  const needScale = useTransform(scrollYProgress, [0, 0.2], ["1600px", isMobile ? "60px" : "100px"]);
  const moreScale = useTransform(scrollYProgress, [0.25, 0.45], ["1600px", isMobile ? "60px" : "100px"]);
  const proofScale = useTransform(scrollYProgress, [0.5, 0.7], ["1600px", isMobile ? "60px" : "100px"]);

  // Opacity handling
  const needOpacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25, 0.85, 0.9], [0, 1, 1, 0, 0, 1]);
  const moreOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5, 0.85, 0.9], [0, 1, 1, 0, 0, 1]);
  const proofOpacity = useTransform(scrollYProgress, [0.5, 0.55], [0, 1]);

  // Final Position Spread (X for Desktop, Y for Mobile)
  const needX = useTransform(scrollYProgress, [0.85, 1.0], ["0px", isMobile ? "0px" : "-328px"]);
  const needY = useTransform(scrollYProgress, [0.85, 1.0], ["0px", isMobile ? "-70px" : "0px"]);

  const moreX = useTransform(scrollYProgress, [0.85, 1.0], ["0px", isMobile ? "0px" : "-55px"]);
  const moreY = useTransform(scrollYProgress, [0.85, 1.0], ["0px", isMobile ? "0px" : "0px"]);

  const proofX = useTransform(scrollYProgress, [0.85, 1.0], ["0px", isMobile ? "0px" : "281px"]);
  const proofY = useTransform(scrollYProgress, [0.85, 1.0], ["0px", isMobile ? "70px" : "0px"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#00A88D]"
        style={{ backgroundColor }}
      >
        {/* NEED */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: needOpacity, x: needX, y: needY }}
        >
          <motion.h2
            className="text-white font-light font-['Cal_Sans',sans-serif] whitespace-nowrap leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: needScale }}
          >
            NEED
          </motion.h2>
        </motion.div>

        {/* MORE */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: moreOpacity, x: moreX, y: moreY }}
        >
          <motion.h2
            className="text-white font-light font-['Cal_Sans',sans-serif] whitespace-nowrap leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: moreScale }}
          >
            MORE
          </motion.h2>
        </motion.div>

        {/* PROOF ? */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: proofOpacity, x: proofX, y: proofY }}
        >
          <motion.h2
            className="text-white font-light font-['Cal_Sans',sans-serif] whitespace-nowrap leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: proofScale }}
          >
            PROOF?
          </motion.h2>
        </motion.div>
        
      </motion.div>
    </section>
  );
}