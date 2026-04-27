import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

type CursorVariant = 'default' | 'light' | 'technical' | 'button' | 'hidden';

interface CursorContextType {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  text: string | null;
  setText: (text: string | null) => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  setVariant: () => {},
  text: null,
  setText: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [text, setText] = useState<string | null>(null);

  return (
    <CursorContext.Provider value={{ variant, setVariant, text, setText }}>
      {children}
      <CustomCursor />
    </CursorContext.Provider>
  );
};

const CustomCursor = () => {
  const { variant, text } = useCursor();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Variant Styles
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "#00A88D",
      mixBlendMode: "normal",
      border: "0px solid transparent",
      borderRadius: "100%",
    },
    light: {
      height: 16,
      width: 16,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference", // Cool effect on dark
      border: "0px solid transparent",
      borderRadius: "100%",
    },
    technical: {
      height: 60,
      width: 60,
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "normal",
      borderRadius: "100%",
    },
    button: {
      height: 40,
      width: 40,
      backgroundColor: "rgba(0, 168, 141, 0.1)",
      border: "1px solid #00A88D",
      mixBlendMode: "normal",
      borderRadius: "100%",
    },
    textState: {
      height: 32,
      width: "auto",
      backgroundColor: variant === 'light' ? "#ffffff" : "#00A88D",
      mixBlendMode: variant === 'light' ? "difference" : "normal",
      border: "0px solid transparent",
      borderRadius: 9999,
      paddingLeft: 16,
      paddingRight: 16,
    },
    hidden: {
      opacity: 0,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        layout
        animate={text ? "textState" : variant}
        variants={variants as any}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center relative backdrop-blur-[1px] overflow-hidden"
      >
        {/* Technical Cursor Reticle */}
        <AnimatePresence>
          {variant === 'technical' && !text && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0"
            >
                {/* Crosshair Lines */}
                <div className="absolute top-1/2 left-0 w-2 h-[1px] bg-white/50" />
                <div className="absolute top-1/2 right-0 w-2 h-[1px] bg-white/50" />
                <div className="absolute top-0 left-1/2 h-2 w-[1px] bg-white/50" />
                <div className="absolute bottom-0 left-1/2 h-2 w-[1px] bg-white/50" />
                
                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white -translate-x-1/2 -translate-y-1/2 rounded-full" />
                
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Text Label - Inside Cursor */}
        <AnimatePresence mode="wait">
          {text && (
            <motion.span
              key="text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap"
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};