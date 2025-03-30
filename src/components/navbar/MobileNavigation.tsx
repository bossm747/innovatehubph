
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-14 z-50 w-full bg-background/95 backdrop-blur md:hidden">
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block py-2" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2" onClick={onClose}>
              About
            </Link>
          </li>
          <li className="py-2">
            <p className="font-medium mb-2">Services</p>
            <ul className="pl-4 space-y-2">
              <li>
                <Link to="/services" className="block py-1" onClick={onClose}>
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/platapay" className="block py-1" onClick={onClose}>
                  Fintech Solutions
                </Link>
              </li>
              <li>
                <Link to="/digital-customizations" className="block py-1" onClick={onClose}>
                  Digital Customizations
                </Link>
              </li>
              <li>
                <Link to="/ecommerce" className="block py-1" onClick={onClose}>
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link to="/ai-solutions" className="block py-1" onClick={onClose}>
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/global-expansion" className="block py-1" onClick={onClose}>
                  Global Expansion
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/team" className="block py-2" onClick={onClose}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/blog" className="block py-2" onClick={onClose}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/clients" className="block py-2" onClick={onClose}>
              Clients
            </Link>
          </li>
          <li className="py-2">
            <p className="font-medium mb-2">AI Resources</p>
            <ul className="pl-4 space-y-2">
              <li>
                <Link to="/ai-tools" className="block py-1" onClick={onClose}>
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/ai-image-processing" className="block py-1" onClick={onClose}>
                  AI Image Processing
                </Link>
              </li>
              <li>
                <Link to="/ai-apps-management" className="block py-1" onClick={onClose}>
                  AI Apps Management
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className="block py-2" onClick={onClose}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
