"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Proyek", href: "/proyek" },
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "/gallery" },
  { name: "Teman", href: "/#teman" },
  { name: "Contact", href: "/#contact" },
];

const DARK_BG_SECTIONS = ["intro-video"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      const dark = DARK_BG_SECTIONS.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 72 && rect.bottom > 72;
      });
      setIsDarkSection(dark);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navBg = isScrolled
    ? isDarkSection
      ? "bg-white/10 backdrop-blur-md border-b border-white/15 py-4 shadow-none"
      : "glass py-4 shadow-sm border-b border-slate-200"
    : "bg-transparent py-6";

  const logoColor = isDarkSection ? "text-white hover:text-white/80" : "text-slate-900 hover:text-slate-700";
  const linkColor = isDarkSection ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900";
  const mobileMenuColor = isDarkSection ? "text-white" : "text-slate-700";

  return (
    <>
      <nav
        aria-label="Navigasi Utama"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          navBg
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
          <Link
            href="/"
            className={cn("text-xl font-bold tracking-tight transition-all duration-300 rounded-md px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2", logoColor)}
            onClick={() => setIsMenuOpen(false)}
          >
            Alif I.A.A.
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn("transition-colors text-sm font-medium rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2", linkColor)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={cn("md:hidden w-11 h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md transition-colors duration-300", mobileMenuColor)}
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isMenuOpen}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <AnimatePresence initial={false} mode="wait">
                {isMenuOpen ? (
                  <motion.g
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </motion.g>
                ) : (
                  <motion.g
                    key="open"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — slide down */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 z-[45] md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg pt-20 pb-6 px-6"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center py-3 px-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
