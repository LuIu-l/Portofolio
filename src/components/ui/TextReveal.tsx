"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
}

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 0.5,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const words = text.split(" ");
  const shouldReduceMotion = useReducedMotion();

  const noMotionWordVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={shouldReduceMotion ? {} : {
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            ...containerVariants.visible.transition,
            delayChildren: delay,
          },
        },
      }}
      className="overflow-hidden"
    >
      <Tag className={cn("flex flex-wrap gap-x-[0.25em] gap-y-1", className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={shouldReduceMotion ? noMotionWordVariants : wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
