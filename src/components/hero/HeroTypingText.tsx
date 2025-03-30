
import React, { useEffect, useState } from 'react';

interface HeroTypingTextProps {
  texts: string[];
  className?: string;
}

const HeroTypingText = ({ texts, className = "" }: HeroTypingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  
  useEffect(() => {
    // Find the longest text to determine container width
    const maxLength = Math.max(...texts.map(text => text.length));
    
    const intervalDuration = 3000; // Total time each word is displayed
    const fadeTransition = 400; // Fade transition time
    
    const interval = setInterval(() => {
      if (fadeState === 'in') {
        setFadeState('out');
        
        // Schedule the index change after fade out completes
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setFadeState('in');
        }, fadeTransition);
      }
    }, intervalDuration);
    
    return () => clearInterval(interval);
  }, [texts, fadeState]);
  
  // Determine all the possible widths to find the maximum
  const allWidths = texts.map(text => text.length * 10); // Approximation
  const maxWidth = Math.max(...allWidths);
  
  return (
    <span 
      className={`word-transition ${className} ${fadeState === 'in' ? 'fade-in' : 'fade-out'}`} 
      style={{ minWidth: `${maxWidth}px` }}
    >
      {texts[currentIndex]}
    </span>
  );
};

export default HeroTypingText;
