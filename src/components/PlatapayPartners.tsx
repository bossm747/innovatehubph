
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
  logo: string;
  category: "payment" | "telco" | "banking" | "technology";
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "CTI CommuniGate Technologies Inc.",
    logo: "/lovable-uploads/94f1fe68-294e-4ec1-97a5-c46e890ea250.png",
    category: "technology"
  },
  {
    id: 2,
    name: "eCPAY",
    logo: "/lovable-uploads/11f56e14-e9a9-430c-b0e1-464fdb0fddc4.png",
    category: "payment"
  },
  {
    id: 3,
    name: "QR Ph",
    logo: "/lovable-uploads/68eff130-096d-4fd2-80a8-66b17487294d.png",
    category: "payment"
  },
  {
    id: 4,
    name: "GCash",
    logo: "/lovable-uploads/4f756ea6-6648-419a-89f0-06dee6ad1ed6.png",
    category: "payment"
  },
  {
    id: 5,
    name: "Globe",
    logo: "/lovable-uploads/bc0779f5-10a8-4d36-b470-9478ddb3ea3f.png",
    category: "telco"
  },
  {
    id: 6,
    name: "Smart",
    logo: "/lovable-uploads/ee574fbf-d6c3-4db3-94b5-ceb02ee20f32.png",
    category: "telco"
  },
  {
    id: 7,
    name: "Maya",
    logo: "/lovable-uploads/168a523b-1812-45fb-8088-ba72e0c90411.png",
    category: "payment"
  },
  {
    id: 8,
    name: "VISA",
    logo: "/lovable-uploads/2b076737-e1c1-4f95-90c1-ed7befc22280.png",
    category: "payment"
  },
  {
    id: 9,
    name: "Mastercard",
    logo: "/lovable-uploads/0831c807-9c51-4945-b543-6aa09dd81d02.png", 
    category: "payment"
  },
  {
    id: 10,
    name: "Philippine Banks",
    logo: "/lovable-uploads/9e2b9a18-40d9-4840-9b3a-d9830bc373cc.png",
    category: "banking"
  },
  {
    id: 11,
    name: "Top Banks in the Philippines",
    logo: "/lovable-uploads/17557afe-d610-49a7-b3d0-d8eb939fcfa0.png",
    category: "banking"
  },
  {
    id: 12,
    name: "Digital E-Wallets",
    logo: "/lovable-uploads/86be738a-2bfc-4d3d-b8e8-e9ae97d74072.png",
    category: "payment"
  },
  {
    id: 13,
    name: "Philippine Service Providers",
    logo: "/lovable-uploads/e5cded83-8d62-4437-ad5d-69b26fd5828e.png",
    category: "technology"
  },
  {
    id: 14,
    name: "Philippine Service Providers 2",
    logo: "/lovable-uploads/c2b9e5a5-ae89-4e3d-880a-ac0770e8e3c6.png",
    category: "technology"
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
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center p-3 border border-gray-100">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                        />
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

export default PlatapayPartners;
