# Product Requirements Document (PRD)
# Web Portfolio — Alif Ikhwan Aulad Alhafidz

**Versi:** 1.0
**Tanggal:** 13 Agustus 2026
**Tipe Project:** Personal Branding Portfolio Website

---

## 1. Latar Belakang & Tujuan

Website portofolio personal untuk keperluan **personal branding jangka panjang**, menampilkan identitas sebagai kombinasi **Developer** dan **Fotografer/Videografer**. Website harus terasa modern, immersive, dan mencerminkan sisi teknikal sekaligus sisi kreatif/visual pemiliknya.

**Tagline:** *"Developer yang juga punya mata fotografer"*

---

## 2. Target Pengguna
- Recruiter / HR (magang, kerja freelance, kolaborasi proyek)
- Klien fotografi/videografi
- Sesama developer/komunitas kreatif
- Pengunjung umum (personal branding)

---

## 3. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| UI Components | Aceternity UI / Magic UI |
| 3D Visual | Spline 3D |

---

## 4. Design System

### 4.1 Palet Warna

| Elemen | Kode Warna (Tailwind / Hex) | Catatan |
|---|---|---|
| Background Utama | `bg-slate-950` (`#020617`) | Sangat gelap, mendekati hitam |
| Card / Surface | `bg-slate-900/50` (`#0f172a`) | Transparan tipis, glassmorphism |
| Aksen Utama | `cyan-500` (`#06b6d4`) / `violet-500` | Untuk glow, tombol, border |
| Teks Utama | `text-slate-100` (`#f8fafc`) | Putih lembut |
| Teks Sekunder | `text-slate-400` (`#94a3b8`) | Abu-abu, deskripsi/keterangan |

### 4.2 Gaya Visual
- Dark mode by default (tidak ada light mode di v1)
- Glassmorphism pada card/surface
- Efek glow pada elemen interaktif (button, border, hover state) menggunakan aksen cyan/violet
- Aksen 3D dari Spline untuk memberi kesan modern & immersive

---

## 5. Informasi Arsitektur (Sitemap)

### Halaman Utama (Single Page, Scroll dengan navbar anchor)
1. **Hero / Landing**
2. **About**
3. **Proyek** (preview, link ke halaman detail)
4. **Blog** (preview, link ke halaman detail)
5. **Teman** (friend links / social circle)
6. **Gallery** (preview, link ke halaman detail)
7. **Call to Action**
8. **Contact**

### Halaman Terpisah (Detail Page)
- `/proyek` → listing semua proyek
- `/proyek/[slug]` → detail 1 proyek
- `/blog` → listing semua artikel
- `/blog/[slug]` → detail 1 artikel
- `/gallery` → listing semua hasil foto/video
- `/gallery/[slug]` (opsional, jika ada detail per karya)

> Catatan: Section "Proyek", "Blog", dan "Gallery" di halaman utama berupa **preview/highlight** (misal 3 item teratas) dengan tombol "Lihat Semua" yang mengarah ke halaman detail masing-masing.

---

## 6. Detail Fungsional per Section

### 6.1 Hero / Landing
- Menampilkan nama, tagline ("Developer yang juga punya mata fotografer"), dan CTA singkat (misal: scroll down / lihat proyek)
- **Rekomendasi Spline 3D:** ditempatkan di sini sebagai objek 3D utama (misal abstract shape / floating object dengan efek glow cyan-violet) sebagai focal point pertama yang dilihat pengunjung
- Animasi entrance menggunakan Framer Motion (fade + slide up)

### 6.2 About
- Data diri, positioning (Developer & Fotografer/Videografer)
- Keahlian & tools (grouped: Desain/Prototyping, Development, Fotografi/Videografi)
- Pendidikan (SMK Marhas Margahayu — ditampilkan generik tanpa embel-embel kelas/angkatan agar tetap relevan jangka panjang)
- Pengalaman organisasi (Pramuka — Hartaka/Bendahara)
- Soft skill (kerja tim, kreatif dalam fotografi, komunikasi, adaptif)

### 6.3 Proyek
- Preview di homepage: 3 proyek unggulan (card dengan hover effect)
- Halaman `/proyek`: grid semua proyek, bisa difilter (misal by category: Web Dev / Design)
- Halaman `/proyek/[slug]`: deskripsi, tools yang digunakan, gambar/screenshot, link demo/repo

### 6.4 Blog
- Preview: 3 artikel terbaru
- Halaman `/blog`: listing dengan pagination
- Halaman `/blog/[slug]`: konten artikel (bisa MDX untuk kemudahan menulis)

### 6.5 Teman (Friend Links)
- Menampilkan daftar teman/circle dengan link ke sosial media atau website mereka
- Format card kecil: nama, foto/avatar, link
- Terinspirasi dari konsep "friend links" ala blog personal

### 6.6 Gallery
- Preview: grid foto/video unggulan (misal 6 item) dengan efek hover/lightbox
- Halaman `/gallery`: grid lengkap seluruh karya, bisa difilter (Foto / Video)
- Mendukung lightbox/modal untuk lihat gambar full size

### 6.7 Call to Action
- Ajakan untuk kolaborasi/hire (misal: "Punya proyek atau ide? Yuk kolaborasi")
- Tombol menuju section Contact atau langsung ke WhatsApp/email

### 6.8 Contact
- Form kontak (nama, email, pesan) — perlu ditentukan backend/service pengirim (misal: Resend, Formspree, atau API route Next.js)
- Link kontak langsung (email, WhatsApp, LinkedIn, Instagram, GitHub) — data akan dilengkapi menyusul

---

## 7. Non-Functional Requirements

- **Responsif:** harus optimal di desktop maupun mobile secara setara (bukan desktop-first atau mobile-first)
- **Performa:** Spline 3D dan animasi Framer Motion perlu lazy-load / dynamic import agar tidak membebani initial load, terutama di mobile
- **SEO:** metadata dasar (title, description, OG image) per halaman, penting untuk personal branding
- **Aksesibilitas:** kontras warna teks terhadap background gelap perlu dijaga (sudah terakomodasi lewat slate-100 & slate-400)

---

## 8. Data yang Masih Menyusul
- Konten proyek (nama, deskripsi, tools, link/screenshot)
- Sertifikasi
- Kontak (email, no. HP, LinkedIn, Instagram, GitHub)
- Konten blog
- Konten gallery (foto/video)
- Daftar teman & link mereka

---

## 9. Open Questions (untuk didiskusikan lebih lanjut saat development)
- Apakah blog memakai CMS (misal Sanity/Contentful) atau MDX lokal?
- Apakah form contact perlu backend/email service tertentu?
- Apakah perlu halaman detail tersendiri untuk item gallery, atau cukup lightbox saja?
