
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
  industry: z.string().optional(),
  aiType: z.string({ required_error: "Please select an AI solution type" }),
  dataAvailable: z.string().optional(),
  budget: z.string().optional(),
  requirements: z.string().min(10, { message: "Please provide more details about your requirements" }),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface AiSolutionsFormProps {
  navigate: (path: string) => void;
}

const AiSolutionsForm = ({ navigate }: AiSolutionsFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      industry: "",
      aiType: "",
      dataAvailable: "",
      budget: "",
      requirements: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('AI Solutions form data:', data);
    
    // Show loading toast
    const loadingToast = toast.loading("Submitting your AI solutions inquiry...");
    
    try {
      // Add service type to the form data
      const formDataWithService: InquiryFormData = {
        service: 'ai',
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        industry: data.industry,
        aiType: data.aiType,
        dataAvailable: data.dataAvailable,
        budget: data.budget,
        requirements: data.requirements,
        subscribe: data.subscribe
      };
      
      // Log the submission (excluding sensitive information)
      logFormSubmission('ai', data);
      
      // Submit the form
      const result = await submitInquiryForm(formDataWithService);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        // Show success message
        toast.success("AI Solutions Inquiry Submitted", {
          description: "Our team will contact you about your AI project!",
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
    { value: "education", label: "Education" },
    { value: "logistics", label: "Logistics & Supply Chain" },
    { value: "agriculture", label: "Agriculture" },
    { value: "other", label: "Other" },
  ];

  const aiTypes = [
    { value: "chatbot", label: "Chatbot / Virtual Assistant" },
    { value: "analytics", label: "Predictive Analytics" },
    { value: "nlp", label: "Natural Language Processing" },
    { value: "computer-vision", label: "Computer Vision" },
    { value: "process-automation", label: "Process Automation" },
    { value: "recommendation", label: "Recommendation System" },
    { value: "custom", label: "Custom AI Solution" },
  ];

  const dataOptions = [
    { value: "yes-ready", label: "Yes, data is ready for use" },
    { value: "yes-needs-processing", label: "Yes, but needs processing" },
    { value: "no-need-collection", label: "No, need help with data collection" },
    { value: "not-sure", label: "Not sure" },
  ];

  const budgetRanges = [
    { value: "under-50k", label: "Under ₱50,000" },
    { value: "50k-100k", label: "₱50,000 - ₱100,000" },
    { value: "100k-250k", label: "₱100,000 - ₱250,000" },
    { value: "250k-500k", label: "₱250,000 - ₱500,000" },
    { value: "over-500k", label: "Over ₱500,000" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800 mb-2">AI & Automation Solutions</h3>
          <p className="text-sm text-gray-600">
            Harness the power of artificial intelligence to optimize your business processes.
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
            name="aiType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Solution Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI solution type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aiTypes.map((type) => (
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dataAvailable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Availability</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Do you have data available?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dataOptions.map((option) => (
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
        </div>
        
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Requirements *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your AI needs, challenges you want to solve, and expected outcomes..."
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
                  Subscribe to AI updates
                </FormLabel>
                <FormDescription>
                  Receive news about the latest in AI and automation
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
          Submit AI Solutions Inquiry
        </Button>
      </form>
    </Form>
  );
};

export default AiSolutionsForm;
