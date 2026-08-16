import { BrowserRouter, Routes, Route, useNavigationType } from "react-router-dom";
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

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

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

    if (navigationType === "POP") {
      const saved = sessionStorage.getItem(`scrollY:${location.pathname}`);
      if (!saved) return;
      const targetY = parseInt(saved, 10);
      let attempts = 0;
      let lastHeight = -1;
      const tryRestore = () => {
        attempts++;
        window.scrollTo(0, targetY);
        // Verify the scroll actually took (not just that there's room for it) — the home
        // page keeps the body non-scrollable for a moment while its hero sequence settles,
        // during which scrollTo silently no-ops.
        const reachedTarget = Math.abs(window.scrollY - targetY) < 4;
        const currentHeight = document.body.scrollHeight;
        const maxScroll = currentHeight - window.innerHeight;
        const reachedBottom = window.scrollY >= maxScroll - 4;
        // Only trust "reached bottom" as a genuine stop condition once the page's height
        // has stopped growing between two checks — async content (images, fetched cards)
        // can still be inflating document height, and bailing out the moment we hit
        // whatever the bottom happens to be *right now* leaves us short of the real target.
        const heightStable = currentHeight === lastHeight;
        lastHeight = currentHeight;
        if (!reachedTarget && !(reachedBottom && heightStable) && attempts < 40) {
          setTimeout(tryRestore, 75);
        }
      };
      tryRestore();
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.state, navigationType]);

  return null;
}

function HomePage() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [isLoading, setIsLoading] = useState(() => {
    if (location.state?.skipLoading) return false;
    return sessionStorage.getItem("xg-intro-played") !== "1";
  });
  // Captures whether we skipped the loading screen from the very first render (logo click,
  // direct nav, etc.) — as opposed to isLoading later flipping false via the natural
  // LoadingScreen -> onComplete flow, where the intro animation should still play once.
  const skipIntroRef = useRef(
    Boolean(location.state?.skipLoading) || sessionStorage.getItem("xg-intro-played") === "1"
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
        </ContactFormProvider>
      </BrowserRouter>
    </CursorProvider>
  );
}