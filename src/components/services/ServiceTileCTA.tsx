
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import BookingButton from '@/components/booking/BookingButton';
import { cn } from '@/lib/utils';

interface ServiceTileCTAProps {
  servicePath: string;
  serviceName: string;
  className?: string;
  variant?: 'default' | 'light';
  size?: 'default' | 'lg';
}

const ServiceTileCTA: React.FC<ServiceTileCTAProps> = ({
  servicePath,
  serviceName,
  className = '',
  variant = 'default',
  size = 'default',
}) => {
  const isLarge = size === 'lg';
  const isLight = variant === 'light';
  
  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5",
      isLarge && "mt-8",
      className
    )}>
      <Button 
        asChild
        size={isLarge ? "lg" : "default"}
        variant={isLight ? "secondary" : "default"}
        className="w-full sm:w-auto"
      >
        <a href={servicePath}>
          Learn More
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
      
      <BookingButton
        size={isLarge ? "lg" : "default"}
        variant={isLight ? "outline" : "outline"}
        className="w-full sm:w-auto"
        buttonText="Schedule a Meeting"
        topic={`${serviceName} Consultation`}
      />
    </div>
  );
};

export default ServiceTileCTA;
