
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserCog, Settings } from 'lucide-react';

const AdminSettingsTab: React.FC = () => {
  return (
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
  );
};

export default AdminSettingsTab;
