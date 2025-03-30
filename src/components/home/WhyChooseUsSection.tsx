
import React from 'react';

interface FeatureProps {
  imageUrl: string;
  title: string;
  description: string;
  delay?: number;
}

const Feature = ({ imageUrl, title, description, delay = 0 }: FeatureProps) => (
  <div 
    className="bg-white p-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 fade-up card-3d"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-center mb-6">
      <img 
        src={imageUrl} 
        alt={title} 
        className="h-24 w-auto object-contain float-animation" 
      />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const WhyChooseUsSection = () => {
  const features = [
    {
      imageUrl: "/lovable-uploads/c557714d-a50c-4e38-abca-075f3298f30c.png",
      title: "Speed",
      description: "Quick implementation and turnaround times for all our digital solutions."
    },
    {
      imageUrl: "/lovable-uploads/1e9b7dba-d745-4d1c-9601-b3c773e6a7bb.png",
      title: "Security",
      description: "Enterprise-grade security across all our platforms and applications."
    },
    {
      imageUrl: "/lovable-uploads/bb567b94-efac-4490-a21d-1ea9700ef7c7.png",
      title: "Innovation",
      description: "Cutting-edge technology and forward-thinking approaches to digital challenges."
    },
    {
      imageUrl: "/lovable-uploads/c78ecd8f-38d4-4cb5-b75c-98aadc8d718f.png",
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
            <Feature 
              key={index} 
              imageUrl={feature.imageUrl}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
