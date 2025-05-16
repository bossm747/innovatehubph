
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger
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
                  <ListItem href="/all-services" title="All Services">
                    Overview of our complete service offerings
                  </ListItem>
                  <ListItem href="/services" title="Service Categories">
                    Explore our services by category
                  </ListItem>
                  <ListItem href="/fintech-solutions" title="Fintech Solutions">
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
                  <ListItem href="/mobile-app-development" title="Mobile App Development">
                    Custom mobile applications for iOS and Android
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/clients" title="Clients">
                    Discover the businesses we've helped transform
                  </ListItem>
                  <ListItem href="/partners" title="Partners">
                    Our strategic technology and business partners
                  </ListItem>
                  <ListItem href="/blog" title="Blog">
                    Latest insights and industry news
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/ai-tools" title="AI Tools">
                    Productivity tools powered by AI
                  </ListItem>
                  <ListItem href="/ai-image-processing" title="AI Image Processing">
                    Generate & process images with AI
                  </ListItem>
                  <ListItem href="/ai-apps-management" title="AI Apps Management">
                    Manage AI resources and projects
                  </ListItem>
                  <ListItem href="/file-upload" title="File Upload">
                    Upload and manage your files
                  </ListItem>
                  <ListItem href="/facebook" title="Facebook">
                    Connect with us on Facebook
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
