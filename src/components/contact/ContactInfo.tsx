
import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Globe, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactInfo = () => {
  return (
    <div className="space-y-8 fade-up">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
          <Building className="mr-2 h-5 w-5 text-innovate-600" />
          Contact Information
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Phone</h3>
              <a href="tel:+639176851216" className="text-gray-600 hover:text-innovate-700 transition-colors flex items-center group">
                +63 917 685 1216
                <span className="inline-block ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="h-3.5 w-3.5 text-innovate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Email</h3>
              <a href="mailto:businessdevelopment@innovatehub.ph" className="text-gray-600 hover:text-innovate-700 transition-colors flex items-center group">
                businessdevelopment@innovatehub.ph
                <span className="inline-block ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="h-3.5 w-3.5 text-innovate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Website</h3>
              <a href="https://innovatehub.ph" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-innovate-700 transition-colors flex items-center group">
                innovatehub.ph
                <span className="inline-block ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="h-3.5 w-3.5 text-innovate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-innovate-600" />
          Office Locations
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Main Office</h4>
            <p className="text-gray-600">RMCL Bldg., New Bypass Rd., Bayanan,</p>
            <p className="text-gray-600 mb-2">San Pascual, Batangas</p>
            <Button variant="ghost" size="sm" className="text-innovate-600 px-0 hover:text-innovate-800 hover:bg-transparent" asChild>
              <a href="https://maps.google.com/?q=RMCL+Bldg.+New+Bypass+Rd.+Bayanan+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 group">
                Get Directions 
                <span className="inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </span>
              </a>
            </Button>
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-semibold text-gray-800 mb-2">Satellite Office</h4>
            <p className="text-gray-600">Unit 13 InnovateHub Commercial Building,</p>
            <p className="text-gray-600 mb-2">National Highway, San Antonio, San Pascual Batangas.</p>
            <Button variant="ghost" size="sm" className="text-innovate-600 px-0 hover:text-innovate-800 hover:bg-transparent" asChild>
              <a href="https://maps.google.com/?q=InnovateHub+Commercial+Building+National+Highway+San+Antonio+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 group">
                Get Directions 
                <span className="inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-innovate-600" />
          Business Hours
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-700 font-medium">Monday - Friday</span>
            <span className="font-medium text-innovate-700">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-700 font-medium">Saturday</span>
            <span className="font-medium text-innovate-700">9:00 AM - 3:00 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Sunday</span>
            <span className="font-medium text-innovate-600">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
