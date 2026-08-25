"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
  amount?: number | "some" | "all";
}

export function FadeInSection({ children, className, id, stagger = false, amount = "some" }: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const noMotionVariant = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={shouldReduceMotion ? noMotionVariant : (stagger ? staggerContainer : fadeUpVariant)}
    >
      {children}
    </motion.section>
  );
}
