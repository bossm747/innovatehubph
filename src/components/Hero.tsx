
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Zap, LockKeyhole } from 'lucide-react';

const Hero = () => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const texts = ["Digital Innovation", "Fintech Solutions", "AI Integration", "E-commerce Growth"];
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typingSpeed = 50; // Faster when deleting
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typingSpeed = 100; // Normal speed when typing
      }
      
      if (textRef.current) {
        textRef.current.textContent = currentText;
      }
      
      if (!isDeleting && currentText === fullText) {
        typingSpeed = 1500; // Wait before deleting
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typingSpeed = 500; // Wait before typing new text
      }
      
      setTimeout(type, typingSpeed);
    };
    
    type();
    
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      {/* Circuit pattern overlay */}
      <div className="circuit-bg"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
        
        {/* Security icon */}
        <div className="absolute top-32 right-32 w-16 h-16 opacity-30">
          <img 
            src="/lovable-uploads/9943e545-fc96-401b-98c2-3cb582ebab57.png" 
            alt="Security" 
            className="w-full h-full object-contain" 
          />
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-6 animate-fade-in" style={{animationDelay: '100ms'}}>
              Empowering the Future with <span className="security-dot">Digital Innovation</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              Customized Solutions for a <span className="text-blue-300">Connected World</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-3 animate-fade-in" style={{animationDelay: '300ms'}}>
              InnovateHub delivers cutting-edge <span ref={textRef} className="typing-text">Digital Innovation</span> solutions
            </p>
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in" style={{animationDelay: '400ms'}}>
              designed to transform your business operations and drive growth in the digital economy.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '500ms'}}>
              <Button 
                size="lg" 
                variant="green"
                width="fixed"
                asChild
                className="group min-w-[200px]"
              >
                <Link to="/services" className="flex items-center justify-center">
                  Explore Our Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="purple"
                width="fixed"
                asChild
                className="group min-w-[200px] text-white"
              >
                <Link to="/contact" className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="destructive" 
                width="fixed"
                asChild
                className="min-w-[200px] text-white"
              >
                <Link to="/admin/portal" className="flex items-center justify-center">
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  Admin Portal
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-blue-200 animate-fade-in" style={{animationDelay: '600ms'}}>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-300" />
                <span>Secure Solutions</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-300" />
                <span>Fast Implementation</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
            <div className="float-animation">
              <img 
                src="/lovable-uploads/0c43eec4-b976-4829-a212-d08dfc23d5ab.png" 
                alt="Digital Innovation" 
                className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
              />
              
              {/* Decorative mobile device */}
              <div className="absolute -bottom-10 -right-10 w-32 mobile-device">
                <img 
                  src="/lovable-uploads/5b389941-1ec3-4329-9ff3-7e1f2d738512.png" 
                  alt="Mobile App" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
