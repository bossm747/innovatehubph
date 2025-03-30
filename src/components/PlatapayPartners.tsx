
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface Partner {
  id: number;
  name: string;
  category: "payment" | "telco" | "banking" | "technology";
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "CTI CommuniGate Technologies Inc.",
    category: "technology"
  },
  {
    id: 2,
    name: "eCPAY",
    category: "payment"
  },
  {
    id: 3,
    name: "QR Ph",
    category: "payment"
  },
  {
    id: 4,
    name: "GCash",
    category: "payment"
  },
  {
    id: 5,
    name: "Globe",
    category: "telco"
  },
  {
    id: 6,
    name: "Smart",
    category: "telco"
  },
  {
    id: 7,
    name: "Maya",
    category: "payment"
  },
  {
    id: 8,
    name: "VISA",
    category: "payment"
  },
  {
    id: 9,
    name: "Mastercard",
    category: "payment"
  },
  {
    id: 10,
    name: "Philippine Banks",
    category: "banking"
  },
  {
    id: 11,
    name: "Top Banks in the Philippines",
    category: "banking"
  },
  {
    id: 12,
    name: "Digital E-Wallets",
    category: "payment"
  },
  {
    id: 13,
    name: "Philippine Service Providers",
    category: "technology"
  },
  {
    id: 14,
    name: "Philippine Service Providers 2",
    category: "technology"
  },
  {
    id: 15,
    name: "Sterling Bank",
    category: "banking"
  }
];

const PlatapayPartners = () => {
  return (
    <section className="py-16 px-0 w-full bg-gradient-to-t from-innovate-50 to-white">
      <div className="w-full px-0">
        <div className="text-center mb-10 fade-up px-6">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Trusted Partnerships
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Integrations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            PlataPay works with the Philippines' top financial institutions, telcos, and service providers
            to offer a comprehensive digital payment ecosystem.
          </p>
        </div>
        
        <div className="w-full fade-up">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {PARTNERS.map((partner) => (
                <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center p-3 border border-gray-100 relative">
                        {/* 3D Avatar Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200"></div>
                        <div className={`w-full h-full flex items-center justify-center relative ${getCategoryColor(partner.category)}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                            {getCategoryIcon(partner.category)}
                          </svg>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-center text-gray-500 font-medium truncate max-w-full">
                        {partner.name}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

// Helper functions for category styling
const getCategoryColor = (category: Partner['category']): string => {
  switch (category) {
    case 'payment':
      return 'text-blue-600';
    case 'telco':
      return 'text-indigo-600';
    case 'banking':
      return 'text-green-600';
    case 'technology':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};

const getCategoryIcon = (category: Partner['category']) => {
  switch (category) {
    case 'payment':
      return (
        <>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </>
      );
    case 'telco':
      return (
        <>
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
          <path d="M15 7a2 2 0 0 1 2 2" />
          <path d="M15 3a6 6 0 0 1 6 6" />
        </>
      );
    case 'banking':
      return (
        <>
          <path d="M3 21l18 0" />
          <path d="M3 10l18 0" />
          <path d="M5 6l7 -3l7 3" />
          <path d="M4 10l0 11" />
          <path d="M20 10l0 11" />
          <path d="M8 14l0 3" />
          <path d="M12 14l0 3" />
          <path d="M16 14l0 3" />
        </>
      );
    case 'technology':
      return (
        <>
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <line x1="7" y1="20" x2="17" y2="20" />
          <line x1="12" y1="16" x2="12" y2="20" />
        </>
      );
    default:
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
      );
  }
};

export default PlatapayPartners;
