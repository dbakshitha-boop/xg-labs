import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-m6r07uqqe";
import { imgGroup, imgGroup1, imgGroup2, imgGroup3, imgGroup4 } from "../../imports/svg-4qabc";

// --- Imported Sub-Components from LandingScreen.tsx (Refactored for internal use) ---

function Group({ maskImage }: { maskImage: string }) {
  return (
    <div className="[mask-clip:no-clip,_no-clip,_no-clip,_no-clip,_no-clip] [mask-composite:intersect,_intersect,_intersect,_intersect,_intersect] [mask-mode:alpha,_alpha,_alpha,_alpha,_alpha] [mask-repeat:no-repeat,_no-repeat,_no-repeat,_no-repeat,_no-repeat] absolute inset-[12.29%_54.76%_12.29%_9.79%] mask-position-[-0.059px,_-0.902px,_-0.059px,_-0.059px,_-0.902px_-0.137px,_-0.752px,_-0.137px,_-0.137px,_-0.752px] mask-size-[212.578px_177.707px,_214.293px_178.759px,_212.578px_177.707px,_212.578px_177.707px,_214.293px_178.759px]" style={{ maskImage }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 213 178">
        <g>
          <path d={svgPaths.p32154000} fill="var(--fill-0, black)" />
        </g>
      </svg>
    </div>
  );
}

// Reusable Arrow Group
function ArrowGroup({ id }: { id?: string }) {
    return (
      <div className="absolute inset-[31.94%_0.89%_45.31%_90.79%]" data-name="Arrow Gruop">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 54">
          <g id={id || "Arrow Gruop"}>
            <path d={svgPaths.p6ad0c00} fill="var(--fill-0, #15AA89)" />
            <path d={svgPaths.p2f9e0800} fill="var(--fill-0, #15AA89)" />
            <path d={svgPaths.p2dde1f00} fill="var(--fill-0, #15AA89)" />
          </g>
        </svg>
      </div>
    );
}

// Reusable Base Logo Parts
function BaseLogoParts() {
    return (
        <>
            <div className="absolute inset-[-320.77%_-101.28%_-320.77%_-90.58%]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Vector"></g>
                </svg>
            </div>
            {/* Common Black Paths */}
            <div className="absolute inset-[31.94%_43.63%_32.39%_48.51%]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 84">
                <path d={svgPaths.pa32f200} fill="currentColor" />
                </svg>
            </div>
            <div className="absolute inset-[38.86%_32.08%_31.98%_56.19%]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71 69">
                <path d={svgPaths.p2870db30} fill="currentColor" />
                </svg>
            </div>
            <div className="absolute inset-[30%_19.02%_32%_69.25%]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71 90">
                <path d={svgPaths.p1485d1f0} fill="currentColor" />
                </svg>
            </div>
            <div className="absolute inset-[38.85%_9.34%_31.98%_81.04%]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58 69">
                <path d={svgPaths.p2b1d1740} fill="currentColor" />
                </svg>
            </div>
            <div className="absolute inset-[58.57%_4.8%_32%_91.15%]" data-name="Dot.">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 23">
                <path d={svgPaths.p19aa6500} fill="currentColor" />
                </svg>
            </div>
        </>
    )
}

// Clip Path SVG (The 'F7F8FA' part which acts as mask/background overlap)
function ClipPathSVG({ fill = "#F7F8FA" }: { fill?: string }) {
    return (
        <div className="absolute inset-[9.76%_61.55%_18.63%_16.27%]" data-name="Clip path group">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 169">
                <g>
                    <path d={svgPaths.p251ce600} fill={`var(--fill-0, ${fill})`} />
                    <g>
                        <path d={svgPaths.p26afec00} fill={`var(--fill-0, ${fill})`} />
                    </g>
                </g>
            </svg>
        </div>
    );
}

// --- Frame Components ---
// I've simplified the deep nesting of groups from the import to functional components for readability while preserving the logic.
// The "Group"s with maskImages are the complex parts.

const MaskStyle1 = `url('${imgGroup}'), url('${imgGroup1}'), url('${imgGroup}'), url('${imgGroup}'), url('${imgGroup1}')`;

// Frame 0 (Logo)
const LogoFrame0 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
        {/* ClipPathGroup33 equivalent */}
        <ClipPathSVG fill="black" /> 
        {/* Wait, Logo (Frame0) in source uses ClipPathGroup33 which has NO ArrowGroup. */}
    </div>
);

// Frame 1 (Logo1)
const LogoFrame1 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
        <ClipPathSVG fill="black" />
        <ArrowGroup />
    </div>
);

// Frame 2 (Logo2)
const LogoFrame2 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
        <ClipPathSVG fill="black" />
        <ArrowGroup />
    </div>
);

// Frame 3 (Logo3)
const LogoFrame3 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
         {/* This frame uses ClipPathGroup23 -> #F7F8FA? */}
        <ClipPathSVG fill="#F7F8FA" /> 
        <ArrowGroup />
    </div>
);

// Frame 4 (Logo4)
const LogoFrame4 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
        <ClipPathSVG fill="#F7F8FA" />
        <ArrowGroup />
    </div>
);

// Frame 5 (Logo5)
const LogoFrame5 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
        <ClipPathSVG fill="#F7F8FA" />
        <ArrowGroup />
    </div>
);

// Frame 6 (Logo6)
const LogoFrame6 = () => (
    <div className="absolute w-[599.7px] h-[235px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip text-black">
        <BaseLogoParts />
        <ClipPathSVG fill="#F7F8FA" />
        <ArrowGroup />
    </div>
);

const frames = [LogoFrame0, LogoFrame1, LogoFrame2, LogoFrame3, LogoFrame4, LogoFrame5, LogoFrame6];

// --- Number Animation ---
const percentages = ["01 %", "02 %", "03 %", "04 %", "05 %", "10 %", "15 %", "20 %", "25 %", "30 %", "40 %", "50 %", "60 %", "70 %", "80 %", "90 %", "100 %"];

export function LandingLoader({ onComplete }: { onComplete: () => void }) {
    const [percentIndex, setPercentIndex] = useState(0);
    const [logoFrame, setLogoFrame] = useState(-1); // -1: Hidden, 0-6: Frames

    useEffect(() => {
        // 1. Animate Numbers
        const totalDuration = 2000; // 2 seconds for numbers
        const stepTime = totalDuration / percentages.length;
        
        let currentStep = 0;
        const numberInterval = setInterval(() => {
            currentStep++;
            if (currentStep < percentages.length) {
                setPercentIndex(currentStep);
            } else {
                clearInterval(numberInterval);
                // 2. Start Logo Animation after numbers are done
                startLogoSequence();
            }
        }, stepTime);

        return () => clearInterval(numberInterval);
    }, []);

    const startLogoSequence = () => {
        let frame = 0;
        setLogoFrame(0);
        
        const frameInterval = setInterval(() => {
            frame++;
            if (frame < frames.length) {
                setLogoFrame(frame);
            } else {
                clearInterval(frameInterval);
                // 3. Complete
                setTimeout(onComplete, 500);
            }
        }, 120); // 120ms per frame
    };

    const currentPercent = percentages[percentIndex];
    const CurrentFrameComponent = logoFrame >= 0 ? frames[logoFrame] : null;

    return (
        <div className="fixed inset-0 z-50 bg-[#060606] overflow-hidden flex flex-col justify-between">
            {/* Center Content: Logo Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
                 {/* Container White Bar? The design has a white bar "Container" in LogoGroup? 
                     In LandingScreen.tsx, `Container` has `bg-[#f7f8fa] h-0 ...` -> It's hidden or grows?
                     Wait, `h-0` in Tailwind means height 0. 
                     The user prompt says "This is starting loading screen". 
                     I'll assume the logo appears on black.
                 */}
                 {CurrentFrameComponent && (
                     <div className="scale-75 md:scale-100 relative w-[600px] h-[235px]">
                        <CurrentFrameComponent />
                     </div>
                 )}
            </div>

            {/* Bottom Left: Number Animation */}
            {logoFrame === -1 && ( // Hide numbers when logo starts? Or keep them? Design shows them on black.
                <div className="absolute bottom-[10vh] left-[5vw] h-[180px] overflow-hidden">
                    <motion.div 
                        animate={{ y: -percentIndex * 150 }} // 150px is the font size approx height
                        transition={{ ease: "linear", duration: 0.1 }}
                        className="flex flex-col items-start"
                    >
                        {percentages.map((p, i) => (
                            <div key={i} className="h-[150px] flex items-center">
                                <span className="font-space font-bold text-[100px] md:text-[150px] leading-none text-white tracking-[-6px]">
                                    {p}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
