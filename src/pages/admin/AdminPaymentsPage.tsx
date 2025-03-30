
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const AdminPaymentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Processing</h2>
          <p className="text-muted-foreground">
            Monitor and manage payment transactions
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-innovate-600" />
            Transaction Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Payment processing interface will be available here. Monitor transactions, manage refunds, and view payment analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentsPage;
