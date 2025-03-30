
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import BookingButton from '@/components/booking/BookingButton';

const ServiceTileCTA = () => {
  const handleClick = () => {
    toast.success("Contact form opened", {
      description: "Fill out the form below to get in touch with our team."
    });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-16 text-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-green-600 hover:bg-green-700 text-white btn-shine shadow-md hover:shadow-lg transition-all"
          onClick={handleClick}
        >
          <span className="mr-2">Get Started with Our Services</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        
        <BookingButton 
          size="lg"
          variant="outline"
          className="border-innovate-600 text-innovate-600 hover:bg-innovate-50"
          label="Schedule a Demo"
          topic="Service Demo Request"
        />
      </div>
    </div>
  );
};

export default ServiceTileCTA;
