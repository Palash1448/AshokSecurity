import logo from "@/assets/ashoklogo.png";
import { TFunction } from "@/translations";
import { Instagram } from "lucide-react";

type FooterProps = {
  t: TFunction;
};

const Footer = ({ t }: FooterProps) => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 animate-in slide-in-from-bottom-4 fade-in duration-1000">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16">
                <img 
                  src={logo} 
                  alt="Ashok Security Services Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t("footer.brand")}</h3>
               
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-sm opacity-80">Follow us:</span>
              <a
                href="https://www.instagram.com/ashoksecurityservices08?utm_source=qr&igsh=MWVtNjYwdmN3aThvNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-sm font-medium">Instagram</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="text-left">
              <h4 className="font-bold text-sm md:text-lg mb-4 padding:10">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-xs md:text-sm opacity-80">
                <li>
                  <a href="#home" className="hover:text-primary transition-colors">{t("footer.links.home")}</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">{t("footer.links.services")}</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">{t("footer.links.about")}</a>
                </li>
                <li>
                  <a href="#clients" className="hover:text-primary transition-colors">{t("footer.links.clients")}</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">{t("footer.links.contact")}</a>
                </li>
              </ul>
            </div>

            <div className="text-left md:text-right">
              <h4 className="font-bold text-sm md:text-lg mb-4">{t("footer.ourServices")}</h4>
              <ul className="space-y-2 text-xs md:text-sm opacity-80">
                <li>{t("footer.serviceList.event")}</li>
                <li>{t("footer.serviceList.static")}</li>
                <li>{t("footer.serviceList.cctv")}</li>
                <li>{t("footer.serviceList.custom")}</li>
                <li>{t("footer.serviceList.industrial")}</li>
                <li>{t("footer.serviceList.bank")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-80">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
