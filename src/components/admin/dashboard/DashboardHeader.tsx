
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  isLoading: boolean;
  refreshData: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isLoading, refreshData }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your website content and operations</p>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={refreshData}
        disabled={isLoading}
        className="mt-2 md:mt-0"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh Data
      </Button>
    </div>
  );
};

export default DashboardHeader;
