
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardOverview: React.FC = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Dashboard Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to the InnovateHub admin dashboard. From here, you can manage your website content, users, database entries, and monitor email communications. Use the tabs below to navigate through different management sections.</p>
      </CardContent>
    </Card>
  );
};

export default DashboardOverview;
