"use client";

import { ScrollExpandMedia } from "@/components/blocks/scroll-expansion-hero";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/hero/hero-media.jpg"
        bgImageSrc="/images/hero/hero-bg.webp"
        title="Alif Ikhwan Aulad Alhafidz"
        subtitle="Developer & Fotografer/Videografer"
        scrollToExpandText="Scroll untuk mulai"
      />
    </section>
  );
}
