"use client";

import dynamic from "next/dynamic";
import { TextReveal } from "@/components/ui/TextReveal";
import { galleryData } from "@/lib/data/dummy";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { staggerItem } from "@/lib/animations";
import { motion } from "framer-motion";

const TiltFlow = dynamic(() => import("@/components/ui/TiltFlow").then(mod => mod.TiltFlow), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-slate-100 rounded-xl aspect-[4/3] w-full" />
      ))}
    </div>
  ),
});

export default function GalleryPage() {
  const images = galleryData.map((item) => ({
    src: item.image,
    alt: item.title,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <div className="container mx-auto px-4 max-w-7xl pt-32 pb-12">
        <TextReveal
          text="Karya Visual"
          as="h1"
          className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4"
        />
        <p className="text-slate-600 text-center max-w-2xl mx-auto">
          Eksplorasi estetika dan dokumentasi momen melalui lensa.
        </p>
      </div>

      {/* ── TiltFlow Section (Semua Karya) ── */}
      <section className="container mx-auto px-4 max-w-7xl pb-32">
        <FadeInSection stagger>
          <motion.div variants={staggerItem}>
            <TiltFlow images={images} />
          </motion.div>
        </FadeInSection>
      </section>
    </div>
  );
}
