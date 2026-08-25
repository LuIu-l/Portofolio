"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: { src: string; alt: string } | null;
  layoutId?: string;
}

export function ImageLightbox({ isOpen, onClose, image, layoutId }: ImageLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Focus trap & escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
        >
          {/* Close button — large tap target */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Tutup galeri"
            className="absolute top-4 right-4 z-[110] w-11 h-11 flex items-center justify-center text-white bg-white/10 border border-white/20 hover:bg-white/25 active:bg-white/30 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white cursor-pointer select-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Lightbox Content Container */}
          <motion.div
            layoutId={shouldReduceMotion ? undefined : layoutId}
            initial={shouldReduceMotion ? { opacity: 0, scale: 0.95 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0, scale: 0.95 } : { scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] aspect-auto w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain rounded-lg"
                loading="eager"
              />
            </div>
            
            {/* Alt text overlay at bottom */}
            {image.alt && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm select-none"
              >
                {image.alt}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
