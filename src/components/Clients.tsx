import { Building2, Check } from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { TFunction } from "@/translations";
import { clientsService, ClientData } from "@/services/firebaseService";

// Default clients to show if Firebase is not available or no clients exist
const defaultClients = [
  "Ashirwad Hospitals",
  "Civil Hospital, Sangli",
  "Reliant Buildup, Miraj",
  "Camson Agro Industry, Kadegaon",
  "United Partical Board Industry, Kadegaon",
  "S. T. Stand, Miraj",
  "Manan Group of Constructions",
  "Ex. Labour Minister Mr. Suresh Khade Sir Bunglow",
  "Deccan Infra Pvt. Ltd.",
  "Rajput School & College",
];

type ClientsProps = {
  t: TFunction;
};

const Clients = ({ t }: ClientsProps) => {
  const [clients, setClients] = useState<string[]>(defaultClients);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await clientsService.getAll();
        if (clientsData.length > 0) {
          // Convert ClientData to string array for display
          const firebaseClientNames = clientsData.map(client => client.name);
          
          // Combine default clients with Firebase clients, removing duplicates
          const allClients = [...defaultClients];
          firebaseClientNames.forEach(clientName => {
            if (!allClients.includes(clientName)) {
              allClients.push(clientName);
            }
          });
          
          setClients(allClients);
        } else {
          // If no clients from Firebase, keep default clients
          setClients(defaultClients);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        // Keep default clients on error
        setClients(defaultClients);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section
      id="clients"
      className="py-24 bg-gradient-to-b from-muted/40 to-muted/80"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            {t("clients.badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            {t("clients.heading")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("clients.description")}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {clients.map((client, index) => (
            <AnimatedSection key={client} delay={index * 50}>
              <div className="flex items-center gap-3 p-5 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl border border-slate-200 hover:border-primary/80 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-primary/10">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                  {client}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 md:p-12 shadow-[0_30px_60px_rgba(15,23,42,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-3 bg-black/20 rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em]">
                {t("clients.verifiedBadge")}
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {t("clients.complianceHeading")}
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 text-sm md:text-base">
              {[
                ["clients.details.pasara", "PSA/L/12/MH/2025/APR/3/4996"],
                ["clients.details.pan", "DVKPD3493Q"],
                ["clients.details.pcc", "SB/VERFN/PVTJOB/000063549/2024"],
                ["clients.details.shop", "101647262503"],
                ["clients.details.pt", "99654867948P"],
                ["clients.details.pf", "PUKOL3343797000"],
                ["clients.details.esic", "33001389810000999"],
                ["clients.details.gst", "27DVKPD3493Q1ZS"],
              ].map(([labelKey, value]) => (
                <div
                  key={labelKey}
                  className="flex justify-between border-b border-white/20 pb-2"
                >
                  <span className="text-white/70">{t(labelKey)}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Clients;
