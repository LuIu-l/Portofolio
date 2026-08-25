# 🖥️ Porto Pro Max — Web Portfolio Alif Ikhwan

Website portofolio personal untuk keperluan **personal branding jangka panjang**, menampilkan identitas sebagai kombinasi **Developer** dan **Fotografer/Videografer**.

> *"Developer yang juga punya mata fotografer"*

---

## ⚡ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| Package Manager | pnpm |

---

## 🚀 Menjalankan Project

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Jalankan hasil build
pnpm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Folder

```
Porto pro max/
├── docs/
│   └── prd.md                  # Product Requirements Document
├── public/
│   └── images/
│       ├── hero/               # Foto untuk section Hero
│       └── gallery/            # Foto untuk section Gallery
├── src/
│   ├── app/                    # Next.js App Router (halaman)
│   │   ├── api/contact/        # API route form kontak
│   │   ├── blog/               # Halaman blog
│   │   ├── gallery/            # Halaman gallery
│   │   ├── proyek/             # Halaman proyek
│   │   ├── HomePageClient.tsx  # Komponen homepage (client)
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Entry point homepage
│   ├── components/
│   │   ├── blocks/             # Komponen interaktif/kompleks (scroll hero, 3D, dll)
│   │   ├── layout/             # Navbar, Footer
│   │   ├── providers/          # Context & provider wrapper
│   │   ├── sections/           # Section-section halaman (Hero, Contact, dll)
│   │   └── ui/                 # Komponen UI reusable kecil (Card, Button, dll)
│   └── lib/
│       ├── data/
│       │   └── dummy.ts        # Data statis (gallery, blog, proyek, dll)
│       ├── animations.ts       # Konfigurasi animasi Framer Motion
│       ├── github.ts           # Fetch data dari GitHub API
│       └── utils.ts            # Utility functions (cn, dll)
├── .env.example                # Template variabel environment
├── AGENTS.md                   # Panduan untuk AI agent (jangan dihapus)
└── next.config.ts              # Konfigurasi Next.js
```

---

## 🌐 Halaman

| Route | Keterangan |
|---|---|
| `/` | Homepage (Hero, About, Proyek, Blog, Gallery, Contact) |
| `/proyek` | Listing semua proyek |
| `/proyek/[slug]` | Detail satu proyek |
| `/blog` | Listing semua artikel blog |
| `/blog/[slug]` | Detail satu artikel |
| `/gallery` | Galeri foto lengkap |

---

## 📋 Dokumentasi

- [PRD (Product Requirements Document)](docs/prd.md)
