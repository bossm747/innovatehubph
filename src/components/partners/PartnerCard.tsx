
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

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
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
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
        <CardTitle className="text-xl mb-1">{partner.name}</CardTitle>
        <div className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mb-3">
          {partner.category}
        </div>
        <CardDescription className="text-sm text-gray-600">
          {expanded ? (
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
      {(expanded && partner.website) && (
        <CardFooter className="border-t p-4 bg-gray-50">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a 
              href={partner.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Visit Website <ExternalLink className="h-3.5 w-3.5 ml-2" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PartnerCard;
