
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-14 z-50 w-full h-[calc(100vh-3.5rem)] bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur md:hidden overflow-y-auto">
      <nav className="p-6">
        <ul className="space-y-5">
          <li>
            <Link to="/" className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              About
            </Link>
          </li>
          <li className="py-3">
            <p className="font-medium mb-3 px-4 text-purple-300">Services</p>
            <ul className="pl-4 space-y-3">
              <li>
                <Link to="/services" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/fintech-solutions" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  Fintech Solutions
                </Link>
              </li>
              <li>
                <Link to="/digital-customizations" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  Digital Customizations
                </Link>
              </li>
              <li>
                <Link to="/ecommerce" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link to="/ai-solutions" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/global-expansion" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  Global Expansion
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/team" className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/blog" className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/clients" className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Clients
            </Link>
          </li>
          <li className="py-3">
            <p className="font-medium mb-3 px-4 text-purple-300">AI Resources</p>
            <ul className="pl-4 space-y-3">
              <li>
                <Link to="/ai-tools" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/ai-image-processing" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  AI Image Processing
                </Link>
              </li>
              <li>
                <Link to="/ai-apps-management" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                  AI Apps Management
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Contact
            </Link>
          </li>
          <li className="mt-6">
            <Link 
              to="https://app.platapay.ph" 
              className="block w-full py-3 px-4 text-center bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-all duration-200 shadow-md" 
              onClick={onClose}
            >
              Admin Portal
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
