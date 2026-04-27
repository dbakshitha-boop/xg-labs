import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import ThenScroller from "../imports/ThenScroller";

// Define the absolute positions for the text elements to match the new Figma import exactly (172-81)
const textElements = [
  { text: "Growth Experiments", font: "Script_MT_Bold:Regular", color: "#5f5f5f", size: 32, left: 1042.5, top: 234 },
  { text: "Engagement Loops", font: "Humane:Regular", color: "#9a9a9a", size: 52, uppercase: true, left: 1288.5, top: 233 },
  { text: "Retention Touchpoints", font: "Mona_Sans:Regular", color: "#060606", size: 40, lowercase: true, tracking: "-1.6px", left: 718, top: 277 },
  { text: "Conversion Funnels", font: "Boldonse:Regular", color: "#060606", size: 24, uppercase: true, left: 1079, top: 282 },
  { text: "Paid Media Creatives", font: "Butler:Regular", color: "#060606", size: 40, tracking: "-2.4px", left: 578, top: 348 },
  { text: "Performance Dashboards", font: "Mona_Sans:Regular", color: "#5f5f5f", size: 32, lowercase: true, left: 1103.5, top: 350 },
  { text: "Landing Pages", font: "Syne:Regular", color: "black", size: 60, lowercase: true, tracking: "-3.6px", left: 737, top: 387 },
  { text: "SEO Foundations", font: "Cal_Sans:Regular", color: "black", size: 52, left: 1111.5, top: 389 },
  { text: "Growth Experiments", font: "Script_MT_Bold:Regular", color: "#5f5f5f", size: 32, left: 1462.5, top: 404 },
  { text: "Messaging Systems", font: "Butler:Regular", color: "#060606", size: 60, tracking: "-3.6px", left: 477, top: 456 },
  { text: "Visual Identities", font: "Humane:Regular", color: "#414141", size: 60, uppercase: true, left: 824, top: 343 },
  { text: "Performance Campaigns", font: "Script_MT_Bold:Regular", color: "#5f5f5f", size: 32, left: 1071, top: 472 },
  { text: "Brand Storylines", font: "Syne:Regular", color: "black", size: 60, lowercase: true, tracking: "-3.6px", left: 1438, top: 456 },
  { text: "Brand Systems", font: "Cal_Sans:Regular", color: "#414141", size: 60, left: 1110.5, top: 158 },
  { text: "Content Calendars", font: "Cal_Sans:Regular", color: "#414141", size: 52, tracking: "-2.08px", left: 700, top: 523 },
  { text: "Marketing Websites", font: "Humane:Regular", color: "#9a9a9a", size: 60, uppercase: true, left: 806, top: 462 },
  { text: "Website Experiences", font: "Butler:Regular", color: "black", size: 60, tracking: "-3.6px", left: 1149.5, top: 526 },
  { text: "Ad Creative Libraries", font: "Butler:Regular", color: "black", size: 60, tracking: "-3.6px", left: 664.5, top: 591 },
  { text: "Social Content", font: "Cal_Sans:Regular", color: "#414141", size: 52, left: 1082, top: 644 },
  { text: "Campaign Playbooks", font: "Script_MT_Bold:Regular", color: "#5f5f5f", size: 24, left: 1018, top: 608 },
  { text: "Short-Form Video Content", font: "Sometimes_Times_TRIAL:Regular", color: "black", size: 20, left: 770.5, top: 666 },
  { text: "Brand Guidelines", font: "Sometimes_Times_TRIAL:Regular", color: "black", size: 24, left: 800, top: 184 },
  { text: "Design Systems", font: "Sometimes_Times_TRIAL:Regular", color: "black", size: 24, left: 1364, top: 291 },
  { text: "Rebrands", font: "Boldonse:Regular", color: "#414141", size: 24, uppercase: true, left: 1384, top: 350 },
  { text: "Product Experiences", font: "Sometimes_Times_TRIAL:Regular", color: "black", size: 24, left: 441.5, top: 408 },
  { text: "Product Launches", font: "Sometimes_Times_TRIAL:Regular", color: "black", size: 20, tracking: "-1px", left: 402.5, top: 542 },
  { text: "Audience Narratives", font: "Boldonse:Regular", color: "#6e6e6e", size: 24, uppercase: true, left: 747, top: 231 },
  { text: "Scalable Templates", font: "Sometimes_Times_TRIAL:Regular", color: "black", size: 16, left: 1211.5, top: 613 },
];

interface InteractiveTextProps {
  item: {
    text: string;
    font: string;
    color: string;
    size: number;
    uppercase?: boolean;
    lowercase?: boolean;
    tracking?: string;
    left: number;
    top: number;
  };
  mouseX: any;
  mouseY: any;
  containerRef: React.RefObject<HTMLDivElement>;
  scale: number;
  index: number;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ item, mouseX, mouseY, containerRef, scale, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const s = useMotionValue(1);

  // Use a smoother spring config for organic feel
  const springX = useSpring(x, { damping: 20, stiffness: 100, mass: 0.5 });
  const springY = useSpring(y, { damping: 20, stiffness: 100, mass: 0.5 });
  const springScale = useSpring(s, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const handleMotion = () => {
      if (!ref.current || !containerRef.current) return;
      
      const currentMouseX = mouseX.get();
      const currentMouseY = mouseY.get();
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = currentMouseX - centerX;
      const dy = currentMouseY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Interaction radius
      const radius = 250;
      
      if (dist < radius) {
        const force = (radius - dist) / radius;
        const pushStrength = 50; // Moderate push
        
        const moveX = -1 * (dx / dist) * pushStrength * force;
        const moveY = -1 * (dy / dist) * pushStrength * force;
        
        // Subtle scale
        const targetScale = 1 + (force * 0.1); 

        x.set(moveX / scale);
        y.set(moveY / scale);
        s.set(targetScale);
      } else {
        x.set(0);
        y.set(0);
        s.set(1);
      }
    };

    const unsubscribeX = mouseX.on("change", handleMotion);
    const unsubscribeY = mouseY.on("change", handleMotion);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y, s, scale, containerRef]);

  // Gentle float animation parameters
  const floatDuration = 5 + Math.random() * 2; 
  const floatDelay = Math.random() * 2;
  const floatY = 2 + Math.random() * 3; // Very subtle float (2-5px)

  return (
    <div 
      ref={ref}
      style={{ 
        left: `${item.left}px`,
        top: `${item.top}px`,
        position: 'absolute',
        transform: 'translateX(-50%)', 
        width: 'max-content',
        height: 'max-content',
        zIndex: 10
      }}
    >
      <motion.div
        style={{ x: springX, y: springY, scale: springScale }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.02, 
          ease: "easeOut" 
        }}
      >
        <motion.p
          animate={{ 
            y: [-floatY, floatY, -floatY] 
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay
          }}
          style={{
            color: item.color,
            fontSize: `${item.size}px`,
            letterSpacing: item.tracking || 'normal',
            lineHeight: 'normal',
          }}
          className={`
            text-center text-nowrap
            font-['${item.font}',sans-serif]
            ${item.uppercase ? 'uppercase' : ''}
            ${item.lowercase ? 'lowercase' : ''}
            cursor-default select-none
          `}
        >
          {item.text}
        </motion.p>
      </motion.div>
    </div>
  );
};

export function AboveTheWhatMakeUsDifferent() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const baseWidth = 1920; 
        const targetWidth = Math.min(windowWidth, baseWidth);
        const newScale = windowWidth < 768 ? (windowWidth / 800) : (targetWidth / baseWidth);
        setScale(newScale);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className="bg-[#f7f8fa] relative w-full overflow-hidden flex justify-center items-center py-20 min-h-[500px] lg:min-h-[800px] cursor-none" 
      data-name="Above the what make us Different"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isHovering ? 1 : 0,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <div className="w-[14.56px] h-[23.04px]">
          <ThenScroller />
        </div>
      </motion.div>

      <div 
        className="relative w-[1920px] h-[800px] origin-center"
        style={{ transform: `scale(${scale})` }}
      >
        {textElements.map((item, index) => (
          <InteractiveText 
            key={index} 
            item={item} 
            mouseX={mouseX} 
            mouseY={mouseY}
            containerRef={containerRef}
            scale={scale}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
