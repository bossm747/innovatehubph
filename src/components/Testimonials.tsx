
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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
  const [isPaused, setIsPaused] = useState(false);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Business Owner",
      role: "Founder",
      company: "Landos Grill",
      testimonial: "We'd like to thank InnovateHub for creating our online restaurant platform with integrated payment gateway. It has streamlined our operations and significantly improved our customer experience.",
      image: "/lovable-uploads/435e4809-830b-47f7-a2e1-c1667877fbc7.png"
    },
    {
      id: 2,
      name: "Business Owner",
      role: "Manager",
      company: "Barako Brews",
      testimonial: "Adding a point-of-sale system with QR payments through InnovateHub has transformed how we run our coffee shop. Transactions are faster and our customers love the convenience.",
      image: "/lovable-uploads/c1082f13-5811-44d2-aaa4-123f819328bf.png"
    },
    {
      id: 3,
      name: "Business Owner",
      role: "CEO",
      company: "BTS Delivery",
      testimonial: "InnovateHub created an integrated online delivery ecosystem with seamless payment integrations for both our web and mobile apps. This has revolutionized our business model completely.",
      image: "/lovable-uploads/a281e700-f986-4113-a9d3-5fcaaba04b67.png"
    }
  ];
  
  const totalTestimonials = testimonials.length;
  
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  }, [totalTestimonials]);
  
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials);
  }, [totalTestimonials]);
  
  // Auto slide every 5 seconds, continuous looping
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        handleNext();
      }, 5000);
      
      return () => clearInterval(timer);
    }
  }, [handleNext, isPaused]);
  
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
        
        <div className="max-w-4xl mx-auto"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-full">
                  <div className="p-1">
                    <Card className="bg-white rounded-xl shadow-medium overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 min-h-[280px] md:min-h-full flex items-center justify-center p-6 bg-gray-50">
                          <div className="h-[180px] w-[180px] relative rounded-full overflow-hidden border-4 border-innovate-100/20">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.company} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">{testimonial.company}</h3>
                            <p className="text-gray-600">{testimonial.role}</p>
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
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end space-x-2 mt-4">
              <CarouselPrevious onClick={handlePrev} className="relative static left-0 translate-y-0 bg-white" />
              <CarouselNext onClick={handleNext} className="relative static right-0 translate-y-0 bg-white" />
            </div>
          </Carousel>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentIndex === index ? 'bg-innovate-600' : 'bg-innovate-200'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
