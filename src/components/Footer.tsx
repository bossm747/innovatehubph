
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavLinks from './footer/FooterNavLinks';
import FooterSocialLinks from './footer/FooterSocialLinks';
import NewsletterSubscription from './NewsletterSubscription';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div>
            <Link to="/">
              <img 
                src="/logo.svg" 
                alt="InnovateHub Logo" 
                className="h-10 mb-6" 
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              InnovateHub Inc. is a leading provider of customized fintech, AI, and e-commerce 
              solutions empowering businesses across the Philippines and beyond.
            </p>
            <FooterContactInfo />
          </div>
          
          <div className="col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <FooterNavLinks />
              </div>
              <div>
                <NewsletterSubscription variant="footer" />
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} InnovateHub Inc. All rights reserved.
            </p>
          </div>
          <div>
            <FooterSocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
