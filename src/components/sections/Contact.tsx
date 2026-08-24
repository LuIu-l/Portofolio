"use client";

import { useState } from "react";
import { FadeInSection } from "@/components/ui/FadeInSection";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Semua field wajib diisi.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, honeypot }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Gagal mengirim pesan.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Terjadi kesalahan jaringan, coba lagi nanti.");
    }
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors text-sm";

  return (
    <FadeInSection id="contact" className="container mx-auto px-4 max-w-4xl scroll-mt-24">
      <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Punya Proyek atau Ide?</h2>
          <p className="text-slate-500">
            Yuk kolaborasi! Saya selalu terbuka untuk kesempatan baru, baik di bidang development maupun dokumentasi visual.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input type="text" name="honeypot" style={{ display: "none" }} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-600 mb-1.5">Nama</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="john@example.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-600 mb-1.5">Pesan</label>
                <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} placeholder="Halo Alif..." required />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full font-medium py-2.5 rounded-lg text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                  status === "loading"
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-700 text-white"
                }`}
              >
                {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
              </button>
              
              <div aria-live="polite">
                {status === "success" && (
                  <p className="text-emerald-600 text-sm text-center font-medium">✓ Pesan berhasil dikirim!</p>
                )}
                {status === "error" && (
                  <p className="text-rose-500 text-sm text-center">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Kontak Langsung</h3>
            <ul className="space-y-4">
              {[
                { icon: "📧", label: "alifikhwanauladalhafidz@gmail.com", href: "mailto:alifikhwanauladalhafidz@gmail.com" },
                { icon: "📱", label: "083822481575", href: "tel:+6283822481575" },
                { icon: "💻", label: "GitHub", href: "https://github.com/LuIu-l" },
                { icon: "📷", label: "Instagram", href: "https://www.instagram.com/lulu.__1_/" },
              ].map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    aria-label={`Hubungi via ${item.label}`}
                    className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-lg p-1 -ml-1"
                  >
                    <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-base transition-colors">{item.icon}</div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
