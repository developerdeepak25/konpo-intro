"use client";
import Image, { ImageProps } from "next/image";
import { motion } from "motion/react";
import { CARDS_SPACING } from "@/app/page";
import { useEffect, useState } from "react";

const LoadersImageWrapper = ({
  alt,
  index,
  cardWidth,
  deltaX,
  deltaY,
  startAnimation,
  onAnimationComplete,
  ...props
}: ImageProps & {
  index: number;
  cardWidth: number;
  deltaX: number;
  deltaY: number;
  startAnimation: boolean;
  onAnimationComplete?: () => void;
}) => {
  const [scrollBarWidth, setScrollBarWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScrollBarWidth(
        window.innerWidth - document.documentElement.clientWidth,
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const deltXWithCorrection =
    scrollBarWidth !== null
      ? deltaX + CARDS_SPACING - scrollBarWidth / 2
      : null;

  return (
    <motion.div
      className="h-56 rounded-lg overflow-hidden absolute "
      style={{
        zIndex: 20 - index,
        width: `${cardWidth}px`,
      }}
      initial={{ x: 0, y: 0 }}
      animate={
        startAnimation && deltXWithCorrection !== null
          ? { x: deltXWithCorrection, y: deltaY }
          : { x: 0, y: 0 }
      }
      transition={{
        duration: 1.25,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="h-full rounded-lg overflow-hidden">
        <Image
          {...props}
          alt={alt ?? ""}
          width={1200}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export default LoadersImageWrapper;
