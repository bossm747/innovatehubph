
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
  company: z.string().optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  projectType: z.string({ required_error: "Please select a project type" }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  requirements: z.string().min(10, { message: "Please provide more details about your project" }),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface DigitalCustomizationsFormProps {
  navigate: (path: string) => void;
}

const DigitalCustomizationsForm = ({ navigate }: DigitalCustomizationsFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      requirements: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('Digital Customizations form data:', data);
    
    // Show loading toast
    const loadingToast = toast.loading("Submitting your digital customization inquiry...");
    
    try {
      // Add service type to the form data
      const formDataWithService: InquiryFormData = {
        service: 'digital',
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline, 
        requirements: data.requirements,
        subscribe: data.subscribe
      };
      
      // Log the submission (excluding sensitive information)
      logFormSubmission('digital', data);
      
      // Submit the form
      const result = await submitInquiryForm(formDataWithService);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        // Show success message
        toast.success("Digital Customization Inquiry Submitted", {
          description: "Our team will contact you about your custom software project!",
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

  const projectTypes = [
    { value: "web-app", label: "Web Application" },
    { value: "mobile-app", label: "Mobile Application" },
    { value: "enterprise-software", label: "Enterprise Software" },
    { value: "integration", label: "API/System Integration" },
    { value: "consultation", label: "IT Consultation" },
  ];

  const budgetRanges = [
    { value: "under-5k", label: "Under ₱5,000" },
    { value: "5k-20k", label: "₱5,000 - ₱20,000" },
    { value: "20k-50k", label: "₱20,000 - ₱50,000" },
    { value: "50k-100k", label: "₱50,000 - ₱100,000" },
    { value: "over-100k", label: "Over ₱100,000" },
  ];

  const timelineOptions = [
    { value: "urgent", label: "Urgent (< 2 weeks)" },
    { value: "short", label: "Short term (2-4 weeks)" },
    { value: "medium", label: "Medium term (1-3 months)" },
    { value: "long", label: "Long term (3+ months)" },
    { value: "flexible", label: "Flexible" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-purple-800 mb-2">Custom Software Solutions</h3>
          <p className="text-sm text-gray-600">
            Tell us about your software needs, and we'll create a tailored solution for your business.
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
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
        </div>
        
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
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
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeline</FormLabel>
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
        </div>
        
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Requirements *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your project and requirements in detail..."
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
                  Subscribe to tech updates
                </FormLabel>
                <FormDescription>
                  Receive news about the latest in software development
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          size="lg"
        >
          Submit Digital Customization Inquiry
        </Button>
      </form>
    </Form>
  );
};

export default DigitalCustomizationsForm;
