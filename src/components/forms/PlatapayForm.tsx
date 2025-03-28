
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  businessName: z.string().min(2, { message: "Business name is required" }),
  businessType: z.string().min(1, { message: "Please select a business type" }),
  location: z.string().min(3, { message: "Location is required" }),
  inquiry: z.string().min(10, { message: "Message must be at least 10 characters" }),
  applyAs: z.enum(["agent", "merchant", "user", "partner"], {
    required_error: "Please select how you want to apply",
  }),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PlatapayFormProps {
  navigate: (path: string) => void;
}

const PlatapayForm = ({ navigate }: PlatapayFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "",
      location: "",
      inquiry: "",
      applyAs: "agent",
      subscribe: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('PlataPay form data:', data);
    
    toast.success("PlataPay Application Submitted", {
      description: "Thank you for your interest! We'll contact you shortly.",
    });
    
    // Reset form
    form.reset();
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/platapay');
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-innovate-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-innovate-800 mb-2">Join the PlataPay Network</h3>
          <p className="text-sm text-gray-600">
            Apply to become a PlataPay agent, merchant, or partner and start earning from digital financial services.
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="applyAs"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I want to apply as *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="agent" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      PlataPay Agent
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="merchant" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Merchant
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="user" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      User
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="partner" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Strategic Partner
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="+63 9XX XXX XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location/Address *</FormLabel>
                <FormControl>
                  <Input placeholder="City, Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Sari-sari Store, Remittance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us more about your interest in PlataPay *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please share details about your business and how you'd like to use PlataPay..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subscribe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Subscribe to PlataPay updates
                </FormLabel>
                <FormDescription>
                  Get the latest news about features and promotions
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-innovate-600 hover:bg-innovate-700 text-white"
          size="lg"
        >
          Submit Application
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this form, you agree to our Privacy Policy and Terms of Service.
        </p>
      </form>
    </Form>
  );
};

export default PlatapayForm;
