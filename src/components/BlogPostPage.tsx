import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { ARTICLES } from "./BlogPage";
import { Footer } from "./Footer";

// Social share icons
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12l7 7M5 12l7-7" />
    </svg>
  );
}

export function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleIndex = id !== undefined ? parseInt(id, 10) : 0;
  const article = ARTICLES[articleIndex] ?? ARTICLES[0];

  const [activeSection, setActiveSection] = useState(0);
  const [copied, setCopied] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sections = (article as any).content as Array<{
    heading: string;
    paragraphs: string[];
    blockquote?: string;
  }>;

  const author = (article as any).author as { name: string; bio: string; initial: string };
  const tags = (article as any).tags as string[];
  const date = (article as any).date as string;

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  function scrollToSection(i: number) {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Sticky TopBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: "114px" }}>
          <TopBar />
        </div>
      </div>

      {/* Back button */}
      <div style={{ padding: "24px 80px 0", maxWidth: "1200px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/blog")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.04em",
            color: "#888888",
            padding: 0,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#888888")}
        >
          <ArrowLeftIcon />
          Back to Blog
        </button>
      </div>

      {/* Article header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "48px 80px 56px", maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Date + Author row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "#888888",
                letterSpacing: "0.02em",
              }}
            >
              {date}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "#555555",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {author?.name ?? "XG Labs"}
            </span>
          </div>
        </div>

        {/* Large title */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(42px, 6vw, 88px)",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            margin: "0 0 32px",
            maxWidth: "820px",
          }}
        >
          {article.title}
        </h1>

        {/* Tags */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {tags?.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                padding: "6px 16px",
                border: "1.5px solid #d0d0d0",
                borderRadius: "100px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#555555",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.header>

      {/* Divider */}
      <div style={{ height: "1px", background: "#e8e8e8", margin: "0 80px" }} />

      {/* Content area: sidebar + article body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "0",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 80px",
          alignItems: "flex-start",
        }}
      >
        {/* Left sticky sidebar */}
        <aside
          style={{
            position: "sticky",
            top: "130px",
            paddingTop: "56px",
            paddingRight: "40px",
          }}
        >
          {/* CONTENTS */}
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#aaaaaa",
                margin: "0 0 16px",
              }}
            >
              Contents
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {sections?.map((sec, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    background: "none",
                    border: "none",
                    padding: "6px 0 6px 12px",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: activeSection === i ? 600 : 400,
                    fontSize: "13px",
                    color: activeSection === i ? "#1a1a1a" : "#999999",
                    textAlign: "left",
                    transition: "color 0.15s",
                    borderLeft: `2px solid ${activeSection === i ? "#1a1a1a" : "transparent"}`,
                    lineHeight: "1.4",
                  }}
                >
                  {sec.heading}
                </button>
              ))}
            </nav>
          </div>

          {/* SHARE */}
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#aaaaaa",
                margin: "0 0 14px",
              }}
            >
              Share
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1.5px solid #d0d0d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555555",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d0d0d0"; (e.currentTarget as HTMLAnchorElement).style.color = "#555555"; }}
              >
                <TwitterIcon />
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1.5px solid #d0d0d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555555",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d0d0d0"; (e.currentTarget as HTMLAnchorElement).style.color = "#555555"; }}
              >
                <LinkedInIcon />
              </a>
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1.5px solid #d0d0d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555555",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d0d0d0"; (e.currentTarget as HTMLAnchorElement).style.color = "#555555"; }}
              >
                <FacebookIcon />
              </a>
              {/* Copy link */}
              <button
                onClick={handleCopyLink}
                title={copied ? "Copied!" : "Copy link"}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: `1.5px solid ${copied ? "#1a7a4a" : "#d0d0d0"}`,
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: copied ? "#1a7a4a" : "#555555",
                  cursor: "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                }}
              >
                <LinkIcon />
              </button>
            </div>
          </div>
        </aside>

        {/* Main article content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingTop: "56px", paddingBottom: "80px", maxWidth: "640px" }}
        >
          {sections?.map((sec, i) => (
            <section
              key={i}
              ref={(el) => { sectionRefs.current[i] = el; }}
              style={{ marginBottom: "56px" }}
            >
              {/* Section heading */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2vw, 30px)",
                  lineHeight: "1.25",
                  color: "#1a1a1a",
                  margin: "0 0 20px",
                  letterSpacing: "-0.01em",
                }}
              >
                {sec.heading}
              </h2>

              {/* Paragraphs */}
              {sec.paragraphs.map((para, j) => {
                const isFirst = i === 0 && j === 0;
                if (isFirst) {
                  // Drop cap on first paragraph
                  const firstChar = para.charAt(0);
                  const rest = para.slice(1);
                  return (
                    <p
                      key={j}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(15px, 1.1vw, 17px)",
                        lineHeight: "1.75",
                        color: "#333333",
                        margin: "0 0 20px",
                      }}
                    >
                      <span
                        style={{
                          float: "left",
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 700,
                          fontSize: "4.5em",
                          lineHeight: "0.8",
                          marginRight: "6px",
                          marginTop: "6px",
                          color: "#1a1a1a",
                        }}
                      >
                        {firstChar}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return (
                  <p
                    key={j}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                      lineHeight: "1.75",
                      color: "#333333",
                      margin: "0 0 20px",
                    }}
                  >
                    {para}
                  </p>
                );
              })}

              {/* Blockquote */}
              {sec.blockquote && (
                <blockquote
                  style={{
                    margin: "32px 0",
                    paddingLeft: "24px",
                    borderLeft: "3px solid #1a1a1a",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "clamp(16px, 1.3vw, 20px)",
                      lineHeight: "1.65",
                      color: "#333333",
                      margin: 0,
                    }}
                  >
                    {sec.blockquote}
                  </p>
                </blockquote>
              )}
            </section>
          ))}

          {/* Newsletter subscribe box */}
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: "16px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888888",
                marginBottom: "4px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 1.6vw, 24px)",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Subscribe to the newsletter
            </h3>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#888888",
                margin: 0,
                maxWidth: "320px",
                lineHeight: "1.6",
              }}
            >
              Get the latest posts and insights delivered straight to your inbox. No spam, ever.
            </p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                width: "100%",
                maxWidth: "400px",
                marginTop: "8px",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1.5px solid #d0d0d0",
                  borderRadius: "8px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  outline: "none",
                  color: "#1a1a1a",
                  background: "#ffffff",
                }}
              />
              <button
                style={{
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#1a1a1a",
                  color: "#ffffff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </motion.main>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#e8e8e8", margin: "0 80px" }} />

      {/* Author section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: "80px 80px 100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0",
        }}
      >
        {/* Avatar circle */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background: "#eeeeee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "40px",
              color: "#555555",
              lineHeight: 1,
            }}
          >
            {author?.initial ?? "X"}
          </span>
        </div>

        {/* Written by label */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#aaaaaa",
            margin: "0 0 10px",
          }}
        >
          Written by
        </p>

        {/* Author name */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 48px)",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            margin: "0 0 16px",
          }}
        >
          {author?.name ?? "XG Labs"}
        </h2>

        {/* Bio */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.1vw, 17px)",
            lineHeight: "1.65",
            color: "#666666",
            margin: 0,
            maxWidth: "480px",
          }}
        >
          {author?.bio ?? ""}
        </p>
      </motion.section>
      <Footer />
    </div>
  );
}
