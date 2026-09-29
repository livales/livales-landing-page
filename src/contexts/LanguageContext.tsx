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

// NOTE: the page is about Livales the company: software that brings you
// closer, to the people you love and to new languages and cultures.
// Products: Kana Speed (live, public) and an app for couples in development.
// The couples app may only be described as "an app for couples": never its
// name, concept or mechanics.
// Voice: warm and plain, first person plural ("kami"), talking to "kamu".
export const KANA_URL: Record<Language, string> = {
  id: "https://kana.livales.com/id/",
  en: "https://kana.livales.com/en/",
};

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
    "hero.title": "Kami bikin software yang mendekatkan.",
    "hero.body":
      "Dekat dengan orang yang kamu sayang, dan dengan bahasa serta budaya baru. Livales adalah perusahaan teknologi dari Indonesia yang merancang dan membangun aplikasinya sendiri.",
    "hero.cta.primary": "Lihat produk kami",
    "hero.cta.secondary": "Ikuti kabar dari kami",
    "hero.markLabel": "Simbol Livales: huruf L yang merangkul sebuah titik",

    // About — written as a short note from the team
    "about.title": "Kenapa Livales ada",
    "about.p1":
      "Kebanyakan aplikasi di ponsel kita dibuat supaya kita terus scroll. Waktu habis, tapi kita tidak jadi lebih dekat dengan siapa pun, atau lebih pandai dalam apa pun.",
    "about.p2":
      "Kami ingin membuat yang sebaliknya: aplikasi yang membawa kamu lebih dekat. Ke orang-orang yang kamu sayang, dan ke bahasa, budaya, serta dunia yang ingin kamu kenal.",
    "about.p3":
      "Semua produk Livales kami rancang dan bangun sendiri, di Indonesia. Yang pertama sudah bisa kamu coba hari ini.",
    "about.sign": "Tim Livales",

    // Audience
    "audience.title": "Untuk siapa",
    "audience.learner.title": "Pembelajar",
    "audience.learner.body": "Yang ingin menguasai bahasa baru, satu langkah setiap hari.",
    "audience.couple.title": "Pasangan",
    "audience.couple.body": "Yang ingin tetap hangat, bahkan setelah bertahun-tahun bersama.",
    "audience.family.title": "Sahabat & keluarga",
    "audience.family.body": "Yang ingin tetap nyambung, meski sibuk atau tinggal berjauhan.",
    "audience.anyone.title": "Siapa saja",
    "audience.anyone.body": "Siapa pun yang ingin lebih dekat dengan orang dan hal yang mereka pedulikan.",

    // Approach / principles
    "approach.title": "Cara kami bekerja",
    "approach.p1.title": "Mendekatkan, bukan menjauhkan",
    "approach.p1.body":
      "Setiap fitur kami uji dengan satu pertanyaan: apakah ini membuatmu lebih dekat dengan orang atau hal yang kamu pedulikan?",
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
    "product.title": "Satu sudah bisa dicoba. Satu lagi sedang dibuat.",
    "product.body":
      "Kana Speed membantu kamu belajar bahasa Jepang lewat kuis singkat, gratis. Aplikasi untuk pasangan sedang kami siapkan. Rak ini akan terus terisi.",
    "product.kana.name": "Kana Speed",
    "product.kana.desc": "Belajar bahasa Jepang",
    "product.kana.cta": "Coba Kana Speed",
    "product.kana.newTab": "(terbuka di tab baru)",
    "product.couple.name": "Aplikasi untuk pasangan",
    "product.couple.status": "Sedang dibuat",
    "product.slotNext": "Berikutnya",

    // FAQ
    "faq.title": "Pertanyaan yang sering muncul",
    "faq.q1": "Livales itu apa?",
    "faq.a1":
      "Perusahaan teknologi dari Indonesia yang merancang dan membangun software sendiri: software yang mendekatkan kamu dengan orang yang kamu sayang, dan dengan bahasa serta budaya baru.",
    "faq.q2": "Apa saja produk Livales?",
    "faq.a2":
      "Saat ini ada Kana Speed, aplikasi gratis untuk belajar bahasa Jepang di kana.livales.com. Aplikasi untuk pasangan sedang kami kembangkan, dan produk lain akan menyusul.",
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
    "footer.tagline": "Software yang mendekatkan.",
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
    "hero.title": "We make software that brings you closer.",
    "hero.body":
      "Closer to the people you love, and to new languages and cultures. Livales is a technology company from Indonesia that designs and builds its own apps.",
    "hero.cta.primary": "See our products",
    "hero.cta.secondary": "Get updates from us",
    "hero.markLabel": "The Livales mark: a letter L embracing a dot",

    // About
    "about.title": "Why Livales exists",
    "about.p1":
      "Most apps on our phones are built to keep us scrolling. The time goes, but we don't end up closer to anyone, or better at anything.",
    "about.p2":
      "We want to build the opposite: apps that bring you closer. To the people you love, and to the languages, cultures, and world you want to know.",
    "about.p3":
      "We design and build every Livales product ourselves, in Indonesia. The first one is ready to try today.",
    "about.sign": "The Livales team",

    // Audience
    "audience.title": "Who it's for",
    "audience.learner.title": "Learners",
    "audience.learner.body": "Who want to pick up a new language, one step a day.",
    "audience.couple.title": "Couples",
    "audience.couple.body": "Who want to stay warm, even after years together.",
    "audience.family.title": "Friends & family",
    "audience.family.body": "Who want to stay in touch, however busy or far apart.",
    "audience.anyone.title": "Anyone",
    "audience.anyone.body": "Anyone who wants to be closer to the people and things they care about.",

    // Approach / principles
    "approach.title": "How we work",
    "approach.p1.title": "Closer, not further apart",
    "approach.p1.body":
      "We test every feature with one question: does this bring you closer to the people or things you care about?",
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
    "product.title": "One you can try today. One in the works.",
    "product.body":
      "Kana Speed helps you learn Japanese through short quizzes, for free. An app for couples is on its way. This shelf will keep filling up.",
    "product.kana.name": "Kana Speed",
    "product.kana.desc": "Learn Japanese",
    "product.kana.cta": "Try Kana Speed",
    "product.kana.newTab": "(opens in a new tab)",
    "product.couple.name": "An app for couples",
    "product.couple.status": "In the works",
    "product.slotNext": "Next",

    // FAQ
    "faq.title": "Questions people ask",
    "faq.q1": "What is Livales?",
    "faq.a1":
      "A technology company from Indonesia that designs and builds its own software: software that brings you closer to the people you love, and to new languages and cultures.",
    "faq.q2": "What products does Livales make?",
    "faq.a2":
      "Right now there's Kana Speed, a free app for learning Japanese at kana.livales.com. An app for couples is in development, and more will follow.",
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
    "footer.tagline": "Software that brings you closer.",
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
