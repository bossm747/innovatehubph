
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img 
                src="public/lovable-uploads/682f90d9-02d8-49f0-b70f-855d715c4166.png" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-innovate-900/10"></div>
            </div>
            
            {/* Stats card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-medium max-w-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-bold text-innovate-700">12+</p>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-innovate-700">500+</p>
                  <p className="text-gray-600">Happy Clients</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-innovate-700">150+</p>
                  <p className="text-gray-600">Team Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-innovate-700">98%</p>
                  <p className="text-gray-600">Success Rate</p>
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
              Innovate Hub is a leading technology company in the Philippines, dedicated to helping businesses leverage the power of technology to drive growth and innovation. With over 12 years of experience, we've partnered with companies of all sizes to transform their operations through cutting-edge digital solutions.
            </p>
            <p className="text-gray-600">
              Our team of experts is committed to delivering excellence in every project, whether it's developing custom software, implementing digital transformation strategies, or providing IT consultation services.
            </p>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Excellence in Innovation</h4>
                  <p className="text-gray-600">We constantly pursue innovation to deliver the best solutions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Client-Centric Approach</h4>
                  <p className="text-gray-600">We prioritize understanding your needs to deliver tailored solutions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Sustainable Growth</h4>
                  <p className="text-gray-600">We focus on long-term solutions that drive sustainable growth.</p>
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
