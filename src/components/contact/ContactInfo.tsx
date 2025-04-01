
import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactInfo = () => {
  return (
    <div className="space-y-8 fade-up">
      <div className="bg-white p-8 rounded-xl shadow-soft">
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-1">Phone</h3>
              <a href="tel:+639176851216" className="text-gray-600 hover:text-innovate-700 transition-colors">
                +63 917 685 1216
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-1">Email</h3>
              <a href="mailto:businessdevelopment@innovatehub.ph" className="text-gray-600 hover:text-innovate-700 transition-colors">
                businessdevelopment@innovatehub.ph
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-1">Main Office</h3>
              <p className="text-gray-600">RMCL Bldg., New Bypass Rd., Bayanan,</p>
              <p className="text-gray-600">San Pascual, Batangas</p>
              <Button variant="ghost" size="sm" className="mt-2 text-innovate-600 px-0 hover:text-innovate-800 hover:bg-transparent" asChild>
                <a href="https://maps.google.com/?q=RMCL+Bldg.+New+Bypass+Rd.+Bayanan+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Get Directions <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-innovate-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-1">Satellite Office</h3>
              <p className="text-gray-600">Unit 13 InnovateHub Commercial Building,</p>
              <p className="text-gray-600">National Highway, San Antonio, San Pascual Batangas.</p>
              <Button variant="ghost" size="sm" className="mt-2 text-innovate-600 px-0 hover:text-innovate-800 hover:bg-transparent" asChild>
                <a href="https://maps.google.com/?q=InnovateHub+Commercial+Building+National+Highway+San+Antonio+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Get Directions <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-soft">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-innovate-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Office Hours</h3>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-medium">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium">9:00 AM - 3:00 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Sunday</span>
            <span className="font-medium">Closed</span>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden h-64 md:h-80 fade-up">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.321193931947!2d120.9157831!3d14.0634344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd78505318f7d7%3A0x6e5322e2b627e2dc!2sInnovate%20Hub!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="InnovateHub Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
