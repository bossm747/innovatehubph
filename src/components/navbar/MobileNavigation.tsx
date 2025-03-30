
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSubmenu = (menuName: string) => {
    if (expandedMenus.includes(menuName)) {
      setExpandedMenus(expandedMenus.filter(item => item !== menuName));
    } else {
      setExpandedMenus([...expandedMenus, menuName]);
    }
  };

  const isSubmenuExpanded = (menuName: string) => {
    return expandedMenus.includes(menuName);
  };

  return (
    <div className="fixed left-0 top-14 z-50 w-full h-[calc(100vh-3.5rem)] bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur md:hidden overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              About
            </Link>
          </li>
          <li className="py-1">
            <button 
              onClick={() => toggleSubmenu('services')} 
              className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-white/10 rounded-md transition-all duration-200"
            >
              <span className="font-medium">Services</span>
              {isSubmenuExpanded('services') ? (
                <ChevronUp className="h-4 w-4 text-white/70" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/70" />
              )}
            </button>
            {isSubmenuExpanded('services') && (
              <ul className="pl-4 space-y-1 mt-1">
                <li>
                  <Link to="/services" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    All Services
                  </Link>
                </li>
                <li>
                  <Link to="/fintech-solutions" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    Fintech Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/digital-customizations" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    Digital Customizations
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    E-commerce Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/ai-solutions" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/global-expansion" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    Global Expansion
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/partners" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Partners
            </Link>
          </li>
          <li>
            <Link to="/team" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/blog" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/clients" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Clients
            </Link>
          </li>
          <li className="py-1">
            <button 
              onClick={() => toggleSubmenu('ai-resources')}
              className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-white/10 rounded-md transition-all duration-200"
            >
              <span className="font-medium">AI Resources</span>
              {isSubmenuExpanded('ai-resources') ? (
                <ChevronUp className="h-4 w-4 text-white/70" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/70" />
              )}
            </button>
            {isSubmenuExpanded('ai-resources') && (
              <ul className="pl-4 space-y-1 mt-1">
                <li>
                  <Link to="/ai-tools" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link to="/ai-image-processing" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Image Processing
                  </Link>
                </li>
                <li>
                  <Link to="/ai-apps-management" className="block py-1.5 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Apps Management
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/contact" className="block py-2 px-4 text-white hover:bg-white/10 rounded-md transition-all duration-200" onClick={onClose}>
              Contact
            </Link>
          </li>
          <li className="mt-4">
            <Link 
              to="https://app.platapay.ph" 
              className="block w-full py-2 px-4 text-center bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-all duration-200 shadow-md" 
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
