
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import LoadingIndicator from '@/components/LoadingIndicator';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session first
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        console.log("Initial session check:", !!session);
      } catch (error) {
        console.error("Session check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setIsAuthenticated(!!session);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingIndicator isLoading={true} /></div>;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  console.log("Authenticated, rendering children");
  return <>{children}</>;
};

export default ProtectedRoute;
