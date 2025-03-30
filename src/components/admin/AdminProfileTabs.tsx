
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProfileForm from './AdminProfileForm';
import AdminSettingsTab from './AdminSettingsTab';
import { CalendarIcon, UserIcon, SettingsIcon } from 'lucide-react';
import AppointmentsTab from './AppointmentsTab';

interface AdminProfileTabsProps {
  profileData: {
    full_name: string;
    position: string;
    department: string;
    avatar_url: string;
  };
  setProfileData: React.Dispatch<React.SetStateAction<{
    full_name: string;
    position: string;
    department: string;
    avatar_url: string;
  }>>;
}

const AdminProfileTabs: React.FC<AdminProfileTabsProps> = ({
  profileData,
  setProfileData
}) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="bg-background border">
        <TabsTrigger value="profile" className="data-[state=active]:bg-innovate-50">
          <UserIcon className="w-4 h-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="appointments" className="data-[state=active]:bg-innovate-50">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Appointments
        </TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-innovate-50">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="bg-white p-6 border rounded-md shadow-sm">
        <AdminProfileForm 
          profileData={profileData} 
          setProfileData={setProfileData} 
        />
      </TabsContent>
      
      <TabsContent value="appointments" className="bg-white p-6 border rounded-md shadow-sm">
        <AppointmentsTab />
      </TabsContent>
      
      <TabsContent value="settings" className="bg-white p-6 border rounded-md shadow-sm">
        <AdminSettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminProfileTabs;
