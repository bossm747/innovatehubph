
import { Button } from "@/components/ui/button";
import CircuitBackground from "./CircuitBackground";

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 lg:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-transparent -z-10"></div>
      
      {/* Circuit decorative elements using the enhanced component */}
      <CircuitBackground 
        pattern="right" 
        className="top-20 right-0" 
        size="md"
        opacity={0.3}
      />
      
      <CircuitBackground 
        pattern="left" 
        className="bottom-0 left-0" 
        size="lg"
        opacity={0.3}
      />
      
      {/* Blue wave decorative element */}
      <CircuitBackground 
        pattern="wave" 
        className="top-1/4 right-1/4" 
        size="sm"
        opacity={0.2}
      />
      
      {/* Circuit lines */}
      <CircuitBackground 
        pattern="lines" 
        className="top-1/3 left-20" 
        size="md"
        opacity={0.15}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-32 right-0 w-72 h-72 bg-innovate-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-innovate-100/40 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            {/* Blue circuit network */}
            <CircuitBackground 
              pattern="circuit-blue" 
              className="-left-10 bottom-12" 
              size="sm"
              opacity={0.3}
            />
          
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full">
                Innovation for the Future
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Transforming Ideas into <span className="hero-text-gradient">Digital Reality</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                We help businesses innovate, transform, and grow through cutting-edge technology solutions and strategic partnerships.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-innovate-600 hover:bg-innovate-700 text-white rounded-md px-8 py-6 text-lg transition-all btn-shine"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/80 hover:bg-white border-innovate-200 text-innovate-800 rounded-md px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-xs font-medium text-gray-600">
                      {["JD", "MA", "TK", "SL"][i-1]}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-yellow-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">4.9</span> from over <span className="font-medium">500</span> reviews
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[500px] animate-fade-in">
              <img 
                src="public/lovable-uploads/7c51de5e-2a54-4a16-8c38-3aed5f77004a.png" 
                alt="Innovate Hub Team" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-soft"
                style={{ objectPosition: 'center 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              
              {/* Circuit board corner decoration */}
              <CircuitBackground 
                pattern="corner" 
                className="top-0 right-0" 
                size="sm"
                opacity={0.4}
              />
              
              {/* Stats cards floating on the image */}
              <div className="absolute -bottom-8 -left-8 glass-card rounded-xl p-4 animate-float shadow-medium">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-innovate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                      <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Time</p>
                    <p className="font-medium">2-3 Weeks</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-8 -right-8 glass-card rounded-xl p-4 animate-float shadow-medium" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-innovate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8a1 1 0 01-1 1H6a1 1 0 110-2h4V6a1 1 0 112 0v4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clients</p>
                    <p className="font-medium">500+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
