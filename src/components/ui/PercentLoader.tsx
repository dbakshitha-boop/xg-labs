import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";

// Same percentage-counter look as the landing page's intro loading screen,
// reused as a lightweight loading indicator for async page/data fetches.
// Always plays a full 0 -> 100 count-up on mount so it's visible even when
// the real fetch resolves quickly (tying it to actual load speed meant it
// could unmount again before ever ticking past 0%).
export function PercentLoader({ dark = false }: { loading?: boolean; dark?: boolean }) {
  const progress = useMotionValue(0);
  const [displayVal, setDisplayVal] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    setDisplayVal(Math.round(latest));
  });

  useEffect(() => {
    const controls = animate(progress, 100, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [progress]);

  return (
    <span
      className="font-['Cal_Sans',sans-serif] tabular-nums"
      style={{
        display: "block",
        fontSize: "clamp(32px, 6vw, 56px)",
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: dark ? "#ffffff" : "#414141",
      }}
    >
      {displayVal < 10 ? `0${displayVal}` : displayVal}%
    </span>
  );
}
