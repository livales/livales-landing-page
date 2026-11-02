import Hero from "@/components/home/Hero";
import HeartsAndLadders from "@/components/home/HeartsAndLadders";
import { Lineup, Why, BlogTeaser } from "@/components/home/Sections";
import Faq from "@/components/home/Faq";

const Index = () => (
  <>
    <Hero />
    <HeartsAndLadders />
    <Lineup />
    <Why />
    <BlogTeaser />
    <Faq />
  </>
);

export default Index;
