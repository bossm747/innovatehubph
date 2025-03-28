
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
  businessName: z.string().min(2, { message: "Business name is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  storeType: z.string({ required_error: "Please select a store type" }),
  products: z.string().min(5, { message: "Please describe your products" }),
  features: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one feature",
  }),
  budget: z.string().optional(),
  additionalInfo: z.string().optional(),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface EcommerceFormProps {
  navigate: (path: string) => void;
}

const EcommerceForm = ({ navigate }: EcommerceFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      phone: "",
      storeType: "",
      products: "",
      features: [],
      budget: "",
      additionalInfo: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('E-Commerce form data:', data);
    
    // Show loading toast
    const loadingToast = toast.loading("Submitting your e-commerce inquiry...");
    
    try {
      // Add service type to the form data
      const formDataWithService: InquiryFormData = {
        service: 'ecommerce',
        name: data.name,
        email: data.email,
        businessName: data.businessName,
        phone: data.phone,
        storeType: data.storeType,
        products: data.products,
        features: data.features,
        budget: data.budget,
        additionalInfo: data.additionalInfo,
        subscribe: data.subscribe
      };
      
      // Log the submission (excluding sensitive information)
      logFormSubmission('ecommerce', data);
      
      // Submit the form
      const result = await submitInquiryForm(formDataWithService);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        // Show success message
        toast.success("E-Commerce Inquiry Submitted", {
          description: "Our team will contact you about your online store project!",
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

  const storeTypes = [
    { value: "retail", label: "Retail Products" },
    { value: "digital", label: "Digital Products" },
    { value: "services", label: "Services" },
    { value: "marketplace", label: "Marketplace" },
    { value: "dropshipping", label: "Dropshipping" },
    { value: "subscription", label: "Subscription Business" },
  ];

  const storeFeatures = [
    { id: "payment-gateway", label: "Payment Gateway Integration" },
    { id: "inventory", label: "Inventory Management" },
    { id: "shipping", label: "Shipping Integration" },
    { id: "cms", label: "Content Management System" },
    { id: "analytics", label: "Analytics Dashboard" },
    { id: "mobile-app", label: "Mobile App" },
    { id: "social-media", label: "Social Media Integration" },
    { id: "marketing", label: "Marketing Automation" },
  ];

  const budgetRanges = [
    { value: "under-10k", label: "Under ₱10,000" },
    { value: "10k-30k", label: "₱10,000 - ₱30,000" },
    { value: "30k-50k", label: "₱30,000 - ₱50,000" },
    { value: "50k-100k", label: "₱50,000 - ₱100,000" },
    { value: "over-100k", label: "Over ₱100,000" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-green-800 mb-2">E-Commerce Development</h3>
          <p className="text-sm text-gray-600">
            Start selling online with a professional e-commerce store tailored to your business.
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
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your Business" {...field} />
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
            name="storeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select store type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {storeTypes.map((type) => (
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
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product/Service Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about the products or services you want to sell online..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Features Required *</FormLabel>
                <FormDescription>
                  Select the features you need in your online store
                </FormDescription>
              </div>
              {storeFeatures.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name="features"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={feature.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(feature.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, feature.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== feature.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {feature.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any other details or requirements for your e-commerce project..."
                  className="min-h-20"
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
                  Subscribe to e-commerce updates
                </FormLabel>
                <FormDescription>
                  Receive news about e-commerce trends and solutions
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          Submit E-Commerce Inquiry
        </Button>
      </form>
    </Form>
  );
};

export default EcommerceForm;
