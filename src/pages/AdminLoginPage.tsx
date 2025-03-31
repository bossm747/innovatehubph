
import React from 'react';
import { Helmet } from 'react-helmet';
import AdminLoginForm from '@/components/AdminLoginForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from 'sonner';

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Admin Login | InnovateHub</title>
        <meta name="description" content="Secure login portal for InnovateHub admin access" />
      </Helmet>
      
      <Toaster position="top-right" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/lovable-uploads/e0b50f3f-fb7b-4832-8041-8c82e7f630ad.png"
          alt="InnovateHub Logo"
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access for authorized personnel only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminLoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
