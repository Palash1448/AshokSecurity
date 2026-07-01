import { Award, CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { TFunction } from "@/translations";
import certificateImage from "@/assets/ashok_certificate.jpg";

type CertificateProps = {
  t: TFunction;
};

const Certificate = ({ t }: CertificateProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Certification
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Certificate Of Appreciation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognition and appreciation for outstanding security services and professional excellence
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Certificate Image */}
          <AnimatedSection delay={100}>
            <div className="relative">
              <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl p-8 shadow-2xl border border-gray-200">
                <img
                  src={certificateImage}
                  alt="Ashok Security Services Certificate of Appreciation"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Certificate Details */}
          <AnimatedSection delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  Recognition of Excellence
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ashok Security Services has received a Certificate of Appreciation, 
                  recognizing our outstanding performance, dedication to excellence, and 
                  commitment to providing exceptional security services.
                </p>
              </div>

              <div className="grid gap-6">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">
                      Excellence Recognized
                    </h4>
                    <p className="text-green-700 text-sm">
                      Officially appreciated for outstanding service quality and performance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">
                      Professional Achievement
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Recognized for maintaining highest professional standards and service quality
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-1">
                      Professional Standards
                    </h4>
                    <p className="text-orange-700 text-sm">
                      Maintains highest professional standards as per certification requirements
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-orange-100 rounded-lg p-6 border border-primary/20">
                <h4 className="font-bold text-secondary mb-2">
                  Why Choose an Appreciated Agency?
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Proven track record of excellence and reliability
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Recognized for outstanding service delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Commitment to continuous improvement and quality
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Trusted by clients and recognized by authorities
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Certificate;