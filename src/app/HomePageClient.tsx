"use client";

import Link from "next/link";
import Image from "next/image";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { blogData, temanData, galleryData } from "@/lib/data/dummy";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { useRef } from "react";
import { GithubProject } from "@/lib/github";

// Reusable parallax background wrapper
function ParallaxBg({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-15%", "15%"]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* willChange is omitted — Framer Motion adds it automatically while animating */}
      <motion.div
        className={className}
        style={{ y }}
      />
    </div>
  );
}

export default function HomePageClient({ projects }: { projects: GithubProject[] }) {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />

      {/* 2. About Section */}
      <FadeInSection id="about" className="container mx-auto px-4 max-w-6xl scroll-mt-24 relative" stagger>
        {/* Parallax decorative bg */}
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
                <p className="text-slate-600 mb-4">
                  Halo! Saya Alif, seorang Developer dan Fotografer/Videografer. Saya senang menggabungkan logika pemrograman dengan estetika visual untuk menciptakan pengalaman digital yang menarik.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>🎓 <strong className="text-slate-800">Pendidikan:</strong> SMK Marhas Margahayu</li>
                  <li>⛺ <strong className="text-slate-800">Organisasi:</strong> Pramuka - Hartaka (Bendahara)</li>
                  <li>🤝 <strong className="text-slate-800">Soft Skill:</strong> Kerja Tim, Kreatif, Komunikatif, Adaptif</li>
                </ul>
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

      {/* 3. Proyek Section */}
      <FadeInSection id="proyek" className="container mx-auto px-4 max-w-6xl scroll-mt-24" stagger>
        <motion.div variants={staggerItem} className="flex justify-between items-end mb-8">
          <TextReveal
            text="Proyek Pilihan"
            as="h2"
            className="text-3xl font-bold text-slate-900"
          />
          <Link href="/proyek" className="text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm">Lihat Semua &rarr;</Link>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proyek) => (
            <motion.div key={proyek.name} variants={staggerItem}>
              <TiltCard className="h-full">
                <GlowingCard className="p-0 overflow-hidden flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{proyek.language || "GitHub Repo"}</span>
                      {proyek.fork && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                          Fork
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 truncate">{proyek.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">{proyek.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex gap-2 items-center text-slate-500 text-xs font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        {proyek.stargazers_count}
                      </div>
                      <Link href={`/proyek/${proyek.name}`} className="inline-block text-sm font-medium text-slate-900 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm transition-colors">
                        Detail &rarr;
                      </Link>
                    </div>
                  </div>
                </GlowingCard>
              </TiltCard>
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-3 text-center py-12 border border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-600 mb-4">Data proyek sedang tidak dapat dimuat.</p>
              <a href="https://github.com/LuIu-l" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                Kunjungi GitHub Saya
              </a>
            </div>
          )}
        </div>
      </FadeInSection>

      {/* 4. Blog Section */}
      <FadeInSection id="blog" className="container mx-auto px-4 max-w-6xl scroll-mt-24" stagger>
        <motion.div variants={staggerItem} className="flex justify-between items-end mb-8">
          <TextReveal
            text="Tulisan Terbaru"
            as="h2"
            className="text-3xl font-bold text-slate-900"
          />
          <Link href="/blog" className="text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm">Baca Blog &rarr;</Link>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogData.slice(0, 3).map((post) => (
            <motion.div key={post.slug} variants={staggerItem}>
              <GlowingCard glowColor="secondary" className="h-full flex flex-col">
                <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{post.date}</div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{post.title}</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors mt-auto">
                  Baca selengkapnya &rarr;
                </Link>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* 5. Teman Section */}
      <FadeInSection id="teman" className="container mx-auto px-4 max-w-6xl scroll-mt-24" stagger>
        <motion.div variants={staggerItem} className="text-center mb-12">
          <TextReveal
            text="Friend Links"
            as="h2"
            className="text-3xl font-bold text-slate-900 justify-center"
          />
          <p className="text-slate-600 mt-2 text-sm">Teman dan kolega kreatif saya.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {temanData.map((teman, i) => (
            <motion.a key={i} variants={staggerItem} href={teman.link} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:border-slate-400 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
              <img src={teman.avatar} alt={teman.name} className="w-12 h-12 rounded-full bg-slate-100" />
              <div>
                <h4 className="text-slate-900 font-medium text-sm">{teman.name}</h4>
                <span className="text-slate-600 text-xs">{teman.role}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </FadeInSection>

      {/* 6. Gallery Section */}
      <FadeInSection id="gallery" className="container mx-auto px-4 max-w-6xl scroll-mt-24 relative" stagger>
        {/* Parallax decorative bg */}
        <ParallaxBg className="absolute inset-0 bg-gradient-to-tl from-slate-100/50 to-transparent rounded-3xl" />

        <motion.div variants={staggerItem} className="flex justify-between items-end mb-8">
          <TextReveal
            text="Galeri Visual"
            as="h2"
            className="text-3xl font-bold text-slate-900"
          />
          <Link href="/gallery" className="text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm">Lihat Galeri &rarr;</Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryData.slice(0, 6).map((item) => (
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

      {/* 7. Contact Section */}
      <Contact />
    </div>
  );
}
