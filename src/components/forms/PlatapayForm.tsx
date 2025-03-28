
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
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  businessType: z.string({ required_error: "Please select a business type" }),
  location: z.string().min(2, { message: "Location is required" }),
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one service",
  }),
  message: z.string().optional(),
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
      businessType: "",
      location: "",
      services: [],
      message: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('PlataPay form data:', data);
    
    // Show loading toast
    const loadingToast = toast.loading("Submitting your PlataPay inquiry...");
    
    try {
      // Add service type to the form data
      const formDataWithService: InquiryFormData = {
        service: 'platapay',
        name: data.name,
        email: data.email,
        phone: data.phone,
        businessType: data.businessType,
        location: data.location,
        services: data.services,
        message: data.message,
        subscribe: data.subscribe
      };
      
      // Log the submission (excluding sensitive information)
      logFormSubmission('platapay', data);
      
      // Submit the form
      const result = await submitInquiryForm(formDataWithService);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        // Show success message
        toast.success("PlataPay Inquiry Submitted", {
          description: "Our team will contact you about becoming a PlataPay partner!",
        });
        
        // Reset form
        form.reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/platapay');
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

  const businessTypes = [
    { value: "individual", label: "Individual Agent" },
    { value: "small-business", label: "Small Business" },
    { value: "retailer", label: "Retailer" },
    { value: "franchise", label: "Franchise" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const platapayServices = [
    { id: "e-loading", label: "E-Loading" },
    { id: "bills-payment", label: "Bills Payment" },
    { id: "remittance", label: "Remittance" },
    { id: "digital-wallet", label: "Digital Wallet" },
    { id: "qr-payments", label: "QR Payments" },
    { id: "merchant-pos", label: "Merchant POS" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800 mb-2">PlataPay Partnership</h3>
          <p className="text-sm text-gray-600">
            Join our network of agents and merchants to offer digital financial services in your area.
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
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessTypes.map((type) => (
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location/Area *</FormLabel>
                <FormControl>
                  <Input placeholder="City, Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Services Interested In *</FormLabel>
                <FormDescription>
                  Select the PlataPay services you want to offer
                </FormDescription>
              </div>
              {platapayServices.map((service) => (
                <FormField
                  key={service.id}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== service.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {service.label}
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us more about your business or location..."
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
                  Subscribe to PlataPay updates
                </FormLabel>
                <FormDescription>
                  Receive news about features, rates, and promotions
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
          Submit PlataPay Inquiry
        </Button>
      </form>
    </Form>
  );
};

export default PlatapayForm;
