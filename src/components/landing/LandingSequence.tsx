import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { LogoGroup } from "./LandingLogos";
import Rectangle from "../../imports/Rectangle21";
import { WhatMakesUsDifferent } from "./WhatMakesUsDifferent";
import { FinalGrid, FinalCircle, FinalOverlay, WorkSection, AboutSection, VerticalContent, ScrollContainer, TopBar, ContactSection } from "./FinalLayout";

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
    const lastScrollTime = useRef(0);
    const { scrollY } = useScroll();
    const transitionOpacity = useTransform(scrollY, [0, 800], [0, 1]);
    
    // Overflow state for glow effect
    const [overflowVisible, setOverflowVisible] = useState(false);

    // 1. Trigger Sequence when Loading Screen (App Level) finishes
    useEffect(() => {
        if (startSequence) {
            // Wait for black screen pause (800ms)
            const timer = setTimeout(() => {
                setContainerExpanded(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [startSequence]);

    // 2. After expansion, show logos and enable overflow for glow
    useEffect(() => {
        if (containerExpanded) {
            // Show logos after expansion (1s)
            const logoTimer = setTimeout(() => setShowLogos(true), 1000); 
            
            // Enable overflow ONLY after logos have fully entered (1s + ~0.8s animation)
            // This prevents logos from being seen "outside" the container during entrance
            const overflowTimer = setTimeout(() => setOverflowVisible(true), 2000);

            return () => {
                clearTimeout(overflowTimer);
                clearTimeout(logoTimer);
            };
        }
    }, [containerExpanded]);

    // 3. After logos enter, slide them
    useEffect(() => {
        if (showLogos) {
            const timer = setTimeout(() => setSlideLogos(true), 2000); 
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
        if (!showContent) {
            document.body.style.overflow = "hidden";
            return;
        }

        if (scrollStep < 3) {
             document.body.style.overflow = "hidden";
        } else {
             document.body.style.overflow = "auto";
        }

        return () => { document.body.style.overflow = "auto"; };
    }, [showContent, scrollStep]);


    // Scroll Event Listener
    useEffect(() => {
        if (!showContent) return;

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            
            // If scrolling vertically (Step 3+), check if we need to return to Step 2
            if (scrollStep >= 3) {
                if (window.scrollY === 0 && e.deltaY < -10) {
                     setScrollStep(2);
                     // e.preventDefault(); // Optional: prevent bounce
                }
                return; // Let native vertical scroll happen
            }

            // Otherwise, we are in Horizontal Mode (Step 0, 1, or 2)
            // Prevent Default to stop bounce if supported (passive issue) but body overflow:hidden helps
            
            if (now - lastScrollTime.current < 1000) return; // Debounce 1s

            if (e.deltaY > 50) {
                setScrollStep(prev => Math.min(prev + 1, 3)); 
                lastScrollTime.current = now;
            } else if (e.deltaY < -50) {
                setScrollStep(prev => Math.max(prev - 1, 0));
                lastScrollTime.current = now;
            }
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, [showContent, scrollStep]);

    const handleNextScroll = () => {
        setScrollStep(prev => Math.min(prev + 1, 3));
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
                width: 1304,
                left: "652px",
                top: "50%",
                y: "-50%",
                x: `calc(-50% - ${scrollStep * 1304}px)`,
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            };
        }
        if (layoutShift) {
            return {
                height: 1080,
                width: 1304,
                left: "652px",
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
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
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
                        animate={showContent ? { x: -scrollStep * 1304, opacity: 1 } : { x: 0, opacity: 1 }}
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
                        animate={{ x: -scrollStep * 1304 }}
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
                        animate={{ x: -scrollStep * 1304 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <ContactSection />
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
                             animate={{ y: scrollStep >= 3 ? -200 : 0 }}
                             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                             className="absolute inset-0 z-50 pointer-events-none"
                        >
                            <div className="pointer-events-none absolute inset-0 w-full h-full">
                                <TopBar />
                            </div>
                        </motion.div>

                        <motion.div
                             animate={{ y: scrollStep >= 3 ? 200 : 0 }}
                             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                             className="absolute inset-0 z-50 pointer-events-none"
                        >
                            <div className="pointer-events-none w-full h-full p-[0px]">
                                <ScrollContainer onNext={handleNextScroll} />
                            </div>
                        </motion.div>
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