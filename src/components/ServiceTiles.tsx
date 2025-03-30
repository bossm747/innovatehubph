
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import LeadCaptureForm from './forms/LeadCaptureForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ServiceTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path?: string;
  isExternal?: boolean;
}

const ServiceTileHeader = ({ serviceName }: { serviceName: string }) => {
  return (
    <div className="mr-2">{serviceName}</div>
  );
};

const ServiceTiles = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  
  const services: ServiceTileProps[] = [
    {
      icon: <ServiceTileHeader serviceName="PlataPay" />,
      title: "Digital Payment Solutions",
      description: "Empowering businesses with secure and efficient digital payment processing.",
      path: "/services/platapay",
    },
    {
      icon: <ServiceTileHeader serviceName="InnovateHub AI" />,
      title: "AI-Powered Solutions",
      description: "Transforming businesses through cutting-edge artificial intelligence technologies.",
      path: "/services/ai",
    },
    {
      icon: <ServiceTileHeader serviceName="Web Development" />,
      title: "Custom Web Development",
      description: "Creating bespoke web solutions tailored to meet your unique business needs.",
      path: "/services/web-development",
    },
    {
      icon: <ServiceTileHeader serviceName="Mobile Apps" />,
      title: "Mobile App Development",
      description: "Developing innovative mobile applications for iOS and Android platforms.",
      path: "/services/mobile-apps",
    },
    {
      icon: <ServiceTileHeader serviceName="Digital Marketing" />,
      title: "Digital Marketing Services",
      description: "Enhancing your online presence with strategic digital marketing campaigns.",
      path: "/services/digital-marketing",
    },
    {
      icon: <ServiceTileHeader serviceName="Cloud Solutions" />,
      title: "Cloud Computing Solutions",
      description: "Providing scalable and secure cloud infrastructure for your business operations.",
      path: "/services/cloud-solutions",
    },
  ];

  const handleServiceInterest = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setShowLeadForm(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center">
                {service.icon}
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CardDescription className="text-gray-600">
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
              {service.isExternal ? (
                <Button asChild variant="secondary" className="w-auto">
                  <Link to={service.path || ""} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="secondary" className="w-auto">
                  <Link to={service.path || ""} className="flex items-center">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
              
              <Button 
                variant="default" 
                className="bg-innovate-600 hover:bg-innovate-700 text-white"
                onClick={() => handleServiceInterest(service.title)}
              >
                Request Info
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Lead Capture Dialog */}
      <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Information</DialogTitle>
            <DialogDescription>
              {selectedService ? (
                <>
                  <Badge variant="outline" className="mb-2 bg-innovate-50 text-innovate-700 border-innovate-200">
                    {selectedService}
                  </Badge>
                  <p>Fill out this form to receive more information about our {selectedService} services.</p>
                </>
              ) : (
                <p>Fill out this form to learn more about our services.</p>
              )}
            </DialogDescription>
          </DialogHeader>
          <LeadCaptureForm 
            formType="popup" 
            leadSource="services-page" 
            embedded={true}
            showInterestFields={true}
            title=""
            subtitle=""
            buttonText="Send Request"
            onSuccess={() => setShowLeadForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceTiles;
