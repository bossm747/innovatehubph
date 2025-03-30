
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import AdminPortalButton from './AdminPortalButton';

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
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <img 
              src="/lovable-uploads/e0b50f3f-fb7b-4832-8041-8c82e7f630ad.png" 
              alt="InnovateHub Logo" 
              className="h-8 w-8 mr-2"
            />
            <span className="font-bold text-innovate-800">
              InnovateHub
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <div className="flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem href="/services" title="All Services">
                          Overview of our complete service offerings
                        </ListItem>
                        <ListItem href="/platapay" title="PlataPay">
                          Digital wallet and financial solutions
                        </ListItem>
                        <ListItem href="/digital-customizations" title="Digital Customizations">
                          Crafting bespoke digital solutions for unique business needs
                        </ListItem>
                        <ListItem href="/ecommerce" title="E-commerce Solutions">
                          Building and scaling online retail experiences
                        </ListItem>
                        <ListItem href="/ai-solutions" title="AI Solutions">
                          Leveraging artificial intelligence to drive innovation
                        </ListItem>
                        <ListItem href="/global-expansion" title="Global Expansion">
                          Strategies for businesses venturing into new markets
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem href="/team" title="Our Team">
                          Meet the dedicated professionals behind InnovateHub
                        </ListItem>
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
                    <Link to="/contact" className={navigationMenuTriggerStyle()}>
                      Contact
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <AdminPortalButton />
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="focus:outline-none" aria-label="Toggle Menu">
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
        </div>
      </div>

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
              <li className="py-2">
                <p className="font-medium mb-2">Services</p>
                <ul className="pl-4 space-y-2">
                  <li>
                    <Link to="/services" className="block py-1" onClick={closeMobileMenu}>
                      All Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/platapay" className="block py-1" onClick={closeMobileMenu}>
                      PlataPay
                    </Link>
                  </li>
                  <li>
                    <Link to="/digital-customizations" className="block py-1" onClick={closeMobileMenu}>
                      Digital Customizations
                    </Link>
                  </li>
                  <li>
                    <Link to="/ecommerce" className="block py-1" onClick={closeMobileMenu}>
                      E-commerce Solutions
                    </Link>
                  </li>
                  <li>
                    <Link to="/ai-solutions" className="block py-1" onClick={closeMobileMenu}>
                      AI Solutions
                    </Link>
                  </li>
                  <li>
                    <Link to="/global-expansion" className="block py-1" onClick={closeMobileMenu}>
                      Global Expansion
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/team" className="block py-2" onClick={closeMobileMenu}>
                  Our Team
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
              <li className="py-2">
                <p className="font-medium mb-2">AI Resources</p>
                <ul className="pl-4 space-y-2">
                  <li>
                    <Link to="/ai-tools" className="block py-1" onClick={closeMobileMenu}>
                      AI Tools
                    </Link>
                  </li>
                  <li>
                    <Link to="/ai-image-processing" className="block py-1" onClick={closeMobileMenu}>
                      AI Image Processing
                    </Link>
                  </li>
                  <li>
                    <Link to="/ai-apps-management" className="block py-1" onClick={closeMobileMenu}>
                      AI Apps Management
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/contact" className="block py-2" onClick={closeMobileMenu}>
                  Contact
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
