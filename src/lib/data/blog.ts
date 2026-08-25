export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  content: BlogContent[];
}

export type BlogContent =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "code"; lang: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "divider" };

export const blogPosts: BlogPost[] = [
  {
    slug: "proses-bikin-portofolio",
    title: "Proses Bikin Portofolio Ini: Drama Scroll-Jacking, Lag, dan Semua Percobaan Gagalnya",
    date: "25 Agustus 2026",
    readingTime: "8 menit",
    excerpt: "Behind the scenes bikin web porto dari nol — dari hero yang bandel, scroll yang lag parah, sampai fitur yang terpaksa di-cut karena terlalu berat. Ini ceritanya.",
    content: [
      {
        type: "paragraph",
        text: "Jujur, saya sempat hampir pakai template Notion atau Bento yang udah jadi. Tinggal isi, publish, selesai. Tapi ada sesuatu yang nggak bisa saya diamkan: rasa gatal kalau liat animasi mulus di web orang lain dan saya nggak tahu cara bikinnya. Jadi ya... saya bikin sendiri. Full dari nol. Dan ini ceritanya — lengkap dengan semua bagian yang nggak kelihatan dari luar.",
      },
      {
        type: "heading2",
        text: "Kenapa Bikin Sendiri? (Dan Tech Stack-nya Apa)",
      },
      {
        type: "paragraph",
        text: "Alasan pertama: belajar. Saya mau paham secara langsung bagaimana animasi scroll-based itu bekerja, bukan cuma copy-paste dari tutorial. Alasan kedua yang lebih jujur: saya suka hal yang terasa premium dan 'hidup', dan satu-satunya cara bikin itu sesuai keinginan sendiri ya dari scratch.",
      },
      {
        type: "paragraph",
        text: "Stack yang dipilih: Next.js 16 (App Router) untuk framework-nya, Tailwind CSS v4 untuk styling, Framer Motion untuk semua urusan animasi, dan Lenis untuk smooth scroll yang benar-benar mulus. Ini bukan stack random — semuanya dipilih karena saling melengkapi. Next.js untuk performa dan SEO, Tailwind untuk kecepatan styling, Framer Motion karena dia tahu cara animasi yang tidak mengganggu CPU, dan Lenis karena scroll default browser itu... jujur saja, kurang elegan.",
      },
      {
        type: "heading2",
        text: "Drama #1 — Hero yang Bandel 🫠",
      },
      {
        type: "paragraph",
        text: "Saya punya ide sederhana: hero section dengan gambar yang kelihatan kecil di tengah, lalu membesar saat user scroll ke bawah. Kedengarannya simpel. Kenyataannya? Tidak.",
      },
      {
        type: "paragraph",
        text: "Bug pertama yang bikin saya hampir nangis: gambar medianya muncul duluan, full-size, sebelum efek scroll sempat di-trigger. Jadi user masuk ke halaman, dan langsung disambut gambar jumbo yang belum ter-animasi. Kesan pertamanya persis seperti website yang belum selesai dibikin.",
      },
      {
        type: "quote",
        text: "Pertama kali lihat bug itu, saya refresh tiga kali. Kira-kira mikir: 'ini pasti cache.' Bukan cache.",
      },
      {
        type: "paragraph",
        text: "Root cause-nya: komponen ScrollExpandMedia mem-bind animasi ke scrollYProgress dari useScroll Framer Motion, tapi initial state-nya tidak terdefinisi dengan benar. Saat halaman pertama kali load sebelum ada scrolling sama sekali, nilai progress-nya tidak di angka 0 — atau lebih tepatnya, transisi dari undefined ke 0 itu terjadi dengan cara yang tidak terduga secara visual.",
      },
      {
        type: "paragraph",
        text: "Fix-nya sebenarnya tidak dramatis: pastikan initial transform values di-set eksplisit, dan pakai CSS untuk initial state alih-alih mengandalkan Framer Motion saja. Tapi waktu yang terbuang untuk debug hal ini? Sekitar 3 jam. Tiga jam untuk satu baris perubahan. Selamat datang di dunia frontend.",
      },
      {
        type: "heading2",
        text: "Drama #2 — Semua Jadi Berat 😰",
      },
      {
        type: "paragraph",
        text: "Di fase tertentu, saya merasa seperti anak kecil yang baru nemu mainan baru dan langsung nyobain semuanya sekaligus. Lenis smooth scroll? Masuk. Parallax di setiap section? Masuk. TiltCard di card proyek? Masuk. ScrollProgressBar di navbar? Masuk. VelocityGallery yang gambarnya gerak-gerak sendiri? MASUK.",
      },
      {
        type: "paragraph",
        text: "Hasilnya? Website saya jadi berat. Bukan sekadar 'agak lambat' — tapi benar-benar lag. Scroll terasa kayak nge-drag sesuatu yang berat. Di device saya yang bukan low-end, FPS-nya sudah terasa jelek. Saya bisa bayangkan rasanya bagi user dengan laptop budget.",
      },
      {
        type: "quote",
        text: "Momen panik pertama: buka DevTools → Performance tab → rekam 5 detik scroll → lihat hasilnya → ada frame yang butuh 80ms. Target idealnya 16ms. Saya overshooting 5x lipat. 🫠",
      },
      {
        type: "paragraph",
        text: "Proses debug-nya panjang. Beberapa temuan penting:",
      },
      {
        type: "list",
        items: [
          "VelocityGallery menggunakan useAnimationFrame, begitu juga beberapa komponen lain. Saat beberapa komponen ini aktif bersamaan di viewport, ada multiple RAF (RequestAnimationFrame) loop yang jalan secara bersamaan dan tidak terkoordinasi.",
          "Parallax di setiap section menggunakan useScroll + useTransform yang masing-masing subscribe ke scroll event. Semakin banyak subscriber, semakin banyak kerja yang dilakukan per scroll event.",
          "will-change: transform yang dipasang di tempat yang salah (di container luar, bukan elemen yang benar-benar bergerak) justru kontraproduktif — browser meng-allocate GPU layer yang tidak perlu.",
        ],
      },
      {
        type: "paragraph",
        text: "Solusi utamanya: audit ulang setiap komponen animasi, pastikan will-change hanya ada di elemen yang benar-benar bergerak setiap frame, batasi jumlah useScroll subscriber dengan cara menggabungkan tracking ke level yang lebih tinggi, dan untuk komponen yang tidak terlihat di viewport awal, pakai dynamic import supaya JS-nya tidak perlu di-parse saat halaman pertama load.",
      },
      {
        type: "heading2",
        text: "Drama #3 — Eksperimen yang Gagal (dan Kenapa Saya Bangga Memutuskan untuk Cut-nya) 🗑️",
      },
      {
        type: "paragraph",
        text: "Ini bagian yang paling jarang diceritakan orang, tapi menurut saya justru paling penting.",
      },
      {
        type: "paragraph",
        text: "Di suatu titik, saya bikin efek 'Infinite Image Tunnel' — bayangkan foto-foto yang muncul dari titik jauh di tengah layar, membesar mendekati kamera secara terus-menerus, menciptakan kesan terbang menembus lorong galeri tanpa ujung. Secara visual, ini adalah salah satu hal paling keren yang pernah saya bikin. Serius — waktu pertama kali jalan, saya bengong sendiri beberapa detik.",
      },
      {
        type: "paragraph",
        text: "Terus saya buka DevTools.",
      },
      {
        type: "paragraph",
        text: "GPU usage: 90%+. FPS: tidak stabil, sesekali drop ke 30an. Dan ini di laptop saya yang bukan low-end, tanpa ada section lain yang aktif.",
      },
      {
        type: "quote",
        text: "Kalau di device saya saja sudah berat, user dengan HP mid-range bakal lihat apa? Slideshow?",
      },
      {
        type: "paragraph",
        text: "Keputusannya sulit tapi jelas: fitur ini harus dihapus. Bukan disembunyikan, bukan dibuatkan toggle, tapi dihapus. Alasannya sederhana: sebuah fitur yang membuat pengalaman pengguna menjadi buruk bukan fitur — itu beban.",
      },
      {
        type: "paragraph",
        text: "Kenapa saya ceritakan ini? Karena banyak developer (termasuk saya sebelumnya) punya kecenderungan untuk tidak mau 'membuang' effort yang sudah dikeluarkan. Ada sunk cost fallacy yang nyata di sini: 'Ini sudah saya kerjakan lama, sayang kalau dihapus.' Tapi keputusan yang tepat di sini bukan soal berapa lama waktu yang sudah terbuang — tapi soal apa yang terbaik untuk output akhirnya.",
      },
      {
        type: "heading2",
        text: "Penutup: Performa vs Visual — Negosiasi yang Tidak Pernah Selesai",
      },
      {
        type: "paragraph",
        text: "Kalau ada satu hal yang paling banyak saya pelajari dari proses bikin portfolio ini, itu adalah: performa dan visual itu bukan sekadar trade-off yang perlu diseimbangkan sekali, lalu selesai. Ini adalah negosiasi yang terus berlanjut setiap kali saya menambahkan sesuatu.",
      },
      {
        type: "paragraph",
        text: "Setiap animasi baru yang kelihatan keren punya 'biaya' yang harus dibayar — entah di CPU, GPU, atau kompleksitas kode yang harus di-maintain. Semakin cepat saya bisa mengidentifikasi biaya itu sebelum terlanjur jatuh cinta dengan hasilnya, semakin mudah keputusannya.",
      },
      {
        type: "paragraph",
        text: "Web portfolio ini masih terus berkembang. Ada hal-hal yang masih ingin saya tambahkan, ada yang mungkin akan saya hapus lagi nanti. Dan saya rasa itu normal — bahkan itu yang bikin prosesnya seru. Kalau sudah 'sempurna', sudah tidak ada yang perlu dipelajari.",
      },
      {
        type: "quote",
        text: "Portofolio yang bagus bukan yang paling mewah — tapi yang paling jujur tentang siapa yang membuatnya.",
      },
    ],
  },
];
