
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCog, Settings, Database, Layers, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AdminPortal = () => {
  const { user, session, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [profileData, setProfileData] = useState({
    full_name: '',
    position: '',
    department: '',
    avatar_url: ''
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['admin-profile', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        position: profile.position || '',
        department: profile.department || '',
        avatar_url: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('admin_profiles')
        .update({
          full_name: profileData.full_name,
          position: profileData.position,
          department: profileData.department,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
      
      if (error) throw error;
      return profileData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile', user?.id] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(`Error updating profile: ${error.message}`);
    }
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user || !session) {
    navigate('/admin');
    return null;
  }

  const getInitials = (name: string) => {
    if (!name) return 'IH';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const getEmailName = (email: string) => {
    return email.split('@')[0].replace(/\./g, ' ').replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal - InnovateHub</title>
        <meta name="description" content="InnovateHub admin portal for team members" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground mb-8">Welcome to the InnovateHub admin portal</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={profileData.avatar_url} />
                      <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                        {getInitials(profileData.full_name || getEmailName(user.email || ''))}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{profileData.full_name || getEmailName(user.email || '')}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.position && (
                      <div>
                        <p className="text-sm text-muted-foreground">Position</p>
                        <p className="font-medium">{profileData.position}</p>
                      </div>
                    )}
                    
                    {profileData.department && (
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{profileData.department}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/admin/ai-tools')}
                  >
                    <Layers className="mr-2 h-4 w-4" />
                    AI Tools
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Management</CardTitle>
                  <CardDescription>Update your admin profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile">
                    <TabsList className="mb-4">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile">
                      <form onSubmit={handleUpdateProfile}>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <Input 
                              value={profileData.full_name} 
                              onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Position</label>
                            <Input 
                              value={profileData.position} 
                              onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                              className="mt-1"
                              placeholder="e.g. Software Developer"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Department</label>
                            <Input 
                              value={profileData.department} 
                              onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                              className="mt-1"
                              placeholder="e.g. Engineering"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Avatar URL</label>
                            <Input 
                              value={profileData.avatar_url} 
                              onChange={(e) => setProfileData({...profileData, avatar_url: e.target.value})}
                              className="mt-1"
                              placeholder="https://example.com/avatar.jpg"
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="settings">
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Email Notifications
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-3">
                            Manage your email notification preferences
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input type="checkbox" id="notify-inquiries" className="mr-2" defaultChecked />
                              <label htmlFor="notify-inquiries" className="text-sm">New client inquiries</label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="notify-projects" className="mr-2" defaultChecked />
                              <label htmlFor="notify-projects" className="text-sm">Project updates</label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="notify-system" className="mr-2" defaultChecked />
                              <label htmlFor="notify-system" className="text-sm">System announcements</label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium flex items-center">
                            <UserCog className="h-4 w-4 mr-2" />
                            Account Settings
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-3">
                            Manage your account security and preferences
                          </p>
                          
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start text-sm">
                              Change Password
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start text-sm">
                              Two-Factor Authentication
                            </Button>
                          </div>
                        </div>
                        
                        <Button className="w-full">Save Settings</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AdminPortal;
