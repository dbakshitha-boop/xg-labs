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
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ContactFormProvider } from "./components/ContactFormContext";

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Let the browser restore scroll position on back/forward navigation.
    if (navigationType === "POP") return;
    // These routes handle their own scroll target once the section mounts.
    if (location.state?.scrollToSection || location.state?.scrollToFooter) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.state, navigationType]);

  return null;
}

function HomePage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    if (location.state?.skipLoading) return false;
    return sessionStorage.getItem("xg-intro-played") !== "1";
  });

  useEffect(() => {
    const targetId = location.state?.scrollToFooter ? "footer" : location.state?.scrollToSection;
    if (!targetId) return;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        document.body.style.overflow = "auto";
        el.scrollIntoView({ behavior: "smooth" });
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
        <HeroSection startSequence={!isLoading} />
        <ServicesList />
        <SelectedWork />
        <NeedMoreProof />
        <RealResults />
        <TrustedBrands />
        <LetsMakeItHappen />
        <BlogInsightsSection />
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