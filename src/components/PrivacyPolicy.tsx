import { useNavigate } from "react-router-dom";
import xgLogo from "../assets/whatmakesus/1.png";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "This Privacy Policy explains how XG Labs collects, uses, stores, and protects personal information when you use our website or engage with our services.",
  },
  {
    title: "2. Information We Collect",
    body: "We may collect your name, email address, phone number, company name, and details you submit through our enquiry forms. If you subscribe to our newsletter, we collect your email address for communication purposes.",
  },
  {
    title: "3. How We Use Your Information",
    body: "We use your information to respond to enquiries, provide requested services, prepare proposals, communicate during projects, send newsletters you have subscribed to, improve our website and services, and comply with legal obligations.",
  },
  {
    title: "4. Newsletter & Marketing Communications",
    body: "If you subscribe to our newsletter, we may send updates, blogs, case studies, insights, and company announcements. You may unsubscribe at any time using the unsubscribe link or by contacting us directly.",
  },
  {
    title: "5. Cookies & Analytics",
    body: "Our website does not currently use a cookie consent banner or advertising cookies. In the future, we may implement analytics or marketing technologies such as Google Analytics, Meta Pixel, LinkedIn Insight Tag, Google Ads Conversion Tracking, or similar tools. If significant tracking technologies are introduced, this Privacy Policy will be updated accordingly.",
  },
  {
    title: "6. Sharing of Information",
    body: "We do not sell or rent your personal information. Information may be shared with trusted service providers or technology partners only where necessary to deliver our services, operate our website, or comply with applicable laws.",
  },
  {
    title: "7. Third-Party Services",
    body: "Our services may integrate with platforms including Meta, Google, LinkedIn, WordPress, Shopify, Adobe, Canva, Figma, OpenAI, Claude, WhatsApp Business, and similar providers. These platforms operate under their own privacy policies and terms.",
  },
  {
    title: "8. Data Security",
    body: "XG Labs uses reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, disclosure, alteration, or destruction. While we strive to safeguard your information, no online system can guarantee absolute security.",
  },
  {
    title: "9. Data Retention",
    body: "We retain personal information only for as long as reasonably necessary to fulfil business, contractual, legal, and regulatory obligations or until deletion is requested where applicable.",
  },
  {
    title: "10. Your Rights",
    body: "Subject to applicable law, you may request access to, correction of, or deletion of your personal information. You may also withdraw consent for marketing communications at any time.",
  },
  {
    title: "11. Children's Privacy",
    body: "Our website is not intended for children under 18 years of age. Individuals under 18 should use the website only with the supervision and consent of a parent or legal guardian.",
  },
  {
    title: "12. International Visitors",
    body: "If you access our website from outside India, you acknowledge that your information may be processed in India. We apply reasonable safeguards to protect personal information irrespective of location.",
  },
  {
    title: "13. Compliance",
    body: "XG Labs aims to handle personal information responsibly in accordance with applicable Indian data protection laws, including the Digital Personal Data Protection Act, 2023 (DPDP Act), and follows internationally recognized privacy principles where applicable.",
  },
  {
    title: "14. Changes to this Privacy Policy",
    body: "We may update this Privacy Policy from time to time. The latest version will always be available on this page with the updated effective date.",
  },
];

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Sora', sans-serif" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          height: "56px",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "visible",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Sora', sans-serif",
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
        <img src={xgLogo} alt="Xg Labs" style={{ height: 160, width: "auto", display: "block", flexShrink: 0 }} />
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
            Privacy Policy
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
              15. Contact Us
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
              <p style={{ margin: 0 }}>Location: Chennai, Tamil Nadu, India</p>
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
