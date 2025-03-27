
import React from 'react';

interface CircuitBackgroundProps {
  className?: string;
  pattern?: 'left' | 'right' | 'bottom' | 'corner';
  opacity?: number;
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ 
  className = "", 
  pattern = "right", 
  opacity = 0.2 
}) => {
  const getPattern = () => {
    switch(pattern) {
      case 'left':
        return "public/lovable-uploads/e3f92cf2-08dc-4378-842a-da1ca1df4d15.png";
      case 'right':
        return "public/lovable-uploads/3f2bfe12-61d3-47da-b6a5-c633e9bb4d1a.png";
      case 'bottom':
        return "public/lovable-uploads/c3b4d9e4-1983-4f74-845a-cdd10db3d092.png";
      case 'corner':
        return "public/lovable-uploads/889fa9a3-7688-472c-9782-dcd7b2766e3f.png";
      default:
        return "public/lovable-uploads/e465451c-ac7c-4d41-855b-63954db5d9d8.png";
    }
  };

  return (
    <div className={`absolute -z-10 ${className}`}>
      <img 
        src={getPattern()}
        alt=""
        className="w-full h-auto"
        style={{ opacity }}
      />
    </div>
  );
};

export default CircuitBackground;
