
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };
      
      // Initial check
      checkIfMobile();
      
      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile);
      
      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile);
    }
    
    return undefined;
  }, []);

  return isMobile;
}
