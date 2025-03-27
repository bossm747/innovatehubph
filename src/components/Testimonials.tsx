
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  image: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maria Garcia",
      role: "PlataPay Agent",
      company: "MG Store",
      testimonial: "Being a PlataPay agent has transformed my small sari-sari store. I now earn additional income through transaction fees while providing valuable services to my community.",
      image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Ricardo Santos",
      role: "Business Owner",
      company: "Santos Electronics",
      testimonial: "InnovateHub developed a custom e-commerce solution for our electronics store that increased our online sales by 45% in just three months. Their attention to detail was impressive.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Jasmine Reyes",
      role: "CEO",
      company: "TechVentures Inc.",
      testimonial: "The AI-powered customer service solution developed by InnovateHub has significantly improved our response times and customer satisfaction. It was a game-changer for our business.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);
  
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-innovate-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-innovate-100/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how InnovateHub's solutions have empowered businesses and individuals across the Philippines and beyond.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="min-w-full px-4"
              >
                <Card className="bg-white rounded-xl shadow-medium overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 min-h-[300px] md:min-h-full">
                      <div className="h-full relative">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent md:bg-gradient-to-t"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white md:hidden">
                          <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                          <p className="text-white/80">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-center">
                      <div className="hidden md:block mb-6">
                        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                      </div>
                      
                      <div className="mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-innovate-200">
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                        </svg>
                      </div>
                      
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {testimonial.testimonial}
                      </p>
                      
                      <div className="flex justify-center md:justify-end space-x-2 mt-auto">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="rounded-full" 
                          onClick={handlePrev}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="rounded-full" 
                          onClick={handleNext}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentIndex === index ? 'bg-innovate-600' : 'bg-innovate-200'
                }`}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
