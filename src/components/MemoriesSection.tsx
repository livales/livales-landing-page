
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Calendar, Mail, LucideProps } from "lucide-react";

// Daftarkan plugin GSAP
gsap.registerPlugin(ScrollTrigger);

// Definisikan tipe untuk fitur agar lebih aman dengan TypeScript
interface Feature {
  icon: React.FC<LucideProps>;
  title: string;
  description: string;
  color: "green" | "emerald" | "teal";
}

const MemoriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pastikan elemen sudah ada di DOM sebelum dianimasikan
    const title = titleRef.current;
    const cards = cardsRef.current?.children;

    if (!title || !cards || cards.length === 0) return;

    // --- PERBAIKAN 1: MENCEGAH KEDIPAN ANIMASI ---
    // Atur kondisi awal elemen agar tidak terlihat sebelum animasi dimulai
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(cards, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Mulai animasi saat 80% bagian atas section terlihat
        end: "bottom 20%",
        toggleActions: "play none none none", // Animasi hanya berjalan sekali
      },
    });

    // Animasikan elemen KE kondisi akhirnya (terlihat)
    tl.to(title, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
    }).to(
      cards,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.2, // Efek muncul satu per satu
        ease: "power3.out",
      },
      "-=0.4"
    ); // Mulai animasi kartu sedikit lebih cepat

    // --- PERBAIKAN 3: FUNGSI PEMBERSIHAN ---
    return () => {
      // Hentikan semua trigger yang terkait dengan timeline ini untuk mencegah memory leak
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const features: Feature[] = [
    {
      icon: Heart,
      title: "Kenangan Bersama",
      description:
        "Simpan momen-momen spesial kalian dalam timeline yang indah. Dari foto pertama kali bertemu hingga anniversary terbaru.",
      color: "green",
    },
    {
      icon: Mail,
      title: "Surat Digital",
      description:
        "Kirim surat digital yang penuh cinta untuk pasangan atau sahabat. Surprise mereka dengan pesan heartfelt kapan saja.",
      color: "emerald",
    },
    {
      icon: Calendar,
      title: "Tanggal Penting",
      description:
        "Jangan pernah lupa anniversary, ulang tahun, atau moment spesial lainnya. Livales akan selalu mengingatkan kalian.",
      color: "teal",
    },
  ];

  // --- PERBAIKAN 2: MAPPING UNTUK DYNAMIC TAILWIND CLASS ---
  const colorVariants = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      iconBg: "bg-gradient-to-br from-green-400 to-green-600",
    },
    emerald: {
      bg: "bg-emerald-100", 
      text: "text-emerald-600",
      iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
      iconBg: "bg-gradient-to-br from-teal-400 to-teal-600",
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 section-padding"
      id="memories"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-livales-dark leading-tight mb-6"
          >
            Lebih dari Sekadar Aplikasi,
            <span className="text-gradient block">
              Ini Rumah Kenangan Kalian
            </span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Ambil varian warna yang sesuai dari mapping object
            const variant = colorVariants[feature.color];

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 ${variant.iconBg} rounded-3xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-livales-green rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-livales-dark mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span className="font-semibold text-livales-green">Coming Soon:</span>{" "}
            Fitur-fitur canggih untuk mengelola kenangan, mengirim surprise
            letters, dan tracking tanggal-tanggal penting dalam hubungan kalian.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
