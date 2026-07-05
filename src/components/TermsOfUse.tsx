import { useNavigate } from "react-router-dom";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the XG Labs website, submitting an enquiry, subscribing to our newsletter, or engaging our services, you agree to these Terms of Use. If you do not agree, please discontinue use of our website and services.",
  },
  {
    title: "2. About XG Labs",
    body: "XG Labs is an MSME-registered creative growth agency based in Chennai, Tamil Nadu, India. Our services include branding, brand strategy, logo design, performance marketing, Meta Ads, Google Ads, LinkedIn Ads, SEO, website design and development, WordPress, Shopify, landing pages, social media management, content creation, video production, photography, graphic design, influencer marketing and marketing consultation.",
  },
  {
    title: "3. Eligibility",
    body: "You must be at least 18 years old or access this website with the consent and supervision of a parent or legal guardian.",
  },
  {
    title: "4. Website Use",
    body: "You agree to use this website only for lawful purposes. You must not attempt unauthorized access, distribute malware, copy content without permission, impersonate another person, or interfere with the website's operation.",
  },
  {
    title: "5. Service Enquiries",
    body: "Submitting an enquiry does not create a contractual relationship. Projects commence only after proposal approval and written confirmation by both parties.",
  },
  {
    title: "6. Project Scope",
    body: "Services are delivered according to the agreed scope of work. Requests outside the approved scope may require additional fees, revised timelines, or a separate agreement.",
  },
  {
    title: "7. Client Responsibilities",
    body: "Clients are responsible for providing accurate information, required assets, approvals, and timely feedback. Delays in client responses may affect project schedules.",
  },
  {
    title: "8. Revisions",
    body: "Projects include the number of revision rounds specified in the proposal. Additional revisions or significant changes after approval may attract additional charges.",
  },
  {
    title: "9. Payments & Refunds",
    body: "Payments shall be made according to the approved proposal or invoice. Refunds are generally not available once work has commenced; however, exceptional requests may be reviewed on a case-by-case basis at the sole discretion of XG Labs.",
  },
  {
    title: "10. Ownership & Portfolio Rights",
    body: "Upon full payment, ownership of the agreed final deliverables transfers to the client. XG Labs retains the right to display completed work in its portfolio, website, presentations, social media, and marketing materials unless restricted by a signed Non-Disclosure Agreement (NDA).",
  },
  {
    title: "11. Client Content",
    body: "The client warrants that all logos, text, images, videos, trademarks, music, and other materials supplied to XG Labs are owned by the client or used with proper authorization. XG Labs is not responsible for infringement arising from client-provided content.",
  },
  {
    title: "12. AI-Assisted Services",
    body: "Certain deliverables may be created with the assistance of AI tools. Every AI-assisted output is reviewed by a human before delivery. Clients remain responsible for reviewing and approving final deliverables before publication or implementation.",
  },
  {
    title: "13. Third-Party Platforms",
    body: "Projects may involve platforms including Meta, Google, LinkedIn, WordPress, Shopify, Adobe, Canva, Figma, OpenAI, Claude, and similar services. XG Labs is not responsible for outages, pricing changes, policy updates, algorithm changes, or service interruptions affecting these platforms.",
  },
  {
    title: "14. Marketing Disclaimer",
    body: "Marketing is a collaborative and data-driven process rather than a guaranteed outcome. While XG Labs applies industry best practices, strategic thinking, creative execution, and continuous optimization, results such as leads, conversions, sales, revenue, search rankings, ROAS, or business growth depend on many external factors including competition, audience behaviour, product-market fit, budgets, platform algorithms, market conditions, and client responsiveness. Accordingly, XG Labs cannot guarantee specific commercial outcomes but is committed to delivering services professionally, transparently, and with continuous improvement.",
  },
  {
    title: "15. Confidentiality",
    body: "Both parties agree to keep confidential information private unless disclosure is required by law or authorised in writing.",
  },
  {
    title: "16. Limitation of Liability",
    body: "To the maximum extent permitted by law, XG Labs shall not be liable for indirect, incidental, special, or consequential losses. Any liability shall not exceed the fees paid for the specific service giving rise to the claim.",
  },
  {
    title: "17. Termination",
    body: "Either party may terminate a project in accordance with the agreed commercial terms. Completed work and outstanding invoices remain payable.",
  },
  {
    title: "18. Changes to These Terms",
    body: "XG Labs may update these Terms from time to time. Continued use of the website constitutes acceptance of the revised Terms.",
  },
  {
    title: "19. Governing Law",
    body: "These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu, India.",
  },
];

export function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("/", { state: { skipLoading: true } })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#666",
            padding: 0,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#000")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#666")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#0a0a0a", letterSpacing: "-0.01em" }}>Xg Labs</span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px 96px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1
            style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#0a0a0a",
              margin: "0 0 12px",
            }}
          >
            Terms of Use
          </h1>
          <p style={{ fontSize: 14, color: "#9A9A9A", margin: 0 }}>Last Updated: July 2026</p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0a0a0a",
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#444", margin: 0 }}>{body}</p>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              20. Contact
            </h2>
            <div style={{ fontSize: 15, lineHeight: 1.75, color: "#444" }}>
              <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#0a0a0a" }}>XG Labs</p>
              <p style={{ margin: "0 0 4px" }}>
                Email:{" "}
                <a href="mailto:xglabs@thebrandopedia.in" style={{ color: "#02A884", textDecoration: "none" }}>
                  xglabs@thebrandopedia.in
                </a>
              </p>
              <p style={{ margin: "0 0 4px" }}>
                Phone:{" "}
                <a href="tel:+916369974530" style={{ color: "#02A884", textDecoration: "none" }}>
                  +91 63699 74530
                </a>
              </p>
              <p style={{ margin: 0 }}>Chennai, Tamil Nadu, India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid #e5e5e5" }}>
          <p style={{ fontSize: 13, color: "#9A9A9A", margin: 0 }}>© 2025 XG Labs. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
