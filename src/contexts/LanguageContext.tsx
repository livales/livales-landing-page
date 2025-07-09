import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.features': 'Fitur',
    'nav.memories': 'Kenangan',
    'nav.contact': 'Kontak',
    'nav.waitlist': 'Daftar Tunggu',
    
    // Hero Section
    'hero.title1': 'Perdalam Koneksimu.',
    'hero.title2': 'Ciptakan Momen Bersama.',
    'hero.subtitle': 'Livales adalah ruang digital eksklusif untuk pasangan dan sahabat terbaik untuk tumbuh, berbagi kenangan, dan memperkuat ikatan yang kalian miliki.',
    'hero.cta': 'Masuk Daftar Tunggu',
    
    // Feature Section 1
    'feature1.title1': 'Tumbuh Bersama,',
    'feature1.title2': 'Setiap Hari',
    'feature1.description': 'Livales membantu pasangan melacak tujuan bersama, merayakan pencapaian, dan membangun kebiasaan sehat bersama. Jadikan perjalanan hubungan kalian terlihat dan bermakna.',
    'feature1.point1': 'Tracker tujuan bersama yang interaktif',
    'feature1.point2': 'Milestone celebrations yang personal',
    'feature1.point3': 'Progress visualization yang motivating',
    
    // Feature Section 2
    'feature2.title1': 'Abadikan Setiap',
    'feature2.title2': 'Momen Berharga',
    'feature2.description': 'Buat timeline pribadi dari kenangan paling berharga kalian. Dari foto dan catatan hingga tanggal spesial, semua tersimpan rapi dalam satu tempat yang indah.',
    'feature2.point1': 'Photo journal yang terorganisir secara chronological',
    'feature2.point2': 'Memory jar untuk menyimpan moment spontan',
    'feature2.point3': 'Timeline yang bisa dishare untuk anniversary',
    
    // Memories Section
    'memories.title1': 'Lebih dari Sekadar Aplikasi,',
    'memories.title2': 'Ini Rumah Kenangan Kalian',
    'memories.feature1.title': 'Kenangan Bersama',
    'memories.feature1.description': 'Simpan momen-momen spesial kalian dalam timeline yang indah. Dari foto pertama kali bertemu hingga anniversary terbaru.',
    'memories.feature2.title': 'Surat Digital',
    'memories.feature2.description': 'Kirim surat digital yang penuh cinta untuk pasangan atau sahabat. Surprise mereka dengan pesan heartfelt kapan saja.',
    'memories.feature3.title': 'Tanggal Penting',
    'memories.feature3.description': 'Jangan pernah lupa anniversary, ulang tahun, atau moment spesial lainnya. Livales akan selalu mengingatkan kalian.',
    'memories.comingSoon': 'Coming Soon:',
    'memories.comingSoonText': 'Fitur-fitur canggih untuk mengelola kenangan, mengirim surprise letters, dan tracking tanggal-tanggal penting dalam hubungan kalian.',
    
    // Feature Section 3
    'feature3.title1': 'Tantangan Seru',
    'feature3.title2': 'Menantimu',
    'feature3.description': 'Games dan quiz seru yang dirancang khusus untuk pasangan dan sahabat sedang dalam perjalanan. Sempurna untuk date night atau sekadar bersenang-senang bersama.',
    'feature3.point1': 'Couple challenges untuk memperdalam connection',
    'feature3.point2': 'Fun quizzes yang reveal personality insights',
    'feature3.point3': 'Interactive games untuk quality time',
    'feature3.followDev': 'Ikuti Perkembangan',
    
    // Waitlist Section
    'waitlist.title1': 'Jadilah yang Pertama',
    'waitlist.title2': 'Merasakan Livales',
    'waitlist.subtitle': 'Bergabunglah dengan ribuan pasangan dan sahabat yang menunggu peluncuran Livales. Dapatkan early access dan bonus eksklusif!',
    'waitlist.form.name': 'Nama Lengkap',
    'waitlist.form.email': 'Alamat Email',
    'waitlist.form.relationship': 'Tipe Hubungan',
    'waitlist.form.couple': 'Pasangan',
    'waitlist.form.friends': 'Sahabat',
    'waitlist.form.submit': 'Gabung Waitlist',
    'waitlist.form.submitting': 'Mengirim...',
    'waitlist.perks.title': 'Keuntungan Early Access:',
    'waitlist.perk1': 'Akses gratis selama 3 bulan pertama',
    'waitlist.perk2': 'Bonus premium features eksklusif',
    'waitlist.perk3': 'Priority customer support',
    'waitlist.perk4': 'Kesempatan memberikan feedback langsung ke developer'
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.memories': 'Memories',
    'nav.contact': 'Contact',
    'nav.waitlist': 'Join Waitlist',
    
    // Hero Section
    'hero.title1': 'Deepen Your Connection.',
    'hero.title2': 'Create Moments Together.',
    'hero.subtitle': 'Livales is an exclusive digital space for couples and best friends to grow, share memories, and strengthen the bonds you have.',
    'hero.cta': 'Join Waitlist',
    
    // Feature Section 1
    'feature1.title1': 'Growing Together,',
    'feature1.title2': 'Every Day',
    'feature1.description': 'Livales helps couples track shared goals, celebrate achievements, and build healthy habits together. Make your relationship journey visible and meaningful.',
    'feature1.point1': 'Interactive shared goal tracker',
    'feature1.point2': 'Personal milestone celebrations',
    'feature1.point3': 'Motivating progress visualization',
    
    // Feature Section 2
    'feature2.title1': 'Capture Every',
    'feature2.title2': 'Precious Moment',
    'feature2.description': 'Create a private timeline of your most cherished memories. From photos and notes to special dates, everything is beautifully organized in one place.',
    'feature2.point1': 'Chronologically organized photo journal',
    'feature2.point2': 'Memory jar for spontaneous moments',
    'feature2.point3': 'Shareable timeline for anniversaries',
    
    // Memories Section
    'memories.title1': 'More Than Just an App,',
    'memories.title2': 'This is Your Memory Home',
    'memories.feature1.title': 'Shared Memories',
    'memories.feature1.description': 'Store your special moments in a beautiful timeline. From your first meeting photos to your latest anniversary.',
    'memories.feature2.title': 'Digital Letters',
    'memories.feature2.description': 'Send love-filled digital letters to your partner or best friend. Surprise them with heartfelt messages anytime.',
    'memories.feature3.title': 'Important Dates',
    'memories.feature3.description': 'Never forget anniversaries, birthdays, or other special moments. Livales will always remind you.',
    'memories.comingSoon': 'Coming Soon:',
    'memories.comingSoonText': 'Advanced features for managing memories, sending surprise letters, and tracking important dates in your relationship.',
    
    // Feature Section 3
    'feature3.title1': 'Fun Challenges',
    'feature3.title2': 'Await You',
    'feature3.description': 'Exciting games and quizzes designed specifically for couples and best friends are on the way. Perfect for date nights or just having fun together.',
    'feature3.point1': 'Couple challenges to deepen connection',
    'feature3.point2': 'Fun quizzes that reveal personality insights',
    'feature3.point3': 'Interactive games for quality time',
    'feature3.followDev': 'Follow Development',
    
    // Waitlist Section
    'waitlist.title1': 'Be the First',
    'waitlist.title2': 'to Experience Livales',
    'waitlist.subtitle': 'Join thousands of couples and best friends waiting for the Livales launch. Get early access and exclusive bonuses!',
    'waitlist.form.name': 'Full Name',
    'waitlist.form.email': 'Email Address',
    'waitlist.form.relationship': 'Relationship Type',
    'waitlist.form.couple': 'Couple',
    'waitlist.form.friends': 'Best Friends',
    'waitlist.form.submit': 'Join Waitlist',
    'waitlist.form.submitting': 'Submitting...',
    'waitlist.perks.title': 'Early Access Benefits:',
    'waitlist.perk1': 'Free access for the first 3 months',
    'waitlist.perk2': 'Exclusive premium features bonus',
    'waitlist.perk3': 'Priority customer support',
    'waitlist.perk4': 'Direct feedback opportunity to developers'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};