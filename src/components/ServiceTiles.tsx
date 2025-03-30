
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink } from 'lucide-react';

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

  return (
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
          <CardFooter className="p-4">
            {service.isExternal ? (
              <Button asChild variant="secondary" className="w-full justify-between">
                <Link to={service.path || ""} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full">
                  Learn More
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="secondary" className="w-full justify-between">
                <Link to={service.path || ""} className="flex items-center justify-between w-full">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServiceTiles;
