
import React from 'react';

interface CircuitBackgroundProps {
  className?: string;
  pattern?: 'left' | 'right' | 'bottom' | 'corner' | 'lines' | 'dots' | 'circuit-blue' | 'corner-dots' | 'wave' | 
             'laptop' | 'circuit-lines' | 'circle' | 'dots-grid' | 'triangle' | 'curved-line' | 'arrow' | 'digital-circuit' | 'diagonal';
  opacity?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  color?: 'blue' | 'purple' | 'gradient' | 'default';
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ 
  className = "", 
  pattern = "right", 
  opacity = 0.2,
  rotate = 0,
  flipX = false,
  flipY = false,
  size = "md",
  color = "default"
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
      case 'laptop':
        return "public/lovable-uploads/c6d34d14-93e3-4090-8fe9-051cd0488981.png";
      case 'circuit-lines':
        return "public/lovable-uploads/946d6718-ac8d-4e92-b661-9b5380b459e7.png";
      case 'circle':
        return "public/lovable-uploads/460fecd6-23b8-449a-b287-afe298cc84d2.png";
      case 'dots-grid':
        return "public/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png";
      case 'triangle':
        return "public/lovable-uploads/3af8c992-673b-4c57-b00d-163f51c11758.png";
      case 'curved-line':
        return "public/lovable-uploads/b46a7ef5-5912-4679-bbe1-aafd4ad7d717.png";
      case 'arrow':
        return "public/lovable-uploads/6bbe4914-728a-44f0-805f-415a20f68027.png";
      case 'digital-circuit':
        return "public/lovable-uploads/11c920b6-8f80-407f-9b90-304589379231.png";
      case 'diagonal':
        return "public/lovable-uploads/508dbb7c-7812-431c-9af3-eb4874902930.png";
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

  const getColorClass = () => {
    switch(color) {
      case 'blue':
        return "text-blue-500 filter-blue";
      case 'purple':
        return "text-purple-500 filter-purple";
      case 'gradient':
        return "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600";
      default:
        return "";
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
        className={`${getSizeClass()} ${transformClasses} ${getColorClass()}`}
        style={{ opacity }}
      />
    </div>
  );
};

export default CircuitBackground;
