import { useEffect, useState } from "react";

interface GlowingOrbProps {
  size?: number;
  color?: string;
  intensity?: number;
  speed?: number;
  className?: string;
}

const GlowingOrb = ({ 
  size = 100, 
  color = "#3b82f6", 
  intensity = 0.5, 
  speed = 3,
  className = "" 
}: GlowingOrbProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      setPosition({
        x: Math.sin(time) * 20,
        y: Math.cos(time * 0.8) * 15
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out"
      }}
    >
      <div
        className="rounded-full animate-pulse"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          filter: `blur(${size * 0.1}px)`,
          animation: `pulse ${2 + Math.random()}s ease-in-out infinite alternate`
        }}
      />
    </div>
  );
};

export default GlowingOrb;