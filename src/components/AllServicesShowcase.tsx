
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { servicesData } from '@/data/servicesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const AllServicesShowcase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Service categories
  const categories = ['All', 'Fintech', 'Web & Mobile', 'E-commerce', 'AI', 'Global'];
  
  // Filter services based on search term
  const filteredServices = servicesData.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get services by category
  const getServicesByCategory = (category: string) => {
    if (category === 'All') return filteredServices;
    
    return filteredServices.filter(service => {
      const categoryMap: Record<string, string[]> = {
        'Fintech': ['fintech-solutions'],
        'Web & Mobile': ['digital-customizations', 'mobile-app-development'],
        'E-commerce': ['ecommerce'],
        'AI': ['ai-solutions'],
        'Global': ['global-expansion']
      };
      
      return categoryMap[category]?.includes(service.id);
    });
  };

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Comprehensive Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All Digital Services Under One Roof</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From fintech solutions to AI integration, we provide end-to-end digital transformation services to help your business thrive in the digital age.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 max-w-2xl mx-auto fade-up">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-innovate-500 focus:ring-innovate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Services Hub Image */}
        <div className="relative mb-16 max-w-4xl mx-auto fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
          <img 
            src="/lovable-uploads/dea0d8a1-2294-4073-9761-8113ef0bed55.png" 
            alt="InnovateHub Services Hub" 
            className="relative z-10 w-full h-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Tabs for categories */}
        <Tabs defaultValue="All" className="w-full mb-8 fade-up">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-gray-100">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-innovate-600 data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getServicesByCategory(category).map((service, index) => (
                  <Card 
                    key={service.id} 
                    className="group p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-innovate-500 fade-up h-full flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-center mb-6 flex-shrink-0">
                      <div className="p-3 rounded-full bg-innovate-50 transition-all duration-300 group-hover:bg-innovate-100">
                        <img 
                          src={service.icon} 
                          alt={service.title} 
                          className="h-20 w-auto transition-transform group-hover:scale-110 duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <Badge variant="outline" className="text-xs bg-innovate-50 text-innovate-700 border-innovate-200">
                          {category === 'All' ? service.id.split('-').join(' ') : category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="mt-4 space-y-2">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-innovate-100 flex items-center justify-center">
                              <div className="h-1 w-1 rounded-full bg-innovate-700"></div>
                            </div>
                            <span className="text-sm text-gray-600">{feature.title}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Link 
                          to={`/${service.id}`} 
                          className="text-innovate-600 hover:text-innovate-700 flex items-center font-medium"
                        >
                          Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {getServicesByCategory(category).length === 0 && (
                <div className="text-center py-12 fade-up">
                  <h3 className="text-2xl font-semibold mb-2">No services found</h3>
                  <p className="text-gray-600">Try a different search term or category</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-16 text-center fade-up">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need a custom solution or want to learn more about a specific service?
          </p>
          <Button asChild size="lg" className="bg-innovate-600 hover:bg-innovate-700">
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllServicesShowcase;
