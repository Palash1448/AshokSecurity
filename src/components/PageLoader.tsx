import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import logo from "@/assets/ashoklogo.png";

const PageLoader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 mx-auto mb-4 animate-bounce">
            <img
              src={logo}
              alt="Ashok Security Services"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-primary animate-spin" />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              ASHOK SECURITY SERVICES
            </h1>
          </div>
          <p className="text-primary text-sm tracking-[0.3em] uppercase">
            Since 2008
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-orange-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-3">Loading... {progress}%</p>
        </div>

        {/* Security Icons Animation */}
        <div className="mt-8 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <Shield
              key={i}
              className={`w-4 h-4 text-primary/60 animate-pulse`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;