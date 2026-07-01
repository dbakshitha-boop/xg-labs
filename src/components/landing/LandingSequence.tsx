import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { LogoGroup } from "./LandingLogos";
import Rectangle from "../../imports/Rectangle21";
import { WhatMakesUsDifferent } from "./WhatMakesUsDifferent";
import { FinalGrid, FinalCircle, FinalOverlay, WorkSection, AboutSection, VerticalContent, ScrollContainer, TopBar, ContactSection } from "./FinalLayout";

// Work images for mobile image grid
import imgWork1 from "figma:asset/3c2c8cefce5b34701acad992ed09e777d455d5d9.png";
import imgWork2 from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import imgWork3 from "figma:asset/57b2a045a1c474c35c83405b1c0e732165941c8c.png";
import imgWork4 from "figma:asset/3928f5a725db8937d4474329e22213a3e4710bec.png";
import imgWork5 from "figma:asset/7fb04902ca908bbcead7b1bfd2272d87b766cc5b.png";
import imgWork6 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgWork7 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgWork8 from "figma:asset/83d4a69b3e9c8f0a9728fcee74adb0198bf260f8.png";
import imgWork9 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";

const mobileWorkImages = [imgWork1, imgWork2, imgWork3, imgWork4, imgWork5, imgWork6, imgWork7, imgWork8, imgWork9];

export function LandingSequence({ startSequence }: { startSequence: boolean }) {
    const [containerExpanded, setContainerExpanded] = useState(false);
    const [showLogos, setShowLogos] = useState(false);
    const [slideLogos, setSlideLogos] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    
    // Split final state into phases
    const [layoutShift, setLayoutShift] = useState(false); // 1. Container resizes, Moves Left, Image Grid enters
    const [logoExiting, setLogoExiting] = useState(false); // 2. Logo shrinks/fades
    const [showContent, setShowContent] = useState(false); // 3. Text/Nav enters

    // Scroll State
    const [scrollStep, setScrollStep] = useState(0);
    const lastStepTime = useRef(0);       // when the last step fired (for throttle)
    const lastEventTime = useRef(0);      // when the last wheel event arrived (for gesture reset)
    const scrollDeltaAccumulator = useRef(0);
    const { scrollY } = useScroll();
    const transitionOpacity = useTransform(scrollY, [0, 800], [0, 1]);
    
    // Overflow state for glow effect
    const [overflowVisible, setOverflowVisible] = useState(false);

    // Viewport width — drives all horizontal scroll math
    const [viewWidth, setViewWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
    useEffect(() => {
        const onResize = () => {
            setViewWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // 1. Trigger Sequence when Loading Screen (App Level) finishes
    useEffect(() => {
        if (startSequence) {
            setContainerExpanded(true);
        }
    }, [startSequence]);

    // 2. After expansion, show logos and enable overflow for glow
    useEffect(() => {
        if (containerExpanded) {
            // Wait for container to fully expand before showing logos (matches 0.6s duration)
            const logoTimer = setTimeout(() => setShowLogos(true), 650);

            // Enable overflow after logos have entered
            const overflowTimer = setTimeout(() => setOverflowVisible(true), 1200);

            return () => {
                clearTimeout(overflowTimer);
                clearTimeout(logoTimer);
            };
        }
    }, [containerExpanded]);

    // 3. Slide logos almost immediately so they spring in while already sliding
    useEffect(() => {
        if (showLogos) {
            const timer = setTimeout(() => setSlideLogos(true), 50);
            return () => clearTimeout(timer);
        }
    }, [showLogos]);

    // 4. After slide finishes, expand to full screen and focus
    useEffect(() => {
        if (slideLogos) {
            const timer = setTimeout(() => setFullScreen(true), 2500); 
            return () => clearTimeout(timer);
        }
    }, [slideLogos]);

    // 5. After full screen, start Layout Shift (Container Shrink + Move)
    useEffect(() => {
        if (fullScreen) {
            const timer = setTimeout(() => setLayoutShift(true), 800);
            return () => clearTimeout(timer);
        }
    }, [fullScreen]);

    // 6. After Layout Shift completes (1.2s duration), trigger Logo Exit
    useEffect(() => {
        if (layoutShift) {
            const timer = setTimeout(() => setLogoExiting(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [layoutShift]);

    // 7. After Logo Exit completes (0.5s duration), trigger Content Entry
    useEffect(() => {
        if (logoExiting) {
            const timer = setTimeout(() => setShowContent(true), 500);
            return () => clearTimeout(timer);
        }
    }, [logoExiting]);

    // Lock Body Scroll when in Horizontal Mode
    useEffect(() => {
        if (isMobile) {
            document.body.style.overflow = "auto";
            return;
        }

        if (!showContent) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = "auto"; };
        }

        if (scrollStep < 3) {
             document.body.style.overflow = "hidden";
        } else {
             document.body.style.overflow = "auto";
        }

        return () => { document.body.style.overflow = "auto"; };
    }, [showContent, scrollStep, isMobile]);


    // Scroll Event Listener
    useEffect(() => {
        if (!showContent || isMobile) return;

        const handleWheel = (e: WheelEvent) => {
            if (scrollStep >= 3) return;

            const now = Date.now();

            // Reset accumulator when the user starts a fresh scroll gesture (>200ms gap)
            if (now - lastEventTime.current > 200) {
                scrollDeltaAccumulator.current = 0;
            }
            lastEventTime.current = now;

            scrollDeltaAccumulator.current += e.deltaY;

            // Throttle: min 600ms between steps to prevent accidental double-steps
            if (now - lastStepTime.current < 600) return;

            if (scrollDeltaAccumulator.current > 50) {
                setScrollStep(prev => Math.min(prev + 1, 3));
                scrollDeltaAccumulator.current = 0;
                lastStepTime.current = now;
            } else if (scrollDeltaAccumulator.current < -50) {
                setScrollStep(prev => Math.max(prev - 1, 0));
                scrollDeltaAccumulator.current = 0;
                lastStepTime.current = now;
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [showContent, scrollStep]);

    const handleNextScroll = () => {
        setScrollStep(prev => Math.min(prev + 1, 3));
    };

    const handlePrevScroll = () => {
        setScrollStep(prev => Math.max(prev - 1, 0));
    };

    const getLogoState = () => {
        if (logoExiting) return "exit";
        if (fullScreen) return "focus";
        if (slideLogos) return "slide";
        if (showLogos) return "visible";
        return "hidden";
    };

    // Calculate container animation props
    const getContainerAnimate = () => {
        if (showContent) {
             return {
                height: 1080,
                width: "70vw",
                left: "35vw",
                top: "50%",
                y: "-50%",
                x: `calc(-50% - ${scrollStep * viewWidth * 0.7}px)`,
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            };
        }
        if (layoutShift) {
            return {
                height: 1080,
                width: "70vw",
                left: "35vw",
                top: "50%",
                x: "-50%",
                y: "-50%",
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            };
        }
        if (fullScreen) {
            return {
                height: 1080,
                width: "100%", // Full width
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            };
        }
        if (containerExpanded) {
            return {
                height: 400,
                width: "100%",
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            };
        }
        return {
            height: 0,
            width: "100%",
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%"
        };
    };

    // ── Mobile layout — completely bypasses the JS horizontal scroll animation ──
    if (isMobile) {
        return (
            <div style={{ background: "#f7f8fa", position: "relative" }}>
                <TopBar />

                {/* Hero — full-screen, vertically centred */}
                <div style={{
                    minHeight: "100svh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "100px 24px 48px",
                    gap: "16px",
                }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#02A884", margin: 0 }}>
                        Strategy First
                    </p>
                    <h1 style={{ fontFamily: "'Cal Sans', 'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(44px, 12vw, 72px)", lineHeight: "1.04", letterSpacing: "-0.03em", color: "#111", margin: 0, textTransform: "uppercase" }}>
                        Strategy Over<br />Everything
                    </h1>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 4vw, 17px)", lineHeight: "1.6", color: "#555", margin: 0, maxWidth: "300px" }}>
                        We align strategy, creative, and execution to drive measurable growth.
                    </p>
                </div>

                {/* 3-column image grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px" }}>
                    {mobileWorkImages.map((src, i) => (
                        <div key={i} style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </div>
                    ))}
                </div>

                <WhatMakesUsDifferent />
                <VerticalContent />
            </div>
        );
    }

    return (
        <div className="bg-[#060606] relative w-full">
            
            {/* Horizontal Section - Sticky so it stays while we scroll horizontally */}
            <div className="h-screen sticky top-0 overflow-hidden">
                {/* White Container Strip / Hero Area */}
                <motion.div 
                    initial={{ height: 0, width: "100%", left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                    animate={getContainerAnimate()}
                    className={`absolute bg-[#f7f8fa] z-10 ${overflowVisible ? "overflow-visible" : "overflow-hidden"}`}
                >
                    {/* Background Grid - Early layout shift */}
                    {layoutShift && <FinalGrid />}
                    
                    {/* Background Circle - Late text entry */}
                    {showContent && <FinalCircle />}

                    {/* Original Logo Sequence */}
                    <LogoGroup animateState={getLogoState()} />
                    
                    {/* New Content (We Are, Tagline, Text) - On Top */}
                    {showContent && <FinalOverlay />}
                </motion.div>

                {/* Work Section - Appearing in Final State */}
                {layoutShift && (
                    <motion.div
                        initial={{ x: "30%", opacity: 0 }}
                        animate={showContent ? { x: -scrollStep * viewWidth * 0.7, opacity: 1 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: showContent ? 0 : 0.1 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <WorkSection scrollStep={scrollStep} />
                        </div>
                    </motion.div>
                )}

                {/* About Section - Only visible via scroll */}
                {showContent && (
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: -scrollStep * viewWidth * 0.7 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <AboutSection scrollStep={scrollStep} />
                        </div>
                    </motion.div>
                )}

                {/* Contact Section - Only visible via scroll */}
                {showContent && (
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: -scrollStep * viewWidth * 0.7 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <ContactSection
                                onClose={() => {
                                    document.body.style.overflow = "auto";
                                    const next = document.getElementById("what-makes-us-different");
                                    if (next) next.scrollIntoView({ behavior: "smooth" });
                                    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                                }}
                            />
                        </div>
                    </motion.div>
                )}
                
                {showContent && (
                    <>
                        {/* Transition Gradient Screen - Fades in based on scroll */}
                        <motion.div 
                            style={{ opacity: transitionOpacity }}
                            className="absolute inset-0 z-40 pointer-events-none"
                        >
                            <Rectangle />
                        </motion.div>

                        <motion.div
                             animate={{ width: scrollStep === 3 ? "100vw" : "70vw", opacity: scrollStep === 1 ? 0 : 1 }}
                             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                             className="absolute top-0 left-0 h-full z-50 pointer-events-none"
                        >
                            <div className="pointer-events-none absolute inset-0">
                                <TopBar />
                            </div>
                        </motion.div>

                        <motion.div
                             animate={{ y: scrollStep >= 3 ? 200 : 0 }}
                             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                             className="absolute inset-0 z-50 pointer-events-none"
                        >
                            <div className="pointer-events-none w-full h-full p-[0px]">
                                <ScrollContainer onNext={handleNextScroll} onPrev={handlePrevScroll} hideText={scrollStep > 0} />
                            </div>
                        </motion.div>

                        {/* Previous button — only visible on contact section */}
                        {scrollStep === 3 && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handlePrevScroll}
                                className="absolute bottom-[40px] z-[200] pointer-events-auto cursor-pointer"
                                style={{ left: "max(40px, calc((100vw - 1224px) / 2))" }}
                            >
                                <div className="relative size-[40px]">
                                    <svg className="block size-full" fill="none" viewBox="0 0 40 40">
                                        <rect height="39" rx="19.5" stroke="rgba(255,255,255,0.6)" width="39" x="0.5" y="0.5" />
                                        <path d="M22 13L15 20L22 27" stroke="rgba(255,255,255,0.6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </div>
                            </motion.button>
                        )}
                    </>
                )}
            </div>

            {/* Spacer to drive the scroll transition */}
            <div className="h-[24px] w-full pointer-events-none" />

            {/* What Makes Us Different Section */}
            <WhatMakesUsDifferent />

            {/* Vertical Content (Footer) - Only visible when we scroll down after step 3 */}
            <VerticalContent />
        </div>
    );
}