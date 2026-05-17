import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "./landing/FinalLayout";
import { ContactFormOverlay } from "./ContactFormOverlay";
import { SubscribePopup } from "./SubscribePopup";
import { Footer } from "./Footer";
import image1 from "../assets/portfolio/91b55f6c4cb04eb7c2e15c4348e7d9e02c87693d.png";
import image2 from "../assets/portfolio/b38d05db3e088fb9946a699913465921149256a5.png";
import image3 from "../assets/portfolio/1248070d103a19f145ae0f832592d24f14f6062d.jpg";
import image4 from "../assets/portfolio/b02af7d4fc1674218c1fad477c943436f1779a18.jpg";
import image5 from "../assets/portfolio/143ce4dc78b3934cc2b5dfa00d6839d1276386b9.jpg";
import image6 from "../assets/blog_page.png";
import image7 from "../assets/blog-1.jpg";
import image8 from "../assets/blog-2.png";
import image9 from "../assets/blog-3.png";

export const ARTICLES = [
  {
    label: "CREATIVE + PERFORMANCE",
    readTime: "4 min read",
    title: "This isn't about running ads faster. It's about building a system.",
    description:
      "How we built a creative system and performance funnel that doubled conversion rates in three months.",
    img: image6,
    featured: true,
    tags: ["CREATIVE", "PERFORMANCE", "STRATEGY"],
    date: "2026-03-10",
    author: { name: "Alex Morgan", bio: "Digital designer and writer exploring the intersection of technology, culture, and human experience.", initial: "A" },
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Most brands think the problem is their ad spend. They increase budget, test a few new creatives, and wait for the numbers to move. They rarely do. The real issue isn't the ads — it's the system behind them.",
          "When we started working with our client, their ROAS had plateaued at 1.8×. After three months of rebuilding the creative and performance infrastructure from the ground up, they were at 4.2×. Here's how we did it.",
        ],
      },
      {
        heading: "Building the Creative Engine",
        paragraphs: [
          "The first thing we did was audit every asset they had ever run. 80% of their creatives were variations of the same concept — a product shot with a value prop. There was no narrative, no hook architecture, no emotional ladder.",
          "We rebuilt the creative system around three formats: problem-agitation hooks (15s), transformation stories (30s), and proof-driven testimonials (45s). Each format served a different stage of awareness.",
        ],
        blockquote: '"Creativity without data is art. Creativity with data is performance."',
      },
      {
        heading: "The Performance Funnel",
        paragraphs: [
          "Once the creative system was in place, we restructured the media buying to match it. Top-of-funnel campaigns ran the hook-heavy content to cold audiences. Retargeting showed transformation content to warm audiences. Converters saw proof content.",
          "This three-tiered approach meant every dollar was doing a specific job — not just 'running ads' into a single undifferentiated bucket.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The brands that win in performance marketing aren't the ones with the biggest budgets. They're the ones who treat creative as infrastructure, not decoration. Build the system first. The results follow.",
        ],
      },
    ],
  },
  {
    label: "STRATEGY",
    readTime: "6 min read",
    title: "Why most brand strategies fail before they even launch.",
    description:
      "A breakdown of the common strategic gaps we see — and how to fix them before going to market.",
    img: image7,
    featured: false,
    filter: "STRATEGY",
    tags: ["STRATEGY", "BRANDING"],
    date: "2026-02-28",
    author: { name: "Sam Rivera", bio: "Brand strategist and growth consultant with 10+ years building challenger brands.", initial: "S" },
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Brand strategy documents gather dust. We've seen it dozens of times — a beautifully crafted 60-page deck that lives in a shared folder, never touched after launch day. The strategy fails not because the thinking is wrong, but because it was never designed to be operational.",
          "Here are the three gaps we see most often, and how to close them before you go to market.",
        ],
      },
      {
        heading: "Gap 1: Strategy Without a Decision Filter",
        paragraphs: [
          "A brand strategy that can't answer the question 'should we do this?' in real time is not a strategy — it's a mood board. Every brand decision, from copy tone to channel selection, should trace back to a clear strategic filter.",
        ],
        blockquote: `"If your brand strategy can\u2019t make decisions, it\u2019s just decoration."`,
      },
      {
        heading: "Gap 2: Positioning That Nobody Owns",
        paragraphs: [
          "Positioning works when someone in the organization is accountable for it. Without a brand owner — usually a CMO or Head of Brand — positioning drift happens naturally. Teams optimize for short-term results over long-term coherence.",
          "Fix this by assigning brand custodianship before launch, not after.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Great strategy is only as good as its implementation. Build your brand strategy to be used daily, not referenced annually — and you'll avoid the graveyard of beautifully written documents that changed nothing.",
        ],
      },
    ],
  },
  {
    label: "BRANDING",
    readTime: "5 min read",
    title: "Visual identity is not just a logo. Here's what it actually means.",
    description:
      "A deep dive into how cohesive visual systems drive brand trust and recall across every touchpoint.",
    img: image8,
    featured: false,
    filter: "BRANDING",
    tags: ["BRANDING", "DESIGN"],
    date: "2026-02-14",
    author: { name: "Jordan Lee", bio: "Creative director and brand identity designer working with tech and consumer companies globally.", initial: "J" },
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "When most founders say they need a 'brand', they mean they need a logo. It's an understandable conflation — logos are visible, tangible, and easy to brief. But a logo without a system behind it is just a mark. It can't do the work a brand needs to do.",
          "Visual identity, done properly, is a system of decisions — color, typography, spacing, motion, and photography — that work together to create a consistent experience across every surface.",
        ],
      },
      {
        heading: "The Components of Visual Identity",
        paragraphs: [
          "A robust visual identity typically includes: a primary logotype and its variations, a color palette with defined usage rules, a typographic scale with hierarchy, an iconography style, a photography art direction guide, and a motion/animation language.",
          "Each of these components multiplies the impact of the others. A great color palette with weak typography leaves brand trust on the table.",
        ],
        blockquote: '"Consistency is the only brand strategy that compounds."',
      },
      {
        heading: "Why Systems Beat One-offs",
        paragraphs: [
          "The brands with the highest recognition — Apple, Stripe, Patagonia — don't just have great logos. They have complete visual systems that make every asset feel undeniably theirs, regardless of who produced it or on what surface.",
          "This is what we mean when we say visual identity. Not a logo. A system.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Invest in the system before you scale the production. A great visual identity doesn't just make things look good — it makes every marketing dollar more effective by building recognition over time.",
        ],
      },
    ],
  },
  {
    label: "PERFORMANCE",
    readTime: "3 min read",
    title: "4.2× ROAS isn't luck. It's architecture.",
    description:
      "The exact structure we use to build paid campaigns that consistently outperform benchmarks.",
    img: image9,
    featured: false,
    filter: "PERFORMANCE",
    tags: ["PERFORMANCE", "PAID MEDIA"],
    date: "2026-01-30",
    author: { name: "Alex Morgan", bio: "Digital designer and writer exploring the intersection of technology, culture, and human experience.", initial: "A" },
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Every time we share a 4× ROAS case study, someone asks: 'Was that a seasonal spike?' No. It wasn't. High ROAS is reproducible when it's built on architecture, not luck.",
          "Here's the exact campaign structure we use across accounts that consistently hits above-benchmark returns.",
        ],
      },
      {
        heading: "The Three-Layer Structure",
        paragraphs: [
          "Layer 1 is Prospecting — cold audiences, hook-first creative, optimizing for add-to-cart signals. Layer 2 is Consideration — warm audiences who've engaged but haven't converted, shown transformation content. Layer 3 is Conversion — hot audiences, product-specific proof content, aggressive retargeting.",
          "Most brands run all three layers with the same creative. That's the mistake.",
        ],
        blockquote: '"Match creative intent to audience temperature. Every time."',
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Architecture beats budget every time. Structure your campaigns around audience temperature, match your creative to each layer, and measure the funnel — not just the last click.",
        ],
      },
    ],
  },
  {
    label: "CREATIVE",
    readTime: "4 min read",
    title: "How we doubled ad performance with creative-first testing",
    description:
      "Actionable insights from strategy, creative, and performance — written to make you think and execute better.",
    img: image1,
    featured: false,
    filter: "PERFORMANCE",
    tags: ["CREATIVE", "TESTING"],
    date: "2026-01-18",
    author: { name: "Sam Rivera", bio: "Brand strategist and growth consultant with 10+ years building challenger brands.", initial: "S" },
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "The conventional wisdom in performance marketing is to test everything — headlines, CTAs, audience segments, bid strategies. But when we restructured our testing framework to prioritize creative above all else, results improved faster than any other change we'd made.",
          "Here's what we learned.",
        ],
      },
      {
        heading: "Why Creative Wins",
        paragraphs: [
          "Creative is the highest-leverage variable in any paid campaign. A 2× improvement in targeting might move your CTR by 10%. A 2× improvement in creative can move it by 80%. And unlike audience signals, great creative scales without ceiling.",
        ],
        blockquote: '"The algorithm finds the audience. Your creative earns the click."',
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Stop treating creative as the last thing you test. Make it the first. Run more creative iterations, fewer audience splits, and measure creative contribution explicitly. The results will follow.",
        ],
      },
    ],
  },
  {
    label: "PERFORMANCE",
    readTime: "4 min read",
    title: "How we doubled ad performance with creative-first testing",
    description:
      "Actionable insights from strategy, creative, and performance — written to make you think and execute better.",
    img: image2,
    featured: false,
    filter: "PERFORMANCE",
    tags: ["PERFORMANCE", "CREATIVE"],
    date: "2026-01-05",
    author: { name: "Jordan Lee", bio: "Creative director and brand identity designer working with tech and consumer companies globally.", initial: "J" },
    content: [
      { heading: "Introduction", paragraphs: ["Performance marketing is evolving. The playbooks that worked in 2021 are breaking down. Here's what's working now."] },
      { heading: "What Changed", paragraphs: ["Signal loss from iOS privacy changes fundamentally altered how we measure and attribute performance. Brands that built identity-based first-party data infrastructure are outperforming those that didn't."], blockquote: '"First-party data is the new moat."' },
      { heading: "Conclusion", paragraphs: ["Adapt your measurement model, build your first-party data assets, and stop optimizing for last-click attribution. The brands doing this are pulling ahead fast."] },
    ],
  },
  {
    label: "CREATIVE",
    readTime: "4 min read",
    title: "How we doubled ad performance with creative-first testing",
    description:
      "Actionable insights from strategy, creative, and performance — written to make you think and execute better.",
    img: image3,
    featured: false,
    filter: "CREATIVE",
    tags: ["CREATIVE", "DESIGN"],
    date: "2025-12-20",
    author: { name: "Alex Morgan", bio: "Digital designer and writer exploring the intersection of technology, culture, and human experience.", initial: "A" },
    content: [
      { heading: "Introduction", paragraphs: ["Creative strategy is often treated as subjective. It doesn't have to be. There are repeatable frameworks for developing creative that converts consistently."] },
      { heading: "The Hook Framework", paragraphs: ["Every piece of content you create must earn attention in the first 2 seconds. We call this the hook. Without a strong hook, the rest of the creative is irrelevant."], blockquote: '"You have 2 seconds. Make them count."' },
      { heading: "Conclusion", paragraphs: ["Build a systematic approach to creative development. Define your hooks, structure your narrative, test continuously. Creativity and data are not opposites — they're partners."] },
    ],
  },
  {
    label: "BRANDING",
    readTime: "4 min read",
    title: "How we doubled ad performance with creative-first testing",
    description:
      "Actionable insights from strategy, creative, and performance — written to make you think and execute better.",
    img: image4,
    featured: false,
    filter: "BRANDING",
    tags: ["BRANDING", "IDENTITY"],
    date: "2025-12-08",
    author: { name: "Sam Rivera", bio: "Brand strategist and growth consultant with 10+ years building challenger brands.", initial: "S" },
    content: [
      { heading: "Introduction", paragraphs: ["Brand consistency is one of the most undervalued growth levers in marketing. Consistent brands are 3.5× more visible than inconsistent ones, according to research from Lucidpress."] },
      { heading: "Why Brands Go Inconsistent", paragraphs: ["Growth without governance creates inconsistency. As teams scale and more people produce content, drift happens naturally. The fix isn't more rules — it's better systems."], blockquote: '"A brand is only as strong as its weakest touchpoint."' },
      { heading: "Conclusion", paragraphs: ["Invest in brand governance before you scale production. Systems over rules, principles over prescriptions — and get everyone on the same page before the next campaign ships."] },
    ],
  },
  {
    label: "STRATEGY",
    readTime: "4 min read",
    title: "How we doubled ad performance with creative-first testing",
    description:
      "Actionable insights from strategy, creative, and performance — written to make you think and execute better.",
    img: image5,
    featured: false,
    filter: "STRATEGY",
    tags: ["STRATEGY", "GROWTH"],
    date: "2025-11-25",
    author: { name: "Jordan Lee", bio: "Creative director and brand identity designer working with tech and consumer companies globally.", initial: "J" },
    content: [
      { heading: "Introduction", paragraphs: ["Growth strategy and brand strategy are often treated as separate disciplines. In reality, they're the same conversation — just told at different time horizons."] },
      { heading: "The Long and Short of It", paragraphs: ["Short-term performance without brand investment produces diminishing returns. Long-term brand building without performance accountability produces beautiful irrelevance. The brands that win operate both simultaneously."], blockquote: '"Brand is the compound interest of marketing."' },
      { heading: "Conclusion", paragraphs: ["Don't choose between brand and performance. Build both — and measure them on their own terms. The compounding effect is the most powerful force in marketing."] },
    ],
  },
];

const BLOG_FILTERS = ["ALL", "STRATEGY", "CREATIVE", "PERFORMANCE", "BRANDING", "PRODUCT"];
const CARDS_PER_PAGE = 6;

export function BlogPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ctaHover, setCtaHover] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("xg_subscribe_shown")) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("xg_subscribe_shown", "1");
      setSubscribeOpen(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  const gridArticles = ARTICLES.filter((a) => !a.featured);
  const filtered = gridArticles.filter((a) => {
    const matchFilter = activeFilter === "ALL" || (a as any).filter === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const pageCards = filtered.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA" }}>

      {/* Sticky TopBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%", overflow: "hidden", height: "114px" }}>
        <div style={{ position: "relative", width: "100%", height: "114px" }}>
          <TopBar />
        </div>
      </div>

      <div style={{ maxWidth: "1304px", margin: "0 auto", padding: "0" }}>
        {/* Hero */}
        <section
          style={{
            width: "100%",
            padding: "60px 0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter',  'Cal Sans', sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "45px",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#414141",
              margin: 0,
              width: "100%",
              maxWidth: "920px",
              textWrap: "balance",
            }}
          >
            Ideas that help brands grow smarter and scale faster.
          </motion.h1>

          {/* Right: Tagline + Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "6px", maxWidth: "340px" }}
          >
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "155%",
                color: "#555555",
                maxWidth: "400px",
                margin: 0,
              }}
            >
              Actionable insights from strategy, creative, and performance —{" "}
              written to make you think and execute better.
            </p>
            <button
              onClick={() => setSubscribeOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1.5px solid #1a1a1a",
                borderRadius: "100px",
                background: "transparent",
                padding: "4px 12px 4px 14px",
                cursor: "pointer",
                width: "fit-content",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "10px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#1a1a1a",
              }}
            >
              Subscribe
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </motion.div>
        </section>

        {/* Featured Article */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: "0 0 40px" }}
        >
          {/* LATEST badge + image */}
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
                background: "#02A884",
                color: "#ffffff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "10px 18px",
                borderRadius: "0 0 10px 0",
              }}
            >
              Latest
            </div>
            <img
              src={ARTICLES[0].img}
              alt={ARTICLES[0].title}
              style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Featured article meta row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "100px",
              paddingTop: "36px",
              alignItems: "flex-start",
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6E6E6E",
                  margin: 0,
                }}
              >
                {ARTICLES[0].label}
              </p>
              <h2
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "38px",
                  lineHeight: "100%",
                  letterSpacing: "-0.04em",
                  color: "#414141",
                  margin: 0,

                }}
              >
                {ARTICLES[0].title}
              </h2>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  color: "#6E6E6E",
                  margin: 0,
                  marginBottom: "12px",
                  letterSpacing: "0.02em",
                  textAlign: "right",
                }}
              >
                {ARTICLES[0].readTime}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "380px", alignItems: "flex-start" }}>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "165%",
                    color: "#6E6E6E",
                    margin: 0,
                    textAlign: "left",
                  }}
                >
                  {ARTICLES[0].description}
                </p>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "flex-start" }}>
                  <button
                    onClick={() => navigate("/blog/case-study/0")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1.5px solid #1a1a1a",
                      borderRadius: "100px",
                      background: "transparent",
                      padding: "4px 12px 4px 14px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.03em",
                      color: "#1a1a1a",
                    }}
                  >
                    View Case Study
                    <div style={{ width: "25px", height: "25px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6H10.5M10.5 6L6 1.5M10.5 6L6 10.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate("/blog/post/0")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1.5px solid #1a1a1a",
                      borderRadius: "100px",
                      background: "#1a1a1a",
                      padding: "4px 12px 4px 14px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.03em",
                      color: "#ffffff",
                    }}
                  >
                    Read Article
                    <div style={{ width: "25px", height: "25px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6H10.5M10.5 6L6 1.5M10.5 6L6 10.5" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Filter row + Search */}
        <section style={{ padding: "16px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
              {BLOG_FILTERS.map((f) => {
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => { setActiveFilter(f); setCurrentPage(1); }}
                    style={{
                      border: "none",
                      padding: "8px 0",
                      background: "transparent",
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: active ? 700 : 400,
                      fontSize: "20px",
                      lineHeight: "100%",
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase" as const,
                      color: active ? "#1A1A1A" : "#6E6E6E",
                      cursor: "pointer"
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid #A3A3A3",
                borderRadius: "10px",
                padding: "10px 16px",
                background: "#F9F9F9",
                minWidth: "350px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#6E6E6E" strokeWidth="1.5" />
                <path d="M10 10L12.5 12.5" stroke="#6E6E6E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search Insights, Topics, or keywords"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  color: "#6E6E6E",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section style={{ padding: "40px 0 0", minHeight: "600px" }}>
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "56px 40px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {pageCards.map((article, i) => {
                const globalIndex = ARTICLES.findIndex((a) => a === article);
                return (
                  <motion.div
                    key={article.title + i}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: (i % 3) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => navigate(`/blog/post/${globalIndex}`)}
                    style={{ display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer" }}
                  >
                    {/* Image — square aspect */}
                    <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", position: "relative", background: "#e0e0e0" }}>
                      <img src={article.img} alt={article.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    {/* Category + Read time on same row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#5F5F5F", margin: 0 }}>
                        {article.label}
                      </p>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "11px", color: "#5F5F5F", margin: 0 }}>
                        {article.readTime}
                      </p>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: "130%", letterSpacing: "-0.01em", color: "#414141", margin: 0 }}>
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "11px", lineHeight: "160%", color: "#6E6E6E", margin: 0, maxWidth: "370px" }}>
                      {article.description}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "48px 0 48px",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                border:"1px solid #9A9A9A",
                background: currentPage === page ? "#1a1a1a" : "#ffffff",
                color: currentPage === page ? "#ffffff" : "#414141",
                fontFamily: "'Space Grotesk','Cal Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: "0 24px",
              height: "44px",
              borderRadius: "10px",
              border: "1px solid #9A9A9A",
              background: "#ffffff",
              color: currentPage === totalPages ? "#cccccc" : "#414141",
              fontFamily: "'Space Grotesk', 'Cal Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              cursor: currentPage === totalPages ? "default" : "pointer",
              transition: "all 0.2s ease",
             }}
          >
            Next
          </button>
        </div>
      </div>

      {/* CTA Banner — green */}
      <section
        style={{
          background: "#02A884",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vertical panel lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${(i + 1) * 245.7}px`,
              width: "1px",
              background: "linear-gradient(180deg, #02A884 0%, rgba(247,248,250,0.4) 50.08%, #02A884 100%)",
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            maxWidth: "1304px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 2.6vw, 40px)",
              lineHeight: "115%",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: 0,
              maxWidth: "450px",
            }}
          >
            Want insights tailored to your brand?
          </h2>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(10px, 1.1vw, 13px)",
              lineHeight: "160%",
              color: "rgba(255,255,255,0.85)",
              margin: 0,
              maxWidth: "420px",
            }}
          >
            We can build a custom workshop or audit based on these ideas.
          </p>
          <motion.button
            onHoverStart={() => setCtaHover(true)}
            onHoverEnd={() => setCtaHover(false)}
            onClick={() => setFormOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              border: "1.5px solid #1a1a1a",
              borderRadius: "100px",
              background: "#ffffff",
              padding: "12px 20px 12px 26px",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: ctaHover ? "#ffffff" : "#1a1a1a",
              marginTop: "8px",
              position: "relative",
              overflow: "hidden",
              transition: "color 0.35s ease",
            }}
          >
            {/* Pan-out fill on hover */}
            <motion.span
              aria-hidden="true"
              initial={{ x: "-101%" }}
              animate={{ x: ctaHover ? "0%" : "-101%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#1a1a1a",
                borderRadius: "inherit",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>Become Client</span>
            <motion.div
              animate={{ background: ctaHover ? "#02A884" : "#1a1a1a" }}
              transition={{ duration: 0.35 }}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke={ctaHover ? "#1a1a1a" : "#ffffff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </section>

      <div style={{ maxWidth: "1304px", margin: "0 auto", padding: "0" }}>
        {/* Monthly Insights — search + popular tags */}
        <section
          style={{
            background: "#F7F8FA",
            padding: "72px 0 0",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "60px",
            alignItems: "flex-start",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "20px",
                  letterSpacing: "-2%",
                  textTransform: "uppercase",
                  color: "#888888",
                  margin: 0,
                }}
              >
                Case Studies
              </p>
              <h2
                style={{
                  fontFamily: "'Cal Sans','Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.4vw, 34px)",
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                  color: "#414141",
                  margin: 0,
                }}
              >
                Monthly insights on strategy, creative and growth.
              </h2>
            </div>

            {/* Search bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1.5px solid #d0d0d0",
                borderRadius: "10px",
                background: "#ffffff",
                padding: "13px 18px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#aaaaaa" strokeWidth="1.5" />
                <path d="M10 10L12.5 12.5" stroke="#aaaaaa" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search insights, Topics, or keywords"
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                  color: "#1a1a1a",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Right — Popular Tags */}
          <div
            style={{
              borderRadius: "14px",
              padding: "24px 24px 28px",
              background: "#F7F8FA",
              border: "1px solid #D8D8D8",
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: "-2%",
                textTransform: "uppercase",
                color: "#6E6E6E",
                margin: "0 0 16px",
              }}
            >
              Popular Tags
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {["Creative", "Creative", "Performance", "Strategy", "Strategy", "Branding"].map((tag, i) => (
                <button
                  key={tag + i}
                  style={{
                    padding: "10px 8px",
                    borderRadius: "8px",
                    border: "1px solid #D0D0D0",
                    background: "#D6D6D6",
                    fontFamily: "'Space Grotesk', Sora, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    letterSpacing: "-4%",
                    color: "#5F5F5F",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Curated Articles */}
        <section style={{ padding: "56px 0 100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: "-2%",
                textTransform: "uppercase",
                color: "#6E6E6E",
                margin: 0,
              }}
            >
              Case Studies
            </p>
            <h2
              style={{
                fontFamily: "'Cal Sans', sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "115%",
                letterSpacing: "-4%",
                color: "#414141",
                margin: 0,
              }}
            >
              A curated article or resource the team recommends.
            </h2>
          </div>

          {/* Horizontal article cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {ARTICLES.slice(1, 3).map((article, i) => (
              <motion.div
                key={article.title + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  border: "1px solid #eeeeee",
                }}
              >
                <div
                  style={{
                    width: "160px",
                    height: "120px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#e0e0e0",
                  }}
                >
                  <img
                    src={article.img}
                    alt={article.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(20px, 1.5vw, 28px)",
                      lineHeight: "130%",
                      letterSpacing: "-0.01em",
                      color: "#414141",
                      margin: 0,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(11px, 0.85vw, 13px)",
                      lineHeight: "155%",
                      color: "#6E6E6E",
                      margin: 0,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      letterSpacing: "-4%",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <ContactFormOverlay open={formOpen} onClose={() => setFormOpen(false)} />
      <SubscribePopup
        open={subscribeOpen}
        onClose={() => {
          sessionStorage.setItem("xg_subscribe_shown", "1");
          setSubscribeOpen(false);
        }}
      />
      <Footer />
    </div>
  );
}
