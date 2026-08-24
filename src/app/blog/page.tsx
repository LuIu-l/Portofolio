"use client";

import { FadeInSection } from "@/components/ui/FadeInSection";
import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { blogData } from "@/lib/data/dummy";
import { GlowingCard } from "@/components/ui/GlowingCard";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-12 pt-32">
      <FadeInSection stagger>
        <motion.h1 variants={staggerItem} className="text-4xl font-bold text-slate-900 mb-8">Semua Tulisan</motion.h1>
        <div className="grid md:grid-cols-3 gap-6">
          {blogData.map((post) => (
            <motion.div key={post.slug} variants={staggerItem}>
              <GlowingCard glowColor="secondary" className="h-full flex flex-col">
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">{post.date}</div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{post.title}</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-slate-900 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm transition-colors mt-auto">
                  Baca selengkapnya &rarr;
                </Link>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  );
}
