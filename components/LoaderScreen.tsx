"use client";
import { images } from "@/app/page";
import { useEffect, useRef, useState } from "react";
import LoadersImageWrapper from "./LoadersImageWrapper";

const LoaderScreen = ({
  targetStackPosition,
  cardWidth,
  onAnimationDone,
}: {
  targetStackPosition: { left: number; top: number } | null;
  cardWidth: number;
  onAnimationDone: () => void;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [startAnimation, setStartAnimation] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    const rootEl = rootRef.current;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${sbw}px`;
    if (rootEl) {
      rootEl.style.paddingRight = `${sbw}px`;
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (rootEl) {
        rootEl.style.paddingRight = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!targetStackPosition || !stackRef.current || cardWidth <= 0) return;
    const loaderRect = stackRef.current.getBoundingClientRect();

    setDelta({
      x: targetStackPosition.left - loaderRect.left,
      y: targetStackPosition.top - loaderRect.top,
    });
    const raf = requestAnimationFrame(() => setStartAnimation(true));
    return () => cancelAnimationFrame(raf);
  }, [targetStackPosition, cardWidth]);

  useEffect(() => {
    if (!isDone) return;
    document.body.style.overflow = "";
    onAnimationDone();
  }, [isDone, onAnimationDone]);

  const handleAnimationComplete = (index: number) => {
    if (!startAnimation) return;
    if (index !== images.length - 1 || isDone) return;
    setIsDone(true);
  };

  if (isDone) return null;

  return (
    <div
      ref={rootRef}
      className="loader h-screen bg-white dark:bg-black height-screen fixed inset-0 z-500 flex"
    >
      <div className="w-full max-w-6xl mx-auto relative min-h-[420px]">
        <div
          ref={stackRef}
          className="loader-stack absolute top-16 right-6 h-56"
          style={{
            width: `${cardWidth}px`,
          }}
        >
          {[...images].reverse().map((src, index) => (
            <LoadersImageWrapper
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              index={index}
              // cardWidth={containerWidth / 3}
              cardWidth={cardWidth}
              deltaX={delta.x}
              deltaY={delta.y}
              startAnimation={startAnimation}
              onAnimationComplete={() => handleAnimationComplete(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen;
