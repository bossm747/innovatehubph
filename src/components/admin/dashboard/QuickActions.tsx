
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SeedDatabaseButton from '@/components/admin/SeedDatabaseButton';

interface QuickActionsProps {
  refreshStats: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ refreshStats }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <SeedDatabaseButton refreshStats={refreshStats} />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
