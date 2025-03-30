
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import ListItem from './ListItem';

const DesktopNavigation = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="px-3 py-2 text-sm font-medium">
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/about-us" className="px-3 py-2 text-sm font-medium">
            About Us
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem href="/platapay" title="PlataPay">
                Digital wallet, bills payment, remittance, and e-loading services
              </ListItem>
              <ListItem href="/fintech-solutions" title="Fintech Solutions">
                Financial technology solutions for businesses and individuals
              </ListItem>
              <ListItem href="/digital-customizations" title="Digital Customizations">
                Custom software development and business model digitalization
              </ListItem>
              <ListItem href="/ecommerce" title="E-Commerce">
                Online store development and e-commerce integration
              </ListItem>
              <ListItem href="/ai-solutions" title="AI Solutions">
                Artificial intelligence and machine learning services
              </ListItem>
              <ListItem href="/global-expansion" title="Global Expansion">
                International business expansion consulting services
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <ListItem href="/clients" title="Our Clients">
                Businesses and organizations we've helped transform
              </ListItem>
              <ListItem href="/partners" title="Strategic Partners">
                Our technology and business partners
              </ListItem>
              <ListItem href="/platapay-agent" title="Become a PlataPay Agent">
                Join our network of digital financial service providers
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contact-us" className="px-3 py-2 text-sm font-medium">
            Contact Us
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
