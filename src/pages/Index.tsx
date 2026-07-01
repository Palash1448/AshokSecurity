import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Certificate from "@/components/Certificate";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import PageEntrance from "@/components/PageEntrance";
import { createTranslator, Language } from "@/translations";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  const location = useLocation();

  const t = createTranslator(language);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsLoaded(true), 200);
  };

  useEffect(() => {
    // Preload critical resources
    const preloadImages = async () => {
      const imageUrls = [
        "/src/assets/hero-security.jpg",
        "/src/assets/ashoklogo.png",
        "/src/assets/director.jpeg"
      ];
      
      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        });
      });
      
      await Promise.all(imagePromises);
    };

    preloadImages();
  }, []);

  // When arriving with a hash (e.g. '/#about'), scroll to that section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        // Small timeout to ensure layout is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  if (isLoading) {
    return <PageLoader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <>
      <Navbar
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === "en" ? "mr" : "en"))
        }
        t={t}
      />
      <PageEntrance isLoaded={isLoaded}>
        <div className="min-h-screen">
          <Hero t={t} />
          <About t={t} />
          <Services t={t} />
          <Certificate t={t} />
          <Clients t={t} />
          <Contact t={t} />
          <Footer t={t} />
        </div>
      </PageEntrance>
    </>
  );
};

export default Index;
