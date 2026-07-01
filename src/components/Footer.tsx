import React from "react";
import { useNavigate } from "react-router-dom";

const MENU_LINKS = [
  { label: "Home", path: "/" },
  { label: "Works", path: "/portfolio" },
  { label: "About", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/" },
];

// Each label maps to its index in ServicesPage's SERVICES array
// (PERFORMANCE MARKETING=0, SEO=1, WEB DEVELOPMENT=2, SOCIAL MEDIA MANAGEMENT=3,
//  CONTENT CREATION & VIDEO PRODUCTION=4, INFLUENCER MARKETING=5, BRANDING=6)
const SERVICES: { label: string; index: number }[] = [
  { label: "Performance Marketing",   index: 0 },
  { label: "SEO",                     index: 1 },
  { label: "Content & Video",         index: 4 },
  { label: "Influencer Marketing",    index: 5 },
  { label: "Social Media Management", index: 3 },
  { label: "Web Development",         index: 2 },
  { label: "Branding",               index: 6 },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 400,
  fontSize: "clamp(14px, 1.1vw, 16px)",
  color: "rgba(255,255,255,0.55)",
  textDecoration: "none",
  display: "block",
  cursor: "pointer",
  transition: "color 0.18s",
  lineHeight: "1",
};

const colHeadStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#ffffff",
  margin: 0,
};

// Social icon SVGs
function IconInstagram() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.262 5.636 5.902-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.486a.5.5 0 0 0 .609.61l5.757-1.509A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 0 1-5.007-1.374l-.359-.213-3.718.974.993-3.63-.234-.373A9.817 9.817 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  );
}

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer id="footer" style={{ background: "#0a0a0a", overflow: "hidden" }}>
      <style>{`
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr !important; padding: 24px 20px !important; }
          .footer-bottom { flex-direction: column !important; gap: 12px !important; padding: 16px 20px !important; }
          .footer-bottom-bar { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 20px !important; padding: 24px 20px !important; text-align: center !important; }
          .footer-bottom-bar-legal { align-items: center !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; padding: 24px 32px !important; }
        }
      `}</style>

      {/* ── Giant headline ── */}
      <div
        className="footer-headline"
        style={{
          padding: "32px 0 24px",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 8vw, 130px)",
            lineHeight: "0.71",
            letterSpacing: "0",
            textTransform: "uppercase",
            color: "#D9D9D9",
            margin: 0,
            whiteSpace: "nowrap",
            textAlign: "center",
            width: "100%",
          }}
        >
          WE&rsquo;RE READY FOR OUR NEXT CHALLENGE
        </h2>
      </div>

      {/* ── Three-column info section ── */}
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "24px 48px 28px",
          gap: "24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Connect with */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={colHeadStyle}>Connect With</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <a
              href="mailto:xglabs@thebrandopedia.in"
              style={{
                ...linkStyle,
                fontSize: "clamp(16px, 1.5vw, 22px)",
                color: "#9A9A9A",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#9A9A9A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.72)")}
            >
              xglabs@thebrandopedia.in
            </a>
            <a
              href="tel:+916369974530"
              style={{
                ...linkStyle,
                fontSize: "clamp(16px, 1.5vw, 22px)",
                color: "#9A9A9A",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.72)")}
            >
              +91 63699 74530
            </a>
            <p
              style={{
                ...linkStyle,
                fontSize: "clamp(16px, 1.5vw, 22px)",
                color: "#9A9A9A",
              }}
            >
              Chennai, Tamilnadu, India.
            </p>
          </div>
        </div>

        {/* Menu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={colHeadStyle}>Menu</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {MENU_LINKS.map((item) => (
              <span
                key={item.label}
                onClick={() => navigate(item.path)}
                style={linkStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#ECEFF1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.55)")}
              >
                {item.label}
              </span>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={colHeadStyle}>Services</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SERVICES.map((s) => (
              <span
                key={s.label}
                onClick={() => navigate("/services", { state: { serviceIndex: s.index } })}
                style={{ ...linkStyle, cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#ffffff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.55)")}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="footer-bottom-bar"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "20px 48px",
          gap: "24px",
        }}
      >
        {/* Wordmark */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#9A9A9A",
            letterSpacing: "-0.01em",
          }}
        >
          Xg Labs
        </span>

        {/* Social icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { icon: <IconInstagram />, href: "https://www.instagram.com/xglabs/", label: "Instagram" },
            { icon: <IconLinkedIn />, href: "https://www.linkedin.com/company/xg-labs", label: "LinkedIn" },
            { icon: <IconFacebook />, href: "https://www.facebook.com/people/XG-Labs/61578098947253/", label: "Facebook" },
            { icon: <IconWhatsApp />, href: "https://wa.me/916369974530", label: "WhatsApp" },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: "#9A9A9A",
                display: "flex",
                alignItems: "center",
                transition: "color 0.18s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Legal */}
        <div
          className="footer-bottom-bar-legal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#9A9A9A",
              margin: 0,
            }}
          >
            © 2025 XG Labs. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#9A9A9A",
              margin: 0,
            }}
          >
            Privacy Policy • Terms of Use
          </p>
        </div>
      </div>

    </footer>
  );
}
