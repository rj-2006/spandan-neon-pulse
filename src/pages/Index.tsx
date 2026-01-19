import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Timeline from "@/components/Timeline";
import EventsSection from "@/components/EventsSection";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AboutSection />
      <EventsSection />
      <Timeline />
      <Partners />
      <Footer />
    </div>
  );
};

export default Index;
