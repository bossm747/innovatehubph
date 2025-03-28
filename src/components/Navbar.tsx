import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import StaffPortalButton from './StaffPortalButton';

interface ListItemProps {
  href: string;
  title: string;
  children?: React.ReactNode;
}

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
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              InnovateHub
            </span>
          </a>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem href="/services/digital-customizations" title="Digital Customizations">
                          Crafting bespoke digital solutions for unique business needs.
                        </ListItem>
                        <ListItem href="/services/ecommerce" title="E-commerce Solutions">
                          Building and scaling online retail experiences.
                        </ListItem>
                        <ListItem href="/services/ai-solutions" title="AI Solutions">
                          Leveraging artificial intelligence to drive innovation.
                        </ListItem>
                        <ListItem href="/services/global-expansion" title="Global Expansion">
                          Strategies for businesses venturing into new markets.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem href="/blog" title="Blog">
                          News and articles from our team
                        </ListItem>
                        <ListItem href="/clients" title="Clients">
                          Our valued clients and partnerships
                        </ListItem>
                        <ListItem href="/ai-tools" title="AI Tools">
                          Productivity tools powered by AI
                        </ListItem>
                        <ListItem href="/ai-image-processing" title="AI Image Processing">
                          Generate & process images with AI
                        </ListItem>
                        <ListItem href="/ai-apps-management" title="AI Apps Management">
                          Manage AI resources and projects
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contact" className={navigationMenuTriggerStyle()}>
                      Contact
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <StaffPortalButton />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed left-0 top-14 z-50 w-full bg-background/95 backdrop-blur md:hidden">
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <Link to="/" className="block py-2" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2" onClick={closeMobileMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="block py-2" onClick={closeMobileMenu}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2" onClick={closeMobileMenu}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block py-2" onClick={closeMobileMenu}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/clients" className="block py-2" onClick={closeMobileMenu}>
                  Clients
                </Link>
              </li>
              <li>
                <Link to="/ai-tools" className="block py-2" onClick={closeMobileMenu}>
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/ai-image-processing" className="block py-2" onClick={closeMobileMenu}>
                  AI Image Processing
                </Link>
              </li>
              <li>
                <Link to="/ai-apps-management" className="block py-2" onClick={closeMobileMenu}>
                  AI Apps Management
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ href, title, children, ...props }, ref) => {
    return (
      <li>
        <Link
          to={href}
          ref={ref}
          className="group flex cursor-pointer select-none items-center rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="mr-2 h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3.75 3a.75.75 0 00-.75.75v15.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75H3.75zM3 2.25a1.5 1.5 0 011.5-1.5h16.5a1.5 1.5 0 011.5 1.5v15.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V2.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M7.572 7.572a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06L9.811 10.5l-2.24-2.24a.75.75 0 010-1.06zM16.428 7.572a.75.75 0 00-1.06 0l-2.25 2.25a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L14.189 10.5l2.24-2.24a.75.75 0 000-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span>{title}</span>
        </Link>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export default Navbar;
