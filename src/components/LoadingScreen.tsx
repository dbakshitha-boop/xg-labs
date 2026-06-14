import { motion, animate, useMotionValue, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useState, memo, useMemo } from "react";

const originalWords = [
  "Strategy", "Research", "Insights", "Positioning",
  "Branding", "Storytelling", "Creativity", "Design",
  "Experience", "Performance", "Optimization", "Conversion",
  "Engagement", "Reach", "Growth", "Impact",
  "Innovation", "Execution", "Analytics", "Campaigns",
  "Scalability", "Results", "Momentum", "Success"
];

const CURVE_RADIUS = 800;
const ANGLE_STEP_DEG = 6; 

const WordItem = memo(({ word, index, progress }: { word: string, index: number, progress: any }) => {
  // Distance from current scroll position
  const distance = useTransform(progress, (latest: number) => index - latest);
  
  // Opacity: Fade out as it moves away from center (individual item fade)
  const itemOpacity = useTransform(distance, (d: number) => {
    const absD = Math.abs(d);
    // Smooth fade for items leaving the "sweet spot"
    return Math.max(0, 1 - (absD * 0.12));
  });

  // Blur: Blur as it moves away
  const filter = useTransform(distance, (d: number) => {
    const absD = Math.abs(d);
    return absD < 0.5 ? 'blur(0px)' : `blur(${Math.min(4, absD * 0.5)}px)`;
  });

  const color = useTransform(distance, (d: number) => {
    return Math.abs(d) < 0.5 ? "#FFFFFF" : "#A3A3A3"; 
  });

  // Position & Rotation (The Curve)
  const transform = useTransform(distance, (d: number) => {
    const angleDeg = d * ANGLE_STEP_DEG;
    const angleRad = angleDeg * (Math.PI / 180);
    
    // Convex curve to the left (Center is right-most)
    const x = -CURVE_RADIUS + (CURVE_RADIUS * Math.cos(angleRad));
    const y = CURVE_RADIUS * Math.sin(angleRad);
    
    // Rotation to face inward/outward
    const rotate = angleDeg;

    // Use percentage for relative responsiveness if needed, but here we maintain the radial effect
    return `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
  });

  // Hide items that are too far to save GPU, increased range to prevent popping
  const display = useTransform(distance, (d: number) => Math.abs(d) > 12 ? "none" : "flex");

  return (
    <motion.div
      className="absolute left-0 w-full flex items-center justify-start"
      style={{
        height: 60,
        y: -30, // Centering offset
        x: 0,
        transformOrigin: "center center",
        transform,
        opacity: itemOpacity,
        filter,
        display,
      }}
    >
      <motion.span 
        style={{ color }}
        className="text-3xl md:text-[50px] font-['Cal_Sans',sans-serif] whitespace-nowrap leading-[1.1] tracking-[-0.02em]"
      >
        {word}
      </motion.span>
    </motion.div>
  );
});

const PercentageDisplay = ({ progress, start, end }: { progress: any, start: number, end: number }) => {
  const [displayVal, setDisplayVal] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    // Map progress range [start, end] to 0..100
    const rawPct = ((latest - start) / (end - start)) * 100;
    const pct = Math.min(100, Math.max(0, Math.round(rawPct)));
    setDisplayVal(pct);
  });

  return (
    <div className="absolute left-[10%] md:left-[15%] xl:left-[20%] z-20 pointer-events-none">
      <span className="block text-3xl md:text-[50px] font-['Cal_Sans',sans-serif] text-white leading-[1.1] tracking-[-0.02em] tabular-nums">
        {displayVal < 10 ? `0${displayVal}` : displayVal}%
      </span>
    </div>
  );
};

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [isComplete, setIsComplete] = useState(false);
  
  const loopedWords = useMemo(() => {
    return [
      ...originalWords,
      ...originalWords,
      ...originalWords,
      ...originalWords,
      ...originalWords
    ];
  }, []);

  const startIndex = originalWords.length;
  const endIndex = originalWords.length * 4;
  const totalDistance = endIndex - startIndex;
  const fadeStart = startIndex + (totalDistance * 0.92); // Start fading at 92%

  const progress = useMotionValue(startIndex);
  
  // Global opacity for the end-of-loading transition
  // At 98%, start fading to 0. At 100%, fully transparent (matches #060606 bg).
  const globalOpacity = useTransform(progress, [startIndex, fadeStart, endIndex], [1, 1, 0]);

  useEffect(() => {
    const controls = animate(progress, endIndex, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete?.();
        }, 150);
      }
    });

    return () => controls.stop();
  }, [endIndex, onComplete, progress]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#060606] z-50 flex items-center justify-center overflow-hidden"
      animate={{ 
        // We use the globalOpacity transform for the exit animation, 
        // but this handles the final removal from DOM if needed.
        opacity: isComplete ? 0 : 1 
      }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isComplete ? "none" : "auto" }}
    >
      <motion.div 
        className="relative w-full h-full flex items-center"
        style={{ opacity: globalOpacity }} // Apply the 98%-100% fade here
      >
        
        <PercentageDisplay progress={progress} start={startIndex} end={endIndex} />

        {/* List Container */}
        <div className="absolute left-[50%] md:left-[60%] top-0 bottom-0 w-[500px] pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-0">
            {loopedWords.map((word, index) => (
              <WordItem 
                key={`${word}-${index}`}
                word={word} 
                index={index} 
                progress={progress} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}