
import { Button } from "@/components/ui/button";
import { Brain, Zap, Code, CircuitBoard, Award, Shield, Globe, Cloud } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Circuit board decorative elements */}
      <div className="absolute top-20 right-20 -z-10">
        <img 
          src="/lovable-uploads/60fc5fce-299b-4f14-b006-947a5cd409ba.png" 
          alt="" 
          className="w-20 h-auto opacity-30"
        />
      </div>
      <div className="absolute bottom-10 left-10 -z-10">
        <img 
          src="/lovable-uploads/2346f5e5-b8ef-42cd-be11-be6d1c85e007.png" 
          alt="" 
          className="w-16 h-auto opacity-30"
        />
      </div>
      
      {/* Circuit corner decoration */}
      <div className="absolute top-0 right-0 -z-10">
        <img 
          src="/lovable-uploads/889fa9a3-7688-472c-9782-dcd7b2766e3f.png" 
          alt="" 
          className="w-48 h-auto opacity-20"
        />
      </div>
      
      {/* Circuit pattern in background */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-5">
        <img 
          src="/lovable-uploads/e465451c-ac7c-4d41-855b-63954db5d9d8.png" 
          alt="" 
          className="w-full max-w-5xl h-auto"
        />
      </div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img 
                src="/lovable-uploads/682f90d9-02d8-49f0-b70f-855d715c4166.png" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-innovate-900/10"></div>
            </div>
            
            {/* Company Achievement Badges */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-medium max-w-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-innovate-800">Our Achievements</h3>
                  <Award className="h-5 w-5 text-innovate-600" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {/* Achievement Badges */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-innovate-50 flex items-center justify-center mb-1">
                      <Shield className="h-6 w-6 text-innovate-600" />
                    </div>
                    <span className="text-xs text-center">Trusted Security</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-innovate-50 flex items-center justify-center mb-1">
                      <Globe className="h-6 w-6 text-innovate-600" />
                    </div>
                    <span className="text-xs text-center">Global Reach</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-innovate-50 flex items-center justify-center mb-1">
                      <Cloud className="h-6 w-6 text-innovate-600" />
                    </div>
                    <span className="text-xs text-center">Cloud Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pl-8 opacity-0 translate-y-4" style={{ 
            animationName: 'fadeUp',
            animationDuration: '0.6s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            animationDelay: '200ms'
          }}>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Driving Innovation and Digital Transformation</h2>
            <p className="text-gray-600">
              Innovate Hub is an emerging technology company in the Philippines, dedicated to helping businesses leverage the power of technology to drive growth and innovation. With our passion and expertise, we've partnered with businesses of all sizes to transform their operations through cutting-edge digital solutions.
            </p>
            <p className="text-gray-600">
              Our growing team of experts is committed to delivering excellence in every project, whether it's developing custom software, implementing digital transformation strategies, or providing IT consultation services.
            </p>
            
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-3 rounded-lg bg-innovate-50 border border-innovate-100">
                <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-innovate-100">
                  <Brain className="h-5 w-5 text-innovate-700" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">AI Solutions</h4>
                  <p className="text-sm text-gray-600">Custom AI models to automate and optimize business processes</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-innovate-50 border border-innovate-100">
                <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-innovate-100">
                  <Code className="h-5 w-5 text-innovate-700" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Custom Development</h4>
                  <p className="text-sm text-gray-600">Tailored software solutions for your unique business needs</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-innovate-50 border border-innovate-100">
                <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-innovate-100">
                  <CircuitBoard className="h-5 w-5 text-innovate-700" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Fintech Innovation</h4>
                  <p className="text-sm text-gray-600">Financial technology solutions with PlataPay integration</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-innovate-50 border border-innovate-100">
                <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-innovate-100">
                  <Zap className="h-5 w-5 text-innovate-700" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Digital Transformation</h4>
                  <p className="text-sm text-gray-600">Comprehensive strategies for business modernization</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="bg-innovate-600 hover:bg-innovate-700 btn-shine">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
