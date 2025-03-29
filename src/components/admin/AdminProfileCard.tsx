
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, LayoutDashboard, FileText, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminProfileCardProps {
  user: {
    id: string;
    email: string;
  };
  profileData: {
    full_name: string;
    position: string;
    department: string;
    avatar_url: string;
  };
}

const AdminProfileCard: React.FC<AdminProfileCardProps> = ({ user, profileData }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

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
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-4">
            <AvatarImage src={profileData.avatar_url} />
            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
              {getInitials(profileData.full_name || getEmailName(user.email))}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">{profileData.full_name || getEmailName(user.email)}</CardTitle>
          <CardDescription className="text-center break-all">{user.email}</CardDescription>
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
          onClick={() => navigate('/admin/content')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Content Management
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
  );
};

export default AdminProfileCard;
