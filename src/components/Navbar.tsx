
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarLogo from './navbar/NavbarLogo';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';
import MobileMenuToggle from './navbar/MobileMenuToggle';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <NavbarLogo />
          <DesktopNavigation />
        </div>

        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </div>
      </div>

      <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Navbar;
