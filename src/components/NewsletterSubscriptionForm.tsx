
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/newsletterService';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewsletterSubscriptionFormProps {
  source?: string;
  variant?: 'default' | 'footer';
  onSuccess?: () => void;
}

const NewsletterSubscriptionForm: React.FC<NewsletterSubscriptionFormProps> = ({
  source = 'website',
  variant = 'default',
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });
  
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const success = await subscribeToNewsletter({
        email: values.email,
        name: values.name,
        source,
        interests: ['general'],
      });
      
      if (success) {
        form.reset();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFooterVariant = variant === 'footer';
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {!isFooterVariant && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Your name (optional)" 
                    {...field} 
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className={isFooterVariant ? "flex flex-col sm:flex-row gap-2" : ""}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={isFooterVariant ? "flex-1" : ""}>
                <FormControl>
                  <Input 
                    placeholder="Your email address" 
                    type="email" 
                    {...field} 
                    className={isFooterVariant ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" : "bg-white"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={
              isFooterVariant 
                ? "bg-blue-500 hover:bg-blue-600 sm:whitespace-nowrap" 
                : "w-full bg-innovate-600 hover:bg-innovate-700"
            }
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : isFooterVariant ? 'Subscribe' : 'Subscribe to Newsletter'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewsletterSubscriptionForm;
