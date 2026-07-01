  import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import ScrollReveal from "./ScrollReveal";
import LiquidAnimation from "./LiquidAnimation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TFunction } from "@/translations";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits." }),
  organization: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactProps = {
  t: TFunction;
};

const Contact = ({ t }: ContactProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phoneNumber = "9665532950";
    const message = `New Security Inquiry:\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nOrganization: ${values.organization || 'N/A'}\nMessage: ${values.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    form.reset();
  }

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-background to-muted/40 relative overflow-hidden"
    >
      <LiquidAnimation className="opacity-50" color="#3b82f6" speed={1.5} />
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-primary font-semibold mb-4">
            {t("contact.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {t("contact.heading")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 mb-16">
          <AnimatedSection>
            <Card className="border-border/70 shadow-xl">
              <CardContent className="p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-4">
                  {t("contact.formBadge")}
                </p>
                <h3 className="text-3xl font-semibold text-secondary mb-6">
                  {t("contact.formHeading")}
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={t("contact.placeholders.name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="email" placeholder={t("contact.placeholders.email")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder={t("contact.placeholders.phone")}
                                {...field}
                                maxLength={10}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^0-9]/g, '');
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={t("contact.placeholders.organization")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder={t("contact.placeholders.message")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary via-orange-500 to-amber-400 text-primary-foreground h-12 text-base">
                      {t("contact.submit")}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="grid gap-6">
              {[
                {
                  icon: MapPin,
                  title: t("contact.info.headOffice"),
                  description: (
                    <>
                      Gren Acres, Dhamni Road
                      <br />
                      Sangli, 416 416
                      <br />
                      Maharashtra, India
                    </>
                  ),
                },
                {
                  icon: Phone,
                  title: t("contact.info.phone"),
                  description: (
                    <>
                      <a
                        href="tel:9665532950"
                        className="text-primary hover:underline font-semibold text-lg"
                      >
                        +91 9665532950
                      </a>
                      <br />
                      <a
                        href="tel:7020896353"
                        className="text-primary hover:underline font-semibold text-lg"
                      >
                        +91 7020896353
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t("contact.info.emergencyService")}
                      </p>
                    </>
                  ),
                },
                {
                  icon: Mail,
                  title: t("contact.info.email"),
                  description: (
                    <a
                      href="mailto:ashoksecurities024@gmail.com"
                      className="text-primary hover:underline break-all"
                    >
                      ashoksecurities024@gmail.com
                    </a>
                  ),
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="border-border/70 hover:border-primary/60 transition-colors"
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary mb-2">
                        {item.title}
                      </h3>
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={180}>
          <div className="bg-muted/30 rounded-3xl p-6 sm:p-10 shadow-inner">
            <h3 className="text-2xl font-bold text-secondary mb-6">
              {t("contact.info.branchesHeading")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: t("contact.info.puneBranch"),
                  address: "A/p. Arvi, Tal. Haveli, Dist. Pune",
                },
                {
                  title: t("contact.info.panvelBranch"),
                  address: "Indravan CHS, Sector-4, Road No.12, New Panvel",
                },
              ].map((branch) => (
                <div key={branch.title} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">
                      {branch.title}
                    </h4>
                    <p className="text-muted-foreground">{branch.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
