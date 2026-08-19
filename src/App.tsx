import { BrowserRouter, Routes, Route, useNavigationType, useNavigate } from "react-router-dom";
import { ServicesList } from "./components/ServicesList";
import { WhatMakesUsDifferent } from "./components/landing/WhatMakesUsDifferent";
import { SelectedWork } from "./components/SelectedWork";
import { NeedMoreProof } from "./components/NeedMoreProof";
import { RealResults } from "./components/RealResults";
import { TrustedBrands } from "./components/TrustedBrands";
import { LetsMakeItHappen } from "./components/LetsMakeItHappen";
import { BlogInsightsSection } from "./components/BlogInsightsSection";
import { Footer } from "./components/Footer";
import { CursorProvider } from "./components/ui/CustomCursor";
import { HeroSection } from "./components/landing/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { motion } from "motion/react";
import { PortfolioPage } from "./components/PortfolioPage";
import { BlogPage } from "./components/BlogPage";
import { BlogPostPage } from "./components/BlogPostPage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { ServicesPage } from "./components/ServicesPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfUse } from "./components/TermsOfUse";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ContactFormProvider } from "./components/ContactFormContext";

// True only for the actual document load that was a browser refresh (F5 / reload button) —
// not for client-side route changes, which never create a new navigation timing entry.
// This stays constant for the whole tab session, so it can't by itself tell a first mount
// apart from a later client-side remount of the same component.
const documentLoadWasReload =
  typeof window !== "undefined" &&
  typeof performance !== "undefined" &&
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "reload";

// HomePage can mount more than once per tab session (navigate away, then back via the
// logo) — this flag is consumed on its very first mount so only a genuine reload forces
// the full intro; later remounts fall back to the normal skipLoading/session logic.
let homeIntroPendingFromReload = documentLoadWasReload;

// This app owns scroll position on every navigation itself (the effect below, plus the
// reload-to-top case). Left on "auto", the browser's own native scroll restoration runs
// too — invisibly re-snapping to wherever you'd scrolled to, often *after* our own JS has
// already run, which is why forcing scroll-to-top on reload only reliably held near the
// top of the page: past a certain scroll depth the browser's restore would win the race.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Repeatedly (re-)applies a target scroll position until it actually holds. A single
// scrollTo isn't enough on pages whose height is still growing after mount (async images,
// lazy-mounted sections) — the page keeps drifting after that first call, and further down
// the page there's more of that async content still left to load before it settles.
function pinScroll(targetY: number) {
  let attempts = 0;
  let lastHeight = -1;
  const tryScroll = () => {
    attempts++;
    window.scrollTo(0, targetY);
    // Verify the scroll actually took (not just that there's room for it) — the home
    // page keeps the body non-scrollable for a moment while its hero sequence settles,
    // during which scrollTo silently no-ops.
    const reachedTarget = Math.abs(window.scrollY - targetY) < 4;
    const currentHeight = document.body.scrollHeight;
    const maxScroll = currentHeight - window.innerHeight;
    const reachedBottom = window.scrollY >= maxScroll - 4;
    // Only trust "reached bottom" as a genuine stop condition once the page's height has
    // stopped growing between two checks — async content can still be inflating document
    // height, and bailing out the moment we hit whatever the bottom happens to be *right
    // now* leaves us short of the real target.
    const heightStable = currentHeight === lastHeight;
    lastHeight = currentHeight;
    if (!reachedTarget && !(reachedBottom && heightStable) && attempts < 40) {
      setTimeout(tryScroll, 75);
    }
  };
  tryScroll();
}

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  // ScrollToTop lives outside <Routes> and never unmounts, but its effect re-runs on every
  // navigation for the rest of the tab session — so this must be consumed (cleared) the
  // first time it's actually used, or every later visit to "/" would also snap to the top.
  const isPostReloadLoadRef = useRef(documentLoadWasReload);

  // Continuously remember scroll position per path. Native browser scroll
  // restoration on back/forward is unreliable here because several pages
  // (Blog, Portfolio, Case Study...) fetch content after mount, so the page
  // isn't tall enough yet at the moment the browser tries to restore scroll.
  useEffect(() => {
    const key = `scrollY:${location.pathname}`;
    const onScroll = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    // These routes handle their own scroll target once the section mounts.
    if (location.state?.scrollToSection || location.state?.scrollToFooter) return;

    // /services is a fixed one-viewport deck with its own internal step state
    // (not a tall scrollable page), so a raw scrollY has no meaning to restore —
    // doing so on back/forward would land scroll past the (now short) deck,
    // stranding the user on whatever the page happened to render underneath.
    if (location.pathname === "/services") {
      window.scrollTo(0, 0);
      return;
    }

    // A genuine browser reload should always land at the top of whatever page you're on —
    // never resume a mid-page scroll position — so the reload boot sequence (percentage,
    // then the XG Labs logo) plays somewhere actually visible instead of off-screen above
    // a scroll position that only snaps back into view once it's already over. Pinned with
    // the same poll-until-stable loop as the POP restore below: async content (images,
    // lazy sections) still growing the document after this first call would otherwise let
    // the page drift back down before it settles.
    if (isPostReloadLoadRef.current) {
      isPostReloadLoadRef.current = false;
      pinScroll(0);
      return;
    }

    if (navigationType === "POP") {
      const saved = sessionStorage.getItem(`scrollY:${location.pathname}`);
      if (!saved) return;
      pinScroll(parseInt(saved, 10));
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.state, navigationType]);

  return null;
}

function HomePage() {
  const location = useLocation();
  const navigationType = useNavigationType();
  // A genuine browser reload should always replay the full intro, regardless of
  // sessionStorage or leftover navigation state — but only on the mount immediately
  // following that reload. HomePage can remount later in the same tab session (navigate
  // away, then back via the logo), so this one-time flag is consumed right here via a
  // ref guard rather than read directly, or every later remount would replay it too.
  const isPostReload = useRef<boolean | null>(null);
  if (isPostReload.current === null) {
    isPostReload.current = homeIntroPendingFromReload;
    homeIntroPendingFromReload = false;
  }
  // ReloadCurtain (see below) already played the percentage screen on whatever page was
  // actually reloaded, then redirected here — so the loading screen itself shouldn't play
  // again, but the hero's own cascade (container growing, logo forming) should still run
  // at its natural pace underneath as the curtain lifts, rather than snapping straight to
  // a static, fully-formed hero. That's a different combination than skipLoading (used for
  // things like a mid-page logo click), which skips both the screen and the animation.
  const fromReloadRedirect = Boolean(location.state?.fromReloadRedirect);
  if (fromReloadRedirect) {
    sessionStorage.setItem("xg-intro-played", "1");
  }
  const [isLoading, setIsLoading] = useState(() => {
    if (isPostReload.current) return true;
    if (location.state?.skipLoading || fromReloadRedirect) return false;
    return sessionStorage.getItem("xg-intro-played") !== "1";
  });
  // Captures whether we skipped the loading screen from the very first render (logo click,
  // direct nav, etc.) — as opposed to isLoading later flipping false via the natural
  // LoadingScreen -> onComplete flow, where the intro animation should still play once.
  const skipIntroRef = useRef(
    !isPostReload.current &&
    !fromReloadRedirect &&
    (Boolean(location.state?.skipLoading) || sessionStorage.getItem("xg-intro-played") === "1")
  );
  // The hero's horizontal carousel (scrollStep) keeps the real page scroll locked until
  // it reaches its last step, and normally only advances via manual wheel/click input.
  // If we're arriving here via browser Back or a deep link meant to land further down
  // the page (footer, a section, a remembered scroll position), that carousel would
  // otherwise force the user to manually scroll through it all over again before the
  // page becomes scrollable — jump straight past it in those cases.
  const jumpPastHeroRef = useRef(
    navigationType === "POP" || Boolean(location.state?.scrollToFooter || location.state?.scrollToSection)
  );

  useEffect(() => {
    const targetId = location.state?.scrollToFooter ? "footer" : location.state?.scrollToSection;
    if (!targetId) return;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        document.body.style.overflow = "auto";
        el.scrollIntoView({ behavior: "auto" });
      } else {
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            sessionStorage.setItem("xg-intro-played", "1");
            setIsLoading(false);
          }}
        />
      )}
      <div className="min-h-screen bg-white cursor-none">
        <HeroSection startSequence={!isLoading} skipIntro={skipIntroRef.current} jumpPastHero={jumpPastHeroRef.current} />
        <ServicesList />
        <SelectedWork />
        <NeedMoreProof />
        <RealResults />
        <TrustedBrands />
        <BlogInsightsSection />
        <LetsMakeItHappen />
        <Footer />
      </div>
    </>
  );
}

import { useParams } from "react-router-dom";

function CaseStudyPageWrapper() {
  const { id } = useParams<{ id: string }>();
  return <CaseStudyPage id={id} />;
}

// Reload boot sequence for every route except home. A genuine reload anywhere on the site
// plays the percentage screen, then redirects to home and lets *home's own* intro cascade
// (see HomePage/LandingSequence) play out underneath as this curtain lifts — reload is
// treated as restarting the whole site experience, not just refreshing whatever page
// happened to be open. Deliberately reuses home's already-smooth pipeline rather than
// a separate lookalike animation here: an independent copy that always resolves to a
// static, fully-formed hero the instant it hands off reads as an abrupt cut, however
// closely it otherwise matches — flowing into the same live cascade home itself uses
// avoids that entirely. Lives outside <Routes> and never unmounts, so — like ScrollToTop's
// own reload handling — this reads documentLoadWasReload exactly once per tab session, on
// whichever route the browser actually reloaded into; later client-side navigation never
// re-triggers it.
function ReloadCurtain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active] = useState(() => documentLoadWasReload && location.pathname !== "/");
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  if (!active || done) return null;

  return (
    <motion.div
      animate={{ opacity: revealing ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => { if (revealing) setDone(true); }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#060606", pointerEvents: revealing ? "none" : "auto" }}
    >
      <LoadingScreen
        bare
        onComplete={() => {
          // HomePage hasn't mounted yet this session, so its own reload-detection flag is
          // still armed — clear it here, or HomePage would see it and show a second,
          // redundant percentage screen on top of the one that just played here.
          homeIntroPendingFromReload = false;
          // Swap the actual page to home underneath *before* the backdrop starts fading,
          // so the reveal lands on the hero rather than flashing whatever page was
          // reloaded and then jumping to home a beat later. fromReloadRedirect tells
          // HomePage the loading screen already played (right here) but the intro
          // *animation* itself has not — it should still run at its natural pace, so the
          // curtain lifts onto the same live logo-formation cascade home's own reload uses,
          // not a static hero that's already fully resolved the moment it's revealed.
          navigate("/", { replace: true, state: { fromReloadRedirect: true } });
          setRevealing(true);
        }}
      />
    </motion.div>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <ContactFormProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/post/:id" element={<BlogPostPage />} />
            <Route path="/blog/case-study/:id" element={<CaseStudyPageWrapper />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
          <ReloadCurtain />
        </ContactFormProvider>
      </BrowserRouter>
    </CursorProvider>
  );
}