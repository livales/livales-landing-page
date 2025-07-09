import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import SharedGoalsMockup from "./mockups/SharedGoalsMockup";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection1 = () => {
  const { t } = useLanguage();
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
    <section ref={sectionRef} className="bg-cream-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={imageRef} className="order-2 lg:order-1">
            <div className="relative">
              <SharedGoalsMockup />
            </div>
          </div>

          <div ref={textRef} className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGray-800 leading-tight">
              {t("feature1.title1")}
              <span className="text-gradient block">{t("feature1.title2")}</span>
            </h2>

            <p className="text-lg sm:text-xl text-warmGray-600 leading-relaxed">
              {t("feature1.description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blush-500 rounded-full"></div>
                <span className="text-warmGray-700">
                  {t("feature1.point1")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                <span className="text-warmGray-700">
                  {t("feature1.point2")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cream-500 rounded-full"></div>
                <span className="text-warmGray-700">
                  {t("feature1.point3")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection1;
