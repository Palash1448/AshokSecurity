import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

const TextReveal = ({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 800,
  direction = "up" 
}: TextRevealProps) => {
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

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    
    switch (direction) {
      case "up": return "translate(0, 30px)";
      case "down": return "translate(0, -30px)";
      case "left": return "translate(30px, 0)";
      case "right": return "translate(-30px, 0)";
      default: return "translate(0, 30px)";
    }
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all ease-out"
        style={{
          transform: getTransform(),
          opacity: isVisible ? 1 : 0,
          transitionDuration: `${duration}ms`
        }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all ease-out"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 50}ms`,
              transitionDuration: `${duration}ms`
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextReveal;