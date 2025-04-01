
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, PhoneCall } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-innovate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-innovate-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-600 mb-8">
            Contact us today to discuss how our innovative solutions can help you achieve your digital transformation goals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <Button asChild className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine">
              <Link to="/contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-innovate-200 text-innovate-700 hover:bg-innovate-50">
              <Link to="tel:+639176851216" className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                Call Now
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center justify-center gap-2">
              <ArrowRight className="h-4 w-4 text-innovate-500" />
              Quick Response Time
            </span>
            <span className="flex items-center justify-center gap-2">
              <ArrowRight className="h-4 w-4 text-innovate-500" />
              Expert Consultation
            </span>
            <span className="flex items-center justify-center gap-2">
              <ArrowRight className="h-4 w-4 text-innovate-500" />
              Tailored Solutions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
