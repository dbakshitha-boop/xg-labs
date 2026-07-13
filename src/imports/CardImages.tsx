import { motion } from "motion/react";
import imgImage from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import imgImage1 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgImage2 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgImage3 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgImage4 from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png";
import imgImage5 from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";

const CARD_W = 312.893;
const CARD_H = 337.434;

// Positions are relative to the group wrapper (1316.43 x 476.15)
// Each entry: bounding-box left/top/w/h of the rotated card, plus the rotation
// Left positions are evenly spaced (185px gaps) so every card stays visible —
// the previous uneven spacing (down to a 70px gap near the end) buried the last card.
const CARDS = [
  { src: imgImage1, left: 0,   top: 44,  bw: 394.942, bh: 411.618, rotate: -14, z: 1 },
  { src: imgImage4, left: 185, top: 10,  bw: 389.24,  bh: 406.633, rotate:  12, z: 4 },
  { src: imgImage3, left: 370, top: 0,   bw: 362.404, bh: 382.746, rotate:  -8, z: 5 },
  { src: imgImage2, left: 555, top: 14,  bw: 350.144, bh: 371.652, rotate:   7, z: 3 },
  { src: imgImage,  left: 740, top: 40,  bw: 359.11,  bh: 379.776, rotate:  -9, z: 0 },
  { src: imgImage5, left: 925, top: 58,  bw: 391.425, bh: 408.548, rotate:  13, z: 2 },
];

export default function CardImages({ isVisible }: { isVisible?: boolean }) {
  return (
    // Group wrapper: top 800px in the 1080px container, centered horizontally
    <div
      style={{
        position: "absolute",
        top: 740,
        left: "50%",
        width: 1316.43,
        height: 476.15,
        transform: "translateX(-50%) scale(0.78)",
        transformOrigin: "top center",
      }}
    >
      {CARDS.map(({ src, left, top, bw, bh, rotate, z }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left,
            top,
            width: bw,
            height: bh,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: z,
          }}
        >
          <div
            style={{
              width: CARD_W,
              height: CARD_H,
              flexShrink: 0,
              transform: `rotate(${rotate}deg)`,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.1)",
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
