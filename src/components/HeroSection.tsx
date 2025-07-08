
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingShapes from "./FloatingShapes";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

    // Parallax effect for floating shapes
    gsap.to(shapesRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax effect for text content
    gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleScrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist-section");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden"
    >
      <div ref={shapesRef} className="parallax-layer">
        <FloatingShapes />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto section-padding parallax-layer">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gradient leading-tight mb-6"
        >
          {t("hero.title1")}
          <br />
          {t("hero.title2")}
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-livales-dark mb-8 max-w-2xl mx-auto leading-relaxed opacity-80"
        >
          {t("hero.subtitle")}
        </p>

        <div ref={ctaRef}>
          <Button
            onClick={handleScrollToWaitlist}
            size="lg"
            className="bg-livales-green hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t("hero.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
