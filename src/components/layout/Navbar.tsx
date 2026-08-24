"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      const midY = y + window.innerHeight * 0.1;
      const dark = DARK_BG_SECTIONS.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 72 && rect.bottom > 72;
      });
      setIsDarkSection(dark);

      void midY;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const navBg = isScrolled
    ? isDarkSection
      ? "bg-white/10 backdrop-blur-md border-b border-white/15 py-4 shadow-none"
      : "glass py-4 shadow-sm border-b border-slate-200"
    : "bg-transparent py-6";

  const logoColor = isDarkSection ? "text-white hover:text-white/80" : "text-slate-900 hover:text-slate-700";
  const linkColor = isDarkSection ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900";
  const mobileMenuColor = isDarkSection ? "text-white" : "text-slate-700";

  return (
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
        >
          Alif I.A.A.
        </Link>
        
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

        {/* Mobile menu button */}
        <button 
          className={cn("md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-sm transition-colors duration-300", mobileMenuColor)}
          aria-label="Buka menu navigasi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </nav>
  );
}
