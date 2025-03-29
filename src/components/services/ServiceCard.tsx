
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const ServiceCard = ({ title, description, icon, isActive, onClick, className }: ServiceCardProps) => (
  <Card 
    className={cn(
      "relative border rounded-xl cursor-pointer transition-all duration-300 overflow-hidden",
      isActive 
        ? "border-innovate-500 shadow-md bg-white" 
        : "border-gray-200 hover:border-innovate-300 bg-white/60",
      className
    )}
    onClick={onClick}
  >
    {isActive && (
      <div className="absolute top-0 left-0 w-1 h-full bg-innovate-500"></div>
    )}
    <CardContent className="p-6">
      <div className="flex flex-col space-y-4">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          isActive ? "bg-innovate-100 text-innovate-700" : "bg-gray-100 text-gray-600"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {isActive && (
          <Button 
            variant="link" 
            className="text-innovate-600 hover:text-innovate-800 p-0 h-auto flex items-center"
            asChild
          >
            <Link to={`/${isActive ? title.toLowerCase().replace(/\s+/g, '-') : ''}`} className="flex items-center">
              Learn More
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default ServiceCard;
