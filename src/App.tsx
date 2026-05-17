import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(!location.state?.skipLoading);

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
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
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
  return <CaseStudyPage id={id !== undefined ? parseInt(id, 10) : 0} />;
}

export default function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/post/:id" element={<BlogPostPage />} />
          <Route path="/blog/case-study/:id" element={<CaseStudyPageWrapper />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </BrowserRouter>
    </CursorProvider>
  );
}