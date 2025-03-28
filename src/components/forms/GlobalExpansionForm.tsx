
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  company: z.string().min(2, { message: "Company name is required" }),
  position: z.string().min(2, { message: "Position is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  currentMarkets: z.string().min(2, { message: "Please enter your current markets" }),
  targetMarkets: z.string().min(2, { message: "Please enter your target markets" }),
  industry: z.string({ required_error: "Please select your industry" }),
  companySize: z.string({ required_error: "Please select your company size" }),
  expansionGoals: z.string().min(10, { message: "Please describe your expansion goals" }),
  timeline: z.string({ required_error: "Please select a timeline" }),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface GlobalExpansionFormProps {
  navigate: (path: string) => void;
}

const GlobalExpansionForm = ({ navigate }: GlobalExpansionFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
      phone: "",
      currentMarkets: "",
      targetMarkets: "",
      industry: "",
      companySize: "",
      expansionGoals: "",
      timeline: "",
      subscribe: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Global Expansion form data:', data);
    
    toast.success("Global Expansion Request Submitted", {
      description: "Our international business team will reach out to discuss your expansion plans!",
    });
    
    // Reset form
    form.reset();
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/global-expansion');
    }, 2000);
  };

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "fintech", label: "Fintech" },
    { value: "retail", label: "Retail & E-commerce" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "services", label: "Professional Services" },
    { value: "other", label: "Other" },
  ];

  const companySizes = [
    { value: "startup", label: "Startup (1-10 employees)" },
    { value: "small", label: "Small Business (11-50 employees)" },
    { value: "medium", label: "Medium Enterprise (51-250 employees)" },
    { value: "large", label: "Large Enterprise (251+ employees)" },
  ];

  const timelineOptions = [
    { value: "immediate", label: "Immediate (0-3 months)" },
    { value: "short", label: "Short-term (3-6 months)" },
    { value: "medium", label: "Medium-term (6-12 months)" },
    { value: "long", label: "Long-term (12+ months)" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Global Expansion Services</h3>
          <p className="text-sm text-gray-600">
            Expand your business internationally with our expert guidance on market entry, regulatory compliance, and international partnerships.
          </p>
        </div>
        
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position/Title *</FormLabel>
                <FormControl>
                  <Input placeholder="CEO, Director, Manager, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone *</FormLabel>
              <FormControl>
                <Input placeholder="+63 9XX XXX XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="currentMarkets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Markets *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Philippines, Singapore" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="targetMarkets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Markets *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Dubai, USA, Europe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expansion Timeline *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timelineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="expansionGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expansion Goals & Requirements *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your international expansion goals, specific requirements, and any challenges you're facing..."
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
                  Subscribe to global business updates
                </FormLabel>
                <FormDescription>
                  Receive insights about international markets and expansion opportunities
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          Submit Global Expansion Request
        </Button>
      </form>
    </Form>
  );
};

export default GlobalExpansionForm;
