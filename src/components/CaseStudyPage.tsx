import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./landing/FinalLayout";
import { Footer } from "./Footer";
import { useContactForm } from "./ContactFormContext";
import image1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import image2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import image3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import image4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";
import image5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";
import caseStudyHero from "../assets/Case study_page.png";
import caseStudy2 from "../assets/case-study-2.png";
import scrollNike from "../assets/letsmakeithappenscroll/28af16f987d2215a75c6b234805a61af1ffe2b1f.jpg";
import scrollFifthSip from "../assets/letsmakeithappenscroll/df49a56c44261f37bec84fd5b5ee75f09b009a72.jpg";
import scrollMorteo from "../assets/letsmakeithappenscroll/909fc774b4c04c66a94c42415b5c1e63e9c52a20.jpg";
import scrollOlo from "../assets/letsmakeithappenscroll/b02af7d4fc1674218c1fad477c943436f1779a18 (1).jpg";
import scrollSkincare from "../assets/letsmakeithappenscroll/5031ca01a26be2c1af7d3b272a6710097e75a24a.jpg";
import scrollFashion from "../assets/letsmakeithappenscroll/83d5ee443165d83f8ef367de998615dcd02a8030.jpg";
import scrollBooks from "../assets/letsmakeithappenscroll/143ce4dc78b3934cc2b5dfa00d6839d1276386b9 (1).jpg";
import scrollIllus from "../assets/letsmakeithappenscroll/e9d9e8c4ee32a3e2a198e44198854aecafe6f134.jpg";
import csData from "../assets/Casestudy/b30ff235c69da552f698cd1e2529642679c62af5.jpg";
import csCrowd from "../assets/Casestudy/c5bb2f8721d702665ed2c54c04e3a840f4ee80ec.jpg";
import csCbarch from "../assets/Casestudy/6acebc26902290df1ec9cf1c48e8424f7f4aac7b.jpg";

const CASE_STUDIES = [
  {
    label: "PRODUCT EXPERIENCE + REBRAND",
    category: "PRODUCT EXPERIENCE + REBRAND",
    tags: "MARKETING / STRATEGY",
    author: "By Xg Labs",
    date: "Jul 22, 2025",
    readTime: "6 min read",
    title: "A bold product refresh that improved conversion and user clarity.",
    heroImg: caseStudyHero,
    stats: [
      { value: "52%", label: "increase in sign-ups" },
      { value: "2.1×", label: "Better onboarding completion" },
      { value: "38%", label: "Higher engagement" },
      { value: "3", label: "Months to rollout" },
    ],
    description:
      "We reworked creative, messaging, and funnel structure — then ran rapid experiments that improved CTR and ROAS while reducing wasted spend.",
    challenge:
      "FlowApp struggled with a fragmented identity, low conversion clarity, and an outdated product experience. Users didn't understand the product quickly, leading to poor onboarding and low retention.",
    goal:
      "Create a modern identity, simplify the user journey, and develop a marketing system that brings consistency, clarity, and growth across all touchpoints.",
    solution:
      "Create a modern identity, simplify the user journey, and develop a marketing system that brings consistency, clarity, and growth across all touchpoints.",
    solutionImg: caseStudy2,
    deliverables: [
      "Brand identity & guidelines",
      "UX & onboarding redesign",
      "Design system + component library",
      "Campaign creative & launch playbook",
    ],
    timeline: "3 months — discovery to launch",
    approach:
      "We ran a focused creative-first program: quick concept tests, intentional messaging alignment, and a strict measurement plan to isolate winners fast.\n\nWe tested 12 creative concepts in two weeks and pushed the top performers into scaled campaigns.",
    execution:
      "Concept generation → 3x short-form videos + static variants → A/B creative tests → scale winners with precise audience cohorts.",
    results:
      "Improved sign-ups, better onboarding flow completion, and a notable lift in active users. The campaigns showed clear, repeatable ROI improvements.",
  },
  {
    label: "STRATEGY",
    category: "BRAND STRATEGY",
    tags: "BRAND / POSITIONING",
    author: "By Xg Labs",
    date: "Aug 10, 2025",
    readTime: "6 min read",
    title: "Why most brand strategies fail before they even launch.",
    heroImg: image3,
    stats: [
      { value: "67%", label: "Improvement in brand clarity" },
      { value: "2×", label: "Better recall scores" },
      { value: "45%", label: "Lower customer acquisition cost" },
      { value: "6", label: "Weeks to go-to-market" },
    ],
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
    category: "VISUAL IDENTITY + BRANDING",
    tags: "DESIGN / BRAND",
    author: "By Xg Labs",
    date: "Sep 5, 2025",
    readTime: "5 min read",
    title: "Visual identity is not just a logo. Here's what it actually means.",
    heroImg: image4,
    stats: [
      { value: "40%", label: "Faster design production" },
      { value: "3×", label: "Stronger brand consistency" },
      { value: "62%", label: "Increase in trust scores" },
      { value: "8", label: "Brand assets delivered" },
    ],
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
    category: "PAID PERFORMANCE",
    tags: "PAID / ANALYTICS",
    author: "By Xg Labs",
    date: "Oct 1, 2025",
    readTime: "3 min read",
    title: "4.2× ROAS isn't luck. It's architecture.",
    heroImg: image5,
    stats: [
      { value: "4.2×", label: "ROAS sustained" },
      { value: "38%", label: "Drop in CPA" },
      { value: "3×", label: "Campaign efficiency" },
      { value: "3", label: "Months of consistent results" },
    ],
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

// Matches the TopBar's min(1224px, calc(100% - 80px)) horizontal bounds
const px = "max(40px, calc((100vw - 1224px) / 2))";

const sectionLabel: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#1a1a1a",
  margin: 0,
};

export function CaseStudyPage({ id }: { id?: number }) {
  const navigate = useNavigate();
  const { open: openContactForm } = useContactForm();
  const idx = id !== undefined ? id : 0;
  const study = CASE_STUDIES[idx] ?? CASE_STUDIES[0];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f" }}>
      <style>{`
        @media (max-width: 767px) {
          .cs-hero-grid { grid-template-columns: 1fr !important; }
          .cs-hero-img { display: none !important; }
          .cs-hero-text { padding: 120px 20px 40px !important; }
          .cs-content-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .cs-brand-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .cs-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-deliverables-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-bullet-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-images-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-quote-text { font-size: clamp(18px, 5vw, 28px) !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .cs-hero-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-content-grid { grid-template-columns: 160px 1fr !important; }
          .cs-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Hero — dark split layout ── */}
      <div style={{ position: "relative", background: "#0f0f0f", minHeight: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Blurred background image */}
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            backgroundImage: `url(${study.heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            filter: "blur(40px)",
            opacity: 0.18,
            zIndex: 0,
          }}
        />

        {/* TopBar floats over the dark hero */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, height: "114px" }}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <TopBar dark />
          </div>
        </div>

        {/* Two-column hero body — constrained to topbar width */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div
            className="cs-hero-grid"
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              minHeight: "100dvh",
              maxWidth: "1224px",
              width: "calc(100% - 80px)",
              margin: "0 auto",
            }}
          >
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "148px",
              paddingBottom: "72px",
              paddingRight: "56px",
              paddingLeft: "0",
            }}
          >
            {/* Top text block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  margin: 0,
                }}
              >
                {study.category}
              </p>

              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.4vw, 56px)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.025em",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                {study.title}
              </h1>

              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                {study.tags}
              </p>
            </div>

            {/* Bottom stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "36px 48px",
                marginTop: "32px",
              }}
            >
              {study.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(32px, 4vw, 56px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              overflow: "hidden",
              marginTop: "130px",
              marginRight: "0",
              height: "calc(100dvh - 178px)",
              alignSelf: "start",
              borderRadius: "8px",
            }}
          >
            <img
              src={study.heroImg}
              alt={study.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </motion.div>
          </div>
        </div>
      </div>

      {/* ── Content section ── */}
      <section style={{ background: "#0f0f0f" }}>

        {/* THE CHALLENGE */}
        {[
          { label: "THE CHALLENGE", body: (study as any).challenge },
          { label: "THE GOAL",      body: (study as any).goal },
        ].map(({ label, body }, i) => body && (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "48px",
              paddingTop: "32px", paddingBottom: "32px", paddingLeft: px, paddingRight: px,
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>
              {label}
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: "1.72", color: "rgba(255,255,255,0.45)", margin: 0 }}>
              {body}
            </p>
          </motion.div>
        ))}

        {/* THE SOLUTION */}
        {(study as any).solution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "48px",
              paddingTop: "32px", paddingBottom: "0", paddingLeft: px, paddingRight: px,
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>
              THE SOLUTION
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: "1.72", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                {(study as any).solution}
              </p>
              {(study as any).solutionImg && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ borderRadius: "10px", overflow: "hidden", width: "100%" }}
                >
                  <img
                    src={(study as any).solutionImg}
                    alt="Solution"
                    style={{ width: "100%", display: "block", objectFit: "cover" }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ROLE & DELIVERABLES */}
        {(study as any).deliverables && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "48px",
              paddingTop: "32px", paddingBottom: "32px", paddingLeft: px, paddingRight: px,
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>
              ROLE & DELIVERABLES
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 24px" }}>
              {(study as any).deliverables.map((d: string, i: number) => (
                <p key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: "1.6", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                  {d}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* TIMELINE */}
        {(study as any).timeline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "48px",
              paddingTop: "32px", paddingBottom: "64px", paddingLeft: px, paddingRight: px,
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>
              TIMELINE
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: "1.72", color: "rgba(255,255,255,0.45)", margin: 0 }}>
              {(study as any).timeline}
            </p>
          </motion.div>
        )}

      </section>

      {/* ── Brand Direction ── */}
      <section style={{ background: "#0f0f0f", paddingTop: "72px", paddingBottom: "80px", paddingLeft: px, paddingRight: px }}>
        <div className="cs-brand-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "72px", alignItems: "stretch" }}>

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "28px", justifyContent: "flex-start", height: "100%", paddingTop: "40px", paddingBottom: "48px" }}
          >
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 1.5vw, 24px)", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", margin: 0 }}>
              BRAND DIRECTION
            </h2>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: "1.72", color: "rgba(255,255,255,0.45)", margin: 0 }}>
              We created a minimal, friendly identity system that supports product clarity across marketing and the app. The visual language emphasises motion, simple shapes, and a confident typographic voice.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px", marginTop: "auto" }}>
              {[
                { label: "LOGO",       body: "Simplified lockup variations for app, social, and marketing" },
                { label: "COLOR",      body: "Primary accent, neutral system, functional states" },
                { label: "TYPOGRAPHY", body: "Headline, UI, microcopy scale — built for clarity at every size" },
              ].map(({ label, body }, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px", gridColumn: i === 2 ? "1 / -1" : "auto" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>{label}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1vw, 15px)", lineHeight: "1.6", color: "rgba(255,255,255,0.4)", margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            {/* Top row — 2 square images */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {[scrollNike, scrollFifthSip].map((src, i) => (
                <div key={i} style={{ aspectRatio: "4/3", borderRadius: "6px", overflow: "hidden" }}>
                  <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
            {/* Wide middle image */}
            <div style={{ aspectRatio: "21/8", borderRadius: "6px", overflow: "hidden" }}>
              <img src={scrollMorteo} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </motion.div>

        </div>

        {/* Bottom row — 4 images full-width, aligned to topbar bounds */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="cs-images-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginTop: "14px" }}
        >
          {[
            { src: scrollOlo,      label: "LOGO" },
            { src: scrollSkincare, label: "TYPOGRAPHY" },
            { src: scrollFashion,  label: "COLOR" },
            { src: scrollBooks,    label: "TYPOGRAPHY" },
          ].map(({ src, label }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ aspectRatio: "4/5", borderRadius: "6px", overflow: "hidden" }}>
                <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </motion.div>

      </section>

      {/* ── Quote + Image Strip ── */}
      <section style={{ background: "#0f0f0f" }}>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingTop: "88px", paddingBottom: "48px", paddingLeft: px, paddingRight: px, textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.8vw, 40px)",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.28)",
              margin: "0 auto",
            }}
          >
            We aligned product messaging with performance
            <br />
            creative so campaigns matched the app experience —
            <br />
            <span style={{ color: "#ffffff" }}>
              reducing drop-off and increasing conversion efficiency.
            </span>
          </p>
        </motion.div>

        {/* Bullet points row — above the images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            paddingTop: "0", paddingBottom: "40px", paddingLeft: px, paddingRight: px,
          }}
        >
          {[
            "Funnel mapping & critical hypotheses",
            "Creative playbooks (video, social, ads)",
            "Landing page templates & measurement",
            "Landing page templates & measurement",
          ].map((item, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.1vw, 18px)",
                lineHeight: "1.55",
                color: "rgba(255,255,255,0.45)",
                margin: 0,
                paddingLeft: "16px",
                paddingRight: "24px",
              }}
            >
              {"· "}{item}
            </p>
          ))}
        </div>

        {/* 4-image strip — edge to edge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}
        >
          {[csData, csCrowd, csCbarch, csCbarch].map((src, i) => (
            <div key={i} style={{ aspectRatio: "3/4", overflow: "hidden" }}>
              <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </motion.div>

      </section>

      {/* ── Process Overview ── */}
      <section style={{ background: "#0f0f0f", paddingTop: "80px", paddingBottom: "88px", paddingLeft: px, paddingRight: px }}>
        {/* Header row */}
        <div className="cs-content-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px", marginBottom: "48px" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", margin: 0 }}>
            PROCESS OVERVIEW
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: "1.65", color: "rgba(255,255,255,0.45)", margin: 0 }}>
            We followed a structured, four-step approach that aligned brand, product, and strategy — moving from insight to execution with clarity and intention.
          </p>
        </div>

        {/* Step cards */}
        <div className="cs-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {[
            { num: "01", title: "DISCOVER", body: "Research, analytics audit, user interviews, funnel review." },
            { num: "02", title: "DEFINE",   body: "Brand pillars, UX architecture, conversion hypothesis." },
            { num: "03", title: "DESIGN",   body: "Identity, UI, prototypes, and creative assets." },
            { num: "04", title: "DELIVER",  body: "Handoff, campaign launch, measurement plan." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#1a1a1a",
                borderRadius: "12px",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 1.8vw, 28px)", letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>
                {step.num} {step.title}
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)", lineHeight: "1.65", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Overall Impact ── */}
      <section style={{ background: "#0f0f0f", paddingTop: "80px", paddingBottom: "96px", paddingLeft: px, paddingRight: px, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D6D6D6", margin: "0 0 20px" }}>
            OVER ALL IMPACT
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "clamp(18px, 1.6vw, 26px)", lineHeight: "1.55", color: "rgba(255,255,255,0.55)", margin: "0 auto", maxWidth: "660px" }}>
            The work led to improved sign-ups, better onboarding flow completion, and a notable lift in active users.
          </p>
        </motion.div>

        <div className="cs-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { value: "52%",  label: "Increase in sign-ups",        bold: false },
            { value: "2.1X", label: "More onboarding completions", bold: false },
            { value: "38%",  label: "Increase in active users",    bold: true  },
            { value: "3",    label: "Months to rollout",           bold: false },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(48px, 6vw, 96px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#ffffff", margin: 0 }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: stat.bold ? 700 : 400, fontSize: "clamp(15px, 1.1vw, 18px)", color: "rgba(255,255,255,0.45)", margin: 0, textAlign: "center" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Green CTA Banner ── */}
      <section
        style={{
          position: "relative",
          background: "#3aA882",
          paddingTop: "120px", paddingBottom: "120px", paddingLeft: px, paddingRight: px,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
          overflow: "hidden",
        }}
      >
        {/* Vertical grid lines — fading top & bottom, thicker in middle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 2px, transparent 2px, transparent calc(100vw / 12))",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 25%, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 25%, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <h2
          style={{
            position: "relative",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 64px)",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            color: "#ffffff",
            margin: 0,
            maxWidth: "640px",
          }}
        >
          Want insights tailored to your brand?
        </h2>

        <p
          style={{
            position: "relative",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.05vw, 16px)",
            color: "rgba(255,255,255,0.7)",
            margin: 0,
          }}
        >
          We can build a custom workshop or audit based on these ideas.
        </p>

        <motion.button
          onClick={openContactForm}
          initial="rest"
          whileHover="hover"
          animate="rest"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            borderRadius: "100px",
            background: "#ffffff",
            padding: "10px 10px 10px 24px",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#0f0f0f",
            marginTop: "12px",
            overflow: "hidden",
          }}
        >
          {/* Black fill that pans out from left on hover */}
          <motion.span
            aria-hidden
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#000000",
              borderRadius: "100px",
              transformOrigin: "left center",
              zIndex: 0,
            }}
          />

          {/* Text */}
          <motion.span
            variants={{ rest: { color: "#0f0f0f" }, hover: { color: "#ffffff" } }}
            transition={{ duration: 0.3 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            BECOME CLIENT
          </motion.span>

          {/* Arrow circle */}
          <motion.div
            variants={{ rest: { background: "#0f0f0f" }, hover: { background: "#3aA882" } }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <motion.svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }}
              transition={{ duration: 0.3 }}
            >
              <motion.path
                d="M2 7H12M12 7L7 2M12 7L7 12"
                variants={{ rest: { stroke: "#ffffff" }, hover: { stroke: "#000000" } }}
                transition={{ duration: 0.3 }}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.button>
      </section>

      {/* ── Related Blogs ── */}
      {/* <section style={{ padding: "80px 80px 100px", background: "#ffffff" }}>
        <p style={{ ...sectionLabel, color: "#888888", marginBottom: "28px" }}>Related Blogs</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            { img: image2, title: "How we improved onboarding and retention", desc: "Product changes that saved churn and increased activation." },
            { img: image1, title: "Short-form video that actually converts", desc: "How we structure vertical formats for performance." },
            { img: image3, title: "Building a brand positioning that sticks", desc: "The framework we use to lock in long-term brand clarity." },
            { img: image4, title: "From audit to launch in six weeks", desc: "How a fast creative sprint turned around a stalling campaign." },
          ].map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate("/blog")}
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
                <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(13px, 1vw, 15px)",
                  lineHeight: "1.3",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                {post.title}
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.85vw, 13px)",
                  lineHeight: "1.55",
                  color: "#888888",
                  margin: 0,
                }}
              >
                {post.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section> */}

      <Footer />
    </div>
  );
}
