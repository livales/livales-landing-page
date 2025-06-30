import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import ComingSoonGraphic from "./mockups/ComingSoonGraphic";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection3 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      textRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-sage-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={imageRef} className="order-2 lg:order-1">
            <ComingSoonGraphic />
          </div>

          <div ref={textRef} className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGray-800 leading-tight">
              Tantangan Seru
              <span className="text-gradient block">Menantimu</span>
            </h2>

            <p className="text-lg sm:text-xl text-warmGray-600 leading-relaxed">
              Games dan quiz seru yang dirancang khusus untuk pasangan dan
              sahabat sedang dalam perjalanan. Sempurna untuk date night atau
              sekadar bersenang-senang bersama.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blush-500 rounded-full"></div>
                <span className="text-warmGray-700">
                  Couple challenges untuk memperdalam connection
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                <span className="text-warmGray-700">
                  Fun quizzes yang reveal personality insights
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cream-500 rounded-full"></div>
                <span className="text-warmGray-700">
                  Interactive games untuk quality time
                </span>
              </div>
            </div>

            <div className="pt-4">
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="border-sage-400 text-sage-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#CD3D63] hover:text-white hover:border-[#CD3D63]"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Ikuti Perkembangan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection3;
