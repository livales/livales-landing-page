
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MemoryJarMockup from './mockups/MemoryJarMockup';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(textRef.current?.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
    .from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");

    // Parallax effect for the image
    gsap.to(imageRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGray-800 leading-tight">
              Abadikan Setiap 
              <span className="text-gradient block">Momen Berharga</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-warmGray-600 leading-relaxed">
              Buat timeline pribadi dari kenangan paling berharga kalian. Dari foto dan catatan 
              hingga tanggal spesial, semua tersimpan rapi dalam satu tempat yang indah.
            </p>
            
            <div ref={listRef} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blush-500 rounded-full"></div>
                <span className="text-warmGray-700">Photo journal yang terorganisir secara chronological</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                <span className="text-warmGray-700">Memory jar untuk menyimpan moment spontan</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cream-500 rounded-full"></div>
                <span className="text-warmGray-700">Timeline yang bisa dishare untuk anniversary</span>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <MemoryJarMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection2;
