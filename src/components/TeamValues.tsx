
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart, Target, Award } from 'lucide-react';

const TeamValues = () => {
  const values = [
    {
      icon: <Brain className="h-10 w-10 text-blue-600" />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what's possible in digital technology.'
    },
    {
      icon: <Heart className="h-10 w-10 text-blue-600" />,
      title: 'Passion',
      description: 'Our team brings enthusiasm and dedication to every project we undertake.'
    },
    {
      icon: <Target className="h-10 w-10 text-blue-600" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from code to customer service.'
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: 'Integrity',
      description: 'We build trust through transparent communication and ethical business practices.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            Our Core Values
          </span>
          <h2 className="text-3xl font-bold mb-4">What Drives Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide our daily work and shape our company culture
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 opacity-20 blur-xl rounded-full bg-blue-400"></div>
            <img 
              src="/lovable-uploads/832eaa2f-0c87-4bc3-94f5-dc56e78f71a1.png" 
              alt="Team Innovation" 
              className="relative h-24 w-auto mx-auto mb-4"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">Join Our Innovative Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals who share our values and vision for the future of technology.
          </p>
          <a 
            href="/contact?subject=careers" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Career Opportunities
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
