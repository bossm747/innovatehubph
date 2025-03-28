
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
import { submitInquiryForm, logFormSubmission, InquiryFormData } from '@/services/inquiryService';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(2, { message: "Company name is required" }),
  position: z.string().min(2, { message: "Position/role is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  currentMarkets: z.string().min(2, { message: "Please enter your current markets" }),
  targetMarkets: z.string().min(2, { message: "Please enter your target markets" }),
  timeline: z.string().optional(),
  expansionGoals: z.string().min(10, { message: "Please describe your expansion goals" }),
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
      industry: "",
      companySize: "",
      currentMarkets: "",
      targetMarkets: "",
      timeline: "",
      expansionGoals: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('Global Expansion form data:', data);
    
    // Show loading toast
    const loadingToast = toast.loading("Submitting your global expansion inquiry...");
    
    try {
      // Add service type to the form data
      const formDataWithService: InquiryFormData = {
        service: 'global',
        name: data.name,
        email: data.email,
        company: data.company,
        position: data.position,
        phone: data.phone,
        industry: data.industry,
        companySize: data.companySize,
        currentMarkets: data.currentMarkets,
        targetMarkets: data.targetMarkets,
        timeline: data.timeline,
        expansionGoals: data.expansionGoals,
        subscribe: data.subscribe
      };
      
      // Log the submission (excluding sensitive information)
      logFormSubmission('global', data);
      
      // Submit the form
      const result = await submitInquiryForm(formDataWithService);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        // Show success message
        toast.success("Global Expansion Inquiry Submitted", {
          description: "Our team will contact you about international business opportunities!",
        });
        
        // Reset form
        form.reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/services');
        }, 2000);
      } else {
        // Show error message
        toast.error("Submission Failed", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error message
      toast.error("Submission Error", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  const industries = [
    { value: "finance", label: "Finance & Banking" },
    { value: "healthcare", label: "Healthcare" },
    { value: "retail", label: "Retail & E-commerce" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "technology", label: "Technology" },
    { value: "education", label: "Education" },
    { value: "logistics", label: "Logistics & Supply Chain" },
    { value: "other", label: "Other" },
  ];

  const companySizes = [
    { value: "startup", label: "Startup (1-10 employees)" },
    { value: "small", label: "Small Business (11-50 employees)" },
    { value: "medium", label: "Medium Enterprise (51-250 employees)" },
    { value: "large", label: "Large Enterprise (251+ employees)" },
  ];

  const timelineOptions = [
    { value: "immediate", label: "Immediate (1-3 months)" },
    { value: "short", label: "Short term (3-6 months)" },
    { value: "medium", label: "Medium term (6-12 months)" },
    { value: "long", label: "Long term (12+ months)" },
    { value: "planning", label: "Still in planning phase" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-amber-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-amber-800 mb-2">Global Expansion Services</h3>
          <p className="text-sm text-gray-600">
            Expand your business internationally with our guidance and support in Dubai and beyond.
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
                <FormLabel>Position/Role *</FormLabel>
                <FormControl>
                  <Input placeholder="CEO / Director / Manager" {...field} />
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
                <FormLabel>Industry</FormLabel>
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
                <FormLabel>Company Size</FormLabel>
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
                  <Input placeholder="Philippines, etc." {...field} />
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
                  <Input placeholder="Dubai, UAE, etc." {...field} />
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
              <FormLabel>Expansion Timeline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expansion timeline" />
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
              <FormLabel>Expansion Goals *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your international expansion goals, challenges, and what you hope to achieve..."
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
                  Receive news about international business opportunities
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          size="lg"
        >
          Submit Global Expansion Inquiry
        </Button>
      </form>
    </Form>
  );
};

export default GlobalExpansionForm;
