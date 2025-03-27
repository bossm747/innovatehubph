
import React from 'react';
import { Lightbulb, Shield, Rocket, Users } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard = ({ icon, title, description, delay = 0 }: ValueCardProps) => (
  <div 
    className="bg-white rounded-xl p-8 shadow-soft card-hover fade-up"
    style={{ 
      animationName: 'fadeUp',
      animationDuration: '0.6s',
      animationTimingFunction: 'ease-out',
      animationFillMode: 'forwards',
      animationDelay: `${delay}ms`
    }}
  >
    <div className="w-14 h-14 bg-innovate-100 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamValues = () => {
  const values = [
    {
      icon: <Lightbulb className="h-7 w-7 text-innovate-700" />,
      title: "Innovation",
      description: "We constantly explore new technologies and approaches to create cutting-edge solutions for our clients.",
      delay: 0
    },
    {
      icon: <Shield className="h-7 w-7 text-innovate-700" />,
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our business dealings and relationships.",
      delay: 150
    },
    {
      icon: <Users className="h-7 w-7 text-innovate-700" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and partnerships to deliver exceptional results.",
      delay: 300
    },
    {
      icon: <Rocket className="h-7 w-7 text-innovate-700" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to client satisfaction.",
      delay: 450
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide our approach to business and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={value.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
