
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ProfileData {
  full_name: string;
  position: string;
  department: string;
  avatar_url: string;
}

interface AdminProfileFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const AdminProfileForm: React.FC<AdminProfileFormProps> = ({ profileData, setProfileData }) => {
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  return (
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
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default AdminProfileForm;
