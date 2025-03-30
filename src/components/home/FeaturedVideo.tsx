
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import ReactPlayer from 'react-player';

interface FeaturedVideoProps {
  className?: string;
  videoPath?: string;
  fallbackImagePath?: string;
  overlay?: boolean;
  muted?: boolean;
}

const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ 
  className = '',
  videoPath = '', 
  fallbackImagePath = '/lovable-uploads/51105682-3d95-4413-be73-38763b9478f8.png',
  overlay = true,
  muted = false
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

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
          console.log('Video URL loaded:', data.publicUrl);
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

  const handleReady = () => {
    setIsLoading(false);
    console.log('Video is ready to play');
  };

  const handleError = (err: any) => {
    console.error('Video playback error:', err);
    setError('Failed to play video');
    setIsLoading(false);
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
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-500 bg-white bg-opacity-75 p-2 rounded">
              {error}
            </p>
          </div>
        </div>
      )}
      
      {videoUrl && (
        <div className="relative w-full h-full">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={true}
            loop={true}
            muted={muted}
            controls={false}
            width="100%"
            height="100%"
            playsinline
            volume={1}
            onError={handleError}
            onReady={handleReady}
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  autoPlay: true,
                  preload: 'auto',
                  controlsList: 'nodownload'
                },
                forceVideo: true
              }
            }}
            className={`object-cover ${className}`}
            style={{ objectFit: 'cover' }}
          />
          
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-black/30 pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedVideo;
