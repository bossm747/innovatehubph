
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  company: z.string().min(2, { message: "Company name is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  industry: z.string({ required_error: "Please select your industry" }),
  aiType: z.enum(["chatbot", "analytics", "automation", "custom"], {
    required_error: "Please select an AI solution type",
  }),
  dataAvailable: z.string({ required_error: "Please indicate data availability" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters" }),
  budget: z.string({ required_error: "Please select a budget range" }),
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
      aiType: "custom",
      dataAvailable: "",
      requirements: "",
      budget: "",
      subscribe: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('AI Solutions form data:', data);
    
    toast.success("AI Solution Request Submitted", {
      description: "Our AI experts will review your requirements and contact you!",
    });
    
    // Reset form
    form.reset();
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/ai-solutions');
    }, 2000);
  };

  const industries = [
    { value: "retail", label: "Retail" },
    { value: "finance", label: "Finance & Banking" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "logistics", label: "Logistics & Supply Chain" },
    { value: "hospitality", label: "Hospitality" },
    { value: "real-estate", label: "Real Estate" },
    { value: "technology", label: "Technology" },
    { value: "other", label: "Other" },
  ];

  const dataOptions = [
    { value: "yes-structured", label: "Yes, structured data available" },
    { value: "yes-unstructured", label: "Yes, but mostly unstructured" },
    { value: "partial", label: "Partial data available" },
    { value: "no", label: "No data available yet" },
    { value: "not-sure", label: "Not sure" },
  ];

  const budgetRanges = [
    { value: "under-25k", label: "Under ₱25,000" },
    { value: "25k-50k", label: "₱25,000 - ₱50,000" },
    { value: "50k-100k", label: "₱50,000 - ₱100,000" },
    { value: "100k-250k", label: "₱100,000 - ₱250,000" },
    { value: "above-250k", label: "Above ₱250,000" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-amber-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-amber-800 mb-2">AI & Automation Solutions</h3>
          <p className="text-sm text-gray-600">
            Harness the power of artificial intelligence to optimize processes, gain insights, and enhance customer experiences.
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
                <FormLabel>Company/Organization *</FormLabel>
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
          name="aiType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>AI Solution Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="chatbot" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      AI Chatbot/Assistant
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="analytics" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Predictive Analytics
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="automation" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Process Automation
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="custom" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Custom AI Solution
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dataAvailable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Availability *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data availability" />
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
              <FormLabel>Budget Range *</FormLabel>
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
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Requirements *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your AI project needs, challenges you're trying to solve, and expected outcomes..."
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
                  Subscribe to AI innovation updates
                </FormLabel>
                <FormDescription>
                  Stay informed about the latest in AI technology and applications
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
          Submit AI Solution Request
        </Button>
      </form>
    </Form>
  );
};

export default AiSolutionsForm;
