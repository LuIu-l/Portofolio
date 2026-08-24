"use client";

import { FadeInSection } from "@/components/ui/FadeInSection";

export default function BlogDetail() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <FadeInSection>
        <h1 className="text-4xl font-bold text-violet-400 mb-8">Detail Tulisan</h1>
        <p className="text-slate-400">Konten tulisan blog akan ditampilkan di sini.</p>
      </FadeInSection>
    </div>
  );
}
