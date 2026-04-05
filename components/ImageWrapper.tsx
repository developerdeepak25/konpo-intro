'use client';
import Image, { ImageProps } from "next/image";
import { motion } from "motion/react";
import { CARDS_SPACING } from "@/app/page";

const ImageWrapper = ({
  alt,
  index,
  cardWidth,
  startAnimation,
  ...props
}: ImageProps & {
  index: number;
  cardWidth: number;
  startAnimation: boolean;
}) => {
  return (
    <motion.div
      // ref={cardRef}
      className={`h-56 rounded-lg overflow-hidden shadow-lg basis-1/3 shrink-0`}
      style={{
        paddingLeft: CARDS_SPACING + "px",
        // x,
      }}
      initial={{ x: -((cardWidth + CARDS_SPACING) * index) }}
      animate={{
        x: startAnimation ? 0 : -((cardWidth + CARDS_SPACING) * index),
      }}
      transition={{
        duration: 2.5,
        delay: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="h-full   rounded-lg overflow-hidden">
        <Image
          {...props}
          alt={alt ?? ""}
          width={1200}
          height={400}
          className="w-full h-full object-cover  transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export default ImageWrapper;
