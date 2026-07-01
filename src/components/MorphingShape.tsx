import { useEffect, useState } from "react";

interface MorphingShapeProps {
  className?: string;
  color?: string;
  size?: number;
}

const MorphingShape = ({ className = "", color = "#3b82f6", size = 100 }: MorphingShapeProps) => {
  const [morphIndex, setMorphIndex] = useState(0);

  const shapes = [
    "50% 50% 50% 50%", // Circle
    "0% 100% 0% 100%", // Square
    "50% 0% 100% 50%", // Diamond
    "0% 50% 100% 50%", // Oval
    "25% 75% 75% 25%", // Rounded square
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % shapes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [shapes.length]);

  return (
    <div
      className={`transition-all duration-2000 ease-in-out ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${color}40, ${color}20)`,
        borderRadius: shapes[morphIndex],
        filter: `blur(${size * 0.05}px)`,
      }}
    />
  );
};

export default MorphingShape;