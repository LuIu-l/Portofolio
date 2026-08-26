"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";

interface ImageItem {
  src: string;
  alt: string;
}

interface MotionLayerScrollerProps {
  images: ImageItem[];
}

// ─── Per-layer config ─────────────────────────────────────────────────────────
// translateY range = how far (px) a layer travels during the section scroll.
// Positive start / less positive end = layer moves "with" scroll but slower.
// The front layer has the largest delta = fastest apparent movement.
const LAYER_CONFIG = [
  { id: "back",  colStart: 0,  count: 5, yRange: [-30,  80] as [number, number], opacity: 0.65, brightness: 0.80, scale: 0.88 },
  { id: "mid",   colStart: 5,  count: 5, yRange: [-60, 140] as [number, number], opacity: 0.82, brightness: 0.90, scale: 0.94 },
  { id: "front", colStart: 10, count: 5, yRange: [-100, 200] as [number, number], opacity: 1.00, brightness: 1.00, scale: 1.00 },
];

// Horizontal positions — three columns so layers don't fully hide each other
const X_OFFSETS = ["5%", "37%", "68%"];

// ─── One photo card ───────────────────────────────────────────────────────────
function ParallaxCard({
  src,
  alt,
  isEager,
}: {
  src: string;
  alt: string;
  isEager?: boolean;
}) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md bg-slate-100 aspect-[3/4] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 45vw, 22vw"
        quality={65}
        className="object-cover"
        loading={isEager ? "eager" : "lazy"}
      />
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
export function MotionLayerScroller({ images }: MotionLayerScrollerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track whether section is near the viewport so we can toggle will-change
  const inView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  // Scroll progress relative to THIS section only
  // 0 = section top enters viewport bottom, 1 = section bottom leaves viewport top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Three motion values, one per layer — computed only when scroll events fire
  const yBack  = useTransform(scrollYProgress, [0, 1], LAYER_CONFIG[0].yRange);
  const yMid   = useTransform(scrollYProgress, [0, 1], LAYER_CONFIG[1].yRange);
  const yFront = useTransform(scrollYProgress, [0, 1], LAYER_CONFIG[2].yRange);
  const yValues = [yBack, yMid, yFront];

  // Use at most 15 photos (5 per layer). TiltFlow below shows the full set.
  const pool = images.slice(0, 15);

  return (
    <section
      ref={sectionRef}
      aria-label="Lapisan foto parallax"
      className="relative overflow-hidden min-h-[160vh] w-full"
    >
      {/* Subtle scroll hint label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none">
        <p className="text-slate-400 text-xs tracking-[0.25em] uppercase font-medium">
          scroll to explore
        </p>
      </div>

      {/* Gradient fade — top */}
      <div
        className="absolute inset-x-0 top-0 h-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }}
      />
      {/* Gradient fade — bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }}
      />

      {/* Three parallax layers */}
      {LAYER_CONFIG.map((cfg, li) => {
        const layerImages = pool.slice(cfg.colStart, cfg.colStart + cfg.count);
        if (layerImages.length === 0) return null;

        return (
          <motion.div
            key={cfg.id}
            className="absolute top-0 flex flex-col gap-4 w-[28%] sm:w-[22%]"
            style={{
              left: X_OFFSETS[li],
              // In reduced-motion mode keep layers static (translateY = 0)
              translateY: shouldReduceMotion ? 0 : yValues[li],
              opacity: cfg.opacity,
              filter: `brightness(${cfg.brightness})`,
              scale: cfg.scale,
              // Only hint the GPU for this layer while section is near viewport
              willChange: inView && !shouldReduceMotion ? "transform" : "auto",
            }}
            aria-hidden="true"
          >
            {layerImages.map((img, i) => (
              <ParallaxCard
                key={img.src}
                src={img.src}
                alt={img.alt}
                isEager={li === 2 && i === 0}
              />
            ))}
          </motion.div>
        );
      })}
    </section>
  );
}
