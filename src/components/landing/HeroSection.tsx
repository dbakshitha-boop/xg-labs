import React from "react";
import { LandingSequence } from "./LandingSequence";

export function HeroSection({ startSequence }: { startSequence: boolean }) {
  return <LandingSequence startSequence={startSequence} />;
}
