
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  location: string;
  image?: string;
}

const PlatapayTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "PlataPay changed the way I do business. Now I can offer financial services in my community and earn additional income while helping my neighbors avoid long trips to the city.",
      author: "Maria Santos",
      role: "PlataPay Agent",
      location: "Batangas City",
      image: "/public/lovable-uploads/45881ff2-13a3-4bc4-a639-da000d90c94a.png"
    },
    {
      id: 2,
      content: "I used to spend half a day traveling and waiting in line to pay bills. With PlataPay, I can pay all my utilities in minutes from my phone. It's a game-changer!",
      author: "Juan Dela Cruz",
      role: "PlataPay User",
      location: "San Pascual",
      image: "/public/lovable-uploads/2346f5e5-b8ef-42cd-be11-be6d1c85e007.png"
    },
    {
      id: 3,
      content: "As a small store owner, becoming a PlataPay agent has not only increased foot traffic to my shop but also provided a steady additional income stream through service commissions.",
      author: "Elena Reyes",
      role: "Sari-Sari Store Owner & Agent",
      location: "Lemery",
      image: "/public/lovable-uploads/35a5cc72-be03-4410-879b-3f1ad0ad3b00.png"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-innovate-50">
      <div className="container mx-auto">
        <div className="mb-16 text-center fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Agent Testimonials</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hear from our PlataPay agents and users about how our digital financial services platform 
            has transformed their businesses and daily lives.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto fade-up">
          {/* Quote icon */}
          <div className="absolute -top-10 -left-10 text-innovate-200">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 16H16V32C16 40.8366 23.1634 48 32 48V40C27.5817 40 24 36.4183 24 32H32V16Z" fill="currentColor"/>
              <path d="M64 16H48V32C48 40.8366 55.1634 48 64 48V40C59.5817 40 56 36.4183 56 32H64V16Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Testimonials carousel */}
          <div className="relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="p-10 rounded-xl shadow-lg border-none bg-white">
                    <p className="text-lg md:text-xl text-gray-700 mb-8 italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center">
                      {testimonial.image ? (
                        <div className="rounded-full w-12 h-12 overflow-hidden mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="rounded-full w-12 h-12 bg-innovate-100 text-innovate-700 flex items-center justify-center mr-4">
                          <span className="text-lg font-medium">{testimonial.author.charAt(0)}</span>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-innovate-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatapayTestimonials;
