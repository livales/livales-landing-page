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

// NOTE: the landing page is about Livales the company. The first app is
// confidential — mention only that it exists; never its name or mechanics.
// Voice: warm and plain, first person plural ("kami"), talking to "kamu".
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
    "hero.title": "Kami bikin software buat kamu dan orang yang kamu sayang.",
    "hero.body":
      "Livales adalah perusahaan teknologi dari Indonesia. Kami merancang dan membangun aplikasi sendiri untuk pasangan, sahabat, keluarga, dan siapa pun yang ingin tetap dekat.",
    "hero.cta.primary": "Ikuti kabar dari kami",
    "hero.cta.secondary": "Lihat yang sedang kami buat",
    "hero.markLabel": "Simbol Livales: huruf L yang merangkul sebuah titik",

    // About — written as a short note from the team
    "about.title": "Kenapa Livales ada",
    "about.p1":
      "Kebanyakan aplikasi di ponsel kita dibuat untuk dipakai sendirian. Kita scroll, kita nonton, kita lupa waktu. Sering kali sambil duduk di sebelah orang yang kita sayang.",
    "about.p2":
      "Kami ingin membuat yang sebaliknya: aplikasi yang mengajak dua orang, atau lebih, melakukan sesuatu bersama. Ngobrol lebih dalam, tertawa lebih sering, dan punya cerita baru untuk diingat.",
    "about.p3":
      "Semua produk Livales kami rancang dan bangun sendiri, di Indonesia, untuk cara kita berhubungan satu sama lain.",
    "about.sign": "Tim Livales",

    // Audience
    "audience.title": "Untuk siapa",
    "audience.couple.title": "Pasangan",
    "audience.couple.body": "Yang ingin tetap hangat, bahkan setelah bertahun-tahun bersama.",
    "audience.friends.title": "Sahabat",
    "audience.friends.body": "Yang jarang ketemu, tapi tetap ingin nyambung.",
    "audience.family.title": "Keluarga",
    "audience.family.body": "Yang tinggal serumah, tapi jarang benar-benar ngobrol.",
    "audience.anyone.title": "Siapa saja",
    "audience.anyone.body": "Teman, komunitas, rekan kerja. Hubungan apa pun yang layak dijaga.",

    // Approach / principles
    "approach.title": "Cara kami bekerja",
    "approach.p1.title": "Dibuat untuk dipakai bersama",
    "approach.p1.body":
      "Setiap fitur kami uji dengan satu pertanyaan: apakah ini membuat orang-orang lebih dekat?",
    "approach.p2.title": "Mengajak, bukan menahan",
    "approach.p2.body":
      "Kami tidak mengejar waktu layar. Aplikasi yang baik membuatmu menaruh ponsel dan kembali ke orangnya.",
    "approach.p3.title": "Privasi sejak awal",
    "approach.p3.body":
      "Momen kalian milik kalian. Privasi kami pikirkan sejak rancangan pertama, bukan ditambahkan belakangan.",
    "approach.p4.title": "Terasa dekat",
    "approach.p4.body":
      "Bahasa, candaan, dan kebiasaan yang akrab untuk orang Indonesia.",

    // Product — a shelf that will keep filling up
    "product.title": "Aplikasi pertama kami sedang dibuat.",
    "product.body":
      "Kami belum bisa cerita banyak. Yang pasti, ini baru yang pertama. Rak ini akan terus terisi.",
    "product.slot1.name": "Aplikasi 01",
    "product.slot1.status": "Sedang dibuat",
    "product.slotNext": "Berikutnya",

    // FAQ
    "faq.title": "Pertanyaan yang sering muncul",
    "faq.q1": "Livales itu apa?",
    "faq.a1":
      "Perusahaan teknologi dari Indonesia yang merancang dan membangun software sendiri untuk mempererat hubungan: pasangan, sahabat, keluarga, dan orang-orang terdekat.",
    "faq.q2": "Apakah hanya untuk pasangan?",
    "faq.a2":
      "Tidak. Kami membuat produk untuk berbagai jenis hubungan, dari pasangan dan sahabat sampai keluarga dan komunitas.",
    "faq.q3": "Apa yang sedang kalian buat?",
    "faq.a3":
      "Aplikasi pertama kami sedang dalam pengembangan. Detailnya kami umumkan saat sudah siap, dan setelah itu akan ada produk lain yang menyusul.",
    "faq.q4": "Bagaimana cara mengikuti kabar Livales?",
    "faq.a4":
      "Daftarkan email kamu di bagian bawah halaman ini, atau ikuti kami di LinkedIn.",
    "faq.q5": "Email saya dipakai untuk apa?",
    "faq.a5":
      "Hanya untuk mengirim kabar dari Livales. Kami tidak menjual atau membagikannya, dan kamu bisa berhenti berlangganan kapan saja.",

    // Updates
    "cta.title": "Mau dikabari waktu aplikasi pertama kami rilis?",
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
    "footer.tagline": "Software buat kamu dan orang yang kamu sayang.",
    "footer.company": "Perusahaan",
    "footer.social": "Sosial",
    "footer.rights": "Hak cipta dilindungi.",
    "footer.made": "Dibuat di Indonesia.",
  },
  en: {
    // Navbar
    "nav.about": "About",
    "nav.audience": "Who it's for",
    "nav.approach": "How we work",
    "nav.product": "Product",
    "nav.faq": "FAQ",
    "nav.cta": "Get updates",
    "nav.menu": "Menu",
    "nav.close": "Close menu",

    // Hero
    "hero.title": "We make software for you and the people you love.",
    "hero.body":
      "Livales is a technology company from Indonesia. We design and build our own apps for couples, best friends, families, and anyone who wants to stay close.",
    "hero.cta.primary": "Get updates from us",
    "hero.cta.secondary": "See what we're building",
    "hero.markLabel": "The Livales mark: a letter L embracing a dot",

    // About
    "about.title": "Why Livales exists",
    "about.p1":
      "Most apps on our phones are made to be used alone. We scroll, we watch, we lose track of time. Often while sitting right next to someone we love.",
    "about.p2":
      "We want to build the opposite: apps that invite two people, or more, to do something together. Talk a little deeper, laugh a little more, and make new stories worth remembering.",
    "about.p3":
      "We design and build every Livales product ourselves, in Indonesia, for the way we relate to each other.",
    "about.sign": "The Livales team",

    // Audience
    "audience.title": "Who it's for",
    "audience.couple.title": "Couples",
    "audience.couple.body": "Who want to stay warm, even after years together.",
    "audience.friends.title": "Best friends",
    "audience.friends.body": "Who rarely meet up, but still want to stay in sync.",
    "audience.family.title": "Families",
    "audience.family.body": "Who share a home, but rarely really talk.",
    "audience.anyone.title": "Anyone",
    "audience.anyone.body": "Friends, communities, colleagues. Any relationship worth keeping.",

    // Approach / principles
    "approach.title": "How we work",
    "approach.p1.title": "Made to be used together",
    "approach.p1.body":
      "We test every feature with one question: does this bring people closer?",
    "approach.p2.title": "Inviting, not addictive",
    "approach.p2.body":
      "We don't chase screen time. A good app makes you put your phone down and turn back to the person.",
    "approach.p3.title": "Private from the start",
    "approach.p3.body":
      "Your moments belong to you. We think about privacy from the first sketch, not as an afterthought.",
    "approach.p4.title": "Close to home",
    "approach.p4.body":
      "Language, humour, and habits that feel familiar to people in Indonesia.",

    // Product
    "product.title": "Our first app is being built.",
    "product.body":
      "We can't say much yet. What we can say: it's only the first. This shelf will keep filling up.",
    "product.slot1.name": "App 01",
    "product.slot1.status": "In the works",
    "product.slotNext": "Next",

    // FAQ
    "faq.title": "Questions people ask",
    "faq.q1": "What is Livales?",
    "faq.a1":
      "A technology company from Indonesia that designs and builds its own software to strengthen relationships: couples, best friends, families, and the people closest to you.",
    "faq.q2": "Is it only for couples?",
    "faq.a2":
      "No. We build for many kinds of relationships, from couples and friends to families and communities.",
    "faq.q3": "What are you building?",
    "faq.a3":
      "Our first app is in development. We'll share the details when it's ready, and more products will follow.",
    "faq.q4": "How can I follow Livales?",
    "faq.a4": "Leave your email at the bottom of this page, or follow us on LinkedIn.",
    "faq.q5": "What will you use my email for?",
    "faq.a5":
      "Only to send news from Livales. We never sell or share it, and you can unsubscribe anytime.",

    // Updates
    "cta.title": "Want to hear when our first app launches?",
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
    "footer.tagline": "Software for you and the people you love.",
    "footer.company": "Company",
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
