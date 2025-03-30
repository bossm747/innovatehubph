
import React from 'react';
import { Link } from 'react-router-dom';
import FooterNavLinks from '@/components/footer/FooterNavLinks';
import FooterContactInfo from '@/components/footer/FooterContactInfo';
import FooterSocialLinks from '@/components/footer/FooterSocialLinks';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-12 md:py-16 px-6 bg-slate-900 text-white relative ${className}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/e057441a1-afb4-4ef6-9528-d2b5677d9842.png" 
                alt="InnovateHub Logo"
                className="h-12 w-auto mr-3"
              />
              <div>
                <h3 className="font-bold text-lg">InnovateHub</h3>
                <p className="text-gray-400 text-sm">Digital Innovation Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering the future with innovative digital solutions for businesses in the Philippines and beyond.
            </p>
            
            <FooterSocialLinks />
          </div>
          
          {/* Quick Links - Now we don't need to pass props as the component has defaults */}
          <FooterNavLinks />
          
          {/* Contact Information */}
          <FooterContactInfo />
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} InnovateHub Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
