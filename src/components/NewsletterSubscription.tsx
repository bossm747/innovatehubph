
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

interface NewsletterSubscriptionProps {
  variant?: 'default' | 'footer';
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ 
  variant = 'default' 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // This would normally send to your backend
      console.log('Newsletter subscription:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Subscription Successful", {
        description: "Thank you for subscribing to our newsletter!",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Subscription Failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (variant === 'footer') {
    return (
      <div className="mt-8 md:mt-0">
        <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
        <p className="text-gray-300 mb-4">
          Subscribe to our newsletter for the latest updates, tech insights, and special offers.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex">
                      <Input 
                        placeholder="Your email address" 
                        className="rounded-r-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500"
                        {...field}
                      />
                      <Button 
                        type="submit" 
                        className="rounded-l-none bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-300" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-gray-600 text-center mb-6">
        Stay updated with the latest news, insights, and special offers from InnovateHub.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex">
                    <Input 
                      placeholder="Your email address" 
                      className="rounded-r-none"
                      {...field}
                    />
                    <Button 
                      type="submit" 
                      className="rounded-l-none bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default NewsletterSubscription;
