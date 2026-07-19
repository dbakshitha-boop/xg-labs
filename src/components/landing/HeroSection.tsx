import React from "react";
import { LandingSequence } from "./LandingSequence";

export function HeroSection({ startSequence, skipIntro, jumpPastHero }: { startSequence: boolean; skipIntro?: boolean; jumpPastHero?: boolean }) {
  return <LandingSequence startSequence={startSequence} skipIntro={skipIntro} jumpPastHero={jumpPastHero} />;
}
