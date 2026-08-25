"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScrollExpandMediaProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  bgImageSrc: string;
  title: string;
  subtitle: string;
  scrollToExpandText?: string;
  className?: string;
}

export function ScrollExpandMedia({
  mediaType,
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollToExpandText = "Scroll untuk mulai",
  className,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? [1, 1] : [0.3, 1]);
  const mediaRadius = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? ["0rem", "0rem"] : ["2rem", "0rem"]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.3, 1], shouldReduceMotion ? [1, 1, 1] : [0, 1, 1]);

  const titleLeftX = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-100%"]);
  const titleRightX = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? ["0%", "0%"] : ["0%", "100%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], shouldReduceMotion ? [1, 1] : [1, 0]);

  const words = title.split(" ");
  const halfIdx = Math.floor(words.length / 2);
  const leftTitle = words.slice(0, halfIdx).join(" ");
  const rightTitle = words.slice(halfIdx).join(" ");

  return (
    <div ref={containerRef} className={cn("relative h-[300vh] w-full", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-50">
        
        {/* Background Image (very faint, light treatment) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${bgImageSrc})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50/80 to-slate-50" />

        {/* Split Title */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex gap-2 md:gap-6 overflow-hidden px-4 w-full justify-center items-center flex-wrap">
            <motion.h1 
              style={{ x: titleLeftX, opacity: titleOpacity }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-slate-900 tracking-tight"
            >
              {leftTitle}
            </motion.h1>
            <motion.h1 
              style={{ x: titleRightX, opacity: titleOpacity }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-slate-400 tracking-tight"
            >
              {rightTitle}
            </motion.h1>
          </div>
          <motion.p 
            style={{ opacity: titleOpacity }}
            className="mt-6 text-base text-slate-500 font-medium tracking-wide"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Expanding media — light shadow, no glow */}
        <motion.div
          style={{ 
            scale: mediaScale, 
            borderRadius: mediaRadius,
            opacity: mediaOpacity,
          }}
          className="relative z-20 w-[90vw] md:w-[60vw] aspect-video overflow-hidden shadow-[0_8px_48px_rgba(15,23,42,0.15)] flex items-center justify-center bg-slate-100 border border-slate-200"
        >
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover"
              aria-label="Video presentasi portofolio"
            />
          ) : (
            <Image
              src={mediaSrc}
              alt="Gambar presentasi portofolio utama"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 60vw"
              className="object-cover"
            />
          )}
        </motion.div>

        {/* Scroll Hint */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-slate-400"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-medium">{scrollToExpandText}</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-slate-400 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
