
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, PhoneCall, MessageCircle, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-blue-200 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-6">
            <span className="text-sm font-medium">Let's Connect</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ready to Transform Your Business?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our innovative solutions can help you achieve your digital transformation goals.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-md mx-auto">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/contact" className="flex items-center justify-center gap-2 w-full">
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <a href="tel:+639176851216" className="flex items-center justify-center gap-2 w-full">
                <PhoneCall className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>RMCL Bldg., New Bypass Rd., Batangas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" />
              <a href="mailto:businessdevelopment@innovatehub.ph" className="hover:text-blue-600 transition-colors">
                businessdevelopment@innovatehub.ph
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 max-w-xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              <span className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ArrowRight className="h-4 w-4 text-green-500" />
                Quick Response Time
              </span>
              <span className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ArrowRight className="h-4 w-4 text-green-500" />
                Expert Consultation
              </span>
              <span className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ArrowRight className="h-4 w-4 text-green-500" />
                Tailored Solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
