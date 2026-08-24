"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rectCache = useRef<DOMRect | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mq.matches && !shouldReduceMotion);
    const handler = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches && !shouldReduceMotion);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [shouldReduceMotion]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);

  const scaleValue = useMotionValue(1);
  const scale = useSpring(scaleValue, { stiffness: 200, damping: 20 });

  function handleMouseEnter() {
    if (!isHoverDevice || !cardRef.current) return;
    // Cache rect once on enter — avoids forced layout per mousemove
    rectCache.current = cardRef.current.getBoundingClientRect();
    scaleValue.set(1.02);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isHoverDevice || !rectCache.current) return;
    const rect = rectCache.current;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    if (!isHoverDevice) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    scaleValue.set(1);
    rectCache.current = null;
  }

  if (!isHoverDevice) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    // Perspective on static wrapper — not on the animated element
    // This prevents perspective recalculation on every animation frame
    <div style={{ perspective: 800 }} className={cn("relative", className)}>
      <motion.div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
