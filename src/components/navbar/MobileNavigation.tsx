
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
    <div className="fixed left-0 top-14 z-50 w-full h-[calc(100vh-3.5rem)] bg-white shadow-lg overflow-y-auto md:hidden">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
              Home
            </Link>
          </li>
          
          <li>
            <Link to="/about" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
              About
            </Link>
          </li>
          
          {/* Services Submenu */}
          <li className="py-1">
            <button 
              onClick={() => toggleSubmenu('services')} 
              className="flex items-center justify-between w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              <span className="font-medium">Services</span>
              {isSubmenuExpanded('services') ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </button>
            {isSubmenuExpanded('services') && (
              <ul className="pl-4 space-y-1 mt-1">
                <li>
                  <Link to="/all-services" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    All Services
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Service Categories
                  </Link>
                </li>
                <li>
                  <Link to="/fintech-solutions" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Fintech Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/digital-customizations" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Digital Customizations
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    E-commerce Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/ai-solutions" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/global-expansion" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Global Expansion
                  </Link>
                </li>
                <li>
                  <Link to="/mobile-app-development" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Mobile App Development
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* Company Submenu */}
          <li className="py-1">
            <button 
              onClick={() => toggleSubmenu('company')} 
              className="flex items-center justify-between w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              <span className="font-medium">Company</span>
              {isSubmenuExpanded('company') ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </button>
            {isSubmenuExpanded('company') && (
              <ul className="pl-4 space-y-1 mt-1">
                <li>
                  <Link to="/team" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link to="/clients" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Clients
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Partners
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Blog
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* Resources Submenu */}
          <li className="py-1">
            <button 
              onClick={() => toggleSubmenu('resources')}
              className="flex items-center justify-between w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              <span className="font-medium">Resources</span>
              {isSubmenuExpanded('resources') ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </button>
            {isSubmenuExpanded('resources') && (
              <ul className="pl-4 space-y-1 mt-1">
                <li>
                  <Link to="/ai-tools" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link to="/ai-image-processing" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Image Processing
                  </Link>
                </li>
                <li>
                  <Link to="/ai-apps-management" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    AI Apps Management
                  </Link>
                </li>
                <li>
                  <Link to="/file-upload" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    File Upload
                  </Link>
                </li>
                <li>
                  <Link to="/facebook" className="block py-1.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
                    Facebook
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <Link to="/contact" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200" onClick={onClose}>
              Contact
            </Link>
          </li>
          
          <li className="mt-4">
            <Link 
              to="/admin/dashboard" 
              className="block w-full py-2 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 shadow-md" 
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
