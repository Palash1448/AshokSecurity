import { useEffect, useState } from "react";

interface PageEntranceProps {
  children: React.ReactNode;
  isLoaded: boolean;
}

const PageEntrance = ({ children, isLoaded }: PageEntranceProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoaded]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        showContent
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

export default PageEntrance;