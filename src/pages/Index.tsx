import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Timeline from "@/components/Timeline";
import EventsSection from "@/components/EventsSection";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/timeline') {
      document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/partners') {
      document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background scroll-snap-y-mandatory">
      <Navbar />
      <Hero />
      <AboutSection />
      <EventsSection />
      <Timeline />
      <Partners />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
