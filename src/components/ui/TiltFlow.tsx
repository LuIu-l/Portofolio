"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ImageLightbox } from "./ImageLightbox";

interface ImageItem {
  src: string;
  alt: string;
}

interface TiltFlowProps {
  images: ImageItem[];
}

const FlowCard = ({ 
  img, 
  index, 
  isFocused, 
  isDimmed,
  onClick,
  layoutId,
  enableMotion,
}: { 
  img: ImageItem; 
  index: number; 
  isFocused: boolean; 
  isDimmed: boolean;
  onClick: () => void;
  layoutId?: string;
  enableMotion: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [-100, 100], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-10, 10]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMotion || shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx);
    y.set(my);
  };

  const handleMouseLeave = () => {
    if (!enableMotion) return;
    x.set(0);
    y.set(0);
  };

  // Determine appearance based on focus mode
  const scale = isFocused ? 1.05 : (isDimmed ? 0.95 : 1);
  const opacity = isDimmed ? 0.5 : 1;
  const zIndex = isFocused ? 10 : 1;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={enableMotion ? handleMouseMove : undefined}
      onMouseLeave={enableMotion ? handleMouseLeave : undefined}
      animate={enableMotion ? { scale, opacity, zIndex } : undefined}
      layoutId={enableMotion && !shouldReduceMotion ? layoutId : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        rotateX: enableMotion && !shouldReduceMotion ? rotateX : 0,
        rotateY: enableMotion && !shouldReduceMotion ? rotateY : 0,
        transformPerspective: enableMotion ? 800 : undefined,
      }}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in shadow-md bg-slate-100"
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) calc((100vw - 44px) / 2), (max-width: 1200px) 33vw, 25vw"
        quality={70}
        className="object-cover transition-transform duration-500 ease-out"
        loading="lazy"
      />
      {/* Subtle shine effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 pointer-events-none"
        animate={{ opacity: isFocused ? 1 : 0 }}
      />
    </motion.div>
  );
};

export function TiltFlow({ images }: TiltFlowProps) {
  const isTouchDevice = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(hover: none), (pointer: coarse)").matches,
    () => false,
  );
  const enableMotion = !isTouchDevice;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [additionalCount, setAdditionalCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const initialCount = isTouchDevice ? 6 : 12;
  const visibleCount = Math.min(images.length, initialCount + additionalCount);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div className="flex flex-col items-center">
      <div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 p-4 w-full"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {visibleImages.map((img, i) => {
          const card = (
            <FlowCard 
              img={img} 
              index={i} 
              isFocused={hoveredIndex === i}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              onClick={() => setSelectedImage(img)}
              layoutId={`lightbox-image-${img.src}`}
              enableMotion={enableMotion}
            />
          );

          if (!enableMotion) {
            return <div key={img.src + i} className="relative">{card}</div>;
          }

          return (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 12) * 0.05 }}
              onMouseEnter={() => setHoveredIndex(i)}
              className="relative"
            >
              {card}
            </motion.div>
          );
        })}
      </div>
      
      {hasMore && (
        <button 
          onClick={() => setAdditionalCount((prev) => prev + 12)}
          className="mt-12 px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer select-none"
        >
          Muat Lebih Banyak
        </button>
      )}

      <ImageLightbox
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
        layoutId={selectedImage ? `lightbox-image-${selectedImage.src}` : undefined}
      />
    </div>
  );
}
