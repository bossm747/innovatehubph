
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

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
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, path: "https://facebook.com/platapayinc", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, path: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, path: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, path: "https://linkedin.com", label: "LinkedIn" },
  ];
  
  const contactInfo = [
    { 
      icon: <MapPin className="h-5 w-5 text-innovate-500" />, 
      text: "RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas",
      href: "https://maps.google.com/?q=RMCL+Bldg.,+New+Bypass+Rd.,+Bayanan,+San+Pascual,+Batangas"
    },
    { 
      icon: <Phone className="h-5 w-5 text-innovate-500" />, 
      text: "+63 917 685 1216",
      href: "tel:+639176851216" 
    },
    { 
      icon: <Mail className="h-5 w-5 text-innovate-500" />, 
      text: "businessdevelopment@innovatehub.ph",
      href: "mailto:businessdevelopment@innovatehub.ph" 
    },
    { 
      icon: <MessageCircle className="h-5 w-5 text-innovate-500" />, 
      text: "Chat with us on Facebook",
      href: "https://m.me/platapayinc" 
    },
  ];

  return (
    <footer className="bg-black pt-20 pb-8 relative overflow-hidden text-white">
      {/* Background shapes - more subtle in dark theme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-800 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
      
      <div className="container-fluid mx-0 px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
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
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white transition-all"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-innovate-400 flex items-center group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 mr-2 text-innovate-500 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-innovate-400 flex items-center group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 mr-2 text-innovate-500 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a 
                    href={info.href} 
                    className="flex group"
                    target={info.href.startsWith('http') ? "_blank" : undefined}
                    rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  >
                    <span className="flex-shrink-0 mt-1">{info.icon}</span>
                    <span className="ml-3 text-gray-300 group-hover:text-innovate-400">{info.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center md:flex justify-between items-center">
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
