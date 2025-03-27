import React from 'react';

interface CircuitBackgroundProps {
  className?: string;
  pattern?: 'left' | 'right' | 'bottom' | 'corner' | 'lines' | 'dots' | 'circuit-blue' | 'corner-dots' | 'wave' | 
             'laptop' | 'circuit-lines' | 'circle' | 'dots-grid' | 'triangle' | 'curved-line' | 'arrow' | 'digital-circuit' | 'diagonal' |
             'gradient-triangle' | 'gradient-circle' | 'circuit-simple' | 'angle-right' | 'angle-left' | 'blue-switch' | 'dark-triangle' |
             'blue-device' | 'blue-cloud' | 'blue-settings' | 'curvy-line' | 'handshake' | 'blue-wave' | 'ih-logo' | 
             'circuit-branches' | 'blue-curve' | 'blue-triangle' | 'small-blue-triangle' | 'dotted-grid' | 'tech-circle' | 
             'circuit-lines-horizontal';
  opacity?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  color?: 'blue' | 'purple' | 'gradient' | 'default' | 'primary' | 'secondary' | 'light-blue';
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
      case 'circuit-simple':
        return "public/lovable-uploads/4efa4d52-e062-4876-bb34-db38b208d925.png";
      case 'angle-right':
        return "public/lovable-uploads/59a7de47-c051-4875-99bf-46e08a70aa92.png";
      case 'angle-left':
        return "public/lovable-uploads/f0b7b62c-13ce-4b9c-bb0b-49b6bbd3e183.png";
      case 'gradient-circle':
        return "public/lovable-uploads/b23b419e-732c-4872-88a0-64f6ac5dc04f.png";
      case 'blue-switch':
        return "public/lovable-uploads/72bb2298-25ec-40dc-842a-896786d952c3.png";
      case 'dark-triangle':
        return "public/lovable-uploads/686c3f44-693f-43c9-a6b4-7d52ba6b6eba.png";
      case 'blue-device':
        return "public/lovable-uploads/1b2458e2-2999-4791-b568-4c34cfd90824.png";
      case 'blue-cloud':
        return "public/lovable-uploads/e0d195e2-9fce-4899-9cb5-2842af7d93fb.png";
      case 'blue-settings':
        return "public/lovable-uploads/d5154064-a4e9-4584-936e-fbe00d0d935e.png";
      case 'gradient-triangle':
        return "public/lovable-uploads/6d28e722-42ae-4e08-a330-f810f8694f61.png";
      case 'curvy-line':
        return "public/lovable-uploads/d3161942-4526-4d67-b71b-ff98113136f7.png";
      case 'handshake':
        return "public/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png";
      case 'blue-wave':
        return "public/lovable-uploads/81342b57-5480-4e45-8f13-6d31826abff6.png";
      case 'ih-logo':
        return "public/lovable-uploads/41923896-2fb4-4137-b3b8-78bb35bbd3e5.png";
      case 'circuit-branches':
        return "public/lovable-uploads/5ed80487-00a8-45bc-900e-9dc36009fc5e.png";
      case 'blue-curve':
        return "public/lovable-uploads/769542b9-804c-45db-a9db-c4002dd84e1f.png";
      case 'circuit-lines-horizontal':
        return "public/lovable-uploads/706dbe13-1f9f-4249-893e-f7d9022624f2.png";
      case 'blue-triangle':
        return "public/lovable-uploads/a5f18855-9410-4b02-a4a1-03863fdefeaf.png";
      case 'small-blue-triangle':
        return "public/lovable-uploads/f22526ba-7535-4b6a-ac4e-294c574f4b09.png";
      case 'dotted-grid':
        return "public/lovable-uploads/9addb438-3989-43cb-8704-f18c72e911ce.png";
      case 'tech-circle':
        return "public/lovable-uploads/ff53bb94-04a4-4198-896b-3a71c7adf699.png";
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
      case 'primary':
        return "text-innovate-600 filter-primary";
      case 'secondary':
        return "text-innovate-400 filter-secondary";
      case 'light-blue':
        return "text-blue-300 filter-light-blue";
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
