import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface Client {
  id: number;
  name: string;
  type: "agent" | "business" | "remittance" | "food" | "retail";
}

const CLIENTS: Client[] = [
  {
    id: 1,
    name: "PlataPay",
    type: "agent"
  },
  {
    id: 2,
    name: "Barako Brews",
    type: "food"
  },
  {
    id: 3,
    name: "Maclyn Bills Payment and Remittance",
    type: "remittance"
  },
  {
    id: 4,
    name: "PIO Business Center",
    type: "business"
  },
  {
    id: 5,
    name: "TMSeven Business Center",
    type: "business"
  },
  {
    id: 6,
    name: "MMHA Business Center",
    type: "business"
  },
  {
    id: 7,
    name: "TEDBatangas",
    type: "business"
  },
  {
    id: 8,
    name: "Miss G",
    type: "retail"
  },
  {
    id: 9,
    name: "RMCL-Maricel",
    type: "business"
  },
  {
    id: 10,
    name: "Majoy Bills Payment",
    type: "remittance"
  },
  {
    id: 11,
    name: "BTS - MaryAnn Mercado",
    type: "business"
  },
  {
    id: 12,
    name: "DIY Food Mart",
    type: "food"
  },
  {
    id: 13,
    name: "Precy's Store",
    type: "retail"
  },
  {
    id: 14,
    name: "Flayla Snack House",
    type: "food"
  },
  {
    id: 15,
    name: "Landos Eatery & Lomi House",
    type: "food"
  }
];

const ClientCard = ({ client }: { client: Client }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-64 flex flex-col">
      <div className="p-5 flex flex-col items-center justify-between h-full">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full overflow-hidden flex items-center justify-center mb-4 border-2 border-gray-100 flex-shrink-0">
          {/* 3D Avatar Placeholder */}
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-400/80 to-indigo-600/80 animate-pulse"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 relative z-10">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center flex-grow justify-center">
          <h3 className="text-lg font-semibold text-center mb-2">{client.name}</h3>
          <p className="text-sm text-gray-500 mb-2">Client Partner</p>
          <span className={`px-3 py-1 text-xs rounded-full ${getTypeColor(client.type)}`}>
            {formatType(client.type)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getTypeColor = (type: Client['type']): string => {
  switch (type) {
    case 'agent':
      return 'bg-blue-100 text-blue-800';
    case 'business':
      return 'bg-purple-100 text-purple-800';
    case 'remittance':
      return 'bg-green-100 text-green-800';
    case 'food':
      return 'bg-amber-100 text-amber-800';
    case 'retail':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatType = (type: Client['type']): string => {
  switch (type) {
    case 'agent':
      return 'PlataPay Agent';
    case 'business':
      return 'Business Center';
    case 'remittance':
      return 'Remittance Service';
    case 'food':
      return 'Food & Beverage';
    case 'retail':
      return 'Retail Store';
    default:
      return type;
  }
};

type ClientsShowcaseProps = {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  showFilters?: boolean;
  maxItems?: number;
  className?: string;
}

const ClientsShowcase = ({ 
  title = "Our Valued Clients", 
  subtitle = "Businesses and entrepreneurs who trust InnovateHub's solutions",
  showAll = false,
  showFilters = true,
  maxItems = 8,
  className = ""
}: ClientsShowcaseProps) => {
  const [activeFilter, setActiveFilter] = React.useState<Client['type'] | 'all'>('all');
  const [displayedClients, setDisplayedClients] = React.useState<Client[]>(
    showAll ? CLIENTS : CLIENTS.slice(0, maxItems)
  );

  React.useEffect(() => {
    if (activeFilter === 'all') {
      setDisplayedClients(showAll ? CLIENTS : CLIENTS.slice(0, maxItems));
    } else {
      const filtered = CLIENTS.filter(client => client.type === activeFilter);
      setDisplayedClients(showAll ? filtered : filtered.slice(0, maxItems));
    }
  }, [activeFilter, showAll, maxItems]);

  return (
    <section className={`py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-10 fade-up">
            <Button 
              variant={activeFilter === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('all')}
              className="rounded-full"
            >
              All
            </Button>
            <Button 
              variant={activeFilter === 'agent' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('agent')}
              className="rounded-full"
            >
              PlataPay Agents
            </Button>
            <Button 
              variant={activeFilter === 'business' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('business')}
              className="rounded-full"
            >
              Business Centers
            </Button>
            <Button 
              variant={activeFilter === 'food' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('food')}
              className="rounded-full"
            >
              Food & Beverage
            </Button>
            <Button 
              variant={activeFilter === 'remittance' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('remittance')}
              className="rounded-full"
            >
              Remittance
            </Button>
            <Button 
              variant={activeFilter === 'retail' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('retail')}
              className="rounded-full"
            >
              Retail
            </Button>
          </div>
        )}
        
        {displayedClients.length > 0 ? (
          <div className="fade-up">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayedClients.map((client) => (
                  <CarouselItem 
                    key={client.id} 
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ClientCard client={client} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-10 fade-up">
            <p className="text-gray-500">No clients found for this filter.</p>
          </div>
        )}
        
        {!showAll && CLIENTS.length > maxItems && (
          <div className="text-center mt-10 fade-up">
            <Button 
              variant="outline" 
              size="lg"
              className="border-innovate-600 text-innovate-600 hover:bg-innovate-50"
              asChild
            >
              <a href="/clients">
                View All Clients
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsShowcase;
