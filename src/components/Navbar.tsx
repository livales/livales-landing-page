
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check which section is currently in view
      const sections = ["hero", "features", "memories", "waitlist-section"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), href: "hero" },
    { label: t("nav.features"), href: "features" },
    { label: t("nav.memories"), href: "memories" },
    { label: t("nav.contact"), href: "waitlist-section" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
              >
                Livales
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.href
                        ? "text-livales-green"
                        : "text-livales-dark hover:text-livales-green"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-livales-green rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector & Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              <Button
                onClick={() => scrollToSection("waitlist-section")}
                className="bg-livales-green hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                {t("nav.waitlist")}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-livales-dark hover:text-livales-green p-2 rounded-md transition-colors duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    activeSection === item.href
                      ? "text-livales-green bg-green-50"
                      : "text-livales-dark hover:text-livales-green hover:bg-green-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <div className="flex justify-center">
                  <LanguageSelector />
                </div>
                <Button
                  onClick={() => scrollToSection("waitlist-section")}
                  className="w-full bg-livales-green hover:bg-green-600 text-white py-2 rounded-lg font-medium"
                >
                  {t("nav.waitlist")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
