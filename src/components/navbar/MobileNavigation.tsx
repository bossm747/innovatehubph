
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-14 z-50 bg-background border-t overflow-auto md:hidden">
      <div className="px-4 py-6 space-y-2">
        <Link 
          to="/" 
          className="block py-3 px-4 rounded-md hover:bg-gray-100" 
          onClick={onClose}
        >
          Home
        </Link>
        
        <Link 
          to="/about-us" 
          className="block py-3 px-4 rounded-md hover:bg-gray-100" 
          onClick={onClose}
        >
          About Us
        </Link>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="services" className="border-0">
            <AccordionTrigger className="py-3 px-4 rounded-md hover:bg-gray-100">
              Services
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4 space-y-2">
                <Link 
                  to="/platapay" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  PlataPay
                </Link>
                <Link 
                  to="/fintech-solutions" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  Fintech Solutions
                </Link>
                <Link 
                  to="/digital-customizations" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  Digital Customizations
                </Link>
                <Link 
                  to="/ecommerce" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  E-Commerce
                </Link>
                <Link 
                  to="/ai-solutions" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  AI Solutions
                </Link>
                <Link 
                  to="/global-expansion" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  Global Expansion
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="partners" className="border-0">
            <AccordionTrigger className="py-3 px-4 rounded-md hover:bg-gray-100">
              Partners
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4 space-y-2">
                <Link 
                  to="/clients" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  Our Clients
                </Link>
                <Link 
                  to="/partners" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100" 
                  onClick={onClose}
                >
                  Strategic Partners
                </Link>
                <Link 
                  to="/platapay-agent" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100 font-medium text-blue-600" 
                  onClick={onClose}
                >
                  Become a PlataPay Agent
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Link 
          to="/contact-us" 
          className="block py-3 px-4 rounded-md hover:bg-gray-100" 
          onClick={onClose}
        >
          Contact Us
        </Link>
        
        <div className="mt-4 pt-4 border-t">
          <Link 
            to="/platapay-agent" 
            className="block py-3 px-4 bg-blue-600 text-white rounded-md text-center font-medium" 
            onClick={onClose}
          >
            Become a PlataPay Agent
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
