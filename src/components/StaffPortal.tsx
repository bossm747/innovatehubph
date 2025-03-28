
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStaffAuth } from '@/contexts/StaffAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAvailableSecrets } from '@/contexts/AvailableSecretsContext';
import { LogOut, User, Settings, Clock, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';

interface StaffProfile {
  id: string;
  full_name: string | null;
  position: string | null;
  department: string | null;
  avatar_url: string | null;
}

const StaffPortal = () => {
  const { user, signOut } = useStaffAuth();
  const { availableSecrets } = useAvailableSecrets();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    department: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/team');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('staff_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          position: data.position || '',
          department: data.department || ''
        });
      } catch (error) {
        console.error('Error fetching staff profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('staff_profiles')
        .update({
          full_name: formData.full_name,
          position: formData.position,
          department: formData.department,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? {
        ...prev,
        full_name: formData.full_name,
        position: formData.position,
        department: formData.department
      } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-innovate-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <Helmet>
        <title>Staff Portal | InnovateHub</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Staff Portal</h1>
          <p className="text-gray-600">Welcome back, {profile?.full_name || user?.email?.split('@')[0]}</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={() => signOut().then(() => navigate('/team'))}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-innovate-600" />
                  Staff Profile
                </div>
              </CardTitle>
              <CardDescription>View and update your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input value={user?.email || ''} disabled className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Position</label>
                <Input 
                  name="position" 
                  value={formData.position} 
                  onChange={handleInputChange}
                  placeholder="Your position at InnovateHub"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Department</label>
                <Input 
                  name="department" 
                  value={formData.department} 
                  onChange={handleInputChange}
                  placeholder="Your department"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleUpdateProfile} 
                className="w-full bg-innovate-600 hover:bg-innovate-700"
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="tools">
            <TabsList className="w-full">
              <TabsTrigger value="tools" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Tools & Resources
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1">
                <Briefcase className="h-4 w-4 mr-2" />
                AI Projects
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">
                <Clock className="h-4 w-4 mr-2" />
                Recent Activity
              </TabsTrigger>
            </TabsList>
            
            {/* Tools & Resources Tab */}
            <TabsContent value="tools" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available AI Tools</CardTitle>
                  <CardDescription>AI integrations configured for your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(availableSecrets).map(([key, isAvailable]) => (
                      <div key={key} className={`p-4 rounded-lg border ${isAvailable ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{key.replace('_API_KEY', '')}</div>
                          <div className={`px-2 py-1 rounded-full text-xs ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                            {isAvailable ? 'Available' : 'Not Available'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate('/admin/ai-tools')}
                  >
                    Go to AI Tools Management
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* AI Projects Tab */}
            <TabsContent value="ai" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Projects</CardTitle>
                  <CardDescription>View and manage your AI projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500">Access the AI Tools Management panel to view your projects</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-innovate-600 hover:bg-innovate-700" 
                    onClick={() => navigate('/admin/ai-tools')}
                  >
                    Go to AI Projects
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Recent Activity Tab */}
            <TabsContent value="recent" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500">Activity tracking will be available soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StaffPortal;
