
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const partners = [
  {
    id: 1,
    name: "AllBank",
    logo: "/lovable-uploads/01b0f5ab-9687-4e68-aa2c-76b032dc4268.png",
    category: "Banking",
    description: "AllBank is a thrift bank in the Philippines offering various financial services to consumers and businesses."
  },
  {
    id: 2,
    name: "Netbank",
    logo: "/lovable-uploads/d4db533a-3f8c-4a2b-836e-50dbebfadc0a.png",
    category: "Banking",
    description: "Netbank is a digital banking platform providing secure online banking services in the Philippines."
  },
  {
    id: 3,
    name: "Nationlink",
    logo: "/lovable-uploads/2d9edd2e-f7dc-4974-aaeb-7090e85b730f.png",
    category: "Financial Services",
    description: "Nationlink is a financial services provider offering ATM services and digital payment solutions."
  },
  {
    id: 4,
    name: "Security Bank",
    logo: "/lovable-uploads/f6f78c89-0ed7-46fd-b59e-c52c49c48dea.png",
    category: "Banking",
    description: "Security Bank is one of the Philippines' leading universal banks providing retail, commercial, and investment banking services."
  },
  {
    id: 5,
    name: "LBC",
    logo: "/lovable-uploads/a5d173a8-47a6-4bcd-9a20-b998e4327f75.png",
    category: "Logistics",
    description: "LBC Express is a leading courier, cargo, and remittance service provider in the Philippines with the slogan 'We Like To Move It'."
  },
  {
    id: 6,
    name: "Cebuana Lhuillier",
    logo: "/lovable-uploads/0c914d41-b946-4073-bc60-2f0b4c43c879.png",
    category: "Financial Services",
    description: "Cebuana Lhuillier is a Philippine financial services provider offering pawnshop, remittance, and microinsurance services."
  },
  {
    id: 7,
    name: "CTI CommuniGate Technologies Inc.",
    logo: "/lovable-uploads/aebcb4eb-e21d-432a-906c-3d3882f5a39c.png",
    category: "Technology",
    description: "CTI CommuniGate Technologies Inc. is a technology provider specializing in communication solutions and IT services."
  },
  {
    id: 8,
    name: "eCPAY",
    logo: "/lovable-uploads/393a1d8f-69b7-4f99-9e58-3c98e1dd0db6.png",
    category: "Payment Solutions",
    description: "eCPAY is a payment solutions provider offering electronic payment channels for bills, services, and digital products."
  }
];

const PartnersSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Trusted Collaborations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            InnovateHub collaborates with leading financial institutions, technology providers, and service companies to deliver exceptional solutions to our clients.
          </p>
        </div>
        
        <div className="fade-up">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {partners.map((partner) => (
                <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                  <div className="p-2">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm h-full flex flex-col items-center">
                      <div className="w-full h-24 flex items-center justify-center mb-4 overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-20 max-w-full object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-center mb-2">{partner.name}</h3>
                      <p className="text-xs text-gray-500 text-center mb-2">{partner.category}</p>
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
        
        <div className="text-center mt-10">
          <Button className="bg-innovate-600 hover:bg-innovate-700" asChild>
            <Link to="/partners" className="flex items-center">
              Explore All Partners <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
