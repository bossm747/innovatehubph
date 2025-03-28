
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "PlataPay", href: "/platapay" },
    { label: "Team", href: "/team" },
    { label: "Clients", href: "/clients" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const serviceItems = [
    { label: "All Services", href: "/services" },
    { label: "PlataPay", href: "/platapay" },
    { label: "Digital Customizations", href: "/digital-customizations" },
    { label: "E-Commerce Development", href: "/ecommerce" },
    { label: "AI Solutions", href: "/ai-solutions" },
    { label: "Global Expansion", href: "/global-expansion" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top torn paper edge */}
      <div className="absolute top-0 left-0 right-0 w-full h-[20px] z-10 overflow-hidden">
        <img 
          src="/lovable-uploads/8ef1d03e-5dce-43b2-a2c5-d5ec95c0751c.png" 
          alt="Decorative paper edge top" 
          className="w-full object-cover"
        />
      </div>
      
      <div className={`relative ${
        isScrolled 
          ? 'py-3 bg-white/95 backdrop-blur-lg shadow-sm mt-[18px]' 
          : 'py-5 bg-white/80 backdrop-blur-sm mt-[18px]'
      }`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-innovate-100/40 to-innovate-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300 scale-110 group-hover:scale-125"></div>
              <div className="absolute inset-0 bg-white/30 rounded-full filter blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img 
                src="/lovable-uploads/e0b50f3f-fb7b-4832-8041-8c82e7f630ad.png" 
                alt="InnovateHub Logo" 
                className="h-14 w-14 mr-3 relative z-10 transition-transform duration-300 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))' }}
              />
            </div>
            <span className="text-2xl font-display font-bold text-innovate-800 tracking-tight">Innovate<span className="text-innovate-500">Hub</span></span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {menuItems.map((item, index) => (
                item.label !== "Services" ? (
                  <Link key={index} to={item.href} className="nav-link">{item.label}</Link>
                ) : null
              ))}
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0">
                      <span className="nav-link flex items-center">
                        Services <ChevronDown className="ml-1 h-4 w-4" />
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-2 rounded-md shadow-lg border border-gray-100 min-w-[220px]">
                      <ul className="grid gap-1 p-2">
                        {serviceItems.map((service, idx) => (
                          <li key={idx}>
                            <NavigationMenuLink asChild>
                              <Link 
                                to={service.href} 
                                className="block p-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                              >
                                {service.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <Button 
              className="bg-innovate-600 hover:bg-innovate-700 text-white rounded-md px-6 py-2 transition-all btn-shine" 
              asChild
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-innovate-800"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Bottom torn paper edge */}
        <div className="absolute bottom-[-15px] left-0 right-0 w-full h-[20px] z-10 overflow-hidden">
          <img 
            src="/lovable-uploads/bee67e8b-b334-443e-b91a-9eb641ad0db4.png" 
            alt="Decorative paper edge bottom" 
            className="w-full object-cover transform rotate-180"
          />
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
      }`}>
        <nav className="flex flex-col space-y-4 px-6">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.href} className="py-2 nav-link" onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center py-2 nav-link">
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              {serviceItems.map((service, idx) => (
                <DropdownMenuItem key={idx} asChild>
                  <Link 
                    to={service.href} 
                    className="w-full" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {service.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="bg-innovate-600 hover:bg-innovate-700 text-white w-full mt-2" 
            onClick={() => setIsMobileMenuOpen(false)}
            asChild
          >
            <Link to="/contact" className="w-full text-center">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
