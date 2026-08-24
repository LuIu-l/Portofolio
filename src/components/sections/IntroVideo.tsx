"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// TODO: ganti dengan video HLS asli sebelum publish
// Cara dapetin HLS dari video biasa:
//   - Upload ke Mux / Cloudflare Stream / Bunny Stream → dapat .m3u8 otomatis
//   - Atau convert manual dengan ffmpeg
const HLS_SRC = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default function IntroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Store Hls instance — typed loosely to avoid importing type at module level
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hlsRef = useRef<any>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let destroyed = false;

    async function initHLS() {
      if (!video || destroyed) return;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari: native HLS support — no hls.js needed
        video.src = HLS_SRC;
        video.play().catch(() => {
          // Autoplay blocked silently — video stays paused, fine
        });
      } else {
        // Chrome / Firefox / Edge — load hls.js dynamically (code-split, not in initial bundle)
        const { default: Hls } = await import("hls.js");
        if (destroyed || !Hls.isSupported()) return;

        const hls = new Hls({
          // Reduce memory pressure: don't buffer too far ahead
          maxBufferLength: 20,
          maxMaxBufferLength: 30,
          lowLatencyMode: false,
        });
        hlsRef.current = hls;
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video?.play().catch(() => {});
        });
      }
    }

    // Lazy init: only load HLS when section enters viewport
    // Avoids downloading video data while user is still on Hero above
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initHLS();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    return () => {
      destroyed = true;
      observer.disconnect();
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-video"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── Video background ──────────────────────────────────────── */}
      {/* Dark placeholder shown while video loads */}
      <div className="absolute inset-0 bg-slate-800" aria-hidden="true" />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Dark overlay — keeps text readable over any video ─────── */}
      {/* bg-black/40: enough contrast, not so dark the video disappears */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* ── Subtle bottom vignette — extra legibility for bottom text ─ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Hero content — bottom left ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 55, damping: 18, delay: 0.15 }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute bottom-0 left-0 z-10 p-6 md:p-14"
      >
        {/* Glassmorphic card — consistent with glass utility already in globals.css */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 max-w-md md:max-w-lg">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            Showreel
          </p>

          <h2 className="text-3xl md:text-[2.75rem] font-bold text-white leading-tight mb-3 drop-shadow-sm">
            Developer &amp;<br />
            Fotografer/Videografer
          </h2>

          <p className="text-white/75 text-sm md:text-base mb-7 leading-relaxed">
            Menggabungkan logika pemrograman dengan estetika visual — menciptakan
            pengalaman digital yang bermakna.
          </p>

          <a
            href="/#gallery"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150 shadow-sm"
          >
            Lihat Karya
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>

      {/* ── Scroll hint ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
