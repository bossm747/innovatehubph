
import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define agent location regions
const agentRegions = [
  { 
    name: 'Luzon', 
    count: 450, 
    majorAreas: ['Metro Manila', 'Batangas', 'Laguna', 'Cavite', 'Bulacan', 'Pampanga', 'Tarlac']
  },
  { 
    name: 'Visayas', 
    count: 280, 
    majorAreas: ['Cebu', 'Iloilo', 'Bacolod', 'Bohol', 'Tacloban']
  },
  { 
    name: 'Mindanao', 
    count: 190, 
    majorAreas: ['Davao', 'Cagayan de Oro', 'General Santos', 'Zamboanga', 'Butuan']
  },
  { 
    name: 'International', 
    count: 25, 
    majorAreas: ['Dubai', 'Abu Dhabi', 'Singapore', 'Hong Kong']
  }
];

const PlatapayAgentMap = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-innovate-50/50">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Nationwide Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">PlataPay Agents Across the Philippines</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            With over 900 agents nationwide and growing international presence, 
            PlataPay is making financial services accessible to communities everywhere.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 fade-up">
            <Card className="h-full overflow-hidden border-none shadow-lg">
              <div className="relative h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-philippines-map bg-no-repeat bg-contain bg-center opacity-10"></div>
                
                {/* This would be replaced with an actual map integration */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-[70%] h-[70%] relative">
                    {/* Simplified Philippines map representation */}
                    <svg viewBox="0 0 600 400" className="w-full h-full">
                      {/* Simplified Philippines map outline */}
                      <path d="M150,50 C200,30 250,50 280,30 C310,10 350,20 380,40 C410,60 450,50 480,70 C510,90 520,130 500,160 C480,190 500,230 480,260 C460,290 420,310 390,330 C360,350 320,340 280,350 C240,360 200,350 170,330 C140,310 120,270 110,230 C100,190 120,150 130,110 C140,70 130,60 150,50 Z" 
                        fill="#e6f7ff" stroke="#3182ce" strokeWidth="2" />
                      
                      {/* Agent cluster markers */}
                      <circle cx="300" cy="100" r="15" fill="#3182ce" opacity="0.7" />
                      <circle cx="250" cy="150" r="25" fill="#3182ce" opacity="0.7" />
                      <circle cx="400" cy="150" r="18" fill="#3182ce" opacity="0.7" />
                      <circle cx="200" cy="200" r="20" fill="#3182ce" opacity="0.7" />
                      <circle cx="350" cy="200" r="15" fill="#3182ce" opacity="0.7" />
                      <circle cx="300" cy="250" r="30" fill="#3182ce" opacity="0.7" />
                      <circle cx="250" cy="300" r="15" fill="#3182ce" opacity="0.7" />
                      <circle cx="400" cy="300" r="20" fill="#3182ce" opacity="0.7" />
                      
                      {/* Region labels */}
                      <text x="280" y="80" fontFamily="Arial" fontSize="12" fill="#1a365d">Luzon</text>
                      <text x="300" y="200" fontFamily="Arial" fontSize="12" fill="#1a365d">Visayas</text>
                      <text x="330" y="320" fontFamily="Arial" fontSize="12" fill="#1a365d">Mindanao</text>
                      
                      {/* International connection lines */}
                      <line x1="480" y1="50" x2="550" y2="20" stroke="#3182ce" strokeWidth="1" strokeDasharray="5,5" />
                      <text x="520" y="15" fontFamily="Arial" fontSize="10" fill="#1a365d">Dubai</text>
                      
                      <line x1="490" y1="80" x2="560" y2="60" stroke="#3182ce" strokeWidth="1" strokeDasharray="5,5" />
                      <text x="530" y="55" fontFamily="Arial" fontSize="10" fill="#1a365d">Singapore</text>
                    </svg>
                  </div>
                </div>
                
                {/* Interactive dots that could be added with a proper map library */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-innovate-600 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-innovate-600 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-innovate-600 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
              </div>
            </Card>
          </div>
          
          <div className="fade-up">
            <Card className="h-full p-6 border-none shadow-lg">
              <h3 className="text-xl font-bold mb-4">Agent Distribution</h3>
              
              <div className="space-y-6">
                {agentRegions.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{region.name}</h4>
                      <span className="text-innovate-600 font-semibold">{region.count}+ agents</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-innovate-600 h-2.5 rounded-full" 
                        style={{ width: `${(region.count / 500) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {region.majorAreas.map((area, areaIndex) => (
                        <span 
                          key={areaIndex} 
                          className="px-2 py-1 bg-innovate-100 text-innovate-700 rounded text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-innovate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Find Nearest Agent</h4>
                    <p className="text-sm text-gray-600 mb-3">Use our agent locator to find the nearest PlataPay service point.</p>
                    <Button size="sm" className="bg-innovate-600 hover:bg-innovate-700" asChild>
                      <a href="https://platapay.ph" target="_blank" rel="noopener noreferrer">
                        Locate Agent <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 mt-6">
                  <div className="flex-shrink-0">
                    <Smartphone className="h-6 w-6 text-innovate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Become an Agent</h4>
                    <p className="text-sm text-gray-600 mb-3">Join our growing network and offer essential financial services in your area.</p>
                    <Button size="sm" variant="outline" className="border-innovate-600 text-innovate-600 hover:bg-innovate-50" asChild>
                      <a href="https://platapay.ph/registration" target="_blank" rel="noopener noreferrer">
                        Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatapayAgentMap;
