"use client";

import { FadeInSection } from "@/components/ui/FadeInSection";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { galleryData } from "@/lib/data/dummy";
import Image from "next/image";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-12 pt-32">
      <FadeInSection stagger>
        <motion.div variants={staggerItem} className="mb-8">
          <TextReveal
            text="Galeri Visual"
            as="h1"
            className="text-4xl font-bold text-slate-900"
          />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryData.map((item) => (
            <motion.div key={item.slug} variants={staggerItem}>
              <TiltCard className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100" maxTilt={5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-xs bg-white text-slate-900 font-medium px-2 py-1 rounded w-max mb-2">{item.type}</span>
                  <h4 className="text-white font-medium text-sm md:text-base truncate">{item.title}</h4>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  );
}
