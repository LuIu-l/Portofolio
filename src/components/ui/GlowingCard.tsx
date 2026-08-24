"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary";
}

export function GlowingCard({ children, className, glowColor = "primary" }: GlowingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(15, 23, 42, 0.10)" }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white rounded-xl p-6 border border-slate-200 transition-all duration-300 relative group overflow-hidden shadow-sm",
        className
      )}
    >
      {/* Subtle top accent line on hover */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          glowColor === "primary" ? "bg-slate-900" : "bg-slate-500"
        )}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
