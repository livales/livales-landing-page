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

// NOTE: the landing page is about Livales the company. The first app is in
// stealth — mention only that it exists; never its name or mechanics.
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    "nav.about": "Tentang",
    "nav.audience": "Untuk Siapa",
    "nav.approach": "Prinsip",
    "nav.product": "Produk",
    "nav.faq": "FAQ",
    "nav.cta": "Ikuti Kabar",
    "nav.menu": "Menu",

    // Hero
    "hero.badge": "Aplikasi pertama kami sedang dikembangkan",
    "hero.title1": "Software yang",
    "hero.title2": "mempererat hubungan.",
    "hero.subtitle":
      "Livales adalah perusahaan teknologi asal Indonesia yang merancang dan membangun software sendiri untuk mendekatkan orang-orang — pasangan, sahabat, keluarga, dan siapa pun yang berarti bagimu.",
    "hero.cta.primary": "Kenali Livales",
    "hero.cta.secondary": "Ikuti perkembangan kami",
    "hero.chip.couple": "Pasangan",
    "hero.chip.bestie": "Sahabat",
    "hero.chip.family": "Keluarga",
    "hero.chip.more": "Dan lainnya",

    // Updates form (shared)
    "form.email": "Alamat email kamu",
    "form.submit": "Kabari Saya",
    "form.submitting": "Mendaftarkan…",
    "form.success.title": "Terima kasih, kamu sudah terdaftar!",
    "form.success.body":
      "Kami akan mengabari setiap ada produk atau kabar baru dari Livales.",
    "form.error": "Masukkan alamat email yang valid.",

    // About
    "about.eyebrow": "Tentang Livales",
    "about.title":
      "Kami percaya teknologi seharusnya mendekatkan, bukan menjauhkan.",
    "about.body1":
      "Hubungan tumbuh dari momen yang dijalani bersama — tertawa, saling mengenal, dan menciptakan cerita baru. Tapi sebagian besar aplikasi di ponsel kita dirancang untuk dinikmati sendirian.",
    "about.body2":
      "Livales hadir untuk mengubah itu. Kami adalah perusahaan software yang merancang, membangun, dan mengembangkan produk kami sendiri — semuanya dengan satu tujuan: mempererat hubungan antarmanusia.",
    "about.stat1.value": "100%",
    "about.stat1.label": "produk dirancang dan dibangun sendiri oleh tim Livales",
    "about.stat2.value": "1+",
    "about.stat2.label": "aplikasi dalam pengembangan, dan akan terus bertambah",
    "about.stat3.value": "ID",
    "about.stat3.label": "berbasis di Indonesia, dibuat untuk budaya kita",

    // Audience
    "audience.eyebrow": "Untuk siapa",
    "audience.title": "Untuk setiap hubungan yang ingin kamu jaga",
    "audience.body":
      "Setiap hubungan itu unik. Karena itu kami merancang software untuk berbagai jenis kedekatan — bukan satu ukuran untuk semua.",
    "audience.a1.title": "Pasangan",
    "audience.a1.body":
      "Menjaga kehangatan, menciptakan momen baru, dan tumbuh bersama setiap hari.",
    "audience.a2.title": "Sahabat & besti",
    "audience.a2.body":
      "Tetap dekat dan seru bersama, meski jadwal padat atau terpisah jarak.",
    "audience.a3.title": "Keluarga",
    "audience.a3.body":
      "Menghadirkan lebih banyak waktu berkualitas di antara orang-orang di rumah.",
    "audience.a4.title": "Dan lainnya",
    "audience.a4.body":
      "Teman, komunitas, rekan — siapa pun yang ingin terhubung lebih bermakna.",

    // Approach / principles
    "approach.eyebrow": "Prinsip kami",
    "approach.title": "Cara kami membangun setiap produk",
    "approach.p1.title": "Berpusat pada hubungan",
    "approach.p1.body":
      "Setiap fitur dimulai dari satu pertanyaan: apakah ini membuat orang-orang lebih dekat?",
    "approach.p2.title": "Interaktif, bukan pasif",
    "approach.p2.body":
      "Kami membuat pengalaman yang mengajak kalian melakukan sesuatu bersama — bukan scrolling tanpa akhir.",
    "approach.p3.title": "Privasi sebagai fondasi",
    "approach.p3.body":
      "Momen kalian adalah milik kalian. Privasi kami perlakukan sebagai prinsip desain, bukan fitur tambahan.",
    "approach.p4.title": "Lokal dan relevan",
    "approach.p4.body":
      "Bahasa, humor, dan konteks yang terasa dekat dengan pengguna Indonesia.",

    // Products
    "product.eyebrow": "Produk",
    "product.title": "Satu perusahaan, banyak cara untuk mendekatkan.",
    "product.body":
      "Livales bukan hanya satu aplikasi. Kami sedang membangun rangkaian produk yang akan terus bertambah — masing-masing dirancang untuk memperkuat jenis hubungan yang berbeda.",
    "product.p1.tag": "Aplikasi 01",
    "product.p1.status": "Dalam pengembangan",
    "product.p1.title": "Aplikasi pertama kami",
    "product.p1.body":
      "Sedang kami kembangkan dan sempurnakan. Detailnya akan kami umumkan segera.",
    "product.p2.tag": "Berikutnya",
    "product.p2.status": "Segera",
    "product.p2.title": "Lebih banyak produk menyusul",
    "product.p2.body":
      "Ide-ide baru untuk pasangan, sahabat, dan keluarga sedang kami rancang.",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title": "Pertanyaan yang sering diajukan",
    "faq.q1": "Apa itu Livales?",
    "faq.a1":
      "Livales adalah perusahaan teknologi asal Indonesia yang merancang dan membangun software sendiri untuk mempererat hubungan — antara pasangan, sahabat, keluarga, dan orang-orang terdekat.",
    "faq.q2": "Apakah Livales hanya untuk pasangan?",
    "faq.a2":
      "Tidak. Kami membangun produk untuk berbagai jenis hubungan: pasangan, sahabat, keluarga, hingga teman dan komunitas.",
    "faq.q3": "Produk apa yang sedang dikembangkan?",
    "faq.a3":
      "Aplikasi pertama kami sedang dalam tahap pengembangan. Detailnya akan kami umumkan saat sudah siap — dan setelah itu, akan ada produk-produk lain yang menyusul.",
    "faq.q4": "Bagaimana cara mengikuti perkembangan Livales?",
    "faq.a4":
      "Daftarkan email kamu di halaman ini atau ikuti LinkedIn kami. Kamu akan jadi yang pertama tahu setiap ada produk atau kabar baru.",
    "faq.q5": "Bagaimana email saya digunakan?",
    "faq.a5":
      "Hanya untuk mengirim kabar seputar Livales. Kami tidak menjual atau membagikan email kamu ke pihak lain, dan kamu bisa berhenti berlangganan kapan saja.",

    // Final CTA
    "cta.eyebrow": "Tetap terhubung",
    "cta.title": "Ikuti perjalanan kami.",
    "cta.body":
      "Dapatkan kabar pertama tentang peluncuran produk dan cerita terbaru dari Livales.",

    // Footer
    "footer.tagline": "Software yang mempererat hubungan.",
    "footer.company": "Perusahaan",
    "footer.social": "Sosial",
    "footer.rights": "Hak cipta dilindungi.",
    "footer.made": "Dibuat dengan cermat di Indonesia.",
  },
  en: {
    // Navbar
    "nav.about": "About",
    "nav.audience": "Who It's For",
    "nav.approach": "Principles",
    "nav.product": "Products",
    "nav.faq": "FAQ",
    "nav.cta": "Get Updates",
    "nav.menu": "Menu",

    // Hero
    "hero.badge": "Our first app is in development",
    "hero.title1": "Software that",
    "hero.title2": "brings people closer.",
    "hero.subtitle":
      "Livales is an Indonesian technology company that designs and builds its own software to bring people closer — couples, best friends, families, and anyone who matters to you.",
    "hero.cta.primary": "Meet Livales",
    "hero.cta.secondary": "Follow our journey",
    "hero.chip.couple": "Couples",
    "hero.chip.bestie": "Best friends",
    "hero.chip.family": "Family",
    "hero.chip.more": "And more",

    // Updates form (shared)
    "form.email": "Your email address",
    "form.submit": "Keep Me Posted",
    "form.submitting": "Signing you up…",
    "form.success.title": "Thanks, you're signed up!",
    "form.success.body":
      "We'll let you know whenever there's a new product or update from Livales.",
    "form.error": "Please enter a valid email address.",

    // About
    "about.eyebrow": "About Livales",
    "about.title":
      "We believe technology should bring people closer, not further apart.",
    "about.body1":
      "Relationships grow from moments shared — laughing, learning about each other, and creating new stories. Yet most apps on our phones are designed to be used alone.",
    "about.body2":
      "Livales is here to change that. We're a software company that designs, builds, and grows our own products — all with a single goal: strengthening human connection.",
    "about.stat1.value": "100%",
    "about.stat1.label": "of our products designed and built in-house by the Livales team",
    "about.stat2.value": "1+",
    "about.stat2.label": "app in development, with more on the way",
    "about.stat3.value": "ID",
    "about.stat3.label": "based in Indonesia, made for our culture",

    // Audience
    "audience.eyebrow": "Who it's for",
    "audience.title": "For every relationship worth keeping close",
    "audience.body":
      "Every relationship is unique. That's why we design software for many kinds of closeness — not one size fits all.",
    "audience.a1.title": "Couples",
    "audience.a1.body":
      "Keeping the spark alive, creating new moments, and growing together every day.",
    "audience.a2.title": "Best friends",
    "audience.a2.body":
      "Staying close and having fun together, even with busy schedules or miles apart.",
    "audience.a3.title": "Family",
    "audience.a3.body":
      "Bringing more quality time to the people you share a home with.",
    "audience.a4.title": "And more",
    "audience.a4.body":
      "Friends, communities, colleagues — anyone who wants a more meaningful connection.",

    // Approach / principles
    "approach.eyebrow": "Our principles",
    "approach.title": "How we build every product",
    "approach.p1.title": "Relationship-first",
    "approach.p1.body":
      "Every feature starts with one question: does this bring people closer?",
    "approach.p2.title": "Interactive, not passive",
    "approach.p2.body":
      "We build experiences that invite you to do something together — not scroll endlessly.",
    "approach.p3.title": "Privacy as a foundation",
    "approach.p3.body":
      "Your moments belong to you. We treat privacy as a design principle, not an add-on.",
    "approach.p4.title": "Local and relevant",
    "approach.p4.body":
      "Language, humor, and context that feel close to home for Indonesian users.",

    // Products
    "product.eyebrow": "Products",
    "product.title": "One company, many ways to bring people closer.",
    "product.body":
      "Livales isn't just one app. We're building a growing family of products — each designed to strengthen a different kind of relationship.",
    "product.p1.tag": "App 01",
    "product.p1.status": "In development",
    "product.p1.title": "Our first app",
    "product.p1.body":
      "Currently being built and refined. We'll share the details soon.",
    "product.p2.tag": "Next",
    "product.p2.status": "Coming",
    "product.p2.title": "More products to follow",
    "product.p2.body":
      "New ideas for couples, friends, and families are already on the drawing board.",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.q1": "What is Livales?",
    "faq.a1":
      "Livales is an Indonesian technology company that designs and builds its own software to strengthen relationships — between couples, best friends, families, and the people closest to you.",
    "faq.q2": "Is Livales only for couples?",
    "faq.a2":
      "No. We build products for many kinds of relationships: couples, best friends, families, as well as friends and communities.",
    "faq.q3": "What are you working on right now?",
    "faq.a3":
      "Our first app is in development. We'll announce the details once it's ready — and more products will follow after that.",
    "faq.q4": "How can I follow Livales?",
    "faq.a4":
      "Leave your email on this page or follow us on LinkedIn. You'll be the first to know about every new product and update.",
    "faq.q5": "How will my email be used?",
    "faq.a5":
      "Only to send Livales updates. We never sell or share your email, and you can unsubscribe anytime.",

    // Final CTA
    "cta.eyebrow": "Stay connected",
    "cta.title": "Follow our journey.",
    "cta.body":
      "Be the first to hear about product launches and the latest stories from Livales.",

    // Footer
    "footer.tagline": "Software that brings people closer.",
    "footer.company": "Company",
    "footer.social": "Social",
    "footer.rights": "All rights reserved.",
    "footer.made": "Carefully made in Indonesia.",
  },
};

const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // storage unavailable — fall through to default
  }
  return "id";
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

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
