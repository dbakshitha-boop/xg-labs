import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-0jzj7gw8ha";
import imgAndhraSH from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgGoWheels from "../../assets/3_gowheels.png";
import imgBrandopedia from "../../assets/2_brandopedia.png";
import imgKalki from "../../assets/4_kalki.png";

const CONTENT_DATA = [
  {
    id: "01",
    title: "Strategic Creativity",
    description: [
      "Ideas shaped by insight",
      "and built with purpose -",
      "never random, always intentional."
    ]
  },
  {
    id: "02",
    title: "Modern, Minimal Execution",
    description: [
      "Design and content crafted",
      "to cut through noise with",
      "clarity, simplicity, and impact."
    ]
  },
  {
    id: "03",
    title: "Fast, Focused Delivery",
    description: [
      "We work with speed and",
      "precision, without sacrificing",
      "thinking or quality."
    ]
  },
  {
    id: "04",
    title: "Growth-Driven Storytelling",
    description: [
      "Narratives and visuals",
      "engineered to attract attention,",
      "deepen engagement, and",
      "drive meaningful growth."
    ]
  }
];

const TOTAL_RECTS = 19 * 22;

// Grid of rectangles that fills based on progress
function RectangleGrid({ progress }: { progress: number }) {
  const cols = 19;
  const rows = 22;

  // Deterministic random order for filling
  const randomIndices = useMemo(() => {
    const indices = Array.from({ length: TOTAL_RECTS }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor((i * 12345 + 6789) % (i + 1)); 
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  const numFilled = Math.floor(progress * TOTAL_RECTS);
  const filledSet = useMemo(() => {
    return new Set(randomIndices.slice(0, numFilled));
  }, [numFilled, randomIndices]);

  return (
    <div className="absolute inset-0 grid grid-cols-19 grid-rows-22">
      {Array.from({ length: TOTAL_RECTS }).map((_, i) => {
        const isFilled = filledSet.has(i);
        return (
          <div
            key={i}
            className="border border-[rgba(0,0,0,0.05)] border-solid transition-colors duration-200 h-full w-full"
            style={{
              backgroundColor: isFilled ? '#d4deff' : 'transparent'
            }}
          />
        );
      })}
    </div>
  );
}

const IMAGES = [imgBrandopedia, imgGoWheels, imgKalki, imgAndhraSH];

// Restored specific rotations to hint at the stack depth
// Image 1: 343.7 deg (-16.3 deg)
// Image 2: 353.3 deg (-6.7 deg)
// Image 3: 350.9 deg (-9.1 deg)
// Image 4: 14.9 deg (+14.9 deg)
const CARD_ROTATIONS = [343.719, 353.296, 350.884, 14.924];

// Standardized dimensions for all cards
const CARD_WIDTH = 266;
const CARD_HEIGHT = 287;

// All positions are identical (centered), only zIndex differs to stack them.
const POSITIONS = [
  { zIndex: 40 }, // Front (Image 1)
  { zIndex: 30 }, // 2nd (Image 2)
  { zIndex: 20 }, // 3rd (Image 3)
  { zIndex: 10 }, // 4th (Image 4)
];

function CardStack({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-0">
      {IMAGES.map((src, index) => {
        const stackIndex = index - activeIndex;
        let targetPos;
        let isFalling = false;
        let isVisible = true;

        if (stackIndex < 0) {
          isFalling = true;
          targetPos = POSITIONS[0];
        } else if (stackIndex < POSITIONS.length) {
          targetPos = POSITIONS[stackIndex];
        } else {
          targetPos = POSITIONS[POSITIONS.length - 1];
          isVisible = false;
        }

        const rotation = CARD_ROTATIONS[index];

        return (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2"
            initial={false}
            animate={{
              x: "-50%",
              y: isFalling ? "200%" : "-50%", // Fall out of view
              zIndex: isFalling ? 50 : targetPos.zIndex,
              opacity: isFalling ? 0 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="flex-none"
              animate={{ rotate: rotation }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div
                className="relative rounded-[12px] shadow-[0px_3.4px_8.5px_0px_rgba(0,0,0,0.1)]"
                style={{ width: "290px", height: "314px" }}
              >
                <img 
                  alt="" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" 
                  src={src} 
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function RoundForImage({ activeIndex, circleSize }: { activeIndex: number; circleSize: string }) {
  return (
    <div className="absolute bg-[#f7f8fa] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full" style={{ width: circleSize, height: circleSize }} data-name="Round for image">
        <CardStack activeIndex={activeIndex} />
    </div>
  );
}

function ImageContainer({ progress, activeIndex, circleSize }: { progress: number, activeIndex: number, circleSize: string }) {
  return (
    <div className="h-full w-full overflow-hidden relative" data-name="Image Container">
      <div className="bg-[#e9f0ff] relative size-full" data-name="Right side">
        <RectangleGrid progress={progress} />
        <RoundForImage activeIndex={activeIndex} circleSize={circleSize} />
      </div>
    </div>
  );
}

function HeaderTextContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Header Text Container">
      <p className="font-['Cal_Sans',sans-serif] leading-[1.2] tracking-[-0.02em] not-italic relative shrink-0 text-[#414141] uppercase whitespace-normal" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>What makes us Different</p>
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] lg:gap-[20px] items-start relative shrink-0 w-full" data-name="Header Container">
      <HeaderTextContainer />
      <p className="font-['Sora',sans-serif] font-normal leading-[1.4] relative text-[#5f5f5f] tracking-normal w-full max-w-none line-clamp-3 lg:line-clamp-none" style={{ fontSize: "clamp(14px, 1.8vw, 24px)" }}>
        We blend strategy, design, and storytelling into work that feels modern, intentional, and built to move brands forward. Every idea is crafted with clarity and purpose — no noise, no filler, just high-impact creative that works.
      </p>
    </div>
  );
}

function RevealText({ children, delay = 0, isActive }: { children: React.ReactNode, delay?: number, isActive: boolean }) {
  return (
    <div className="relative inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em] font-['Sora',sans-serif]">
      {/* Text fades in smoothly as curtain exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.32, delay: isActive ? delay + 0.32 : 0 }}
        className="leading-[1.15]"
      >
        {children}
      </motion.div>

      {/* Teal curtain wipe */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 bg-[#00A88D] z-10"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isActive ? {
          scaleX: [0, 1, 1, 0],
          originX: [0, 0, 1, 1]
        } : { scaleX: 0 }}
        transition={{
          duration: 0.75,
          delay: delay,
          times: [0, 0.45, 0.55, 1],
          ease: [0.76, 0, 0.24, 1]
        }}
      />
    </div>
  );
}

function SubheaderContainer({ title, id }: { title: string, id: string }) {
  return (
    <div className="content-stretch flex font-['Cal_Sans',sans-serif] font-normal gap-[12px] lg:gap-[24px] items-start leading-[1.2] tracking-[-0.02em] relative shrink-0 text-[#060606] uppercase w-full" style={{ fontSize: "clamp(19px, 1.6vw, 24px)" }} data-name="Subheader Container">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">{title}</p>
    </div>
  );
}

function ContentContainer({ description, title, id, isInView, isMobile }: { description: string[], title: string, id: string, isInView: boolean, isMobile: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Content Container">
      <SubheaderContainer title={title} id={id} />
      <div className="flex flex-col w-full">
        {isMobile ? (
          // Each array entry is a line break authored for desktop's much wider column —
          // rendering them as separate hard-broken lines here (mobile's narrower column,
          // larger relative font) produced oddly short lines with a lot of trailing empty
          // space (e.g. "and" alone on its own line). Joining into one paragraph lets it
          // wrap naturally at whatever width is actually available.
          <div className="relative font-['Cal Sans',sans-serif] leading-[1.15] tracking-normal text-[#5f5f5f] w-full whitespace-normal" style={{ fontSize: "clamp(30px, 3.2vw, 36px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
            <RevealText isActive={isInView}>
              {description.join(" ")}
            </RevealText>
          </div>
        ) : (
          description.map((line, idx) => (
             <div key={idx} className="relative font-['Cal Sans',sans-serif] leading-[1.15] tracking-normal text-[#5f5f5f] w-full whitespace-normal" style={{ fontSize: "clamp(32px, 3.6vw, 46px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                <RevealText delay={idx * 0.1} isActive={isInView}>
                  {line}
                </RevealText>
             </div>
          ))
        )}
      </div>
    </div>
  );
}

function RealContent({ activeIndex, isInView, revealGen, isMobile, compactSpacing }: { activeIndex: number; isInView: boolean; revealGen: number; isMobile: boolean; compactSpacing: boolean }) {
  const content = CONTENT_DATA[activeIndex] || CONTENT_DATA[CONTENT_DATA.length - 1];

  return (
    <div className={`content-stretch flex flex-col ${compactSpacing ? "gap-[28px]" : "gap-[60px]"} items-start relative shrink-0 w-full`} data-name="Real content">
      <motion.div
        key={`${content.id}-${isInView}-${revealGen}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <ContentContainer
            title={content.title}
            description={content.description}
            id={content.id}
            isInView={isInView}
            isMobile={isMobile}
        />
      </motion.div>
    </div>
  );
}

function TextContainer({ activeIndex, isInView, revealGen, isMobile, compactSpacing }: { activeIndex: number; isInView: boolean; revealGen: number; isMobile: boolean; compactSpacing: boolean }) {
  return (
    <div className="content-stretch flex flex-col relative shrink-0 w-full h-full" style={{ padding: "clamp(24px, 4vw, 64px)", paddingTop: isMobile ? "clamp(32px, 4vw, 56px)" : compactSpacing ? "clamp(24px, 4vw, 56px)" : "clamp(56px, 8vw, 110px)", justifyContent: "flex-start", gap: compactSpacing ? "clamp(24px, 4vw, 48px)" : "clamp(40px, 9vw, 150px)" }} data-name="Text Container">
      <HeaderContainer />
      <div>
        <RealContent activeIndex={activeIndex} isInView={isInView} revealGen={revealGen} isMobile={isMobile} compactSpacing={compactSpacing} />
      </div>
    </div>
  );
}

export function WhatMakesUsDifferent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  // Tablet / "minimised browser window" band — same single-column layout as phone
  // (isMobile covers both), but phone's spacing was tuned for a narrow viewport;
  // at this wider-but-still-sub-1024 width the same clamp()s grow enough (they're
  // vw-based) to push the description past the fixed-height text panel's bottom
  // edge, which clips it since that panel is overflow-hidden. Only this band's
  // spacing is dialed back — phone and desktop (>=1024) are untouched.
  const [isTablet, setIsTablet] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 640 && window.innerWidth < 1024 : false);
  // A shrunken (non-maximized) desktop browser window keeps the wide, two-column
  // (>=1024px) layout — isTablet never fires — but this section's height still
  // just fills whatever's available (h-screen/100%), and the desktop column's
  // padding/gap were sized assuming a full-height window. Below a short-window
  // threshold there just isn't enough room for them plus the description, so it
  // clips against the panel's overflow-hidden edge. Compact spacing kicks in
  // here too, independent of width, without touching genuine full-height desktop.
  const [isShort, setIsShort] = useState(() => typeof window !== "undefined" ? window.innerHeight < 760 : false);
  const compactSpacing = isTablet || (!isMobile && isShort);

  const [activeIndex, setActiveIndex] = useState(0);
  const [subProgress, setSubProgress] = useState(0);
  const [engaged, setEngaged] = useState(false);
  // Tells TopBar (see its own listener, and LetsMakeItHappen's matching dispatch)
  // to suppress its scroll-direction-based show/hide while this section is
  // engaged. Without this, engaging pins document.body to position:fixed (see
  // the scroll-lock effect below), which makes window.scrollY read as ~0 for as
  // long as that's applied — TopBar's own "near the very top" check then reads
  // that as reason enough to show itself, even though the user scrolled well
  // past the top to get here.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("xg-section-lock", { detail: { locked: engaged } }));
  }, [engaged]);
  // Bumped every time the section (re-)engages, from either edge. Forces the active card's
  // title/description to remount and replay its reveal animation right at that moment,
  // rather than relying on viewport-crossing timing alone — which can toggle true a little
  // before the lock actually engages, so the reveal plays out during the last bit of
  // ordinary scrolling and looks like it never happened by the time you land.
  const [revealGen, setRevealGen] = useState(0);

  // Mirrors `engaged`, but assigned synchronously at every call site below instead of via
  // a syncing effect — engaging snaps the scroll position with window.scrollTo, which
  // fires its own native "scroll" event *before* the `engaged` state update has actually
  // committed. An effect-synced ref would still read stale (false) when that self-triggered
  // event reaches the listener below, letting it slip past the "already engaged" guard and
  // get misread as a fresh crossing — e.g. jumping straight to the last card right after
  // correctly landing on the first one. Setting this inline keeps it truthful immediately.
  const engagedRef = useRef(false);

  // Drives the reveal text's visibility — separate from `engaged` itself. Releasing the
  // lock at a boundary (trying to move past the first/last card) sets `engaged` false the
  // instant it happens, but the section is still visibly on screen for a moment after that
  // as the user's continued scroll actually carries it away. Tying the reveal directly to
  // `engaged` blanked the text out right at that instant, well before the card had actually
  // left the viewport. This stays true through that whole transition, only clearing once
  // the section has genuinely scrolled out of view.
  const [revealVisible, setRevealVisible] = useState(false);
  useEffect(() => {
    if (engaged) { setRevealVisible(true); return; }
    const el = containerRef.current;
    if (!el) { setRevealVisible(false); return; }
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (!(rect.bottom > 0 && rect.top < window.innerHeight)) {
        setRevealVisible(false);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [engaged]);
  // A second, independent path to the same state — deliberately decoupled from `engaged`
  // and its stricter, alignment-sensitive triggers (the crossing-detection above, and the
  // near-100%-visible IntersectionObserver further down) entirely. Those exist to gate
  // *card-stepping* — locking one card at a time needs a precise, deliberate trigger — but
  // the text going blank is a much simpler, more common case: the section resting at some
  // ordinary, imperfect scroll position (not fully aligned top-to-bottom) that never
  // satisfies either of those, where there's no good reason for the text to stay hidden.
  // Simple visibility should always be enough on its own, independent of whether stepping
  // ever locks in.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.intersectionRatio >= 0.4) setRevealVisible(true);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lastStepTime = useRef(0);     // when the last step fired (cooldown between steps)
  const lastEventTime = useRef(0);    // when the last wheel event arrived (for gesture reset)
  const scrollDeltaAccumulator = useRef(0);
  const prevRectRef = useRef<{ top: number; bottom: number } | null>(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 1024);
      setIsTablet(w >= 640 && w < 1024);
      setIsShort(window.innerHeight < 760);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Capture real scroll the instant this section's top edge (scrolling down) or
  // bottom edge (scrolling up, re-entering from the section below) crosses the viewport —
  // then the wheel handler further down steps through cards one at a time, instead of
  // however many a fast native scroll's momentum would otherwise blow past. Detected as a
  // crossing (previous sample outside, current sample inside) rather than a level check,
  // so it still fires correctly even when a single fast scroll jumps a long way in one go.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (engagedRef.current) {
        prevRectRef.current = null;
        return;
      }

      const prev = prevRectRef.current;
      prevRectRef.current = { top: rect.top, bottom: rect.bottom };
      if (!prev) return;

      if (prev.top > 0 && rect.top <= 0 && rect.bottom > 0) {
        engagedRef.current = true;
        setActiveIndex(0);
        setSubProgress(0);
        setEngaged(true);
        setRevealGen(g => g + 1);
        // Snap exactly to the crossing point — corrects for any overshoot from the fast
        // scroll that triggered entry, so the lock engages cleanly instead of mid-jump.
        window.scrollTo({ top: window.scrollY + rect.top, behavior: "auto" });
      } else if (prev.bottom < window.innerHeight && rect.bottom >= window.innerHeight && rect.top < window.innerHeight) {
        engagedRef.current = true;
        setActiveIndex(CONTENT_DATA.length - 1);
        setSubProgress(0);
        setEngaged(true);
        setRevealGen(g => g + 1);
        window.scrollTo({ top: window.scrollY + (rect.bottom - window.innerHeight), behavior: "auto" });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount in case the page already scrolled here
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Backstop for the crossing-detection above — it needs two consecutive scroll samples
  // to recognize a crossing (previous outside, current inside), so there's no way for it
  // to catch the section already filling the viewport with nothing to compare against:
  // right after mount, or scrolling back to a position it happens to settle at without
  // any further scroll event ever firing. That left engaged/revealVisible stuck false —
  // and with them the title+description, which are opacity-gated on revealVisible — even
  // though the section was sitting fully on screen. This fires independently of scroll
  // events entirely, off of the section's actual on-screen presence, and doesn't care how
  // it got there. Deliberately doesn't touch activeIndex — whatever it's currently at
  // (freshly mounted at 0, or wherever an earlier session left it) is exactly what should
  // resume, not be reset.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || engagedRef.current) return;
        if (entry.intersectionRatio >= 0.98) {
          engagedRef.current = true;
          setSubProgress(0);
          setEngaged(true);
          setRevealGen(g => g + 1);
          // Unlike the crossing-detection above, arriving here doesn't imply any
          // particular alignment — 98%+ visible still leaves room for a several-px
          // gap at the top or bottom, which is what "not locked in the right place"
          // was: the section engaging (locking further scroll) exactly wherever it
          // happened to be sitting, gap and all, instead of snapped flush like a
          // normal crossing-triggered engage. Same correction as that does, since
          // the container is a fixed 100vh — closing rect.top to 0 also closes
          // rect.bottom to window.innerHeight in the same move.
          const rect = el.getBoundingClientRect();
          if (rect.top !== 0) window.scrollTo({ top: window.scrollY + rect.top, behavior: "auto" });
        }
      },
      { threshold: [0.98] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lock real page scroll while stepping through cards by hand. position:fixed, not
  // just overflow:hidden — on mobile Safari/Chrome, overflow:hidden alone doesn't
  // reliably stop a scroll gesture already in momentum from continuing to carry the
  // page regardless, which was the "sometimes it just scrolls straight through
  // without locking" issue: the crossing-detection (and its IntersectionObserver
  // backstop) really were engaging, but a fast fling's momentum kept overpowering
  // the plain overflow:hidden that was supposed to hold it. Scroll position doesn't
  // actually change for the whole engaged session either way (both approaches just
  // freeze wherever it already was) — this only changes how forcefully that's held.
  const scrollLockYRef = useRef(0);
  useEffect(() => {
    if (!engaged) return;
    scrollLockYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "auto";
      window.scrollTo(0, scrollLockYRef.current);
    };
  }, [engaged]);

  // One wheel/swipe gesture = one card. Same throttle/gesture-lock pattern as the hero's
  // horizontal carousel: accumulate delta, require a pause between gestures (so one
  // trackpad flick or swipe can't cascade through several cards), and ignore the rest of
  // a gesture's momentum tail once a step has already fired for it. Touch doesn't fire
  // wheel events, so touchstart/touchmove/touchend drive the same accumulator on mobile.
  useEffect(() => {
    if (!engaged) return;

    function stepForward() {
      scrollDeltaAccumulator.current = 0;
      lastStepTime.current = Date.now();
      setActiveIndex(prev => {
        if (prev >= CONTENT_DATA.length - 1) {
          engagedRef.current = false;
          setEngaged(false);
          prevRectRef.current = null;
          return prev;
        }
        setSubProgress(0);
        return prev + 1;
      });
    }

    function stepBackward() {
      scrollDeltaAccumulator.current = 0;
      lastStepTime.current = Date.now();
      setActiveIndex(prev => {
        if (prev <= 0) {
          engagedRef.current = false;
          setEngaged(false);
          prevRectRef.current = null;
          return prev;
        }
        setSubProgress(0);
        return prev - 1;
      });
    }

    // Whether a step is actually allowed right now is purely time-based — a cooldown
    // since the last step, not "wait for the gesture to go quiet first". That quiet-gap
    // requirement was the bug: a mouse wheel notched at a normal pace, or someone
    // scrolling continuously, rarely leaves a 200ms silent gap, so it could stay
    // "locked" for several scroll actions in a row before finally resetting. A plain
    // cooldown still stops one continuous gesture from cascading through several cards,
    // without requiring the input to stop first.
    function tryStep(delta: number) {
      const now = Date.now();
      if (now - lastEventTime.current > 200) {
        scrollDeltaAccumulator.current = 0;
      }
      lastEventTime.current = now;
      scrollDeltaAccumulator.current += delta;

      if (now - lastStepTime.current < 1100) return;

      if (scrollDeltaAccumulator.current > 140) stepForward();
      else if (scrollDeltaAccumulator.current < -140) stepBackward();
    }

    const handleWheel = (e: WheelEvent) => tryStep(e.deltaY);
    window.addEventListener("wheel", handleWheel, { passive: true });

    let lastTouchY: number | null = null;
    function onTouchStart(e: TouchEvent) {
      lastTouchY = e.touches[0]?.clientY ?? null;
    }
    function onTouchMove(e: TouchEvent) {
      if (lastTouchY == null) return;
      const currentY = e.touches[0]?.clientY ?? lastTouchY;
      const dy = lastTouchY - currentY; // finger up → dy > 0 → same sense as wheel deltaY > 0
      lastTouchY = currentY;
      e.preventDefault(); // locked — absorb the drag instead of letting the page scroll
      tryStep(dy);
    }
    function onTouchEnd() {
      lastTouchY = null;
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [engaged]);

  // Animate the image grid's fill toward complete for whichever card is now active.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setSubProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      id="what-makes-us-different"
      className="relative"
      style={{ height: "100vh" }}
      data-name="Scroll Container"
    >
      <div className="h-screen overflow-hidden bg-white">
        <div className="content-stretch flex flex-col lg:flex-row items-stretch relative w-full h-full">
          {/* Image side */}
          <div
            className="w-full lg:w-1/2 relative overflow-hidden shrink-0"
            style={{ height: isMobile ? "36vh" : "100%" }}
          >
             <ImageContainer
               progress={subProgress}
               activeIndex={activeIndex}
               circleSize={isMobile ? "min(32vh, 68vw)" : "min(620px, 56vw)"}
             />
          </div>
          {/* Text side */}
          <div
            className="w-full lg:w-1/2 overflow-hidden flex flex-col shrink-0"
            style={{ height: isMobile ? "64vh" : "100%" }}
          >
            {/* Reveal is tied to `revealVisible` (derived from the lock, `engaged`), not a
                plain viewport-visibility check on its own — the latter turns true gradually
                while still approaching from below, *before* scroll actually re-locks into
                place, which would let the reveal fire (and finish) during ordinary pre-lock
                scrolling so it looked like nothing had happened by the time you actually
                landed. See revealVisible's own comment for why it isn't just `engaged`
                directly, though — releasing at a boundary needs the text to stay up a
                little longer than that. */}
            <TextContainer activeIndex={activeIndex} isInView={revealVisible} revealGen={revealGen} isMobile={isMobile} compactSpacing={compactSpacing} />
          </div>
        </div>
      </div>
      {/* Temporary dev-only debug readout — remove once the "last card blank on
          re-entry" issue is confirmed fixed. */}
      {import.meta.env.DEV && (
        <div
          style={{
            position: "fixed", bottom: 8, right: 8, zIndex: 9999,
            background: "rgba(0,0,0,0.85)", color: "#0f0",
            fontFamily: "monospace", fontSize: 11, lineHeight: 1.6,
            padding: "8px 10px", borderRadius: 6, pointerEvents: "none", whiteSpace: "pre",
          }}
        >
          {`activeIndex: ${activeIndex}
engaged: ${engaged}
revealVisible: ${revealVisible}
revealGen: ${revealGen}`}
        </div>
      )}
    </div>
  );
}