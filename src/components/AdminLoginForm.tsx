
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import LoadingIndicator from '@/components/LoadingIndicator';

interface AdminLoginFormProps {
  onSuccess?: () => void;
}

// Schema with basic validation
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const AdminLoginForm = ({ onSuccess }: AdminLoginFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
        }
        if (data.session) {
          navigate('/admin/dashboard');
        }
      } catch (err) {
        console.error("Auth check error:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      if (activeTab === 'signin') {
        console.log("Attempting sign in with email:", data.email);
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        toast.success('Signed in successfully');
        if (onSuccess) {
          onSuccess();
        }
        navigate('/admin/dashboard');
      } else {
        console.log("Attempting sign up with email:", data.email);
        // For registration
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            // Don't require email verification to accelerate testing
            emailRedirectTo: window.location.origin + '/admin/dashboard',
          }
        });
        
        if (error) throw error;
        
        toast.success('Account created successfully. Please check your email for verification.');
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setAuthError(error.message);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center h-[400px]"><LoadingIndicator isLoading={true} /></div>;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Register</TabsTrigger>
        </TabsList>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {authError}
          </div>
        )}
        
        <TabsContent value="signin">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="signup">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLoginForm;
