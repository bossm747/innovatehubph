
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AdminAuthContextType {
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isLoading: true,
  session: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  error: null
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      if (!email.endsWith('@innovatehub.ph')) {
        throw new Error('Only InnovateHub admin email addresses are allowed');
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    setError(null);
    try {
      if (!email.endsWith('@innovatehub.ph')) {
        throw new Error('Only InnovateHub admin email addresses are allowed');
      }

      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/portal`
        }
      });
      
      if (error) throw error;
      toast.success('Verification email sent. Please check your inbox.');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isLoading,
        session,
        user,
        signIn,
        signOut,
        signUp,
        error
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
