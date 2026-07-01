import { Award, Heart, Zap, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import MorphingShape from "./MorphingShape";
import { TFunction } from "@/translations";
import deshmukhSirImage from "@/assets/deshmukhsir.jpeg";

const values = [
  {
    icon: Award,
    titleKey: "about.values.trust.title",
    descriptionKey: "about.values.trust.description",
  },
  {
    icon: Heart,
    titleKey: "about.values.spirit.title",
    descriptionKey: "about.values.spirit.description",
  },
  {
    icon: Zap,
    titleKey: "about.values.professionalism.title",
    descriptionKey: "about.values.professionalism.description",
  },
  {
    icon: Clock,
    titleKey: "about.values.service.title",
    descriptionKey: "about.values.service.description",
  },
];

type AboutProps = {
  t: TFunction;
};

const About = ({ t }: AboutProps) => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,_rgba(15,23,42,1)_1px,_transparent_1px)] [background-size:24px_24px]" />
      
      {/* Morphing Shapes */}
      <MorphingShape className="absolute top-20 left-10 opacity-30" color="#3b82f6" size={120} />
      <MorphingShape className="absolute bottom-20 right-20 opacity-20" color="#f97316" size={80} />
      <MorphingShape className="absolute top-1/2 right-10 opacity-25" color="#10b981" size={60} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection>
            <p className="uppercase tracking-[0.35em] text-primary font-semibold mb-5">
              {t("about.badge")}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-6 whitespace-nowrap animate-in slide-in-from-left-8 fade-in duration-1000 delay-300">
              {t("about.heading")}
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-secondary">
                  {t("about.govApproved")}
                </strong>{" "}
                {t("about.since")}
              </p>
              <p>{t("about.paragraph1")}</p>
              <p>{t("about.paragraph2")}</p>
              <p>{t("about.paragraph3")}</p>
              <p>{t("about.paragraph4")}</p>
              <p>{t("about.paragraph5")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120} className="space-y-8">
            {/* Director's Profile */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-4 bg-background">
                <img 
                  src={deshmukhSirImage}
                  alt={`${t("about.directorName")}, ${t("about.directorTitle")}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary">{t("about.directorName")}</h3>
              <p className="text-primary font-medium">{t("about.directorTitle")}</p>
            </div>
            
            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <Card
                  key={value.titleKey}
                  className="h-full border-border/60 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white/90"
                >
                  <CardContent className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-secondary mb-1.5">
                      {t(value.titleKey)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(value.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={160}>
          <div className="bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-3xl border border-primary/20 shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-secondary mb-6 text-center">
              The Key Point About Us - Why You Should Hire Us
            </h3>
            <div className="bg-white/80 rounded-2xl p-6 border border-primary/30 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">
                    Special Fire Fighting Training Program
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-primary">Special fire fighting session shall be arranged at your site</strong> for overall all the training staff as well as non working staff if we are working under your site for <strong className="text-primary">6 months +</strong>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      🎯 On-site Training
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-600">
                      🔥 Fire Safety
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                      ✅ All Staff Included
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600">
                      📅 6+ Months Contract
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={180}>
          <div className="grid md:grid-cols-2 gap-8 p-10 bg-gradient-to-br from-muted/60 via-muted/40 to-white rounded-3xl border border-border/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                {t("about.companyVisionTitle")}
              </h3>
              <p className="text-muted-foreground">
                {t("about.companyVisionText")}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                {t("about.companyPurposeTitle")}
              </h3>
              <p className="text-muted-foreground">
                {t("about.companyPurposeText")}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
