"use client";

import { useState } from "react";
import { ScrollExpandMedia } from "@/components/blocks/scroll-expansion-hero";
import { motion } from "framer-motion";

export default function Hero() {
  const [mediaType, setMediaType] = useState<"video" | "image">("image");

  return (
    <section id="hero" className="relative w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed top-24 right-4 z-[60] bg-white/80 backdrop-blur-md rounded-full p-1 flex items-center border border-slate-200 shadow-sm"
        role="group"
        aria-label="Toggle media type"
      >
        <button
          onClick={() => setMediaType("image")}
          aria-pressed={mediaType === "image"}
          aria-label="Tampilkan gambar portofolio"
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
            mediaType === "image" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Image
        </button>
        <button
          onClick={() => setMediaType("video")}
          aria-pressed={mediaType === "video"}
          aria-label="Tampilkan video portofolio"
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
            mediaType === "video" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Video
        </button>
      </motion.div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={
          mediaType === "image"
            ? "/images/hero/hero-media.jpg"
            : "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4" // TODO: ganti dengan video showreel asli
        }
        bgImageSrc="/images/hero/hero-bg.jpg"
        title="Alif Ikhwan Aulad Alhafidz"
        subtitle="Developer & Fotografer/Videografer"
        scrollToExpandText="Scroll untuk mulai"
      />
    </section>
  );
}
