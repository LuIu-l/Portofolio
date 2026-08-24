"use client";

import { FadeInSection } from "@/components/ui/FadeInSection";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { GithubProject } from "@/lib/github";

export default function ProyekClient({ projects }: { projects: GithubProject[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-slate-600 mb-4">Data proyek sedang tidak dapat dimuat.</p>
        <a href="https://github.com/LuIu-l" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
          Kunjungi GitHub Saya
        </a>
      </div>
    );
  }

  return (
    <FadeInSection stagger>
      <motion.div variants={staggerItem} className="mb-8">
        <TextReveal
          text="Semua Proyek"
          as="h1"
          className="text-4xl font-bold text-slate-900"
        />
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proyek) => (
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
                    <a
                      href={proyek.homepage || proyek.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-medium text-slate-900 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm transition-colors"
                    >
                      {proyek.homepage ? "Lihat Proyek →" : "Lihat di GitHub →"}
                    </a>
                  </div>
                </div>
              </GlowingCard>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </FadeInSection>
  );
}
