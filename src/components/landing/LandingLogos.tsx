import React from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-new-paths";
import { imgGroup, imgGroup1, imgGroup2, imgGroup3 } from "../../imports/svg-new-images";

// --- Helpers ---
const MaskGroup = ({ children, maskImage, className = "" }: any) => (
    <div className={`[mask-clip:no-clip] [mask-composite:intersect] [mask-mode:alpha] [mask-repeat:no-repeat] ${className}`} style={{ maskImage }}>
        {children}
    </div>
);

const BaseLogoShapes = () => (
    <>
        <div className="absolute inset-[-320.77%_-101.28%_-320.77%_-90.58%]">
            <svg className="block size-full" fill="none" viewBox="0 0 32 32"><g></g></svg>
        </div>
        <div className="absolute inset-[31.94%_43.63%_32.39%_48.51%]">
            <svg className="block size-full" fill="none" viewBox="0 0 48 84"><path d={svgPaths.pa32f200} fill="var(--fill-0, black)" /></svg>
        </div>
        <div className="absolute inset-[38.86%_32.08%_31.98%_56.19%]">
            <svg className="block size-full" fill="none" viewBox="0 0 71 69"><path d={svgPaths.p2870db30} fill="var(--fill-0, black)" /></svg>
        </div>
        <div className="absolute inset-[30%_19.02%_32%_69.25%]">
            <svg className="block size-full" fill="none" viewBox="0 0 71 90"><path d={svgPaths.p1485d1f0} fill="var(--fill-0, black)" /></svg>
        </div>
        <div className="absolute inset-[38.85%_9.34%_31.98%_81.04%]">
            <svg className="block size-full" fill="none" viewBox="0 0 58 69"><path d={svgPaths.p2b1d1740} fill="var(--fill-0, black)" /></svg>
        </div>
        <div className="absolute inset-[58.57%_4.8%_32%_91.15%]">
            <svg className="block size-full" fill="none" viewBox="0 0 25 23"><path d={svgPaths.p19aa6500} fill="var(--fill-0, black)" /></svg>
        </div>
    </>
);

const ClipPathCommon = () => (
    <div className="absolute inset-[9.76%_61.55%_18.63%_16.27%]">
        <svg className="block size-full" fill="none" viewBox="0 0 134 169">
            <g>
                <path d={svgPaths.p251ce600} fill="var(--fill-0, #F7F8FA)" />
                <path d={svgPaths.p26afec00} fill="var(--fill-0, #F7F8FA)" />
            </g>
        </svg>
    </div>
);

const ArrowGroup = () => (
    <div className="absolute inset-[31.94%_0.89%_45.31%_90.79%]">
        <svg className="block size-full" fill="none" viewBox="0 0 50 54">
            <path d={svgPaths.p6ad0c00} fill="var(--fill-0, #15AA89)" />
            <path d={svgPaths.p2f9e0800} fill="var(--fill-0, #15AA89)" />
            <path d={svgPaths.p2dde1f00} fill="var(--fill-0, #15AA89)" />
        </svg>
    </div>
);

// --- Masked Backgrounds ---
const MaskedBg1 = () => (
    <div className="absolute contents inset-[12.23%_54.78%_12.15%_9.78%]">
       <div className="absolute contents inset-[11.97%_54.63%_11.97%_9.64%]">
            <MaskGroup 
                className="absolute inset-[12.29%_54.76%_12.29%_9.79%] mask-size-[212px_177px] mask-position-[-0.05px_-0.9px]"
                maskImage={`url('${imgGroup}'), url('${imgGroup1}'), url('${imgGroup}'), url('${imgGroup}'), url('${imgGroup1}')`}
            >
                <svg className="block size-full" fill="none" viewBox="0 0 213 178">
                    <path d={svgPaths.p32154000} fill="var(--fill-0, black)" />
                </svg>
            </MaskGroup>
       </div>
    </div>
);

const MaskedBg2 = () => (
    <div className="absolute contents inset-[12.23%_54.78%_12.15%_9.78%]">
       <div className="absolute contents inset-[12.29%_54.86%_12.48%_9.79%]">
            <MaskGroup 
                className="absolute inset-[7.14%_52.74%_7.15%_7.75%] opacity-0"
                maskImage={`url('${imgGroup2}'), url('${imgGroup3}')`}
            >
                 <svg className="block size-full" fill="none" viewBox="0 0 237 202">
                    <path d={svgPaths.p314b2cf0} fill="var(--fill-0, black)" opacity="0" />
                </svg>
            </MaskGroup>
       </div>
    </div>
);

// --- Animation Variants ---
const commonState = {
    hidden: { top: "calc(50% + 0.5px)", y: 28, opacity: 0, scale: 0.75 },
    visible: {
        top: "calc(50% + 0.5px)",
        y: 0,
        opacity: 1,
        scale: 0.75,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    },
    slide: {
        top: "calc(50% + 0.5px)",
        y: 0,
        opacity: 1,
        scale: 0.75
    }
};

// For Logo3 (The 4th one) - Stays visible
const heroLogoVariants = {
    ...commonState,
    focus: {
        top: "calc(50% + 0.5px)",
        y: 0,
        opacity: 1,
        scale: 0.75,
        transition: { duration: 0.5 }
    },
    exit: {
        top: "calc(50% + 0.5px)",
        y: 0,
        opacity: 0,
        scale: 0.375,
        transition: { duration: 0.5 }
    }
};

// For others - Fade out
const fadingLogoVariants = {
    ...commonState,
    focus: {
        top: "calc(50% + 0.5px)",
        y: 0,
        opacity: 0,
        scale: 0.75,
        transition: { duration: 0.5 }
    },
    exit: {
        top: "calc(50% + 0.5px)",
        y: 0,
        opacity: 0,
        scale: 0.375,
        transition: { duration: 0.5 }
    }
};

const containerVariants = {
    hidden: { x: 0 },
    visible: {
        x: 0,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    },
    slide: {
        x: -1498.95, // Center Logo3
        transition: { 
            duration: 2.5, 
            ease: [0.25, 1, 0.5, 1] 
        }
    },
    focus: {
        x: -1498.95, // Maintain position
        transition: { duration: 0.1 } // Keep position
    },
    exit: {
        x: -1498.95, // Maintain position
        transition: { duration: 0.1 } 
    }
};

// --- Logo Components (Motion Wrappers) ---

export function Logo6() {
  return (
    <motion.div variants={fadingLogoVariants} className="absolute h-[235px] left-[calc(50%+3658.65px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
      <BaseLogoShapes />
      <MaskedBg1 />
      <MaskedBg2 />
      <ClipPathCommon />
      <ArrowGroup />
    </motion.div>
  );
}

export function Logo5() {
  return (
    <motion.div variants={fadingLogoVariants} className="absolute h-[235px] left-[calc(50%+2938.65px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
       <BaseLogoShapes />
       <MaskedBg1 />
       <MaskedBg2 />
       <ClipPathCommon />
       <ArrowGroup />
    </motion.div>
  );
}

export function Logo4() {
    return (
      <motion.div variants={fadingLogoVariants} className="absolute h-[235px] left-[calc(50%+2218.65px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
         <BaseLogoShapes />
         <MaskedBg1 />
         <MaskedBg2 />
         <ClipPathCommon />
         <ArrowGroup />
      </motion.div>
    );
}

// Logo3 is the Hero (4th logo)
export function Logo3() {
    return (
      <motion.div variants={heroLogoVariants} className="absolute h-[235px] left-[calc(50%+1498.95px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
         <BaseLogoShapes />
         <MaskedBg1 />
         <MaskedBg2 />
         <ClipPathCommon />
         <ArrowGroup />
      </motion.div>
    );
}

export function Logo2() {
    return (
      <motion.div variants={fadingLogoVariants} className="absolute h-[235px] left-[calc(50%+779.25px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
         <BaseLogoShapes />
         <MaskedBg1 />
         <MaskedBg2 />
         <ClipPathCommon />
         <ArrowGroup />
      </motion.div>
    );
}

export function Logo1() {
    return (
      <motion.div variants={fadingLogoVariants} className="absolute h-[235px] left-[calc(50%+59.55px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
         <BaseLogoShapes />
         <MaskedBg1 />
         <MaskedBg2 />
         <ClipPathCommon />
         <ArrowGroup />
      </motion.div>
    );
}

export function Logo() {
    return (
      <motion.div variants={fadingLogoVariants} className="absolute h-[235px] left-[calc(50%-660.15px)] -translate-x-1/2 -translate-y-1/2 w-[600px]">
         <BaseLogoShapes />
         <MaskedBg1 />
         <MaskedBg2 />
         <ClipPathCommon />
         <ArrowGroup />
      </motion.div>
    );
}

export function LogoGroup({ animateState }: { animateState?: string }) {
  return (
    <motion.div 
        className="absolute inset-0" 
        variants={containerVariants}
        initial="hidden"
        animate={animateState}
    >
      <Logo />
      <Logo1 />
      <Logo2 />
      <Logo3 />
      <Logo4 />
      <Logo5 />
      <Logo6 />
    </motion.div>
  );
}