import { Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-security.jpg";
import industoryImage from "@/assets/industory.jpeg";
import housingImage from "@/assets/housing.jpeg";
import schoolImage from "@/assets/school.jpeg";
import hospitalImage from "@/assets/hospital.jpeg";
import AnimatedSection from "./AnimatedSection";
import CountUpAnimation from "./CountUpAnimation";
import GlowingOrb from "./GlowingOrb";
import WaveAnimation from "./WaveAnimation";
import SparkleAnimation from "./SparkleAnimation";
import { TFunction } from "@/translations";

const stats = [
  { labelKey: "hero.stats.guards", value: "400+", numValue: 400, suffix: "+" },
  { labelKey: "hero.stats.districts", value: "18", numValue: 18, suffix: "" },
  { labelKey: "hero.stats.responseTime", value: "< 8m", numValue: 8, prefix: "< ", suffix: "m" },
  { labelKey: "hero.stats.satisfaction", value: "4.9/5", numValue: 4.9, suffix: "/5" },
];

const sliderImages = [
  heroImage,
  industoryImage,
  housingImage,
  schoolImage,
  hospitalImage,
];

type HeroProps = {
  t: TFunction;
};

const Hero = ({ t }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-28 md:pb-32 overflow-hidden"
    >
      {/* Auto Slider Background */}
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(120deg, hsl(215 25% 10% / 0.55) 0%, hsl(215 25% 15% / 0.5) 45%, hsl(215 16% 24% / 0.25) 100%), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      <div className="absolute -z-10 inset-0 opacity-30">
        <GlowingOrb size={600} color="#3b82f6" intensity={0.4} speed={2} className="top-1/4 -left-32" />
        <GlowingOrb size={400} color="#f97316" intensity={0.5} speed={3} className="bottom-10 right-10" />
        <GlowingOrb size={200} color="#10b981" intensity={0.3} speed={1.5} className="top-1/2 right-1/4" />
        <SparkleAnimation count={15} color="#fbbf24" className="opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl text-center md:text-left">
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-6 animate-in slide-in-from-top-4 fade-in duration-1000">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                We Protect Your Business
              </span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={50}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-in slide-in-from-left-8 fade-in duration-1000">
              {t("hero.titleMain")} {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 animate-in slide-in-from-right-8 fade-in duration-1000 delay-300">
                {t("hero.titleHighlight")}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <p className="text-base sm:text-lg text-white/85 mb-8 leading-relaxed max-w-2xl animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-500">
              {t("hero.description")}
            </p>
          </AnimatedSection>

      

          <AnimatedSection delay={280}>
            <div className="mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const gradients = [
                  "bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900",
                  "bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900",
                  "bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900",
                  "bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900"
                ];
                return (
                <div
                  key={stat.labelKey}
                  className={`${gradients[index]} backdrop-blur-xl border border-white/15 rounded-2xl p-5 text-center shadow-[0_20px_60px_rgba(15,23,42,0.35)] hover:scale-105 hover:shadow-[0_25px_70px_rgba(15,23,42,0.45)] transition-all duration-300 cursor-pointer animate-in slide-in-from-bottom-8 fade-in duration-700`}
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <CountUpAnimation 
                      end={stat.numValue} 
                      duration={2000 + index * 200}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                    />
                  </p>
                  <p className="text-sm uppercase tracking-wide text-white/70">
                    {t(stat.labelKey)}
                  </p>
                </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Wave Animation */}
      <WaveAnimation />
    </section>
  );
};

export default Hero;
