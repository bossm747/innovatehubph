
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  isLoading: boolean;
  refreshData: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isLoading, refreshData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Error signing out: ' + error.message);
      return;
    }
    
    toast.success('Signed out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your website content and operations</p>
      </div>
      
      <div className="flex gap-2 mt-2 md:mt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshData}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
