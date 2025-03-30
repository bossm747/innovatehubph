
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import ListItem from './ListItem';
import NavItem from './NavItem';

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      <div className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavItem to="/">Home</NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem to="/about">About</NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/services" title="All Services">
                    Overview of our complete service offerings
                  </ListItem>
                  <ListItem href="/platapay" title="Fintech Solutions">
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
              <NavItem to="/contact">Contact</NavItem>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
