import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "livales.lang";

// NOTE: the site is about Livales the company. Tagline: "Lebih dekat dengan
// orang tersayang, dan dunia yang ingin kamu kenal." / "Closer to the people
// you love, and the world you want to know." (shared with Instagram and Threads).
// The main focus is relationships: couples, family and friends (Kado Livales
// and Hearts & Ladders). Kana Speed (learning Japanese) is a live product shown
// after Kado, without a "side project" label, but language is never presented
// as a second pillar in the hero, About, audience or FAQ.
// Hearts & Ladders is public (heartsandladders.livales.com) and in Android
// testing; describe it only with what its own site says.
// Voice: warm and plain, first person plural ("kami"), talking to "kamu".
// Blog articles live in src/content/posts.ts, also in both languages.
export const KANA_URL: Record<Language, string> = {
  id: "https://kana.livales.com/id/",
  en: "https://kana.livales.com/en/",
};
export const KADO_URL: Record<Language, string> = {
  id: "https://kado.livales.com/",
  en: "https://kado.livales.com/en",
};
export const HL_URL: Record<Language, string> = {
  id: "https://heartsandladders.livales.com/",
  en: "https://heartsandladders.livales.com/en",
};
/** The tester sign-up section on the Hearts & Ladders site (same id in both languages). */
export const HL_TESTER_URL: Record<Language, string> = {
  id: `${HL_URL.id}#gabung`,
  en: `${HL_URL.en}#gabung`,
};
export const THREADS_URL = "https://www.threads.com/@livalesofficial";
export const LINKEDIN_URL = "https://www.linkedin.com/company/livales/";
export const CONTACT_EMAIL = "admin@livales.com";

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.products": "Produk",
    "nav.blog": "Blog",
    "nav.about": "Tentang",
    "nav.cta": "Ikuti kabar",
    "nav.menu": "Menu",
    "nav.close": "Tutup menu",
    "nav.main": "Navigasi utama",
    "common.newTab": "(terbuka di tab baru)",

    // Products, shared by every page
    "product.kado.name": "Kado Livales",
    "product.kado.short": "Cari kado yang beneran dia suka.",
    "product.kado.cta": "Buka Kado Livales",
    "product.kado.status": "Sudah bisa dipakai",
    "product.kana.name": "Kana Speed",
    "product.kana.short": "Belajar huruf Jepang lewat kuis singkat.",
    "product.kana.cta": "Buka Kana Speed",
    "product.kana.status": "Sudah bisa dipakai",
    "product.hl.name": "Hearts & Ladders",
    "product.hl.short": "Ular tangga untuk pasangan, penuh obrolan dan tantangan.",
    "product.hl.cta": "Kunjungi Hearts & Ladders",
    "product.hl.status": "Uji coba di Android",
    "product.hl.tester": "Daftar jadi penguji awal",

    // Home: hero
    "hero.title": "Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal.",
    "hero.body":
      "Livales adalah perusahaan teknologi dari Indonesia. Kami merancang dan membangun aplikasi sendiri, untuk merawat hubungan dengan orang-orang terdekatmu: pasangan, keluarga, dan teman.",
    "hero.cta.primary": "Lihat produk kami",
    "hero.cta.secondary": "Ikuti kabar dari kami",
    "hero.ask.label": "Tanyakan ke pasanganmu malam ini",
    "hero.ask.next": "Pertanyaan lain",
    "hero.ask.level1": "Ringan",
    "hero.ask.level2": "Tentang kalian",
    "hero.ask.level3": "Lebih dalam",
    "hero.ask.more": "Baca 30 pertanyaan untuk pasangan",

    // Home: Hearts & Ladders
    "hl.title": "Hearts & Ladders: ular tangga yang bikin kalian makin dekat.",
    "hl.body":
      "Lempar dadu, mendarat di kotak hati, lalu jawab pertanyaan atau selesaikan tantangan berdua. Jawaban dan foto kalian tersimpan jadi kenangan. Sekarang sedang diuji di Android, dan kami mencari pasangan yang mau mencobanya lebih dulu.",
    "hl.point1": "Main berdua di satu HP, atau dari jauh dengan dua HP.",
    "hl.point2": "Mode yang pas untuk tahap hubungan kalian, dari baru kenal sampai menikah.",
    "hl.point3": "Gratis dimainkan, tanpa perlu daftar.",
    "hl.shot.board": "Papan Hearts & Ladders di HP",
    "hl.shot.challenge": "Kartu tantangan yang terbuka di kotak hati",
    "hl.shot.vault": "Jawaban yang tersimpan di Memory Vault",

    // Home: product lineup
    "lineup.title": "Tiga aplikasi, satu tujuan: mendekatkan.",
    "lineup.body":
      "Setiap aplikasi Livales kami rancang dan bangun sendiri. Dua sudah bisa kamu pakai hari ini, dan satu sedang diuji.",
    "lineup.more": "Lihat semua produk",

    // Home: why
    "why.title": "Kenapa Livales ada",
    "why.p1":
      "Kebanyakan aplikasi di ponsel kita dibuat supaya kita terus scroll. Waktu habis, tapi kita tidak jadi lebih dekat dengan siapa pun.",
    "why.p2":
      "Kami ingin membuat yang sebaliknya: aplikasi yang membawa kamu lebih dekat ke pasangan, keluarga, dan teman yang kamu sayang.",
    "why.more": "Tentang Livales",

    // Home: blog teaser
    "blogTeaser.title": "Dari blog",
    "blogTeaser.more": "Semua tulisan",

    // FAQ
    "faq.title": "Pertanyaan yang sering muncul",
    "faq.q1": "Livales itu apa?",
    "faq.a1":
      "Perusahaan teknologi dari Indonesia yang merancang dan membangun aplikasinya sendiri, supaya kamu lebih dekat dengan orang tersayang: pasangan, keluarga, dan teman.",
    "faq.q2": "Apa saja produk Livales?",
    "faq.a2":
      "Kado Livales untuk mencari kado, bikin wishlist, dan patungan kado bareng teman (kado.livales.com). Kana Speed, aplikasi gratis untuk belajar huruf Jepang (kana.livales.com). Hearts & Ladders, ular tangga untuk pasangan yang sedang diuji di Android (heartsandladders.livales.com).",
    "faq.q3": "Kapan Hearts & Ladders bisa diunduh?",
    "faq.a3":
      "Hearts & Ladders sedang diuji di Android sebelum rilis. Kalau mau mencobanya lebih dulu, daftar jadi penguji awal di heartsandladders.livales.com. Untuk kabar rilisnya, daftarkan email kamu di bawah.",
    "faq.q4": "Apakah aplikasi Livales gratis?",
    "faq.a4":
      "Kado Livales dan Kana Speed gratis. Hearts & Ladders gratis dimainkan, dengan mode Rumah Kita dan fitur tambahan lewat Premium.",
    "faq.q5": "Email saya dipakai untuk apa?",
    "faq.a5":
      "Hanya untuk mengirim kabar dari Livales. Kami tidak menjual atau membagikannya, dan kamu bisa berhenti berlangganan kapan saja.",

    // Products page
    "products.title": "Aplikasi dari Livales",
    "products.body":
      "Kami membuat aplikasi kecil yang masing-masing mengerjakan satu hal dengan baik: membantu kamu memilih kado, belajar huruf Jepang, dan menghabiskan waktu berkualitas dengan pasangan.",
    "products.facts.platform": "Platform",
    "products.facts.language": "Bahasa",
    "products.facts.price": "Harga",
    "products.features": "Yang bisa kamu lakukan",
    "products.preview.kado": "Halaman depan Kado Livales di HP",
    "products.preview.kana": "Halaman depan Kana Speed di HP",
    "products.preview.hl": "Papan Hearts & Ladders di HP",
    "products.kado.body":
      "Kado Livales membantu kamu menemukan kado yang beneran disukai, bukan sekadar ide. Isinya produk nyata dari marketplace Indonesia yang kami pilih satu per satu.",
    "products.kado.f1": "Cari kado lewat kuis empat langkah, untuk ibu, ayah, pasangan, sahabat, atau rekan kerja.",
    "products.kado.f2": "Kirim kartu kado lewat link, lengkap dengan pesanmu.",
    "products.kado.f3": "Bikin wishlist sendiri supaya teman tahu apa yang kamu mau.",
    "products.kado.f4": "Patungan kado bareng teman: usulkan, pilih, lalu beli bersama.",
    "products.kado.platform": "Web",
    "products.kado.language": "Indonesia, dengan versi bahasa Inggris",
    "products.kado.price": "Gratis",
    "products.kana.body":
      "Kana Speed adalah situs kuis untuk belajar bahasa Jepang langkah demi langkah. Mulai dari hiragana dan katakana, lalu salam, perkenalan diri, dan berhitung.",
    "products.kana.f1": "Hafalkan hiragana dan katakana lewat kuis singkat.",
    "products.kana.f2": "Lanjut ke salam, perkenalan diri, angka, dan waktu.",
    "products.kana.f3": "Belajar dari browser, tanpa perlu memasang aplikasi.",
    "products.kana.platform": "Web",
    "products.kana.language": "Indonesia dan Inggris",
    "products.kana.price": "Gratis",
    "products.hl.body":
      "Hearts & Ladders adalah ular tangga untuk pasangan. Kotak hati membuka pertanyaan, aksi, jujur-jujuran, atau foto bersama, dan setiap jawaban tersimpan jadi kenangan.",
    "products.hl.f1": "Main berdua di satu HP, atau di dua HP yang tersinkron untuk pasangan LDR.",
    "products.hl.f2": "Pilih mode sesuai tahap hubungan: Nyambung Dulu, Kita Banget, atau Rumah Kita.",
    "products.hl.f3": "Simpan jawaban dan foto di Memory Vault, lalu buka lagi kapan saja.",
    "products.hl.f4": "Ngobrol lebih dalam lewat Deep Talk: satu pertanyaan, bergantian bercerita.",
    "products.hl.platform": "Android (uji coba)",
    "products.hl.language": "Indonesia dan Inggris",
    "products.hl.price": "Gratis, dengan Premium",

    // About page
    "about.title": "Tentang Livales",
    "about.lead":
      "Livales adalah perusahaan teknologi dari Indonesia. Kami merancang dan membangun aplikasi yang membuat kamu lebih dekat dengan orang tersayang, dan dengan dunia yang ingin kamu kenal.",
    "about.why.title": "Kenapa kami ada",
    "about.p1":
      "Kebanyakan aplikasi di ponsel kita dibuat supaya kita terus scroll. Waktu habis, tapi kita tidak jadi lebih dekat dengan siapa pun, atau lebih pandai dalam apa pun.",
    "about.p2":
      "Kami ingin membuat yang sebaliknya: aplikasi yang membawa kamu lebih dekat. Ke pasangan, keluarga, dan teman yang kamu sayang.",
    "about.p3":
      "Semua produk Livales kami rancang dan bangun sendiri, di Indonesia. Kado Livales dan Kana Speed sudah bisa kamu pakai, dan Hearts & Ladders sedang diuji bersama pasangan-pasangan pertamanya.",
    "about.sign": "Tim Livales",
    "about.markLabel": "Simbol Livales: huruf L yang merangkul sebuah titik",
    "audience.title": "Untuk siapa",
    "audience.couple.title": "Pasangan",
    "audience.couple.body": "Yang ingin tetap hangat, bahkan setelah bertahun-tahun bersama.",
    "audience.family.title": "Keluarga & teman",
    "audience.family.body": "Yang ingin tetap nyambung, meski sibuk atau tinggal berjauhan.",
    "audience.anyone.title": "Siapa saja",
    "audience.anyone.body": "Siapa pun yang ingin lebih dekat dengan orang-orang yang mereka sayang.",
    "approach.title": "Cara kami bekerja",
    "approach.p1.title": "Lebih dekat, bukan lebih jauh",
    "approach.p1.body":
      "Setiap fitur kami uji dengan satu pertanyaan: apakah ini membuatmu lebih dekat dengan orang yang kamu sayang?",
    "approach.p2.title": "Sebentar, tapi berarti",
    "approach.p2.body":
      "Kami tidak mengejar waktu layar. Sesi singkat yang terasa berguna lebih baik daripada berjam-jam scroll.",
    "approach.p3.title": "Privasi sejak awal",
    "approach.p3.body":
      "Data dan momenmu milikmu. Privasi kami pikirkan sejak rancangan pertama, bukan ditambahkan belakangan.",
    "approach.p4.title": "Terasa dekat",
    "approach.p4.body": "Bahasa, contoh, dan kebiasaan yang akrab untuk orang Indonesia.",
    "contact.title": "Hubungi kami",
    "contact.body":
      "Punya pertanyaan, ide kerja sama, atau masukan untuk aplikasi kami? Kirim email, kami balas secepatnya.",
    "contact.email": "Email",
    "contact.social": "Media sosial",

    // Blog
    "blog.title": "Blog",
    "blog.lead":
      "Tulisan dari tim Livales tentang menjaga hubungan, memilih kado, dan kebiasaan kecil yang mendekatkan.",
    "blog.readTime": "menit baca",
    "blog.back": "Semua tulisan",
    "blog.more": "Tulisan lainnya",
    "blog.published": "Terbit",
    "blog.breadcrumb": "Jejak halaman",
    "blog.related": "Dari Livales",

    // Updates band (every page)
    "cta.title": "Mau dikabari waktu aplikasi berikutnya rilis?",
    "cta.body": "Satu email saat ada kabar penting. Tidak lebih.",
    "cta.follow": "Atau ikuti kami di",
    "cta.and": "dan",

    // Updates form
    "form.email": "Alamat email",
    "form.placeholder": "nama@email.com",
    "form.submit": "Kabari saya",
    "form.submitting": "Mendaftarkan…",
    "form.success.title": "Sip, kamu sudah terdaftar.",
    "form.success.body": "Kami akan mengirim email saat ada kabar dari Livales.",
    "form.error": "Alamat email belum lengkap. Contoh: nama@email.com",
    "form.failed": "Belum terkirim. Cek koneksi internetmu, lalu coba lagi.",

    // Footer
    "footer.tagline": "Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal.",
    "footer.company": "Perusahaan",
    "footer.products": "Produk",
    "footer.social": "Sosial",
    "footer.rights": "Hak cipta dilindungi.",
    "footer.made": "Dibuat di Indonesia.",

    // 404
    "notFound.title": "Halaman ini tidak ada.",
    "notFound.body": "Mungkin alamatnya salah ketik, atau halamannya sudah dipindah.",
    "notFound.cta": "Kembali ke beranda",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.cta": "Get updates",
    "nav.menu": "Menu",
    "nav.close": "Close menu",
    "nav.main": "Main navigation",
    "common.newTab": "(opens in a new tab)",

    // Products
    "product.kado.name": "Kado Livales",
    "product.kado.short": "Find a gift they'll actually like.",
    "product.kado.cta": "Open Kado Livales",
    "product.kado.status": "Ready to use",
    "product.kana.name": "Kana Speed",
    "product.kana.short": "Learn the Japanese alphabets through short quizzes.",
    "product.kana.cta": "Open Kana Speed",
    "product.kana.status": "Ready to use",
    "product.hl.name": "Hearts & Ladders",
    "product.hl.short": "Snakes and ladders for couples, full of questions and dares.",
    "product.hl.cta": "Visit Hearts & Ladders",
    "product.hl.status": "Testing on Android",
    "product.hl.tester": "Sign up as an early tester",

    // Home: hero
    "hero.title": "Closer to the people you love, and the world you want to know.",
    "hero.body":
      "Livales is a technology company from Indonesia. We design and build our own apps, for staying close to the people who matter to you: your partner, your family, and your friends.",
    "hero.cta.primary": "See our products",
    "hero.cta.secondary": "Get updates from us",
    "hero.ask.label": "Ask your partner tonight",
    "hero.ask.next": "Another question",
    "hero.ask.level1": "Light",
    "hero.ask.level2": "About you two",
    "hero.ask.level3": "Deeper",
    "hero.ask.more": "Read 30 questions for couples",

    // Home: Hearts & Ladders
    "hl.title": "Hearts & Ladders: snakes and ladders that brings you closer.",
    "hl.body":
      "Roll the dice, land on a heart, then answer a question or take on a dare together. Your answers and photos are saved as memories. It's being tested on Android now, and we're looking for couples who'd like to try it first.",
    "hl.point1": "Play together on one phone, or from far away on two.",
    "hl.point2": "Modes for every stage of a relationship, from just met to married.",
    "hl.point3": "Free to play, no sign-up needed.",
    "hl.shot.board": "The Hearts & Ladders board on a phone",
    "hl.shot.challenge": "A challenge card opened on a heart square",
    "hl.shot.vault": "Answers saved in the Memory Vault",

    // Home: product lineup
    "lineup.title": "Three apps, one goal: bringing people closer.",
    "lineup.body":
      "We design and build every Livales app ourselves. Two are ready to use today, and one is being tested.",
    "lineup.more": "See all products",

    // Home: why
    "why.title": "Why Livales exists",
    "why.p1":
      "Most apps on our phones are built to keep us scrolling. The time goes, but we don't end up closer to anyone.",
    "why.p2":
      "We want to build the opposite: apps that bring you closer to the partner, family, and friends you love.",
    "why.more": "About Livales",

    // Home: blog teaser
    "blogTeaser.title": "From the blog",
    "blogTeaser.more": "All articles",

    // FAQ
    "faq.title": "Questions people ask",
    "faq.q1": "What is Livales?",
    "faq.a1":
      "A technology company from Indonesia that designs and builds its own apps, to bring you closer to the people you love: your partner, your family, and your friends.",
    "faq.q2": "What products does Livales make?",
    "faq.a2":
      "Kado Livales, for finding gifts, making wishlists, and chipping in on gifts with friends (kado.livales.com). Kana Speed, a free app for learning the Japanese alphabets (kana.livales.com). Hearts & Ladders, snakes and ladders for couples, now in Android testing (heartsandladders.livales.com).",
    "faq.q3": "When can I download Hearts & Ladders?",
    "faq.a3":
      "Hearts & Ladders is being tested on Android before release. To try it early, sign up as a tester at heartsandladders.livales.com. To hear when it launches, leave your email below.",
    "faq.q4": "Are Livales apps free?",
    "faq.a4":
      "Kado Livales and Kana Speed are free. Hearts & Ladders is free to play, with the Rumah Kita mode and extra features in Premium.",
    "faq.q5": "What will you use my email for?",
    "faq.a5":
      "Only to send news from Livales. We never sell or share it, and you can unsubscribe anytime.",

    // Products page
    "products.title": "Apps by Livales",
    "products.body":
      "We make small apps that each do one thing well: helping you choose a gift, learn the Japanese alphabets, and spend quality time with your partner.",
    "products.facts.platform": "Platform",
    "products.facts.language": "Languages",
    "products.facts.price": "Price",
    "products.features": "What you can do",
    "products.preview.kado": "The Kado Livales home page on a phone",
    "products.preview.kana": "The Kana Speed home page on a phone",
    "products.preview.hl": "The Hearts & Ladders board on a phone",
    "products.kado.body":
      "Kado Livales helps you find a gift the person will actually like, not just an idea. It's full of real products from Indonesian marketplaces that we pick one by one.",
    "products.kado.f1": "Find a gift through a four-step quiz, for your mum, dad, partner, best friend, or coworker.",
    "products.kado.f2": "Send a gift card by link, with your own message.",
    "products.kado.f3": "Make your own wishlist so friends know what you'd like.",
    "products.kado.f4": "Chip in on a gift with friends: suggest, vote, then buy it together.",
    "products.kado.platform": "Web",
    "products.kado.language": "Indonesian, with an English version",
    "products.kado.price": "Free",
    "products.kana.body":
      "Kana Speed is a quiz site for learning Japanese step by step. Start with hiragana and katakana, then move on to greetings, introducing yourself, and counting.",
    "products.kana.f1": "Learn hiragana and katakana through short quizzes.",
    "products.kana.f2": "Move on to greetings, introductions, numbers, and telling the time.",
    "products.kana.f3": "Learn in your browser, with nothing to install.",
    "products.kana.platform": "Web",
    "products.kana.language": "Indonesian and English",
    "products.kana.price": "Free",
    "products.hl.body":
      "Hearts & Ladders is snakes and ladders for couples. Heart squares open questions, dares, truth-or-truth, or a photo together, and every answer is saved as a memory.",
    "products.hl.f1": "Play together on one phone, or on two synced phones for long-distance couples.",
    "products.hl.f2": "Choose a mode for your stage: Nyambung Dulu, Kita Banget, or Rumah Kita.",
    "products.hl.f3": "Keep answers and photos in the Memory Vault, and open them again anytime.",
    "products.hl.f4": "Go deeper with Deep Talk: one question, taking turns to share.",
    "products.hl.platform": "Android (testing)",
    "products.hl.language": "Indonesian and English",
    "products.hl.price": "Free, with Premium",

    // About page
    "about.title": "About Livales",
    "about.lead":
      "Livales is a technology company from Indonesia. We design and build apps that bring you closer to the people you love, and to the world you want to know.",
    "about.why.title": "Why we exist",
    "about.p1":
      "Most apps on our phones are built to keep us scrolling. The time goes, but we don't end up closer to anyone, or better at anything.",
    "about.p2":
      "We want to build the opposite: apps that bring you closer. To the partner, family, and friends you love.",
    "about.p3":
      "We design and build every Livales product ourselves, in Indonesia. Kado Livales and Kana Speed are ready to use, and Hearts & Ladders is being tested with its first couples.",
    "about.sign": "The Livales team",
    "about.markLabel": "The Livales mark: a letter L embracing a dot",
    "audience.title": "Who it's for",
    "audience.couple.title": "Couples",
    "audience.couple.body": "Who want to stay warm, even after years together.",
    "audience.family.title": "Family & friends",
    "audience.family.body": "Who want to stay in touch, however busy or far apart.",
    "audience.anyone.title": "Anyone",
    "audience.anyone.body": "Anyone who wants to be closer to the people they love.",
    "approach.title": "How we work",
    "approach.p1.title": "Closer, not further apart",
    "approach.p1.body":
      "We test every feature with one question: does this bring you closer to the people you love?",
    "approach.p2.title": "Short, but worth it",
    "approach.p2.body":
      "We don't chase screen time. A short session that actually helps beats hours of scrolling.",
    "approach.p3.title": "Private from the start",
    "approach.p3.body":
      "Your data and your moments belong to you. We think about privacy from the first sketch, not as an afterthought.",
    "approach.p4.title": "Close to home",
    "approach.p4.body": "Language, examples, and habits that feel familiar to people in Indonesia.",
    "contact.title": "Get in touch",
    "contact.body":
      "Questions, partnership ideas, or feedback on our apps? Send us an email and we'll reply as soon as we can.",
    "contact.email": "Email",
    "contact.social": "Social media",

    // Blog
    "blog.title": "Blog",
    "blog.lead":
      "Writing from the Livales team on looking after relationships, choosing gifts, and the small habits that bring people closer.",
    "blog.readTime": "min read",
    "blog.back": "All articles",
    "blog.more": "More articles",
    "blog.published": "Published",
    "blog.breadcrumb": "Breadcrumb",
    "blog.related": "From Livales",

    // Updates band
    "cta.title": "Want to hear when our next app launches?",
    "cta.body": "One email when there's real news. Nothing more.",
    "cta.follow": "Or follow us on",
    "cta.and": "and",

    // Updates form
    "form.email": "Email address",
    "form.placeholder": "name@email.com",
    "form.submit": "Keep me posted",
    "form.submitting": "Signing you up…",
    "form.success.title": "Done, you're on the list.",
    "form.success.body": "We'll email you when there's news from Livales.",
    "form.error": "That email address looks incomplete. Example: name@email.com",
    "form.failed": "Not sent yet. Check your internet connection and try again.",

    // Footer
    "footer.tagline": "Closer to the people you love, and the world you want to know.",
    "footer.company": "Company",
    "footer.products": "Products",
    "footer.social": "Social",
    "footer.rights": "All rights reserved.",
    "footer.made": "Made in Indonesia.",

    // 404
    "notFound.title": "This page doesn't exist.",
    "notFound.body": "The address may have a typo, or the page has moved.",
    "notFound.cta": "Back to home",
  },
};

const readStoredLanguage = (): Language | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // storage unavailable (private mode, blocked, or prerendering on the server)
  }
  return null;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Always start in Indonesian: the page is prerendered in "id", and the
  // first client render must match it for hydration. A saved preference is
  // applied right after mount.
  const [language, setLanguage] = useState<Language>("id");
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) setLanguage(stored);
    setRestored(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    if (!restored) return; // don't overwrite the saved choice before reading it
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language, restored]);

  const t = (key: string): string => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
