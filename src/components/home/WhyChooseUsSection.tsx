
import React from 'react';
import { Award, Shield, Zap, Globe } from 'lucide-react';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-innovate-600" />,
      title: "Speed",
      description: "Quick implementation and turnaround times for all our digital solutions."
    },
    {
      icon: <Shield className="h-8 w-8 text-innovate-600" />,
      title: "Security",
      description: "Enterprise-grade security across all our platforms and applications."
    },
    {
      icon: <Award className="h-8 w-8 text-innovate-600" />,
      title: "Innovation",
      description: "Cutting-edge technology and forward-thinking approaches to digital challenges."
    },
    {
      icon: <Globe className="h-8 w-8 text-innovate-600" />,
      title: "Global Reach",
      description: "Helping businesses extend their reach from the Philippines to Dubai and beyond."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Why Choose InnovateHub
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Innovation at Every Step
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From our roots in Batangas to our expanding presence in Dubai, we're committed to 
            delivering exceptional value through innovation, expertise, and dedication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 fade-up card-3d"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-innovate-50 flex items-center justify-center mb-6 float-animation">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
