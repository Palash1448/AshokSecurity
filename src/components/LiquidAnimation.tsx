import { useEffect, useRef } from "react";

interface LiquidAnimationProps {
  className?: string;
  color?: string;
  speed?: number;
}

const LiquidAnimation = ({ className = "", color = "#3b82f6", speed = 1 }: LiquidAnimationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      
      const path1 = `M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z`;
      const path2 = `M0,100 C150,0 350,200 500,100 L500,00 L0,0 Z`;
      
      const pathElement = svg.querySelector('path');
      if (pathElement) {
        const progress = (Math.sin(time) + 1) / 2;
        const interpolatedPath = interpolatePath(path1, path2, progress);
        pathElement.setAttribute('d', interpolatedPath);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    const interpolatePath = (path1: string, path2: string, progress: number) => {
      // Simple path interpolation - in a real implementation you'd use a proper path interpolation library
      return progress > 0.5 ? path2 : path1;
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="0.1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
          fill="url(#liquidGradient)"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default LiquidAnimation;