import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobOpeningsForm from "@/components/JobOpeningsForm";
import { createTranslator, Language } from "@/translations";

const JobOpeningsPage = () => {
  const [language, setLanguage] = useState<Language>("en");
  const t = createTranslator(language);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === "en" ? "mr" : "en"))
        }
        t={t}
      />
      <main className="pt-24 min-h-screen bg-background">
        <div className="container mx-auto px-4 pb-16">
          <JobOpeningsForm />
        </div>
        <Footer t={t} />
      </main>
    </>
  );
};

export default JobOpeningsPage;
