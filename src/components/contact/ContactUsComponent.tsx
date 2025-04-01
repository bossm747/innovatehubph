
import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactUsComponent = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-innovate-600 to-blue-600 py-4 px-6">
        <h3 className="text-xl font-bold text-white">Contact Us</h3>
        <p className="text-innovate-100 text-sm">We're here to help with any questions</p>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-innovate-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="h-4 w-4 text-innovate-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Call Us</p>
            <a href="tel:+639176851216" className="text-gray-800 font-medium hover:text-innovate-600 transition-colors">
              +63 917 685 1216
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-innovate-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="h-4 w-4 text-innovate-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a href="mailto:businessdevelopment@innovatehub.ph" className="text-gray-800 font-medium hover:text-innovate-600 transition-colors">
              businessdevelopment@innovatehub.ph
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-innovate-50 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="h-4 w-4 text-innovate-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Office Location</p>
            <p className="text-gray-800 font-medium">RMCL Bldg., New Bypass Rd., Batangas</p>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4 bg-innovate-600 hover:bg-innovate-700 text-white"
          asChild
        >
          <a href="https://maps.google.com/?q=RMCL+Bldg.+New+Bypass+Rd.+Bayanan+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Get Directions 
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ContactUsComponent;
