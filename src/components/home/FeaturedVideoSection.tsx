
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FeaturedVideo from './FeaturedVideo';
import { Volume2, VolumeX } from 'lucide-react';

const FeaturedVideoSection: React.FC = () => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto relative">
          <Card className="overflow-hidden shadow-xl border-0">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <FeaturedVideo muted={muted} />
                <button 
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;
