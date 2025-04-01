
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  Building,
  Briefcase,
  Truck,
  Laptop,
  CircleDollarSign
} from 'lucide-react';

export interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
  description: string;
  website?: string;
  details?: string;
  integrations?: string[];
}

interface PartnerCardProps {
  partner: Partner;
  expanded?: boolean;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'banking':
        return <CircleDollarSign className="h-4 w-4" />;
      case 'financial services':
        return <Briefcase className="h-4 w-4" />;
      case 'logistics':
        return <Truck className="h-4 w-4" />;
      case 'technology':
        return <Laptop className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md border border-gray-100">
      <CardHeader className="bg-white p-4">
        <div className="h-28 flex items-center justify-center overflow-hidden">
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className="max-h-24 max-w-full object-contain" 
          />
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <CardTitle className="text-xl mb-3">{partner.name}</CardTitle>
        <Badge variant="outline" className="mb-3 flex items-center gap-1 font-normal">
          {getCategoryIcon(partner.category)}
          {partner.category}
        </Badge>
        <CardDescription className="text-sm text-gray-600">
          {isExpanded || (!partner.details && !partner.integrations) ? (
            <div>
              <p className="mb-3">{partner.description}</p>
              {partner.details && (
                <p className="text-sm mb-3">
                  {partner.details}
                </p>
              )}
              {partner.integrations && partner.integrations.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-2">Integrations:</h4>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    {partner.integrations.map((integration, index) => (
                      <li key={index}>{integration}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>{partner.description}</p>
          )}
        </CardDescription>
      </CardContent>
      
      {/* Show footer with website link or toggle button */}
      <CardFooter className="border-t p-4 bg-gray-50 flex justify-between items-center">
        {(partner.website) && (
          <Button variant="outline" size="sm" asChild className="flex-1 mr-2">
            <a 
              href={partner.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Visit Website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
        
        {/* Only show toggle if there are details or integrations */}
        {(partner.details || (partner.integrations && partner.integrations.length > 0)) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className={partner.website ? "flex-0" : "flex-1"}
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
            ) : (
              <>Show More <ChevronDown className="h-4 w-4 ml-1" /></>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PartnerCard;
