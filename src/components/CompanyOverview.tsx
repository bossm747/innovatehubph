
import React from 'react';
import { ArrowRight, Award, Check, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CompanyOverview = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From Batangas to Dubai: Our Growth Journey</h2>
            <p className="text-gray-600 mb-6">
              Founded in early 2024, InnovateHub began as a small tech startup in Batangas with a vision to transform how local businesses interact with technology. Our unique approach quickly caught attention, leading to rapid growth and expansion.
            </p>
            
            <div className="mb-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-semibold">BSP-Licensed Operations</span>: We are proud to be BSP OPS-certified and are currently in the process of obtaining the PlataPay license for international remittance services.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-semibold">Global Partnerships</span>: We've established valuable partnerships with LBC and local Dubai banks to provide seamless international financial services.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-semibold">International Expansion</span>: Our Dubai operations mark our first step in our global growth strategy, bringing Filipino innovation to the international stage.
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="group">
              Learn About Our Vision
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="order-1 md:order-2 fade-up">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/dde98a7d-f55c-499e-b5d7-1ada528182f3.png" 
                  alt="BSP Certificate of Registration - INNOVATEHUB INC." 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-innovate-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-innovate-800">BSP Certified</h4>
                    <p className="text-sm text-gray-500">Official Recognition</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-innovate-100 to-innovate-200 opacity-60 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
