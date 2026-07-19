
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import soraFontUrl from "./assets/fonts/Sora/Sora-VariableFont_wght.woff2?url";
  import calSansFontUrl from "./assets/fonts/Cal_Sans/CalSans-Regular.woff2?url";

  // Preload the two fonts used site-wide so the browser fetches them immediately
  // (in parallel with JS), instead of only discovering them once the CSS is
  // parsed later — this is what actually removes the flash-of-fallback-text on
  // slower connections, not just smaller file size.
  function preloadFont(href: string) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.href = href;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
  preloadFont(soraFontUrl);
  preloadFont(calSansFontUrl);

  createRoot(document.getElementById("root")!).render(<App />);
