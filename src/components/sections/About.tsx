"use client";

import { FadeInSection } from "@/components/ui/FadeInSection";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { useRef } from "react";

function ParallaxBg({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-15%", "15%"]
  );
  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div className={className} style={{ y }} />
    </div>
  );
}

export default function About() {
  return (
    <FadeInSection
      id="about"
      className="container mx-auto px-4 max-w-6xl scroll-mt-24 relative"
      stagger
    >
      <ParallaxBg className="absolute inset-0 bg-gradient-to-br from-slate-100/60 to-transparent rounded-3xl" />

      <div className="text-center mb-12">
        <TextReveal
          text="Tentang Saya"
          as="h2"
          className="text-3xl font-bold text-slate-900 justify-center inline-flex relative after:content-[''] after:absolute after:-bottom-2 after:left-1/4 after:right-1/4 after:h-[2px] after:bg-slate-900 after:rounded-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div variants={staggerItem}>
          <TiltCard className="h-full">
            <GlowingCard glowColor="primary" className="h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Profil Singkat</h3>
              <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
                Halo! Saya Alif Ikhwan Aulad Alhafidz seorang Developer dan Fotografer/Videografer pemula.
              </p>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li>🎓 <strong className="text-slate-800">Pendidikan:</strong> SMK Marhas Margahayu</li>
                <li>⛺ <strong className="text-slate-800">Organisasi:</strong> Pramuka — Hartaka (Bendahara)</li>
                <li>🤝 <strong className="text-slate-800">Soft Skill:</strong> Kerja Tim, Kreatif, Komunikatif, Adaptif</li>
                <li>📍 <strong className="text-slate-800">Lokasi:</strong> Bandung, Jawa Barat, Indonesia</li>
                <li>🌐 <strong className="text-slate-800">Bahasa:</strong> Indonesia (native), Inggris (pasif), Jepang (pasif)</li>
                <li>🕐 <strong className="text-slate-800">Status:</strong> Terbuka untuk kolaborasi proyek freelance/kerja sama</li>
                <li>🎬 <strong className="text-slate-800">Minat:</strong> Fotografi &amp; videografi bergaya sinematik — terinspirasi dari dunia film dan movie</li>
              </ul>
              
              <div className="mt-8">
                <h4 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">Pencapaian</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>🏆 Juara 4 — Lomba Kreasi Foto Pramuka</li>
                  <li>🏆 Lomba IT — (menyusul)</li>
                  <li>🏆 Lomba Pramuka — (menyusul)</li>
                </ul>
              </div>
            </GlowingCard>
          </TiltCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <TiltCard className="h-full">
            <GlowingCard glowColor="secondary" className="h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Keahlian &amp; Tools</h3>
              <div className="space-y-4">
                <div>
                  <strong className="text-slate-800 text-sm">Desain/Prototyping:</strong>
                  <p className="text-slate-600 text-sm mt-1">Figma, Balsamiq, Canva</p>
                </div>
                <div>
                  <strong className="text-slate-800 text-sm">Development:</strong>
                  <p className="text-slate-600 text-sm mt-1">Laravel, Vue.js, Git, Laragon, Next.js, Tailwind</p>
                </div>
                <div>
                  <strong className="text-slate-800 text-sm">Fotografi/Videografi:</strong>
                  <p className="text-slate-600 text-sm mt-1">Adobe Lightroom, Videografi, Fotografi</p>
                </div>
              </div>
            </GlowingCard>
          </TiltCard>
        </motion.div>
      </div>
    </FadeInSection>
  );
}
