
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      // Reset progress when loading starts
      setProgress(0);
      
      // Simulate progress
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Slow down as it approaches 90%
          if (prevProgress < 90) {
            const increment = Math.max(1, Math.floor((100 - prevProgress) / 10));
            return Math.min(90, prevProgress + increment);
          }
          return prevProgress;
        });
      }, 100);
    } else if (progress > 0 && progress < 100) {
      // Complete the progress bar when loading is done
      setProgress(100);
      
      // Clear any existing intervals
      clearInterval(interval);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isLoading, progress]);

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[100] transition-opacity duration-300 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ 
        transitionDelay: progress === 100 ? '500ms' : '0ms',
        pointerEvents: 'none' 
      }}
    >
      <Progress value={progress} className="h-1 bg-transparent rounded-none" />
    </div>
  );
};

export default LoadingIndicator;
