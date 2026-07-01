import { cn } from "@/lib/utils";
import {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type AnimatedSectionProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

const AnimatedSection = <T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  once = false,
}: AnimatedSectionProps<T>) => {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-safe:data-[visible=true]:translate-y-0 motion-safe:data-[visible=true]:opacity-100 motion-safe:data-[visible=false]:translate-y-6 motion-safe:data-[visible=false]:opacity-0",
        !isVisible && "motion-safe:opacity-0 motion-safe:translate-y-6",
        isVisible && "motion-safe:opacity-100 motion-safe:translate-y-0",
        className
      )}
      data-visible={isVisible}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;


