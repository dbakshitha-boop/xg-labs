import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./landing/FinalLayout";
import image1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import image2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import image3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import image4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";
import image5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";

const CASE_STUDIES = [
  {
    label: "CREATIVE + PERFORMANCE",
    author: "By Xg Labs",
    date: "Jul 22, 2025",
    readTime: "6 min read",
    title: "How creative-first testing doubled ad performance",
    heroImg: image2,
    description:
      "We reworked creative, messaging, and funnel structure — then ran rapid experiments that improved CTR and ROAS while reducing wasted spend.",
    challenge:
      "Performance was inconsistent: creatives underperformed, targeting was broad, and tracking gaps made optimization blind. The product value didn't hit fast enough in the funnel.",
    approach:
      "We ran a focused creative-first program: quick concept tests, intentional messaging alignment, and a strict measurement plan to isolate winners fast.\n\nWe tested 12 creative concepts in two weeks and pushed the top performers into scaled campaigns.",
    execution:
      "Concept generation → 3x short-form videos + static variants → A/B creative tests → scale winners with precise audience cohorts.",
    results:
      "Improved sign-ups, better onboarding flow completion, and a notable lift in active users. The campaigns showed clear, repeatable ROI improvements.",
  },
  {
    label: "STRATEGY",
    author: "By Xg Labs",
    date: "Aug 10, 2025",
    readTime: "6 min read",
    title: "Why most brand strategies fail before they even launch.",
    heroImg: image3,
    description:
      "A breakdown of the common strategic gaps we see — and how to fix them before going to market.",
    challenge:
      "Most brands arrive at launch without a validated positioning framework, leading to confused messaging across every touchpoint.",
    approach:
      "We audit the competitive landscape, interview internal stakeholders, and map the brand's unique advantage to a single resonant narrative.",
    execution:
      "Discovery workshops → positioning map → messaging hierarchy → go-to-market brief handed off to creative teams.",
    results:
      "Brands that complete this process launch with clarity. Paid and organic efforts align, reducing CAC and increasing brand recall within the first quarter.",
  },
  {
    label: "BRANDING",
    author: "By Xg Labs",
    date: "Sep 5, 2025",
    readTime: "5 min read",
    title: "Visual identity is not just a logo. Here's what it actually means.",
    heroImg: image4,
    description:
      "A deep dive into how cohesive visual systems drive brand trust and recall across every touchpoint.",
    challenge:
      "A well-funded product with no visual consistency. Different fonts, colors, and styles across digital and print undermined every impression.",
    approach:
      "We built a full design language: type scale, color system, spatial rules, iconography, and motion principles — all documented in a living style guide.",
    execution:
      "Brand audit → system design → component library → rollout across product, marketing, and social channels.",
    results:
      "A cohesive brand presence that elevated perceived value, improved investor confidence, and reduced design production time by 40%.",
  },
  {
    label: "PERFORMANCE",
    author: "By Xg Labs",
    date: "Oct 1, 2025",
    readTime: "3 min read",
    title: "4.2× ROAS isn't luck. It's architecture.",
    heroImg: image5,
    description:
      "The exact structure we use to build paid campaigns that consistently outperform benchmarks.",
    challenge:
      "Ad spend was scaling but efficiency was declining. ROAS dropped quarter-over-quarter with no clear lever to pull.",
    approach:
      "We restructured the full account: campaign hierarchy, bidding logic, creative rotation rules, and attribution windows to match the true sales cycle.",
    execution:
      "Account audit → restructure → creative testing sprint → bid strategy overhaul → weekly performance reviews.",
    results:
      "4.2× ROAS sustained over three months. CPA dropped 38%. The system now runs with minimal intervention and scales predictably.",
  },
];

export function CaseStudyPage({ id }: { id?: number }) {
  const navigate = useNavigate();
  const idx = id !== undefined ? id : 0;
  const study = CASE_STUDIES[idx] ?? CASE_STUDIES[0];

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Sticky TopBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: "114px" }}>
          <TopBar />
        </div>
      </div>

      {/* Article header */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "48px 80px 32px" }}
      >
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#888888",
              margin: 0,
            }}
          >
            {study.label}
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "#888888",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            {study.author} &nbsp;·&nbsp; {study.date} &nbsp;·&nbsp; {study.readTime}
          </p>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cal Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.6vw, 56px)",
            lineHeight: "112%",
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            margin: "0 0 36px",
            maxWidth: "820px",
          }}
        >
          {study.title}
        </h1>

        {/* Hero image */}
        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 2,
              background: "#1a7a4a",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "100px",
            }}
          >
            Latest
          </div>
          <img
            src={study.heroImg}
            alt={study.title}
            style={{
              width: "100%",
              height: "clamp(280px, 40vw, 520px)",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Intro description */}
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.25vw, 19px)",
            lineHeight: "168%",
            color: "#444444",
            margin: "36px 0 0",
            maxWidth: "780px",
          }}
        >
          {study.description}
        </p>
      </motion.section>

      {/* Divider */}
      <div style={{ margin: "40px 80px", height: "1px", background: "#e5e5e5" }} />

      {/* Content grid — 2 cols x 2 rows */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: "0 80px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px 80px",
        }}
      >
        {/* THE CHALLENGE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            The Challenge
          </h3>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.05vw, 15px)",
              lineHeight: "168%",
              color: "#555555",
              margin: 0,
            }}
          >
            {study.challenge}
          </p>
        </div>

        {/* OUR APPROACH */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Our Approach
          </h3>
          <div>
            {study.approach.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1.05vw, 15px)",
                  lineHeight: "168%",
                  color: i === 1 ? "#1a1a1a" : "#555555",
                  margin: "0 0 12px",
                  borderLeft: i === 1 ? "3px solid #00B87C" : "none",
                  paddingLeft: i === 1 ? "14px" : "0",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* EXECUTION */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Execution
          </h3>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.05vw, 15px)",
              lineHeight: "168%",
              color: "#555555",
              margin: 0,
            }}
          >
            {study.execution}
          </p>
        </div>

        {/* RESULTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Results
          </h3>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.05vw, 15px)",
              lineHeight: "168%",
              color: "#555555",
              margin: 0,
            }}
          >
            {study.results}
          </p>
        </div>
      </motion.section>
        {/* Dark CTA Banner */}
      <section
        style={{
          background: "#1a1a1a",
          padding: "64px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cal Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 2.8vw, 44px)",
            lineHeight: "115%",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            margin: 0,
            maxWidth: "560px",
          }}
        >
          Want a two-week creative audit for your brand?
        </h2>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1.5px solid #ffffff",
            borderRadius: "100px",
            background: "transparent",
            padding: "12px 20px 12px 26px",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#ffffff",
            flexShrink: 0,
          }}
          onClick={() => navigate("/blog")}
        >
          Book a Call
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7H12M12 7L7 2M12 7L7 12"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </section>
   


      {/* Outcome Quote */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: "80px 80px 64px",
          background: "#F7F8FA",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Cal Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 2.8vw, 44px)",
            lineHeight: "132%",
            letterSpacing: "-0.02em",
            color: "#aaaaaa",
            margin: "0 auto",
            maxWidth: "820px",
          }}
        >
          We aligned product messaging with performance creative so campaigns
          matched the app experience{" "}
          <span style={{ color: "#1a1a1a" }}>
            reducing drop-off and increasing conversion efficiency.
          </span>
        </p>
      </motion.section>

      {/* Deliverables — 4 columns */}
      <section style={{ padding: "0 80px 80px", background: "#F7F8FA" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {[
            { label: "Funnel mapping & critical hypotheses", img: image2 },
            { label: "Creative playbooks (video, social, ads)", img: image3 },
            { label: "Landing page templates & measurement", img: image4 },
            { label: "Landing page templates & measurement", img: image5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.85vw, 13px)",
                  lineHeight: "155%",
                  color: "#555555",
                  margin: 0,
                  paddingLeft: "14px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "6px",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#1a1a1a",
                  }}
                />
                {item.label}
              </p>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#e0e0e0",
                }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Overview */}
      <section style={{ padding: "72px 80px 80px", background: "#ffffff" }}>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            margin: "0 0 10px",
          }}
        >
          Process Overview
        </p>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.05vw, 15px)",
            lineHeight: "165%",
            color: "#666666",
            margin: "0 0 48px",
            maxWidth: "680px",
          }}
        >
          We followed a structured, four-step approach that aligned brand,
          product, and strategy—moving from insight to execution with clarity
          and intention.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {[
            {
              num: "01",
              title: "Discover",
              body: "Research, analytics audit, user interviews, funnel review.",
            },
            {
              num: "02",
              title: "Define",
              body: "Brand pillars, UX architecture, conversion hypothesis.",
            },
            {
              num: "03",
              title: "Design",
              body: "Identity, UI, prototypes, and creative assets.",
            },
            {
              num: "04",
              title: "Deliver",
              body: "Handoff, campaign launch, measurement plan.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: "1.5px solid #e5e5e5",
                borderRadius: "12px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                {step.num} {step.title}
              </p>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.9vw, 13px)",
                  lineHeight: "162%",
                  color: "#777777",
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Green CTA Banner */}
      <section
        style={{
          background: "#02A884",
          padding: "80px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "18px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cal Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(26px, 3.2vw, 50px)",
            lineHeight: "115%",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            margin: 0,
            maxWidth: "560px",
          }}
        >
          Ready to build creative that actually converts?
        </h2>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.05vw, 15px)",
            color: "rgba(255,255,255,0.85)",
            margin: 0,
          }}
        >
          Start with a short audit or a discovery session — your call.
        </p>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "none",
            borderRadius: "100px",
            background: "#1a1a1a",
            padding: "12px 20px 12px 26px",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginTop: "8px",
          }}
          onClick={() => navigate("/blog")}
        >
          Become Client
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7H12M12 7L7 2M12 7L7 12"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </section>

      {/* Related Blogs */}
      <section style={{ padding: "72px 80px 100px", background: "#ffffff" }}>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888888",
            margin: "0 0 28px",
          }}
        >
          Related Blogs
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {[
            {
              img: image2,
              title: "How we improved onboarding and retention",
              desc: "Product changes that saved churn and increased activation.",
            },
            {
              img: image1,
              title: "Short-form video that actually converts",
              desc: "How we structure vertical formats for performance.",
            },
            {
              img: image1,
              title: "Short-form video that actually converts",
              desc: "How we structure vertical formats for performance.",
            },
            {
              img: image1,
              title: "Short-form video that actually converts",
              desc: "How we structure vertical formats for performance.",
            },
          ].map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#e0e0e0",
                }}
              >
                <img
                  src={post.img}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(13px, 1vw, 15px)",
                  lineHeight: "130%",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                {post.title}
              </p>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.85vw, 13px)",
                  lineHeight: "155%",
                  color: "#888888",
                  margin: 0,
                }}
              >
                {post.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
 </div>
  );
}
    