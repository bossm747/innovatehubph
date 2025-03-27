
import React from 'react';
import { 
  Award, 
  Clock, 
  Shield, 
  Users, 
  Lightbulb, 
  Heart 
} from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard = ({ icon, title, description, delay = 0 }: ValueCardProps) => (
  <div 
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0"
    style={{ 
      animationName: 'fadeUp',
      animationDuration: '0.6s',
      animationTimingFunction: 'ease-out',
      animationFillMode: 'forwards',
      animationDelay: `${delay}ms`
    }}
  >
    <div className="bg-innovate-100 text-innovate-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamValues = () => {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Security",
      description: "We prioritize safety and reliability in every solution we deliver, ensuring our clients' data and transactions are always protected."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timeliness",
      description: "We value your time and deliver our solutions promptly without compromising on quality or attention to detail."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Focus",
      description: "We build technology that empowers local communities and creates economic opportunities for micropreneurs across the Philippines."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "We continuously explore new technologies and approaches to solve complex challenges in creative and effective ways."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Customer First",
      description: "Our clients' success is our success. We listen carefully to their needs and tailor our solutions accordingly."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "We pursue excellence in everything we do, from code quality to customer service and business operations."
    }
  ];

  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-innovate-100 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-innovate-200 rounded-full opacity-30 translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Values
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Principles That Guide Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At InnovateHub, our team is united by a shared set of values that define how we work together and serve our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard 
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
