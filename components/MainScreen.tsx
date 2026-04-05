"use client";
import { CARDS_SPACING, images } from "@/app/page";
import ImageWrapper from "./ImageWrapper";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const MainScreen = ({
  startAnimation,
  onStackPositionChange,
  onCardWidthChange,
}: {
  startAnimation: boolean;
  onStackPositionChange: (pos: { left: number; top: number }) => void;
  onCardWidthChange: (width: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cardWidth = (containerWidth - CARDS_SPACING * 2) / 3;

  useEffect(() => {
    if (cardWidth > 0) onCardWidthChange(cardWidth);
  }, [cardWidth, onCardWidthChange]);

  useEffect(() => {
    const updateBounds = () => {
      if (!stackRef.current) return;
      const rect = stackRef.current.getBoundingClientRect();
      onStackPositionChange({ left: rect.left, top: rect.top });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [containerWidth, onStackPositionChange]);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Header */}
        <motion.header
          className="fixed inset-x-0 top-0 z-50 bg-transparent"
          initial={{ opacity: 0, y: -14 }}
          animate={{
            opacity: startAnimation ? 1 : 0,
            y: startAnimation ? 0 : -14,
          }}
          transition={{
            duration: 0.8,
            delay: 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <button className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              menu
            </button> */}
              <div className="text-2xl font-bold">Brand Logo</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-600 dark:text-zinc-300 hidden sm:block">
                Good night!
              </span>
              <a
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
                href="#"
              >
                Hire us
              </a>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <main className="pt-28 pb-24">
          <motion.section
            className="flex items-center justify-center min-h-[55vh] px-6 py-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: startAnimation ? 1 : 0,
              y: startAnimation ? 0 : 24,
            }}
            transition={{
              duration: 0.9,
              delay: 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="max-w-5xl text-center">
              <h1 className="text-6xl sm:text-[96px] font-extrabold leading-[0.95] tracking-tight text-black dark:text-white">
                Full-Stack Design{" "}
                <span className="text-zinc-400 line-through mx-2">Agency</span>{" "}
                Studio.
              </h1>

              <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                Konpo is a plug-and-play crew of seasoned designers, for CXOs
                that know design is an unfair advantage.
              </p>
            </div>
          </motion.section>

          {/* Images row */}
          <section className="">
            <div className="max-w-6xl mx-auto" ref={ref}>
              <div
                ref={stackRef}
                className={`ref-stack-main flex flex-nowrap  overflow-x-hidden -ml-[${CARDS_SPACING}px] relative`}
                style={{
                  marginLeft: -CARDS_SPACING + "px",
                }}
              >
                {/*  */}
                {containerWidth > 0 &&
                  images.map((src, index) => (
                    <ImageWrapper
                      key={index}
                      src={src}
                      alt={`Slide ${index + 1}`}
                      index={index}
                      // cardWidth={containerWidth / 3}
                      cardWidth={cardWidth}
                      startAnimation={startAnimation}
                    />
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MainScreen;
