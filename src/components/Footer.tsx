
import React from 'react';
import { Link } from 'react-router-dom';
import FooterSocialLinks from './footer/FooterSocialLinks';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavLinks from './footer/FooterNavLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const serviceLinks = [
    { name: "All Services", path: "/services" },
    { name: "PlataPay", path: "/platapay" },
    { name: "Digital Customizations", path: "/digital-customizations" },
    { name: "E-Commerce Development", path: "/ecommerce" },
    { name: "AI Solutions", path: "/ai-solutions" },
    { name: "Global Expansion", path: "/global-expansion" },
  ];
  
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Clients", path: "/clients" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-black pt-20 relative overflow-hidden text-white w-full m-0 p-0 max-w-[100vw]">
      {/* Background shapes - more subtle in dark theme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-800 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
      
      <div className="w-full m-0 p-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-6 md:px-12">
          {/* Company Info & Social */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/e0b50f3f-fb7b-4832-8041-8c82e7f630ad.png" 
                alt="InnovateHub Logo" 
                className="h-10 w-10 mr-3"
              />
              <span className="text-xl font-display font-bold text-white">Innovate<span className="text-innovate-500">Hub</span></span>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering businesses through innovative digital solutions and financial technology. From custom software to global expansion, we bring your vision to life.
            </p>
            <FooterSocialLinks />
          </div>
          
          {/* Services Links */}
          <FooterNavLinks title="Our Services" links={serviceLinks} />
          
          {/* Quick Links */}
          <FooterNavLinks title="Quick Links" links={quickLinks} />
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <FooterContactInfo />
          </div>
        </div>
        
        {/* Copyright and Policy Links */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex justify-between items-center px-6 md:px-12 pb-8">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} InnovateHub Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-6 justify-center md:justify-end text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-innovate-400">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-innovate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
