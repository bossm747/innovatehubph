
import React, { useEffect, useRef } from 'react';

interface HeroTypingTextProps {
  texts: string[];
  className?: string;
}

const HeroTypingText = ({ texts, className = "" }: HeroTypingTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typingSpeed = 50; // Faster when deleting
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typingSpeed = 100; // Normal speed when typing
      }
      
      if (textRef.current) {
        textRef.current.textContent = currentText;
      }
      
      if (!isDeleting && currentText === fullText) {
        typingSpeed = 1500; // Wait before deleting
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typingSpeed = 500; // Wait before typing new text
      }
      
      setTimeout(type, typingSpeed);
    };
    
    type();
    
    return () => {
      // Cleanup
    };
  }, [texts]);

  return <span ref={textRef} className={`typing-text ${className}`}>{texts[0]}</span>;
};

export default HeroTypingText;
