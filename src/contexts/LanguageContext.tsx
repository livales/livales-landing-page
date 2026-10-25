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

// NOTE: the page is about Livales the company. Tagline: "Lebih dekat dengan
// orang tersayang, dan dunia yang ingin kamu kenal." / "Closer to the people
// you love, and the world you want to know." (shared with Instagram and Threads).
// The main focus is relationships: couples, family and friends (Kado Livales
// and the app for couples in development). Kana Speed (learning Japanese) is a
// side project: keep it last and labelled as one, never as a second pillar.
// The couples app may only be described as "an app for couples": never its
// name, concept or mechanics.
// Voice: warm and plain, first person plural ("kami"), talking to "kamu".
export const KANA_URL: Record<Language, string> = {
  id: "https://kana.livales.com/id/",
  en: "https://kana.livales.com/en/",
};
// Kado Livales is Indonesian-only, so both languages link to the same page.
export const KADO_URL = "https://kado.livales.com/";
export const THREADS_URL = "https://www.threads.com/@livalesofficial";
export const LINKEDIN_URL = "https://www.linkedin.com/company/livales/";

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    "nav.about": "Tentang",
    "nav.audience": "Untuk siapa",
    "nav.approach": "Cara kami bekerja",
    "nav.product": "Produk",
    "nav.faq": "FAQ",
    "nav.cta": "Ikuti kabar",
    "nav.menu": "Menu",
    "nav.close": "Tutup menu",

    // Hero
    "hero.title": "Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal.",
    "hero.body":
      "Livales adalah perusahaan teknologi dari Indonesia. Kami merancang dan membangun aplikasi sendiri, untuk merawat hubungan dengan orang-orang terdekatmu: pasangan, keluarga, dan teman.",
    "hero.cta.primary": "Lihat produk kami",
    "hero.cta.secondary": "Ikuti kabar dari kami",
    "hero.markLabel": "Simbol Livales: huruf L yang merangkul sebuah titik",

    // Couples: the only thing we say about the app is this line
    "couples.title": "Aplikasi untuk pasangan, segera hadir.",
    "couples.body": "Tinggalkan email kamu. Kami kabari begitu sudah bisa dicoba.",

    // About — written as a short note from the team
    "about.title": "Kenapa Livales ada",
    "about.p1":
      "Kebanyakan aplikasi di ponsel kita dibuat supaya kita terus scroll. Waktu habis, tapi kita tidak jadi lebih dekat dengan siapa pun, atau lebih pandai dalam apa pun.",
    "about.p2":
      "Kami ingin membuat yang sebaliknya: aplikasi yang membawa kamu lebih dekat. Ke pasangan, keluarga, dan teman yang kamu sayang.",
    "about.p3":
      "Semua produk Livales kami rancang dan bangun sendiri, di Indonesia. Kado Livales sudah bisa kamu coba hari ini, dan aplikasi untuk pasangan sedang kami siapkan.",
    "about.sign": "Tim Livales",

    // Audience
    "audience.title": "Untuk siapa",
    "audience.couple.title": "Pasangan",
    "audience.couple.body": "Yang ingin tetap hangat, bahkan setelah bertahun-tahun bersama.",
    "audience.family.title": "Keluarga & teman",
    "audience.family.body": "Yang ingin tetap nyambung, meski sibuk atau tinggal berjauhan.",
    "audience.anyone.title": "Siapa saja",
    "audience.anyone.body": "Siapa pun yang ingin lebih dekat dengan orang-orang yang mereka sayang.",

    // Approach / principles
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
    "approach.p4.body":
      "Bahasa, contoh, dan kebiasaan yang akrab untuk orang Indonesia.",

    // Product — a shelf that will keep filling up
    "product.title": "Dua sudah bisa dicoba. Satu lagi sedang dibuat.",
    "product.body":
      "Kado Livales membantu kamu menemukan kado yang beneran disukai orang tersayang. Aplikasi untuk pasangan sedang kami siapkan. Di sela itu, ada juga Kana Speed, proyek sampingan kami untuk belajar bahasa Jepang lewat kuis singkat.",
    "product.kana.name": "Kana Speed",
    "product.kana.desc": "Belajar bahasa Jepang",
    "product.kana.cta": "Coba Kana Speed",
    "product.kana.newTab": "(terbuka di tab baru)",
    "product.kana.side": "Proyek sampingan",
    "product.kado.name": "Kado Livales",
    "product.kado.desc": "Cari kado yang beneran dia suka",
    "product.kado.cta": "Coba Kado Livales",
    "product.couple.name": "Aplikasi untuk pasangan",
    "product.couple.status": "Sedang dibuat",
    "product.slotNext": "Berikutnya",

    // FAQ
    "faq.title": "Pertanyaan yang sering muncul",
    "faq.q1": "Livales itu apa?",
    "faq.a1":
      "Perusahaan teknologi dari Indonesia yang merancang dan membangun aplikasinya sendiri, supaya kamu lebih dekat dengan orang tersayang: pasangan, keluarga, dan teman.",
    "faq.q2": "Apa saja produk Livales?",
    "faq.a2":
      "Saat ini ada Kado Livales, untuk mencari kado, bikin wishlist, dan patungan kado bareng teman (kado.livales.com), dan aplikasi untuk pasangan yang sedang kami kembangkan. Ada juga Kana Speed, proyek sampingan kami: aplikasi gratis untuk belajar bahasa Jepang (kana.livales.com).",
    "faq.q3": "Kapan aplikasi untuk pasangan rilis?",
    "faq.a3":
      "Masih dalam pengembangan. Detailnya kami umumkan saat sudah siap. Daftarkan email kamu di bawah supaya jadi yang pertama tahu.",
    "faq.q4": "Bagaimana cara mengikuti kabar Livales?",
    "faq.a4":
      "Daftarkan email kamu di bagian bawah halaman ini, atau ikuti kami di LinkedIn.",
    "faq.q5": "Email saya dipakai untuk apa?",
    "faq.a5":
      "Hanya untuk mengirim kabar dari Livales. Kami tidak menjual atau membagikannya, dan kamu bisa berhenti berlangganan kapan saja.",

    // Updates
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
  },
  en: {
    // Navbar
    "nav.about": "About",
    "nav.audience": "Who it's for",
    "nav.approach": "How we work",
    "nav.product": "Products",
    "nav.faq": "FAQ",
    "nav.cta": "Get updates",
    "nav.menu": "Menu",
    "nav.close": "Close menu",

    // Hero
    "hero.title": "Closer to the people you love, and the world you want to know.",
    "hero.body":
      "Livales is a technology company from Indonesia. We design and build our own apps, for staying close to the people who matter to you: your partner, your family, and your friends.",
    "hero.cta.primary": "See our products",
    "hero.cta.secondary": "Get updates from us",
    "hero.markLabel": "The Livales mark: a letter L embracing a dot",

    // Couples: the only thing we say about the app is this line
    "couples.title": "An app for couples, coming soon.",
    "couples.body": "Leave your email. We'll let you know as soon as you can try it.",

    // About
    "about.title": "Why Livales exists",
    "about.p1":
      "Most apps on our phones are built to keep us scrolling. The time goes, but we don't end up closer to anyone, or better at anything.",
    "about.p2":
      "We want to build the opposite: apps that bring you closer. To the partner, family, and friends you love.",
    "about.p3":
      "We design and build every Livales product ourselves, in Indonesia. Kado Livales is ready to try today, and an app for couples is on its way.",
    "about.sign": "The Livales team",

    // Audience
    "audience.title": "Who it's for",
    "audience.couple.title": "Couples",
    "audience.couple.body": "Who want to stay warm, even after years together.",
    "audience.family.title": "Family & friends",
    "audience.family.body": "Who want to stay in touch, however busy or far apart.",
    "audience.anyone.title": "Anyone",
    "audience.anyone.body": "Anyone who wants to be closer to the people they love.",

    // Approach / principles
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
    "approach.p4.body":
      "Language, examples, and habits that feel familiar to people in Indonesia.",

    // Product
    "product.title": "Two you can try today. One in the works.",
    "product.body":
      "Kado Livales helps you find a gift the people you love will actually like. An app for couples is on its way. On the side, there's also Kana Speed, our side project for learning Japanese through short quizzes.",
    "product.kana.name": "Kana Speed",
    "product.kana.desc": "Learn Japanese",
    "product.kana.cta": "Try Kana Speed",
    "product.kana.newTab": "(opens in a new tab)",
    "product.kana.side": "Side project",
    "product.kado.name": "Kado Livales",
    "product.kado.desc": "Find a gift they'll love (in Indonesian)",
    "product.kado.cta": "Try Kado Livales",
    "product.couple.name": "An app for couples",
    "product.couple.status": "In the works",
    "product.slotNext": "Next",

    // FAQ
    "faq.title": "Questions people ask",
    "faq.q1": "What is Livales?",
    "faq.a1":
      "A technology company from Indonesia that designs and builds its own apps, to bring you closer to the people you love: your partner, your family, and your friends.",
    "faq.q2": "What products does Livales make?",
    "faq.a2":
      "Right now there's Kado Livales, for finding gifts, making wishlists, and chipping in on gifts with friends (kado.livales.com, in Indonesian), and an app for couples that's in development. There's also Kana Speed, our side project: a free app for learning Japanese (kana.livales.com).",
    "faq.q3": "When does the app for couples launch?",
    "faq.a3":
      "It's still in development. We'll share the details when it's ready. Leave your email below to be the first to know.",
    "faq.q4": "How can I follow Livales?",
    "faq.a4": "Leave your email at the bottom of this page, or follow us on LinkedIn.",
    "faq.q5": "What will you use my email for?",
    "faq.a5":
      "Only to send news from Livales. We never sell or share it, and you can unsubscribe anytime.",

    // Updates
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
