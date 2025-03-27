import React from 'react';
import { Button } from "@/components/ui/button";
import CircuitBackground from "./CircuitBackground";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Partner {
  id: number;
  logo: string;
  name: string;
}

const FEATURED_PARTNERS: Partner[] = [
  {
    id: 1,
    name: "GCash",
    logo: "/lovable-uploads/4f756ea6-6648-419a-89f0-06dee6ad1ed6.png"
  },
  {
    id: 2,
    name: "eCPAY",
    logo: "/lovable-uploads/11f56e14-e9a9-430c-b0e1-464fdb0fddc4.png"
  },
  {
    id: 3,
    name: "Maya",
    logo: "/lovable-uploads/168a523b-1812-45fb-8088-ba72e0c90411.png"
  },
  {
    id: 4,
    name: "Globe",
    logo: "/lovable-uploads/bc0779f5-10a8-4d36-b470-9478ddb3ea3f.png"
  },
  {
    id: 5,
    name: "Smart",
    logo: "/lovable-uploads/ee574fbf-d6c3-4db3-94b5-ceb02ee20f32.png"
  },
  {
    id: 6,
    name: "VISA",
    logo: "/lovable-uploads/2b076737-e1c1-4f95-90c1-ed7befc22280.png"
  },
  {
    id: 7,
    name: "Mastercard",
    logo: "/lovable-uploads/0831c807-9c51-4945-b543-6aa09dd81d02.png"
  },
  {
    id: 8,
    name: "QR Ph",
    logo: "/lovable-uploads/68eff130-096d-4fd2-80a8-66b17487294d.png"
  }
];

const PlataPay = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <CircuitBackground 
        pattern="circuit-simple" 
        className="top-0 right-0" 
        size="md"
        opacity={0.2}
        color="primary"
      />
      
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/d06dbf6f-eafc-4d26-97e4-b5ee5dac0416.png" 
                  alt="PlataPay App Interface" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* QR Code payment overlay */}
              <div className="absolute -top-6 -right-6 glass-card rounded-xl p-4 shadow-medium animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png"
                      alt="QR Payment" 
                      className="w-8 h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Scan to Pay</p>
                    <p className="font-medium">Quick & Secure</p>
                  </div>
                </div>
              </div>
              
              {/* Digital wallet card */}
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 shadow-medium animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Digital Wallet</p>
                    <p className="font-medium">Earn as Agent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full">
              Our Flagship Product
            </span>
            <div className="flex items-center mb-4">
              <div className="relative mr-4">
                {/* Dark circular background */}
                <div className="absolute inset-0 bg-black/80 rounded-full blur-sm transition-all duration-300"></div>
                <img 
                  src="/lovable-uploads/9a2fc4d0-82f0-46c9-a231-cc9050b9deda.png" 
                  alt="PlataPay Logo" 
                  className="h-14 w-14 relative z-10"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' }}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">PlataPay – Empowering Micropreneurs</h2>
            </div>
            <p className="text-gray-600">
              PlataPay is a secure and income-generating platform for communities. Our digital finance solution empowers micropreneurs with easy access to:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Digital Wallet</h4>
                  <p className="text-sm text-gray-600">Secure money storage</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Bills Payment</h4>
                  <p className="text-sm text-gray-600">Pay your bills anytime</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Remittance</h4>
                  <p className="text-sm text-gray-600">Send money instantly</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">E-Loading</h4>
                  <p className="text-sm text-gray-600">Load phone credits</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="bg-innovate-600 hover:bg-innovate-700 text-white transition-colors btn-shine">
                Explore PlataPay
              </Button>
            </div>
          </div>
        </div>
        
        {/* Partners logos carousel */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase font-medium tracking-wider">Trusted by the Philippines' Leading Brands</p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {FEATURED_PARTNERS.map((partner) => (
                <CarouselItem key={partner.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div className="h-16 flex items-center justify-center p-2">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center p-2">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PlataPay;
