
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Menu as MenuIcon,
  Database,
  Globe,
  Palette,
} from 'lucide-react';

interface BackofficeNavigationProps {
  children: React.ReactNode;
}

const BackofficeNavigation: React.FC<BackofficeNavigationProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <SidebarProvider defaultWidth={280} defaultCollapsed={false} collapsedWidth={64}>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="h-14 flex items-center px-4 border-b">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/e0b50f3f-fb7b-4832-8041-8c82e7f630ad.png" 
                alt="InnovateHub Logo" 
                className="h-8 w-8 mr-2"
              />
              <span className="text-lg font-semibold">Admin Dashboard</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname === '/admin/dashboard'}>
                      <Link to="/admin/dashboard" className="flex items-center">
                        <LayoutDashboard className="h-4 w-4 mr-3" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname.startsWith('/admin/content')}>
                      <Link to="/admin/content" className="flex items-center">
                        <FileText className="h-4 w-4 mr-3" />
                        <span>Content Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Configuration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname === '/admin/navigation'}>
                      <Link to="/admin/navigation" className="flex items-center">
                        <MenuIcon className="h-4 w-4 mr-3" />
                        <span>Navigation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname === '/admin/design'}>
                      <Link to="/admin/design" className="flex items-center">
                        <Palette className="h-4 w-4 mr-3" />
                        <span>Design Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname === '/admin/database'}>
                      <Link to="/admin/database" className="flex items-center">
                        <Database className="h-4 w-4 mr-3" />
                        <span>Database</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>User Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname === '/admin/users'}>
                      <Link to="/admin/users" className="flex items-center">
                        <Users className="h-4 w-4 mr-3" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild active={location.pathname === '/admin/settings'}>
                      <Link to="/admin/settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-3" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <div className="flex flex-col gap-2">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span>View Website</span>
              </a>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 border-b flex items-center px-4 justify-between">
            <SidebarTrigger />
            <div className="flex items-center space-x-4">
              {/* AdminPortalButton removed */}
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BackofficeNavigation;
