
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileNavigation from './navbar/MobileNavigation';
import DesktopNavigation from './navbar/DesktopNavigation';

const Navbar = () => {
  // Using React.useState instead of the direct hook import
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Using React.useEffect instead of the direct hook import
  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'} transition-all duration-200`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/e0b50f3f-fb7b-4832-8041-8c82e7f630ad.png" 
              alt="InnovateHub Logo" 
              className="h-8 w-8 mr-2"
            />
            <span className="font-bold text-lg">InnovateHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation />
        
        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </Button>
        </div>
        
        {/* Contact Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileNavigation isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
    </header>
  );
};

export default Navbar;
