
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FeaturedVideo from './FeaturedVideo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedVideoSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Solutions in Action</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience how our digital innovations are transforming businesses across the Philippines 
            and beyond. Watch our latest showcase video.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Card className="overflow-hidden shadow-xl border-0">
            <CardContent className="p-0">
              <div className="aspect-video">
                <FeaturedVideo />
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Button className="bg-innovate-500 hover:bg-innovate-600" asChild>
              <Link to="/services" className="flex items-center">
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;
