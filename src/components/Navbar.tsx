import { useEffect, useState } from "react";
import { Menu, X, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/ashoklogo.png";
import MagneticButton from "./MagneticButton";
import { Language, TFunction } from "@/translations";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { id: "home", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "services", labelKey: "nav.services" },
  { id: "clients", labelKey: "nav.clients" },
  { id: "contact", labelKey: "nav.contact" },
];

type NavbarProps = {
  language: Language;
  onToggleLanguage: () => void;
  t: TFunction;
};

const Navbar = ({ language, onToggleLanguage, t }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isEnglish = language === "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isInquiryOpen && !target.closest('.inquiry-dropdown')) {
        setIsInquiryOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isInquiryOpen]);

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate there first with a hash
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 animate-in slide-in-from-top-4 fade-in",
        "border-b bg-gray-200/95 backdrop-blur-md shadow-sm",
        scrolled ? "border-border/60 shadow-lg bg-gray-200/98 backdrop-blur-lg" : "border-border/30 bg-gray-200/90"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 animate-in spin-in-180 fade-in duration-1000">
              <img
                src={logo}
                alt="Ashok Security Services Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="block animate-in slide-in-from-left-4 fade-in duration-1000 delay-300">
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-muted-foreground">
                {t("nav.since")}
              </p>
              <h1 className="font-extrabold text-sm md:text-2xl text-secondary tracking-wide">
                {t("nav.brand")}
              </h1>
              
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link, index) => (
              <MagneticButton
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group animate-in slide-in-from-top-4 fade-in duration-700"
                strength={0.2}
              >
                <span style={{ animationDelay: `${500 + index * 100}ms` }}>
                  {t(link.labelKey)}
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </span>
              </MagneticButton>
            ))}
            {/* Inquiry Dropdown */}
            <div className="relative inquiry-dropdown">
              <button
                onClick={() => setIsInquiryOpen(!isInquiryOpen)}
                className="flex items-center gap-1 text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-md"
              >
                {t("nav.inquiry")}
                <ChevronDown className={cn("h-4 w-4 transition-transform", isInquiryOpen && "rotate-180")} />
              </button>
              
              {isInquiryOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      navigate("/required-guards");
                      setIsInquiryOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {t("nav.inquiryRequiredGuards")}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/job-openings");
                      setIsInquiryOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {t("nav.inquiryJobOpenings")}
                  </button>
                </div>
              )}
            </div>

            <a
              href="tel:+919665532950"
              className="text-xs font-semibold tracking-widest text-primary uppercase"
            >
              {t("nav.support")}
            </a>
            <button
              onClick={onToggleLanguage}
              className="text-xs font-semibold tracking-widest border border-primary/60 text-primary rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {isEnglish ? "मराठी" : "English"}
            </button>
            <MagneticButton
              onClick={() => navigate("/admin")}
              className="bg-gradient-to-r from-gray-600 to-gray-800 hover:opacity-90 text-white shadow-[0_10px_25px_rgba(16,24,40,0.22)] w-10 h-10 rounded-full relative overflow-hidden group flex items-center justify-center"
              strength={0.3}
            >
              <Settings className="relative z-10 h-5 w-5" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {t(link.labelKey)}
              </button>
            ))}
            
            {/* Mobile Inquiry Options */}
            <div className="w-full border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t("nav.inquiry")}
              </p>
              <button
                onClick={() => {
                  navigate("/required-guards");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors mb-2"
              >
                {t("nav.inquiryRequiredGuards")}
              </button>
              <button
                onClick={() => {
                  navigate("/job-openings");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {t("nav.inquiryJobOpenings")}
              </button>
            </div>
            
            <a
              href="tel:+919665532950"
              className="text-xs font-semibold tracking-widest text-primary uppercase"
            >
              {t("nav.support")}
            </a>
            <button
              onClick={() => {
                onToggleLanguage();
              }}
              className="text-xs font-semibold tracking-widest border border-primary/60 text-primary rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors w-full max-w-[140px]"
            >
              {isEnglish ? "मराठी" : "English"}
            </button>
            <Button
              onClick={() => {
                navigate("/admin");
                setIsMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:opacity-90 text-white shadow-[0_10px_25px_rgba(16,24,40,0.22)]"
            >
              Admin Panel
            </Button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
