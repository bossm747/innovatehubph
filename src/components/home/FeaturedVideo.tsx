
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface FeaturedVideoProps {
  className?: string;
  videoPath?: string;
  fallbackImagePath?: string;
  overlay?: boolean;
}

const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ 
  className = '',
  videoPath = '', 
  fallbackImagePath = '/lovable-uploads/51105682-3d95-4413-be73-38763b9478f8.png',
  overlay = true 
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // If no videoPath is provided, list videos from the bucket
        if (!videoPath) {
          const { data: files, error: listError } = await supabase
            .storage
            .from('project_files')
            .list();

          if (listError) throw listError;

          // Find video files (mp4, webm, etc.)
          const videoFiles = files?.filter(file => 
            file.name.endsWith('.mp4') || 
            file.name.endsWith('.webm') || 
            file.name.endsWith('.mov')
          );

          if (videoFiles && videoFiles.length > 0) {
            // Use the first video found
            videoPath = videoFiles[0].name;
          } else {
            throw new Error('No video files found in storage');
          }
        }

        // Get the public URL for the video
        const { data } = supabase
          .storage
          .from('project_files')
          .getPublicUrl(videoPath);

        if (data?.publicUrl) {
          setVideoUrl(data.publicUrl);
        } else {
          throw new Error('Failed to get video URL');
        }
      } catch (err: any) {
        console.error('Error fetching video:', err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoPath]);

  // Apply performance optimizations
  const videoAttributes = {
    playsInline: true,
    autoPlay: true,
    loop: true,
    muted: true, // Important for autoplay to work consistently
    preload: "auto" as const, 
    disablePictureInPicture: true,
    disableRemotePlayback: true,
    controlsList: "nodownload", // Prevent download option
    // Reduce quality to improve performance
    className: `object-cover w-full h-full ${className}`,
  };

  return (
    <div className="relative w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <Loader2 className="w-10 h-10 text-innovate-500 animate-spin" />
        </div>
      )}
      
      {error && !videoUrl && (
        <div className="w-full h-full">
          <img 
            src={fallbackImagePath} 
            alt="Video fallback" 
            className={`object-cover w-full h-full ${className}`}
          />
        </div>
      )}
      
      {videoUrl && (
        <>
          <video
            {...videoAttributes}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
          >
            <source src={videoUrl} type={`video/${videoPath?.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
          
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-black/30 pointer-events-none" />
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedVideo;
