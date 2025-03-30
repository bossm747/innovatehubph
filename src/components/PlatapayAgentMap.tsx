
import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Smartphone, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define agent location regions with updated numbers
const agentRegions = [
  { 
    name: 'Luzon', 
    count: 578, 
    majorAreas: ['Metro Manila', 'Batangas', 'Laguna', 'Cavite', 'Bulacan', 'Pampanga', 'Tarlac']
  },
  { 
    name: 'Visayas', 
    count: 312, 
    majorAreas: ['Cebu', 'Iloilo', 'Bacolod', 'Bohol', 'Tacloban']
  },
  { 
    name: 'Mindanao', 
    count: 236, 
    majorAreas: ['Davao', 'Cagayan de Oro', 'General Santos', 'Zamboanga', 'Butuan']
  },
  { 
    name: 'International', 
    count: 43, 
    majorAreas: ['Dubai', 'Abu Dhabi', 'Singapore', 'Hong Kong', 'Kuala Lumpur']
  }
];

// Calculate total agents
const totalAgents = agentRegions.reduce((sum, region) => sum + region.count, 0);

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
            With over {totalAgents} agents nationwide and expanding international presence, 
            PlataPay is rapidly making financial services accessible to communities everywhere.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 fade-up">
            <Card className="h-full overflow-hidden border-none shadow-lg">
              <div className="relative h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
                {/* Replace the old SVG map with the new Philippines map image */}
                <img 
                  src="/lovable-uploads/dc4ee6f7-4310-43aa-b6d7-9b430abe6306.png" 
                  alt="Philippines Network Map" 
                  className="w-full h-full object-contain" 
                />
                
                {/* Interactive dots overlaying the map */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-innovate-600 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-purple-600 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-innovate-600 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute top-1/5 right-2/5 w-4 h-4 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: "1.5s" }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-purple-600 rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
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
                        style={{ width: `${(region.count / 600) * 100}%` }}
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
              
              {/* New growth highlight section */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">Rapid Growth Trajectory</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Despite being a startup, we've quickly gained trust in the market, with partner inquiries 
                      increasing by 215% in the last quarter alone. Our agent network continues to expand rapidly.
                    </p>
                  </div>
                </div>
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
