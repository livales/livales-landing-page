import { useReveal } from "@/hooks/use-reveal";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Audience from "@/components/landing/Audience";
import Approach from "@/components/landing/Approach";
import Product from "@/components/landing/Product";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

const Index = () => {
  useReveal();

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Audience />
        <Approach />
        <Product />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
