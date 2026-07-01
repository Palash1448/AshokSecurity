import { Shield, Eye, Users, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";
import ScrollReveal from "./ScrollReveal";
import Card3D from "./Card3D";
import { TFunction } from "@/translations";

const services = [
  {
    icon: Users,
    titleKey: "services.items.event.title",
    descriptionKey: "services.items.event.description",
  },
  {
    icon: Shield,
    titleKey: "services.items.static.title",
    descriptionKey: "services.items.static.description",
  },
  {
    icon: Eye,
    titleKey: "services.items.cctv.title",
    descriptionKey: "services.items.cctv.description",
  },
  {
    icon: Settings,
    titleKey: "services.items.custom.title",
    descriptionKey: "services.items.custom.description",
  },
];

type ServicesProps = {
  t: TFunction;
};

const Services = ({ t }: ServicesProps) => {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-muted/80 via-background to-muted/60 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-24 top-16 w-72 h-72 bg-primary/10 blur-[120px]" />
        <div className="absolute left-10 bottom-10 w-64 h-64 bg-secondary/10 blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            {t("services.badge")}
          </p>
          <h2 className="text-4xl font-bold text-secondary mb-6">
            {t("services.heading")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const gradients = [
              'from-blue-50 via-white to-blue-50',
              'from-emerald-50 via-white to-emerald-50',
              'from-amber-50 via-white to-amber-50',
              'from-rose-50 via-white to-rose-50'
            ];
            
            const borderColors = [
              'border-blue-100 hover:border-blue-200',
              'border-emerald-100 hover:border-emerald-200',
              'border-amber-100 hover:border-amber-200',
              'border-rose-100 hover:border-rose-200'
            ];
            
            const shadowColors = [
              'hover:shadow-blue-100',
              'hover:shadow-emerald-100',
              'hover:shadow-amber-100',
              'hover:shadow-rose-100'
            ];
            
            return (
              <ScrollReveal 
                key={service.titleKey} 
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 150}
                duration={800}
                className="h-full"
              >
                <Card3D intensity={8} className="h-full">
                  <Card className={`group h-full flex flex-col border ${borderColors[index % borderColors.length]} transition-all duration-500 hover:shadow-2xl ${shadowColors[index % shadowColors.length]} cursor-pointer overflow-hidden relative`}>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                      index % 4 === 0 ? 'bg-blue-100 text-blue-600' :
                      index % 4 === 1 ? 'bg-emerald-100 text-emerald-600' :
                      index % 4 === 2 ? 'bg-amber-100 text-amber-600' :
                      'bg-rose-100 text-rose-600'
                    }`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                      {t(service.descriptionKey)}
                    </p>
                  </CardContent>
                  </Card>
                </Card3D>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
