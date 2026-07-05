import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { LogoGroup } from "./LandingLogos";
import Rectangle from "../../imports/Rectangle21";
import { WhatMakesUsDifferent } from "./WhatMakesUsDifferent";
import { FinalGrid, FinalCircle, FinalOverlay, WorkSection, AboutSection, VerticalContent, ScrollContainer, TopBar, ContactSection } from "./FinalLayout";
import mobileLogo from "../../assets/logo.jpeg";

// Portfolio images for mobile hero scattered layout
import mImg_cup      from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png"; // Andhra Spicy House cup
import mImg_pamph    from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png"; // Pamphlets on olive
import mImg_goCards  from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png"; // Go Wheels cards
import mImg_billboard from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png"; // XG Labs billboard
import mImg_disc     from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png"; // Green Go! disc
import mImg_maha     from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png"; // Mahaspeakss sign

export function LandingSequence({ startSequence }: { startSequence: boolean }) {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        const NAV_ITEMS = ["Our Edge", "Services", "Portfolio", "Blog", "Contact"] as const;
        const handleNavClick = (item: string) => {
            setMobileMenuOpen(false);
            if (item === "Services") navigate("/services");
            else if (item === "Portfolio") navigate("/portfolio");
            else if (item === "Blog") navigate("/blog");
            else if (item === "Our Edge") {
                const el = document.getElementById("selected-work");
                if (el) { document.body.style.overflow = "auto"; el.scrollIntoView({ behavior: "smooth" }); }
                else navigate("/", { state: { skipLoading: true, scrollToSection: "selected-work" } });
            } else if (item === "Contact") {
                const el = document.getElementById("footer");
                if (el) { document.body.style.overflow = "auto"; el.scrollIntoView({ behavior: "smooth" }); }
                else navigate("/", { state: { skipLoading: true, scrollToFooter: true } });
            }
        };

        return (
            <div style={{ background: "#f7f8fa", position: "relative" }}>

                {/* ── Slide-in sidebar menu ── */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ position: "fixed", inset: 0, zIndex: 400, background: "#0a0a0a", display: "flex", flexDirection: "column" }}
                        >
                            {/* Sidebar header */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                                <img alt="XG Labs" style={{ height: "48px", width: "auto", display: "block" }} src={mobileLogo} />
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-label="Close menu"
                                    style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav style={{ display: "flex", flexDirection: "column", padding: "16px 24px", flex: 1 }}>
                                {NAV_ITEMS.map((item, i) => (
                                    <motion.button
                                        key={item}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => handleNavClick(item)}
                                        style={{ width: "100%", textAlign: "left", padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "none", border: "none", borderBottomStyle: "solid", borderBottomWidth: "1px", borderBottomColor: "rgba(255,255,255,0.08)", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(22px, 6vw, 28px)", textTransform: "uppercase", letterSpacing: "0.02em", color: "#fff" }}
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Let's Talk CTA */}
                            <div style={{ padding: "16px 24px 48px" }}>
                                <button
                                    onClick={() => { setMobileMenuOpen(false); navigate("/", { state: { skipLoading: true, scrollToFooter: true } }); }}
                                    style={{ width: "100%", padding: "16px", background: "#fff", color: "#000", border: "none", borderRadius: "100px", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.12em" }}
                                >
                                    Let's Talk
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Fixed mobile navbar ── */}
                <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 48px)", maxWidth: 600, zIndex: 200, background: "#fff", borderRadius: 8, boxShadow: "0 0 15px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 16px 6px 8px", height: 64 }}>
                    <img alt="XG Labs" src={mobileLogo} style={{ height: 52, width: "auto", display: "block", cursor: "pointer" }} onClick={() => navigate("/", { state: { skipLoading: true } })} />
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                        style={{ width: 44, height: 44, borderRadius: "50%", background: "#0a0a0a", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, flexShrink: 0 }}
                    >
                        <span style={{ display: "block", width: 20, height: 2, borderRadius: 99, background: "#fff" }} />
                        <span style={{ display: "block", width: 14, height: 2, borderRadius: 99, background: "#fff" }} />
                        <span style={{ display: "block", width: 20, height: 2, borderRadius: 99, background: "#fff" }} />
                    </button>
                </div>

                {/* Hero */}
                <div style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    paddingTop: "110px",
                    overflow: "hidden",
                    background: "#f7f8fa",
                }}>
                    <FinalCircle />

                    {/* Text block — matches desktop TextContainer */}
                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "0 28px 44px" }}>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "13px", letterSpacing: "-0.96px", color: "#414141", margin: 0 }}>
                            STRATEGY FIRST
                        </p>
                        <h1 style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 700, fontSize: "clamp(40px, 13vw, 72px)", lineHeight: "1.04", letterSpacing: "-0.02em", color: "#060606", margin: 0, textTransform: "uppercase" }}>
                            From Vision<br />To Velocity
                        </h1>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 3.8vw, 17px)", lineHeight: "1.4", letterSpacing: "-0.04em", color: "#414141", margin: 0, maxWidth: "300px" }}>
                            We align strategy, creative, and performance to accelerate growth.
                        </p>
                    </div>

                    {/* Scattered portfolio images */}
                    <div style={{ position: "relative", width: "100%", height: "420px", zIndex: 1 }}>
                        {/* Cup — top centre-right */}
                        <div style={{ position: "absolute", top: "0%", left: "38%", width: "42%", transform: "rotate(-6deg)", zIndex: 5 }}>
                            <img src={mImg_cup} alt="" style={{ width: "100%", borderRadius: "6px", display: "block", objectFit: "cover" }} />
                        </div>
                        {/* Go Wheels cards — top right */}
                        <div style={{ position: "absolute", top: "0%", left: "62%", width: "44%", transform: "rotate(9deg)", zIndex: 4 }}>
                            <img src={mImg_goCards} alt="" style={{ width: "100%", borderRadius: "6px", display: "block", objectFit: "cover" }} />
                        </div>
                        {/* Pamphlets — left, slightly rotated */}
                        <div style={{ position: "absolute", top: "10%", left: "-6%", width: "50%", transform: "rotate(-13deg)", zIndex: 3 }}>
                            <img src={mImg_pamph} alt="" style={{ width: "100%", borderRadius: "6px", display: "block", objectFit: "cover" }} />
                        </div>
                        {/* XG Billboard — bottom left */}
                        <div style={{ position: "absolute", bottom: "0%", left: "-6%", width: "58%", transform: "rotate(-4deg)", zIndex: 6 }}>
                            <img src={mImg_billboard} alt="" style={{ width: "100%", borderRadius: "6px", display: "block", objectFit: "cover" }} />
                        </div>
                        {/* Green Go! disc — bottom centre */}
                        <div style={{ position: "absolute", bottom: "4%", left: "28%", width: "36%", transform: "rotate(6deg)", zIndex: 7 }}>
                            <img src={mImg_disc} alt="" style={{ width: "100%", borderRadius: "6px", display: "block", objectFit: "cover" }} />
                        </div>
                        {/* Mahaspeakss sign — bottom right */}
                        <div style={{ position: "absolute", bottom: "2%", left: "57%", width: "46%", transform: "rotate(-9deg)", zIndex: 8 }}>
                            <img src={mImg_maha} alt="" style={{ width: "100%", borderRadius: "6px", display: "block", objectFit: "cover" }} />
                        </div>
                    </div>
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
                                    if (next) {
                                        // Scroll 2px past the section top so scrollYProgress > 0,
                                        // which is required to trigger the hasSeen animation gate.
                                        const top = next.getBoundingClientRect().top + window.scrollY + 2;
                                        window.scrollTo({ top, behavior: "smooth" });
                                    } else {
                                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                                    }
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
                             animate={{ width: scrollStep === 3 ? "100vw" : "70vw", opacity: (scrollStep === 1 || scrollStep === 3) ? 0 : 1 }}
                             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                             className="absolute top-0 left-0 h-full z-50 pointer-events-none"
                        >
                            <div className="pointer-events-none absolute inset-0">
                                <TopBar containerWidth={scrollStep === 3 ? "100vw" : "70vw"} />
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
                                style={{ left: "24px" }}
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