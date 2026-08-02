import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useAnimationFrame } from "motion/react";
import { useNavigate } from "react-router-dom";
import { LogoGroup } from "./LandingLogos";
import Rectangle from "../../imports/Rectangle21";
import { WhatMakesUsDifferent } from "./WhatMakesUsDifferent";
import { FinalGrid, FinalCircle, FinalOverlay, WorkSection, AboutSection, VerticalContent, ScrollContainer, TopBar, ContactSection } from "./FinalLayout";
import { useContactForm } from "../ContactFormContext";
import { ContactFormContent } from "../ContactFormOverlay";
import CardImages from "../../imports/CardImages";
import mobileLogo from "../../assets/logo.jpeg";

// Portfolio images for mobile hero
import mImg_cup      from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import mImg_billboard from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import mImg_disc     from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";
import mImg_maha     from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import mImg_pamph    from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import mImg_extra1   from "figma:asset/06355012afb0087b8c9bfc9843e66981c1b4fc10.png";
import mImg_extra2   from "figma:asset/3928f5a725db8937d4474329e22213a3e4710bec.png";
import mImg_extra3   from "figma:asset/83d4a69b3e9c8f0a9728fcee74adb0198bf260f8.png";

export function LandingSequence({ startSequence, skipIntro = false, jumpPastHero = false }: { startSequence: boolean; skipIntro?: boolean; jumpPastHero?: boolean }) {
    const navigate = useNavigate();
    const { open: openContactForm } = useContactForm();
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
    const gestureLocked = useRef(false);  // once a step fires, ignore the rest of this same trackpad gesture (momentum tail)
    const { scrollY } = useScroll();
    const transitionOpacity = useTransform(scrollY, [0, 800], [0, 1]);
    
    // Overflow state for glow effect
    const [overflowVisible, setOverflowVisible] = useState(false);

    // Viewport width — drives all horizontal scroll math
    const [viewWidth, setViewWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
    const [isTablet, setIsTablet] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false);
    const [talkHovered, setTalkHovered] = useState(false);
    const [ordinaryLanded, setOrdinaryLanded] = useState(false);
    const whatMakesUsRef = useRef<HTMLDivElement>(null);
    const mobileFormPrevRef = useRef<HTMLDivElement>(null);

    // Mobile hero image rows — slow horizontal drift, mirroring the desktop
    // portfolio columns' vertical drift (WorkSection in FinalLayout.tsx).
    const rowDriftTime = useRef(0);
    const rowDriftX1 = useMotionValue(0);
    const rowDriftX2 = useMotionValue(0);
    const rowDriftX3 = useMotionValue(0);
    useAnimationFrame((_, delta) => {
        if (!isMobile) return;
        rowDriftTime.current += delta * 0.001;
        const t = rowDriftTime.current;
        rowDriftX1.set(Math.sin(t * 0.3) * 16);
        rowDriftX2.set(Math.sin(t * 0.24 + 1.5) * 20);
        rowDriftX3.set(Math.sin(t * 0.34 + 3.0) * 16);
    });

    useEffect(() => {
        const onResize = () => {
            setViewWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 1024);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
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
            const logoTimer = setTimeout(() => setShowLogos(true), skipIntro ? 0 : 650);

            // Enable overflow after logos have entered
            const overflowTimer = setTimeout(() => setOverflowVisible(true), skipIntro ? 0 : 1200);

            return () => {
                clearTimeout(overflowTimer);
                clearTimeout(logoTimer);
            };
        }
    }, [containerExpanded, skipIntro]);

    // 3. Slide logos almost immediately so they spring in while already sliding
    useEffect(() => {
        if (showLogos) {
            const timer = setTimeout(() => setSlideLogos(true), skipIntro ? 0 : 50);
            return () => clearTimeout(timer);
        }
    }, [showLogos, skipIntro]);

    // 4. After slide finishes, expand to full screen and focus
    useEffect(() => {
        if (slideLogos) {
            const timer = setTimeout(() => setFullScreen(true), skipIntro ? 0 : 2500);
            return () => clearTimeout(timer);
        }
    }, [slideLogos, skipIntro]);

    // 5. After full screen, start Layout Shift (Container Shrink + Move)
    useEffect(() => {
        if (fullScreen) {
            const timer = setTimeout(() => setLayoutShift(true), skipIntro ? 0 : 800);
            return () => clearTimeout(timer);
        }
    }, [fullScreen, skipIntro]);

    // 6. After Layout Shift completes (1.2s duration), trigger Logo Exit
    useEffect(() => {
        if (layoutShift) {
            const timer = setTimeout(() => setLogoExiting(true), skipIntro ? 0 : 1200);
            return () => clearTimeout(timer);
        }
    }, [layoutShift, skipIntro]);

    // 7. After Logo Exit completes (0.5s duration), trigger Content Entry
    useEffect(() => {
        if (logoExiting) {
            const timer = setTimeout(() => setShowContent(true), skipIntro ? 0 : 500);
            return () => clearTimeout(timer);
        }
    }, [logoExiting, skipIntro]);

    // 8. Arriving via back-navigation or a deep link meant to land further down the page —
    // jump straight past the horizontal carousel's last step so real page scroll unlocks
    // immediately, instead of requiring the user to manually wheel through it again.
    useEffect(() => {
        if (showContent && skipIntro && jumpPastHero) {
            setScrollStep(3);
        }
    }, [showContent, skipIntro, jumpPastHero]);

    // Lock Body Scroll when in Horizontal Mode
    useEffect(() => {
        if (!showContent) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = "auto"; };
        }

        if (isMobile) {
            document.body.style.overflow = "auto";
            return;
        }

        if (scrollStep < 3) {
             document.body.style.overflow = "hidden";
             return () => { document.body.style.overflow = "auto"; };
        }

        // Reaching the final step: keep scroll locked briefly so any leftover trackpad
        // momentum from the gesture that just landed us on the contact form doesn't
        // immediately carry straight through into the next section below.
        document.body.style.overflow = "hidden";
        const releaseTimer = setTimeout(() => {
            document.body.style.overflow = "auto";
        }, 700);

        return () => {
            clearTimeout(releaseTimer);
            document.body.style.overflow = "auto";
        };
    }, [showContent, scrollStep, isMobile]);


    // Scroll Event Listener
    useEffect(() => {
        if (!showContent || isMobile) return;

        const handleWheel = (e: WheelEvent) => {
            if (scrollStep >= 3) return;

            const now = Date.now();

            // A fresh gesture (>200ms gap since the last wheel event) resets everything,
            // including the lock — trackpad momentum fires with no gaps, so this only
            // clears once the user has actually lifted their fingers and paused.
            if (now - lastEventTime.current > 200) {
                scrollDeltaAccumulator.current = 0;
                gestureLocked.current = false;
            }
            lastEventTime.current = now;

            // Already stepped once during this gesture — ignore the rest of its momentum
            // tail so one trackpad swipe can't cascade through multiple sections.
            if (gestureLocked.current) return;

            scrollDeltaAccumulator.current += e.deltaY;

            // Throttle: min 900ms between steps to prevent accidental double-steps
            if (now - lastStepTime.current < 900) return;

            if (scrollDeltaAccumulator.current > 120) {
                setScrollStep(prev => Math.min(prev + 1, 3));
                scrollDeltaAccumulator.current = 0;
                lastStepTime.current = now;
                gestureLocked.current = true;
            } else if (scrollDeltaAccumulator.current < -120) {
                setScrollStep(prev => Math.max(prev - 1, 0));
                scrollDeltaAccumulator.current = 0;
                lastStepTime.current = now;
                gestureLocked.current = true;
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

    // Once scrollStep reaches 3, normal document scrolling takes over — track whether
    // the user has scrolled past the hero sequence so the "previous" button (meant only
    // for the embedded contact panel at the top) doesn't stay pinned over the rest of the page.
    const [scrolledPastHero, setScrolledPastHero] = useState(false);
    useEffect(() => {
        if (!(showContent && scrollStep === 3)) {
            setScrolledPastHero(false);
            return;
        }
        const onScroll = () => setScrolledPastHero(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [showContent, scrollStep]);

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

    // Simplified container animation for the mobile intro overlay — mobile has no
    // horizontal-scroll destination to shift toward, so layoutShift/logoExiting just
    // collapse into the same "fill the screen" terminal state as fullScreen.
    const getMobileIntroContainerAnimate = () => {
        const easeOut: [number, number, number, number] = [0.76, 0, 0.24, 1];
        if (fullScreen || layoutShift || logoExiting) {
            return {
                height: "100dvh", width: "100vw", left: "50%", top: "50%", x: "-50%", y: "-50%",
                transition: { duration: 1, ease: easeOut }
            };
        }
        if (containerExpanded) {
            return {
                height: isTablet ? 260 : 200, width: "100%", left: "50%", top: "50%", x: "-50%", y: "-50%",
                transition: { duration: 0.6, ease: easeOut }
            };
        }
        return { height: 0, width: "100%", left: "50%", top: "50%", x: "-50%", y: "-50%" };
    };

    // Clamp so the 600px-wide logo mark fits ~78% of the viewport width.
    const logoScale = Math.min(0.85, Math.max(0.4, (viewWidth * 0.78) / 600));

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

                {/* ── XG Labs logo-formation intro (mobile-scaled version of the desktop intro) ── */}
                <AnimatePresence>
                    {!showContent && (
                        <motion.div
                            key="mobile-intro"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ position: "fixed", inset: 0, zIndex: 500, background: "#060606", overflow: "hidden" }}
                        >
                            <motion.div
                                initial={{ height: 0, width: "100%", left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                                animate={getMobileIntroContainerAnimate()}
                                className="absolute bg-[#f7f8fa]"
                                style={{ overflow: "hidden" }}
                            >
                                <LogoGroup animateState={getLogoState()} scale={logoScale} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Slide-in sidebar menu — sits behind the fixed navbar (which stays visible, hamburger morphed to X) ── */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ position: "fixed", inset: 0, zIndex: 150, background: "#ffffff", display: "flex", flexDirection: "column" }}
                        >
                            {/* Nav links */}
                            <nav style={{ display: "flex", flexDirection: "column", padding: "104px 24px 40px", flex: 1, overflowY: "auto" }}>
                                {NAV_ITEMS.map((item, i) => (
                                    <motion.button
                                        key={item}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => handleNavClick(item)}
                                        style={{ width: "100%", textAlign: "left", padding: "14px 0", border: "none", cursor: "pointer", fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "clamp(17px, 4.6vw, 21px)", textTransform: "uppercase", letterSpacing: "0.02em", color: "#414141", background: "none" }}
                                    >
                                        {item}
                                    </motion.button>
                                ))}

                                <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "clamp(30px, 8.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#9A9A9A", margin: "40px 0 0" }}>
                                    We Build Brands That Perform
                                </p>

                                <div style={{ marginTop: "auto", paddingTop: "32px" }}>
                                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "16px", letterSpacing: "0.03em", textTransform: "uppercase", color: "#414141", margin: "0 0 10px" }}>
                                        Connect With
                                    </p>
                                    <a href="tel:+916369974530" style={{ display: "block", fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: "#6E6E6E", textDecoration: "none" }}>
                                        +91 63699 74530
                                    </a>
                                    <a href="mailto:xglabs@thebrandopedia.in" style={{ display: "block", fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: "#6E6E6E", textDecoration: "none" }}>
                                        xglabs@thebrandopedia.in
                                    </a>
                                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: "#6E6E6E", margin: 0 }}>
                                        Chennai, Tamil Nadu, India
                                    </p>

                                    <motion.div
                                        initial="rest"
                                        whileHover="hover"
                                        whileTap="hover"
                                        animate="rest"
                                        style={{ position: "relative", height: 38, display: "inline-flex", marginTop: "18px", cursor: "pointer" }}
                                    >
                                        <button
                                            onClick={() => { setMobileMenuOpen(false); openContactForm(); }}
                                            style={{ height: 38, paddingTop: 6, paddingRight: 24, paddingBottom: 6, paddingLeft: 16, display: "inline-flex", alignItems: "center", background: "#ffffff", borderRadius: 38, border: "1px solid #9A9A9A", cursor: "pointer", boxSizing: "border-box", position: "relative", overflow: "hidden" }}
                                        >
                                            <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0, background: "#02A884", transformOrigin: "left center", zIndex: 1, pointerEvents: "none" }} />
                                            <motion.span aria-hidden variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }} style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", zIndex: 2, pointerEvents: "none" }} />
                                            <div style={{ position: "relative", zIndex: 3, overflow: "hidden", lineHeight: 1, fontSize: 13, height: "1em" }}>
                                                <motion.span variants={{ rest: { y: 0, transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: "-100%", transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }} style={{ display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 13, lineHeight: 1, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#414141" }}>
                                                    Let's Talk
                                                </motion.span>
                                                <motion.span aria-hidden variants={{ rest: { y: "100%", transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } }, hover: { y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }} style={{ position: "absolute", top: 0, left: 0, display: "block", fontFamily: "'Cal Sans', sans-serif", fontSize: 13, lineHeight: 1, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", color: "#ffffff" }}>
                                                    Let's Talk
                                                </motion.span>
                                            </div>
                                        </button>
                                        <motion.div variants={{ rest: { background: "#000000" }, hover: { background: "#02A884" } }} transition={{ duration: 0.18 }} style={{ position: "absolute", top: 1, right: -12, width: 32, height: 32, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                                            <motion.svg width={16} height={16} viewBox="0 0 24 24" style={{ display: "block" }} fill="none" variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }} transition={{ duration: 0.18 }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
                                            </motion.svg>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Fixed mobile/tablet navbar ── */}
                <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 40px)", maxWidth: isTablet ? 880 : 600, zIndex: 200, background: "#fff", borderRadius: 8, boxShadow: "0 0 15px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 12px 4px 6px", height: 52 }}>
                    <img alt="XG Labs" src={mobileLogo} style={{ height: 42, width: "auto", display: "block", cursor: "pointer" }} onClick={() => navigate("/", { state: { skipLoading: true } })} />
                    <div style={{ display: "flex", alignItems: "center", gap: isTablet ? 22 : 10 }}>
                        {/* Let's Talk button — tablet only */}
                        {isTablet && (
                            <motion.button
                                aria-label="Let's talk"
                                onClick={() => openContactForm()}
                                onHoverStart={() => setTalkHovered(true)}
                                onHoverEnd={() => setTalkHovered(false)}
                                style={{ height: 36, display: 'inline-flex', alignItems: 'center', background: '#ffffff', borderRadius: 36, border: '1px solid #9A9A9A', cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                            >
                                <motion.span
                                    animate={{ backgroundColor: talkHovered ? '#0a0a0a' : 'transparent', color: talkHovered ? '#ffffff' : '#414141' }}
                                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0 14px', fontFamily: "'Cal Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
                                >
                                    Let's Talk
                                </motion.span>
                                <motion.span
                                    animate={{ backgroundColor: talkHovered ? '#02A884' : '#000000', x: talkHovered ? 3 : 0 }}
                                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <motion.path animate={{ stroke: talkHovered ? '#000000' : '#ffffff' }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} d="M5 12h14" />
                                        <motion.path animate={{ stroke: talkHovered ? '#000000' : '#ffffff' }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} d="M13 5l7 7-7 7" />
                                    </svg>
                                </motion.span>
                            </motion.button>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            style={{ width: 36, height: 36, borderRadius: mobileMenuOpen ? "10px" : "50%", background: "#0a0a0a", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, flexShrink: 0 }}
                        >
                            {mobileMenuOpen ? (
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <>
                                    <span style={{ display: "block", width: 16, height: 2, borderRadius: 99, background: "#fff" }} />
                                    <span style={{ display: "block", width: 11, height: 2, borderRadius: 99, background: "#fff" }} />
                                    <span style={{ display: "block", width: 16, height: 2, borderRadius: 99, background: "#fff" }} />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Hero */}
                <div style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    paddingTop: "90px",
                    overflow: "hidden",
                    background: "#f7f8fa",
                }}>
                    {/* Background grid lines */}
                    <FinalGrid />

                    {/* Circle — sits behind the text block */}
                    <div style={{
                        position: "absolute",
                        left: "50%", top: isTablet ? "235px" : "195px",
                        transform: "translate(-50%, -50%)",
                        width: isTablet ? "min(80vw, 640px)" : "min(90vw, 440px)",
                        height: isTablet ? "min(80vw, 640px)" : "min(90vw, 440px)",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}>
                        <motion.div
                            initial={{ scale: 0.45, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#ffffff" }}
                        />
                    </div>

                    {/* Text block */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "0 20px 52px", width: "100%", boxSizing: "border-box" }}
                    >
                        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "13px", letterSpacing: "0.04em", color: "#414141", margin: 0, textTransform: "uppercase" }}>
                            STRATEGY FIRST
                        </p>
                        <h1 style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: "clamp(22px, 6.5vw, 30px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#060606", margin: 0, textTransform: "uppercase", width: "100%", textAlign: "center", maxWidth: "320px" }}>
                            <span style={{ display: "block" }}>From Vision</span>
                            <span style={{ display: "block" }}>To Velocity</span>
                        </h1>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 3.8vw, 17px)", lineHeight: "1.5", letterSpacing: "-0.01em", color: "#414141", margin: "4px 0 0", maxWidth: "300px" }}>
                            We align strategy, creative, and execution to drive measurable growth.
                        </p>
                    </motion.div>

                    {/* Portfolio images — 3 rows, uniform height per row, varying widths */}
                    <div style={{ width: "100%", zIndex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                        {/* Row 1: 3 equal-width images — drifts horizontally, mirroring desktop's vertical column drift */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                            style={{ height: "120px", overflow: "hidden", position: "relative" }}
                        >
                            {/* Deferred until the loading screen finishes — decoding these images
                                immediately competes with the loading screen's own paint on first load. */}
                            {startSequence && (
                            <motion.div style={{ display: "flex", gap: "4px", height: "100%", width: "112%", position: "absolute", left: "-6%", x: rowDriftX1 }}>
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <img src={mImg_billboard} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <img src={mImg_disc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <img src={mImg_extra1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                            </motion.div>
                            )}
                        </motion.div>
                        {/* Row 2: 2 images — narrower left, wider right */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            style={{ height: "120px", overflow: "hidden", position: "relative" }}
                        >
                            {startSequence && (
                            <motion.div style={{ display: "flex", gap: "4px", height: "100%", width: "112%", position: "absolute", left: "-6%", x: rowDriftX2 }}>
                                <div style={{ flex: 4, overflow: "hidden" }}>
                                    <img src={mImg_maha} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                                <div style={{ flex: 6, overflow: "hidden" }}>
                                    <img src={mImg_extra3} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                            </motion.div>
                            )}
                        </motion.div>
                        {/* Row 3: 3 images — thin strip left, medium middle, wider right */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            style={{ height: "120px", overflow: "hidden", position: "relative" }}
                        >
                            {startSequence && (
                            <motion.div style={{ display: "flex", gap: "4px", height: "100%", width: "112%", position: "absolute", left: "-6%", x: rowDriftX3 }}>
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <img src={mImg_extra2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                                <div style={{ flex: 4, overflow: "hidden" }}>
                                    <img src={mImg_pamph} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                                <div style={{ flex: 5, overflow: "hidden" }}>
                                    <img src={mImg_cup} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                            </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* ── WE'RE XG LABS section ── */}
                <div ref={mobileFormPrevRef} style={{ position: "relative", background: "#f7f8fa", height: isTablet ? 755 : 790, overflow: "hidden" }}>
                    <FinalGrid />
                    {/* Circle — sized so text fits inside it */}
                    <div style={{
                        position: "absolute", left: "50%",
                        top: isTablet ? "340px" : "300px",
                        transform: "translate(-50%, -50%)",
                        width: isTablet ? "min(78vw, 600px)" : "min(88vw, 460px)",
                        height: isTablet ? "min(78vw, 600px)" : "min(88vw, 460px)",
                        pointerEvents: "none", zIndex: 0,
                    }}>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#ffffff" }}
                        />
                    </div>
                    {/* Text block — centered on the circle's center point */}
                    <div style={{
                        position: "absolute", left: "50%",
                        top: isTablet ? "340px" : "300px",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        width: isTablet ? "min(62vw, 480px)" : "min(68vw, 300px)",
                    }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onViewportEnter={() => setTimeout(() => setOrdinaryLanded(true), 500)}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: isTablet ? "14px" : "10px", textAlign: "center",
                        width: "100%",
                    }}>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isTablet ? "16px" : "13px", letterSpacing: "0.04em", color: "#414141", margin: 0, textTransform: "uppercase" }}>WE'RE XG LABS</p>
                        <p style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 400, fontSize: isTablet ? "clamp(30px, 4.2vw, 46px)" : "clamp(19px, 5vw, 26px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#414141", margin: 0, textTransform: "uppercase" }}>
                            A creative partner for brands who refuse to be{" "}
                            <span style={{ position: "relative", display: "inline-block", padding: "0 8px", margin: "0 2px" }}>
                                <span style={{ position: "relative", zIndex: 1, color: ordinaryLanded ? "#ffffff" : "#414141", transition: "color 0.15s ease" }}>ordinary.</span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                    style={{ position: "absolute", inset: 0, background: "#00A88D", transformOrigin: "left center", zIndex: 0 }}
                                />
                            </span>
                        </p>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: isTablet ? "15px" : "11px", lineHeight: 1.5, color: "#6e6e6e", margin: "2px 0 0" }}>
                            We turn ideas into visuals that move people — and move brands forward. Every piece we create is intentional, expressive, and designed to hit with purpose.
                        </p>
                    </motion.div>
                    </div>
                    {/* Cards — same collage on phone and tablet, just scaled up for the bigger circle. */}
                    {startSequence && <CardImages isVisible={true} scale={isTablet ? 1.82 : 1.4} top={isTablet ? 390 : 510} />}
                </div>

                {/* ── Contact form section (mobile/tablet) ── */}
                <div style={{ background: "#0e0e0e", display: "flex", flexDirection: "column", minHeight: "100svh", position: "relative", overflow: "hidden" }}>
                    <ContactFormContent
                        embedded
                        onClose={() => mobileFormPrevRef.current?.scrollIntoView({ behavior: "smooth" })}
                    />
                </div>

                <div ref={whatMakesUsRef}><WhatMakesUsDifferent /></div>
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
                                onFieldInteract={() => setScrollStep(3)}
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
                             animate={{ width: scrollStep === 3 ? "100vw" : "70vw", opacity: (scrollStep === 0 || scrollStep === 2) ? 1 : 0 }}
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

                    </>
                )}
            </div>

            {/* Previous button — outside sticky container to avoid fixed-inside-sticky pointer-events bug in WebKit */}
            {showContent && scrollStep === 3 && !scrolledPastHero && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handlePrevScroll}
                    className="fixed bottom-[40px] z-[500] pointer-events-auto cursor-pointer"
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

            {/* Spacer to drive the scroll transition */}
            <div className="h-[24px] w-full pointer-events-none" />

            {/* What Makes Us Different Section */}
            <WhatMakesUsDifferent />

            {/* Vertical Content (Footer) - Only visible when we scroll down after step 3 */}
            <VerticalContent />
        </div>
    );
}