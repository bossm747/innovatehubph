
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminProfileForm from './AdminProfileForm';
import AdminSettingsTab from './AdminSettingsTab';

interface ProfileData {
  full_name: string;
  position: string;
  department: string;
  avatar_url: string;
}

interface AdminProfileTabsProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const AdminProfileTabs: React.FC<AdminProfileTabsProps> = ({ profileData, setProfileData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Management</CardTitle>
        <CardDescription>Update your admin profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 w-full grid grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <AdminProfileForm profileData={profileData} setProfileData={setProfileData} />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettingsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminProfileTabs;
