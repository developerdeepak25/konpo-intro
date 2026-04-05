"use client";
import LoaderScreen from "@/components/LoaderScreen";
import MainScreen from "@/components/MainScreen";
import { useState } from "react";

export const images = [
  "/hero-slides/slide1.webp",
  "/hero-slides/slide3.webp",
  "/hero-slides/slide2.webp",
  "/hero-slides/slide6.webp",
  "/hero-slides/slide5.webp",
  "/hero-slides/slide4.webp",
];
export const CARDS_SPACING = 28;

export default function Home() {
  const [startMainAnimation, setStartMainAnimation] = useState(false);
  const [targetStackPosition, setTargetStackPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [mainCardWidth, setMainCardWidth] = useState(0);

  return (
    <div>
      <MainScreen
        startAnimation={startMainAnimation}
        onStackPositionChange={setTargetStackPosition}
        onCardWidthChange={setMainCardWidth}
      />
      <LoaderScreen
        targetStackPosition={targetStackPosition}
        cardWidth={mainCardWidth}
        onAnimationDone={() => setStartMainAnimation(true)}
      />
    </div>
  );
}
