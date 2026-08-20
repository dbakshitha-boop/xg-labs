import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { ContactFormContent } from "./ContactFormOverlay";

import img1 from "../assets/letsmakeithappenscroll/1st row.png";
import img2 from "../assets/letsmakeithappenscroll/2nd row.png";
import img3 from "../assets/letsmakeithappenscroll/3rd row 1st.png";
import img4 from "../assets/letsmakeithappenscroll/4th row.png";
import img5 from "../assets/letsmakeithappenscroll/5th.png";
import img6 from "../assets/letsmakeithappenscroll/6th row.png";
import img7 from "../assets/letsmakeithappenscroll/7th row.png";
import img8 from "../assets/letsmakeithappenscroll/8th.png";

// ─── GridLines ───────────────────────────────────────────────────────────────
function GridLines({ dark = false, cols = 4 }: { dark?: boolean; cols?: number }) {
  const color = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, display: "flex", pointerEvents: "none", zIndex: 0 }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: "100%", borderLeft: i === 0 ? "none" : `1px solid ${color}` }} />
      ))}
    </div>
  );
}

// ─── Columns ─────────────────────────────────────────────────────────────────
// 8 columns total, one image each. Each column's image travels the full
// height of the section — entering from below it and exiting above it, like
// a real bottom-to-top scroll — rather than nudging into a fixed resting
// spot. Which image lands in which column is shuffled once per page load.
type ColumnConfig = { src: string; start: number; end: number };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Each column has its own [start, end] window over the normalized 0..1
// progress range during which it travels bottom → top and off the top edge.
// The two timing groups are pinned to ALTERNATING columns (even: 0,2,4,6
// then odd: 1,3,5,7) — never two adjacent columns in the same group — so the
// first wave is visibly spread across the whole row, not clustered on one
// side. Within a group each window has a different width AND start, so
// those 4 images travel the same 155vh distance at different speeds and
// pass each other rather than moving in lockstep. Which image lands where,
// and which of the 4 window variants each column in a group gets, are both
// reshuffled every time.
const DESKTOP_EARLY_WINDOWS: Array<[number, number]> = [
  [0.03, 0.22], [0.06, 0.40], [0.12, 0.36], [0.02, 0.44],
];
const DESKTOP_LATE_WINDOWS: Array<[number, number]> = [
  [0.46, 0.66], [0.50, 0.84], [0.56, 0.80], [0.45, 0.87],
];

const MOBILE_EARLY_WINDOWS: Array<[number, number]> = [
  [0.03, 0.24], [0.10, 0.44],
];
const MOBILE_LATE_WINDOWS: Array<[number, number]> = [
  [0.47, 0.68], [0.44, 0.86],
];

function buildAlternatingColumns(
  images: string[],
  evenCols: number[],
  oddCols: number[],
  earlyWindows: Array<[number, number]>,
  lateWindows: Array<[number, number]>
): ColumnConfig[] {
  const shuffledImages = shuffle(images);
  const early = shuffle(earlyWindows);
  const late = shuffle(lateWindows);
  const slots: (ColumnConfig | undefined)[] = new Array(images.length);
  evenCols.forEach((col, i) => {
    slots[col] = { src: shuffledImages[col], start: early[i][0], end: early[i][1] };
  });
  oddCols.forEach((col, i) => {
    slots[col] = { src: shuffledImages[col], start: late[i][0], end: late[i][1] };
  });
  return slots as ColumnConfig[];
}

const DESKTOP_COLUMNS: ColumnConfig[] = buildAlternatingColumns(
  [img1, img2, img3, img4, img5, img6, img7, img8],
  [0, 2, 4, 6],
  [1, 3, 5, 7],
  DESKTOP_EARLY_WINDOWS,
  DESKTOP_LATE_WINDOWS
);

const MOBILE_COLUMNS: ColumnConfig[] = buildAlternatingColumns(
  [img1, img2, img3, img4],
  [0, 2],
  [1, 3],
  MOBILE_EARLY_WINDOWS,
  MOBILE_LATE_WINDOWS
);

const TALK_START = 0.78; // Let's Talk begins sliding up in the final stretch of progress — wider range, more gradual

// How much accumulated wheel/touch delta (px) it takes to travel the whole
// sequence from arrival to Let's Talk fully revealed. Lower = same scroll
// input covers more progress = the images travel faster.
const SCROLL_DISTANCE = 2700;
// Spring-smoothing on the raw accumulated delta — this is what makes the
// motion glide instead of snapping, however jerky the raw input is. Slightly
// stiffer/less damped than before so it also tracks the (now faster) input
// more snappily instead of trailing behind it.
const PROGRESS_SPRING = { stiffness: 130, damping: 26, mass: 0.6 };
// Touch deltas are raw finger-travel pixels, bounded by the screen itself —
// one full swipe on a ~800px-tall phone only covers ~800px, meaning the
// SCROLL_DISTANCE above takes 3+ full swipes to get through. Wheel deltas
// don't have that ceiling (a single trackpad flick or a few notches can
// already cover it), so this amplifies touch input specifically to bring the
// two into a comparable number of gestures, without changing desktop's pacing.
const TOUCH_SENSITIVITY = 1.8;

// ─── Column ────────────────────────────────────────────────────────────────────
function Column({
  config,
  progress,
  colIndex,
  totalCols,
  isMobile,
}: {
  config: ColumnConfig;
  progress: MotionValue<number>;
  colIndex: number;
  totalCols: number;
  isMobile: boolean;
}) {
  const { start, end } = config;
  // Bottom-of-viewport to above-the-top — vh units so the travel spans the
  // whole screen regardless of the image box's own (small, fixed) height, a
  // real journey through and out, not a nudge into a resting spot. The
  // section's mask-image (see below) fades it out softly right at the top
  // and bottom edges instead of a hard pop.
  const y = useTransform(progress, [start, end], ["105vh", "-50vh"]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `calc(${colIndex} * (100% / ${totalCols}) + 10px)`,
        width: `calc(100% / ${totalCols} - 20px)`,
        top: 0,
        // Mobile has half as many, much narrower columns (4 vs 8) — the same
        // 260px height there made each image look badly elongated (a ~77px-wide
        // column at that height is over 3x taller than wide).
        height: isMobile ? "150px" : "260px",
        zIndex: 5,
        pointerEvents: "none",
        y,
      }}
    >
      <img
        src={config.src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function LetsMakeItHappen() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Raw accumulated wheel/touch delta, clamped to [0, SCROLL_DISTANCE], smoothed
  // through a spring so the motion glides continuously with the input instead
  // of jumping between fixed states.
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, PROGRESS_SPRING);
  const progress = useTransform(smoothProgress, [0, SCROLL_DISTANCE], [0, 1]);
  const talkY = useTransform(progress, [TALK_START, 1], ["100%", "0%"]);

  const [talkRevealed, setTalkRevealed] = useState(false);
  useEffect(() => progress.on("change", (v) => setTalkRevealed(v >= 0.985)), [progress]);

  // The moment Let's Talk finishes revealing, open the contact form
  // automatically — no extra scroll tick needed. Scrolling back up out of
  // that revealed state closes the form again just as automatically (see the
  // release() effect below), so scrolling up from the fully-revealed end
  // state takes you back toward the previous section instead of leaving the
  // form stuck open with nothing responding.
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => {
    setFormOpen(talkRevealed);
  }, [talkRevealed]);

  // The overlay itself takes 1.7s to slide fully into view. Scroll input that
  // arrives before that finishes must not act on it yet — otherwise a user who's
  // still scrolling down at the moment the form opens (which is the normal case:
  // that's exactly the scroll that just triggered it) immediately satisfies the
  // "already at the end" release condition and the form starts sliding back out
  // again before it ever fully arrived. Only once this is true does scrolling up
  // or down do anything (reverse to the previous section, or release to the footer).
  const [formFullyRevealed, setFormFullyRevealed] = useState(false);
  useEffect(() => {
    if (formOpen) setFormFullyRevealed(false);
  }, [formOpen]);

  // The screen itself stays completely locked in place while this section is
  // engaged — every wheel tick or touch drag, up or down, is absorbed and
  // instead nudges rawProgress, which drives the images continuously via the
  // spring above. Once progress fully reaches SCROLL_DISTANCE (Let's Talk
  // revealed, form auto-opened), the next forward tick releases the lock so
  // the page can scroll normally. Scrolling fully back to 0 releases the
  // lock upward at any point.
  //
  // Engagement can't rely on catching the section at exactly rect.top === 0
  // inside a wheel event — a single scroll/trackpad tick can easily be much
  // bigger than a few px and jump straight past that instant, silently
  // never locking at all. Instead a real `scroll` listener checks the
  // POST-scroll position (after the browser already applied it) and, the
  // moment the section has reached or passed the top, snaps the page back
  // to line it up exactly and engages the lock from there.
  const lockedRef = useRef(false);
  // React-state mirror of lockedRef, purely to drive the body-scroll-lock effect below
  // (the ref itself is what every listener reads/writes synchronously — see its own note).
  const [locked, setLocked] = useState(false);
  const releaseCooldownUntilRef = useRef(0);
  // Blocks the page from scrolling at all while engaged, instead of only reactively
  // snapping it back after the fact (see onScroll's own correction further down). That
  // reactive-only approach is what every OTHER locked-scroll section in this codebase
  // avoids — letting the browser start a scroll and then yanking it back on the next
  // event is what produces visible stutter, especially under trackpad momentum, which
  // can keep nudging the position between corrections. This is the primary defense;
  // onScroll's own correction stays as a fallback for the same iOS Safari rubber-band
  // edge cases documented in the other locked sections.
  useEffect(() => {
    if (!locked) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [locked]);
  // Mirrors formFullyRevealed for the window-level listeners below, whose effect only
  // depends on [rawProgress] and so would otherwise close over a stale value of it.
  const formFullyRevealedRef = useRef(false);
  useEffect(() => { formFullyRevealedRef.current = formFullyRevealed; }, [formFullyRevealed]);
  // Mirrors formOpen for the same reason — the "wait for reveal" guard below must only
  // apply once the form has actually opened, not during the ordinary image-panning phase
  // that precedes it (where formFullyRevealed is also still false, but nothing should be
  // blocked yet).
  const formOpenRef = useRef(false);
  useEffect(() => { formOpenRef.current = formOpen; }, [formOpen]);

  // Releasing the lock. Backward (scrolling up past the start) just hands
  // control back to native scrolling — that already glides fine on its own.
  // Forward (scrolling down past the fully-revealed form) can't rely on the
  // next native wheel/touch event to carry the page down to the footer: the
  // overlay that's still on-screen during its 1.7s exit has its own
  // `overflowY: auto` content area, so a wheel tick right after release can
  // get absorbed scrolling the form's own content instead of the page.
  //
  // The page is jumped to the footer INSTANTLY rather than smooth-scrolled —
  // the overlay is a full-screen, solid, position:fixed panel for its entire
  // 1.7s exit, so the jump is completely invisible at the instant it happens.
  // A smooth window scroll here would instead run on its own (much shorter,
  // browser-controlled) timeline racing independently against the overlay's
  // slide-away, finishing early and leaving the footer visible alongside the
  // still-sliding form. Jumping first means the overlay's own slide-down is
  // the ONLY visible motion — a single, smooth reveal of the (already
  // correctly positioned) footer as it uncovers it.
  function releaseLock(forward: boolean) {
    lockedRef.current = false;
    setLocked(false);
    // setLocked(false) is async — the body-lock effect's cleanup (which resets
    // overflow back to "auto") won't actually run until React re-renders after
    // this function returns. window.scrollTo below needs it lifted right now,
    // synchronously, or the body is still overflow:hidden at that instant and
    // the scroll silently does nothing.
    document.body.style.overflow = "auto";
    releaseCooldownUntilRef.current = Date.now() + (forward ? 1200 : 500);
    if (forward) {
      const el = sectionRef.current;
      if (el) {
        const target = window.scrollY + el.getBoundingClientRect().height;
        window.scrollTo(0, target);
      }
    }
    setFormOpen(false);
  }
  useEffect(() => {
    function tryEngage() {
      if (lockedRef.current || Date.now() < releaseCooldownUntilRef.current) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom > 0) {
        if (rect.top !== 0) window.scrollBy(0, rect.top);
        lockedRef.current = true;
        // Applied synchronously here, not just via setLocked below (which only takes
        // effect once React re-renders and runs the body-lock effect) — otherwise
        // there's a real gap, right at this instant, where the scroll position has
        // just been corrected but the page is still natively scrollable. Any
        // continued momentum in that gap nudges it off again, gets corrected again,
        // and that rapid back-and-forth is what reads as the section "shaking"
        // right as it's reached. setLocked still runs, both to keep the state
        // truthful for anything else reading it and so the effect's cleanup
        // correctly resets this on release.
        document.body.style.overflow = "hidden";
        setLocked(true);
      }
    }

    function onScroll() {
      if (!lockedRef.current) { tryEngage(); return; }
      // Already locked — keep the section pinned exactly at the top. A hard,
      // fast flick's momentum can keep nudging real scroll for a bit even
      // after preventDefault starts, so keep correcting any residual drift
      // every scroll event until it settles at 0.
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top !== 0) window.scrollBy(0, rect.top);
    }

    function onWheel(e: WheelEvent) {
      tryEngage();
      if (!lockedRef.current) return;
      // The contact form overlay intercepts wheel events itself once it's open (see its
      // own onWheel), so this branch is mostly a defensive backstop — but it mirrors the
      // same "ignore input until the 1.7s reveal finishes" rule for consistency.
      if (formOpenRef.current && !formFullyRevealedRef.current) { e.preventDefault(); return; }
      const current = rawProgress.get();
      if (e.deltaY > 0 && current >= SCROLL_DISTANCE) {
        // rawProgress (set directly from input deltas) reaches this cap before the
        // spring-smoothed progress that actually drives talkRevealed/formOpen has
        // caught up — releasing on raw alone would jump the page to the footer
        // before the form has even opened, so it reopens moments later already
        // sitting on top of it. Release must wait for the same "fully revealed"
        // signal as everything else, not just the raw input hitting its ceiling.
        if (!formFullyRevealedRef.current) { e.preventDefault(); return; }
        releaseLock(true);
        return;
      }
      if (e.deltaY < 0 && current <= 0) { releaseLock(false); return; } // fully back — release up
      e.preventDefault();
      rawProgress.set(Math.min(Math.max(current + e.deltaY, 0), SCROLL_DISTANCE));
    }

    let lastTouchY: number | null = null;
    function onTouchStart(e: TouchEvent) {
      lastTouchY = e.touches[0]?.clientY ?? null;
    }
    function onTouchMove(e: TouchEvent) {
      if (lastTouchY == null) return;
      tryEngage();
      const currentY = e.touches[0]?.clientY ?? lastTouchY;
      // finger up → dy > 0 → same sense as wheel deltaY > 0; amplified by TOUCH_SENSITIVITY
      // so a swipe covers more progress than its raw travel distance would alone.
      const dy = (lastTouchY - currentY) * TOUCH_SENSITIVITY;
      lastTouchY = currentY; // tracked unconditionally (raw position, not the scaled delta),
      // even while ignored below, so the delta doesn't jump once processing resumes
      if (!lockedRef.current) return;
      // Touch events aren't intercepted by the overlay the way wheel events are, so this
      // is the actual, load-bearing guard on mobile: without it, continuing to swipe
      // down (the same swipe that just triggered the form to open) immediately releases
      // and starts closing it again before the 1.7s reveal ever finishes.
      if (formOpenRef.current && !formFullyRevealedRef.current) { e.preventDefault(); return; }
      const current = rawProgress.get();
      if (dy > 0 && current >= SCROLL_DISTANCE) {
        // Same race as the wheel handler above — rawProgress caps out before the
        // spring-smoothed progress driving the reveal has caught up.
        if (!formFullyRevealedRef.current) { e.preventDefault(); return; }
        releaseLock(true);
        return;
      }
      if (dy < 0 && current <= 0) { releaseLock(false); return; }
      e.preventDefault();
      rawProgress.set(Math.min(Math.max(current + dy, 0), SCROLL_DISTANCE));
    }
    function onTouchEnd() {
      lastTouchY = null;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [rawProgress]);

  const columns = isMobile ? MOBILE_COLUMNS : DESKTOP_COLUMNS;
  const totalCols = columns.length;

  return (
    <div style={{ position: "relative" }}>

      {/* ── Locked section — images move continuously with the wheel/trackpad, the screen doesn't ── */}
      <div
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Image collage — stays visible underneath the Let's Talk bar ── */}
        <section
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "#ECEEF2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // Soft fade at the very top/bottom edges instead of a hard clip
            // as each image travels through and off the section.
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <GridLines cols={totalCols} />

          {columns.map((config, colIndex) => (
            <Column
              key={colIndex}
              config={config}
              progress={progress}
              colIndex={colIndex}
              totalCols={totalCols}
              isMobile={isMobile}
            />
          ))}

          {/* Headline — z-index keeps it above the images */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
              pointerEvents: "none",
              padding: "0 40px",
            }}
          >
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? "20px" : "32px",
                lineHeight: "120%",
                letterSpacing: "-0.02em",
                textAlign: "center",
                textTransform: "uppercase",
                color: "#000000",
                margin: 0,
              }}
            >
              Get Started
            </p>

            <h2
              style={{
                fontFamily: "'Cal Sans', sans-serif",
                fontWeight: 400,
                fontSize: isMobile ? "44px" : "92px",
                lineHeight: "120%",
                letterSpacing: "-0.02em",
                textAlign: "center",
                color: "#414141",
                margin: 0,
                textShadow: isMobile
                  ? "0 0 16px #ECEEF2, 0 0 16px #ECEEF2, 0 0 16px #ECEEF2"
                  : undefined,
              }}
            >
              {"Let's make"}
              <br />
              {"things happen."}
            </h2>
          </div>
        </section>

        {/* ── Let's Talk — docks in as a bar sliding up from the bottom, continuously ── */}
        {/* ── tied to the same progress value as the images, image collage stays visible above it ── */}
        <motion.div
          onClick={() => talkRevealed && setFormOpen(true)}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#0e0e0e",
            padding: isMobile ? "32px 24px" : "44px 72px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: isMobile ? "center" : "space-between",
            gap: isMobile ? "24px" : 0,
            cursor: "pointer",
            overflow: "hidden",
            pointerEvents: talkRevealed ? "auto" : "none",
            y: talkY,
          }}
        >
          <h2
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 72px)",
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            {"Let's Talk"}
          </h2>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "32px" }}>
            {!isMobile && (
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 16px)", color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: "340px", lineHeight: "1.55" }}>
                {"We'd love to understand what you're building."}
              </p>
            )}
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Contact form overlay — uses shared ContactFormContent ── */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setFormFullyRevealed(true)}
            // While still locked, stops wheel events from bubbling to window — otherwise
            // the home page's hero carousel (which listens on window regardless of
            // scroll position) still reacts to them underneath this fixed overlay. That
            // means this can't just let events through to the lock effect's own window
            // listener above to reverse progress — it has to replicate that same
            // decrement/release logic itself, directly, so scrolling up from here closes
            // the form and reverses the images back toward the previous section, and
            // scrolling down releases forward the same way it would anywhere else in the
            // sequence. Once actually released, this stops intercepting entirely and lets
            // events bubble normally — AnimatePresence keeps this overlay mounted (and
            // this handler attached) for its whole 1.7s exit slide-away, and continuing
            // to swallow every event for that entire stretch would make real scrolling
            // (and the footer coming into view) feel stuck for nearly two seconds after
            // release, rather than resuming immediately on the very next tick.
            //
            // Everything above only applies once formFullyRevealed — until the 1.7s
            // slide-in finishes, scroll input is fully absorbed and ignored. Without that,
            // continuing to scroll down (the same scroll that just triggered the form to
            // open) would immediately hit the "already at the end" release branch and
            // start closing it again before it ever fully arrived.
            onWheel={(e) => {
              if (!lockedRef.current) return;
              e.stopPropagation();
              e.preventDefault();
              if (!formFullyRevealed) return;
              const current = rawProgress.get();
              if (e.deltaY > 0 && current >= SCROLL_DISTANCE) { releaseLock(true); return; }
              if (e.deltaY < 0 && current <= 0) { releaseLock(false); return; }
              rawProgress.set(Math.min(Math.max(current + e.deltaY, 0), SCROLL_DISTANCE));
            }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 300, background: "#0e0e0e",
              overflowY: "auto", overflowX: "hidden",
              display: "flex", flexDirection: "column",
            }}
          >
            <ContactFormContent onClose={() => setFormOpen(false)} hideClose />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
