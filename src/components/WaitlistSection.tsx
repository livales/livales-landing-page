
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const WaitlistSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(sectionRef.current?.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Berhasil bergabung!",
        description:
          "Kami akan menghubungi Anda saat Livales siap diluncurkan.",
        variant: "default",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      id="waitlist-section"
      ref={sectionRef}
      className="gradient-bg section-padding"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-livales-dark leading-tight">
          Siap Bawa Hubunganmu
          <span className="text-gradient block">ke Level Selanjutnya?</span>
        </h2>

        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Ikatan yang lebih kuat, lebih banyak kesenangan, dan pertumbuhan
          bersama. Jadilah yang pertama merasakan pengalaman Livales.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-gray-300 focus:border-livales-green focus:ring-livales-green text-livales-dark placeholder:text-gray-500"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !email}
              className="bg-livales-green hover:bg-livales-green/90 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300"
            >
              {isSubmitting ? "Memproses..." : "Beri Tahu Saya!"}
            </Button>
          </div>
        </form>

        <p className="text-gray-500 text-sm">
          Jadilah bagian dari ribuan pasangan & sahabat yang menantikan Livales.
        </p>

        <div className="flex justify-center space-x-6 pt-4">
          <button
            onClick={() => window.open("https://instagram.com", "_blank")}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <Instagram className="w-6 h-6 text-livales-green group-hover:text-green-600 transition-colors duration-300" />
          </button>
          <button
            onClick={() => window.open("https://youtube.com", "_blank")}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <Youtube className="w-6 h-6 text-livales-green group-hover:text-green-600 transition-colors duration-300" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
          <div className="relative group cursor-not-allowed">
            <div className="w-48 h-14 bg-black rounded-xl flex items-center justify-center px-4 opacity-60 grayscale transition-all duration-300 group-hover:opacity-70">
              <div className="flex items-center space-x-3">
                <svg className="w-8 h-8" viewBox="0 0 384 512" fill="white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-42.7-77.9-44.4-33.2-1.7-66 19.6-83.2 19.6-16.4 0-44.9-19.6-74.3-19.2-38.3.4-75.6 22.3-95.8 56.7-40.8 68.1-10.1 169.9 29.6 225.8 19.6 27.5 42.4 58.5 72.8 57.5 29.7-1.1 41.1-19.3 77.2-19.3 36.1 0 46.9 19.3 78.8 18.8 32.7-.6 51.1-28.9 70.3-56.8 22.2-32.4 31.2-65.7 31.2-67.2-1.9-.9-59.8-23.8-60-94.3zm-58.2-102.6c16.2-19.8 27.8-47.3 24.3-75.8-23.5 1.4-52 15.4-68.9 34.9-15.2 17.9-28.4 46.9-24.8 74.6 26.1 2.1 52.7-13.3 69.4-33.7z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white font-light">
                    Download on the
                  </div>
                  <div className="text-lg text-white font-semibold -mt-1">
                    App Store
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group cursor-not-allowed">
            <div className="w-48 h-14 bg-black rounded-xl flex items-center justify-center px-4 opacity-60 grayscale transition-all duration-300 group-hover:opacity-70">
              <div className="flex items-center space-x-3">
                <svg className="w-8 h-8" viewBox="0 0 512 512" fill="white">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white font-light">GET IT ON</div>
                  <div className="text-lg text-white font-semibold -mt-1">
                    Google Play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
