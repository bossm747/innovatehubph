
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  Database, 
  Users, 
  Layers, 
  Settings, 
  LayoutDashboard,
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserManagement from "@/components/admin/UserManagement";
import DatabaseManagement from "@/components/admin/DatabaseManagement";
import AdminAIManagement from "@/components/admin/AdminAIManagement";
import AdminOverview from "@/components/admin/AdminOverview";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - InnovateHub</title>
        <meta name="description" content="Admin dashboard for InnovateHub staff to manage the system." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50">
        <SidebarProvider>
          <div className="flex w-full min-h-[calc(100vh-4rem)]">
            <Sidebar>
              <SidebarHeader className="border-b py-4">
                <div className="flex flex-col items-center gap-2 px-4">
                  <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                  <p className="text-xs text-gray-500">Staff Portal</p>
                </div>
              </SidebarHeader>
              
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Management</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("overview")} 
                        isActive={activeTab === "overview"}
                        tooltip="Dashboard Overview"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("users")} 
                        isActive={activeTab === "users"}
                        tooltip="User Management"
                      >
                        <Users className="h-4 w-4" />
                        <span>Users</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("database")} 
                        isActive={activeTab === "database"}
                        tooltip="Database Management"
                      >
                        <Database className="h-4 w-4" />
                        <span>Database</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("ai")} 
                        isActive={activeTab === "ai"}
                        tooltip="AI Management"
                      >
                        <Layers className="h-4 w-4" />
                        <span>AI Management</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                
                <SidebarGroup>
                  <SidebarGroupLabel>System</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("settings")} 
                        isActive={activeTab === "settings"}
                        tooltip="Settings"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
              
              <SidebarFooter className="border-t mt-auto py-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sign Out</span>
                </Button>
              </SidebarFooter>
            </Sidebar>
            
            <SidebarInset className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">
                    {activeTab === "overview" && "Dashboard Overview"}
                    {activeTab === "users" && "User Management"}
                    {activeTab === "database" && "Database Management"}
                    {activeTab === "ai" && "AI Management"}
                    {activeTab === "settings" && "System Settings"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {activeTab === "overview" && "Overview of the system and key metrics"}
                    {activeTab === "users" && "Manage user accounts and permissions"}
                    {activeTab === "database" && "Manage database tables and records"}
                    {activeTab === "ai" && "Manage AI projects and resources"}
                    {activeTab === "settings" && "System configuration and settings"}
                  </p>
                </div>
                <SidebarTrigger />
              </div>
              
              {activeTab === "overview" && <AdminOverview />}
              {activeTab === "users" && <UserManagement />}
              {activeTab === "database" && <DatabaseManagement />}
              {activeTab === "ai" && <AdminAIManagement />}
              {activeTab === "settings" && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                  <p className="text-gray-500">
                    System settings configuration will be implemented in a future update.
                  </p>
                </div>
              )}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </main>
      
      <Footer />
    </>
  );
};

export default AdminDashboardPage;
