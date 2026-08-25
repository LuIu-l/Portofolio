"use client";

import Image from "next/image";
import {
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
  motion,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ImageItem {
  src: string;
  alt: string;
}

/**
 * Modulo wrap — keeps `v` in the half-open range [min, max).
 * Handles negative values correctly unlike JS built-in %.
 */
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// ─── Single infinite-scrolling row ───────────────────────────────────────────

interface MarqueeRowProps {
  images: ImageItem[];
  /** Speed in px/s. Negative = left, positive = right. */
  baseVelocity: number;
}

function MarqueeRow({ images, baseVelocity }: MarqueeRowProps) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the raw velocity so speed ramps feel springy, not snappy
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map smooth velocity to a speed-bonus multiplier  [-4 … 0 … 4]
  const velocityFactor = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [-4, 0, 4],
    { clamp: false }
  );

  // Measure the single-set track width after layout
  useEffect(() => {
    if (!trackRef.current) return;
    // scrollWidth = both duplicate sets, so divide by 2 for one set
    setTrackWidth(trackRef.current.scrollWidth / 2);
  }, [images.length]);

  // Right-moving rows start at -trackWidth so first motion goes toward 0
  useEffect(() => {
    if (baseVelocity > 0 && trackWidth > 0) {
      x.set(-trackWidth);
    }
  }, [trackWidth, baseVelocity, x]);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || trackWidth === 0) return;
    const speed = 1 + Math.abs(velocityFactor.get());
    const moveBy = baseVelocity * (delta / 1000) * speed;
    x.set(wrap(-trackWidth, 0, x.get() + moveBy));
  });

  // Duplicate for seamless infinite loop
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <motion.div
        ref={trackRef}
        className="flex gap-3 w-max"
        style={{ x, willChange: "transform" }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100"
            style={{ width: "224px", height: "144px" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="224px"
              className="object-cover"
              loading={i < 4 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface VelocityGalleryProps {
  images: ImageItem[];
}

export function VelocityGallery({ images }: VelocityGalleryProps) {
  const shouldReduceMotion = useReducedMotion();

  const mid = Math.ceil(images.length / 2);
  const topRow = images.slice(0, mid);
  const bottomRow = [...images.slice(mid)].reverse();

  // Reduced-motion fallback: static horizontal scroll strip
  if (shouldReduceMotion) {
    return (
      <div
        role="region"
        aria-label="Galeri foto"
        className="overflow-x-auto flex gap-3 pb-2 snap-x snap-mandatory"
      >
        {images.slice(0, 10).map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 snap-start rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100"
            style={{ width: "224px", height: "144px" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="224px"
              className="object-cover"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Galeri foto bergerak"
      className="flex flex-col gap-3 py-1"
    >
      <MarqueeRow images={topRow} baseVelocity={-60} />
      <MarqueeRow images={bottomRow} baseVelocity={60} />
    </div>
  );
}

