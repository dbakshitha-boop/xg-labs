import { motion } from "motion/react";
import imgImage from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import imgImage1 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgImage2 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgImage3 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgImage4 from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png";
import imgImage5 from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";

// Base card size at scale=1. Positions/sizes below are the single canonical
// collage layout — every breakpoint renders the exact same arrangement and
// just scales it up or down via the `scale` prop, rather than reflowing to a
// different layout per breakpoint.
const CARD_W = 175;
const CARD_H = 189;

// z rises to a single peak at the Ash cup (center card) then falls back down —
// a "unimodal" sequence. This is safe for the same reason strict monotonic is:
// every card left of the peak has strictly lower z than everything to its
// right up to the peak (so its left side is never covered), and every card
// right of the peak has strictly lower z than everything to its left down to
// the peak (so its right side is never covered). The peak card itself has
// both neighbours lower, so it's fully visible — centered AND prominent.
const CARDS = [
  { src: imgImage1, left: 0,   top: 10, rotate: -9, z: 1 },
  { src: imgImage2, left: 55,  top: 6,  rotate:  5, z: 3 },
  { src: imgImage3, left: 110, top: 0,  rotate: -6, z: 5 }, // Ash cup (Andhra Spicy House) — center, most prominent
  { src: imgImage4, left: 165, top: 4,  rotate:  8, z: 4 }, // Go Wheels business card
  { src: imgImage,  left: 220, top: 8,  rotate: -7, z: 2 }, // mahaspeakss sign
  { src: imgImage5, left: 275, top: 12, rotate: 10, z: 0 }, // Go Wheels "GO!" badge
];

const GROUP_W = 275 + CARD_W;
const GROUP_H = 12 + CARD_H;

export default function CardImages({
  isVisible,
  scale = 1,
  top = 0,
}: {
  isVisible?: boolean;
  /** Scales the whole collage (size + spacing together) so it can be reused at any breakpoint without reflowing. */
  scale?: number;
  /** Vertical offset (px) for the collage wrapper. */
  top?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: "50%",
        width: GROUP_W * scale,
        height: GROUP_H * scale,
        transform: "translateX(-50%)",
        pointerEvents: "auto",
      }}
    >
      {CARDS.map(({ src, left, top: cardTop, rotate, z }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: left * scale,
            top: cardTop * scale,
            width: CARD_W * scale,
            height: CARD_H * scale,
            zIndex: z,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${rotate}deg)`,
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
            }}
          >
            <img
              alt=""
              src={src}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
