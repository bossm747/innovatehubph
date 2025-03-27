
import React from 'react';

interface CircuitBackgroundProps {
  className?: string;
  pattern?: 'left' | 'right' | 'bottom' | 'corner' | 'lines' | 'dots' | 'circuit-blue' | 'corner-dots' | 'wave';
  opacity?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ 
  className = "", 
  pattern = "right", 
  opacity = 0.2,
  rotate = 0,
  flipX = false,
  flipY = false,
  size = "md"
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
      case 'lines':
        return "public/lovable-uploads/78dab394-b7dd-4d4e-9531-839484c38c5e.png";
      case 'dots':
        return "public/lovable-uploads/80839905-9639-4627-acfe-2a04c9ab57c3.png";
      case 'circuit-blue':
        return "public/lovable-uploads/31db916c-8587-4af6-a825-37b650866536.png";
      case 'corner-dots':
        return "public/lovable-uploads/fbc9aa3a-5713-40b6-bc28-162a06cfd4f9.png";
      case 'wave':
        return "public/lovable-uploads/b94823e3-a419-4cb5-9ef6-8e2bafbac686.png";
      default:
        return "public/lovable-uploads/e465451c-ac7c-4d41-855b-63954db5d9d8.png";
    }
  };

  const getSizeClass = () => {
    switch(size) {
      case 'sm':
        return "w-24 h-auto";
      case 'md':
        return "w-48 h-auto";
      case 'lg':
        return "w-72 h-auto";
      case 'xl':
        return "w-96 h-auto";
      case 'full':
        return "w-full h-auto";
      default:
        return "w-48 h-auto";
    }
  };

  let transformClasses = '';
  
  if (rotate) {
    transformClasses += `rotate-${rotate} `;
  }
  
  if (flipX) {
    transformClasses += 'scale-x-[-1] ';
  }
  
  if (flipY) {
    transformClasses += 'scale-y-[-1] ';
  }

  return (
    <div className={`absolute -z-10 ${className}`}>
      <img 
        src={getPattern()}
        alt=""
        className={`${getSizeClass()} ${transformClasses}`}
        style={{ opacity }}
      />
    </div>
  );
};

export default CircuitBackground;
