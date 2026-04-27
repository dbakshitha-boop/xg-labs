import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import image1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import image5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";
import image3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import image2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import image4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";

const STRIP_CARDS = [
  { img: image1 },
  { img: image2 },
  { img: image3 },
  { img: image4 },
  { img: image5 },
];

const FILTERS = ["ALL", "STRATEGY", "CREATIVE", "PERFORMANCE", "BRANDING", "PRODUCT"];

const PROJECT_CARDS = [
  {
    img: image1,
    category: "WEBSITE + VISUAL IDENTITY",
    description: "A modern digital presence and clean identity system built for clarity.",
    tags: "BRANDING / WEB",
    filters: ["BRANDING"],
  },
  {
    img: image2,
    category: "PRODUCT EXPERIENCE + REBRAND",
    description: "A bold product refresh that improved conversion and user clarity.",
    tags: "MARKETING / STRATEGY",
    filters: ["STRATEGY"],
  },
  {
    img: image3,
    category: "BRANDING FOR DIGITAL",
    description: "A high-performing content system that scaled across ads & social.",
    tags: "CONTENT / PERFORMANCE",
    filters: [ "PERFORMANCE"],
  }
];

export function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const visibleCards =
    activeFilter === "ALL"
      ? PROJECT_CARDS
      : PROJECT_CARDS.filter((c) => c.filters.includes(activeFilter));

  return (
    <div style={{ minHeight: "100vh", background: "#E9F0FF" }}>

      {/* Sticky Top Bar wrapper */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: "114px" }}>
          <TopBar />
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          paddingTop: "24px",
          paddingBottom: "28px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 6vw, 80px)",
            lineHeight: "94%",
            letterSpacing: "-0.04em",
            textAlign: "center",
            textTransform: "uppercase",
            maxWidth: "min(936px, 90vw)",
            width: "100%",
            opacity: 1,
            color: "#414141",
            margin: 0,
          }}
        >
          A curated selection of our most impactful projects.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(16px, 2vw, 22px)",
            lineHeight: "140%",
            letterSpacing: "0em",
            textAlign: "center",
            color: "#414141",
            maxWidth: "min(692px, 90vw)",
            width: "100%",
            margin: 0,
          }}
        >
          Creative, digital, and performance work<br />built to move brands forward.
        </motion.p>
      </section>

      {/* Image Strip — full viewport height minus header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: "calc(100vh - 114px - 160px)",
          minHeight: "300px",
          display: "flex",
          flexDirection: "row",
          gap: "4px",
        }}
      >
        {STRIP_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1,
              minWidth: 0,
              height: "100%",
              overflow: "hidden",
              background: "#d0d0d0",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={card.img}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Metric Cards — 2-column */}
      <section
        style={{
          padding: "80px 60px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "60px 32px",
          background: "#E9F0FF",
        }}
      >
        {[
          {
            img: image2,
            metric: "4.2× ROAS",
            description: "Delivered through performance-led creative and optimized paid campaigns.",
          },
          {
            img: image3,
            metric: "45% Higher Organic Reach",
            description: "Achieved with consistent content systems and modern storytelling.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "20px", cursor: "pointer" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={card.img}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: "110%",
                letterSpacing: "-0.02em",
                color: "#060606",
                margin: 0,
              }}
            >
              {card.metric}
            </h2>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.4vw, 20px)",
                lineHeight: "160%",
                color: "#414141",
                margin: 0,
                maxWidth: "520px",
              }}
            >
              {card.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Filter Tabs + Project Cards Grid */}
      <section style={{ padding: "60px 60px 100px" }}>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
          {FILTERS.map((f) => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "100px",
                  border: active ? "none" : "1.5px solid #414141",
                  background: active ? "#060606" : "transparent",
                  color: active ? "#ffffff" : "#414141",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* 3-column cards grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px 28px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card, i) => (
              <motion.div
                key={card.category + i}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "16px", cursor: "pointer" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    background: "#d5d5d5",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.category}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Category label */}
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    color: "#888888",
                    margin: 0,
                  }}
                >
                  {card.category}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(18px, 1.6vw, 24px)",
                    lineHeight: "130%",
                    letterSpacing: "-0.01em",
                    color: "#060606",
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>

                {/* Tags */}
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    color: "#414141",
                    margin: 0,
                  }}
                >
                  {card.tags}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
