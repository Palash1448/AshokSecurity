import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 600,
  className = "" 
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => setIsVisible(true), delay);
        } else {
          if (timeoutId !== undefined) {
            window.clearTimeout(timeoutId);
            timeoutId = undefined;
          }
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [delay]);

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (direction) {
        case "up":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case "down":
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
        case "left":
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case "right":
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case "scale":
          return `${baseClasses} ${durationClass} opacity-0 scale-75`;
        case "rotate":
          return `${baseClasses} ${durationClass} opacity-0 rotate-12 scale-75`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
  };

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;