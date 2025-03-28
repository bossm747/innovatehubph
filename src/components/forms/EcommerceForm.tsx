
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
  businessName: z.string().min(2, { message: "Business name is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  storeType: z.string({ required_error: "Please select a store type" }),
  products: z.string().min(3, { message: "Please describe your products" }),
  features: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one feature",
  }),
  additionalInfo: z.string().optional(),
  budget: z.string({ required_error: "Please select a budget range" }),
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
      additionalInfo: "",
      budget: "",
      subscribe: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('E-commerce form data:', data);
    
    toast.success("E-commerce Request Submitted", {
      description: "We'll prepare a custom online store proposal for your business!",
    });
    
    // Reset form
    form.reset();
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/ecommerce');
    }, 2000);
  };

  const storeTypes = [
    { value: "retail", label: "Retail Products" },
    { value: "digital", label: "Digital Products" },
    { value: "services", label: "Services" },
    { value: "subscription", label: "Subscription Business" },
    { value: "marketplace", label: "Marketplace" },
    { value: "dropshipping", label: "Dropshipping" },
    { value: "other", label: "Other" },
  ];

  const ecommerceFeatures = [
    { id: "product-management", label: "Product Management" },
    { id: "payment-gateways", label: "Payment Gateways" },
    { id: "shipping-integration", label: "Shipping Integration" },
    { id: "inventory-management", label: "Inventory Management" },
    { id: "customer-accounts", label: "Customer Accounts" },
    { id: "mobile-app", label: "Mobile App" },
    { id: "marketing-tools", label: "Marketing Tools" },
    { id: "analytics", label: "Analytics Dashboard" },
    { id: "seo", label: "SEO Optimization" },
  ];

  const budgetRanges = [
    { value: "under-10k", label: "Under ₱10,000" },
    { value: "10k-25k", label: "₱10,000 - ₱25,000" },
    { value: "25k-50k", label: "₱25,000 - ₱50,000" },
    { value: "50k-100k", label: "₱50,000 - ₱100,000" },
    { value: "above-100k", label: "Above ₱100,000" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-emerald-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-emerald-800 mb-2">E-Commerce Store Development</h3>
          <p className="text-sm text-gray-600">
            Let us help you build a powerful online store to showcase and sell your products or services.
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
                  <Input placeholder="Your Business Name" {...field} />
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
        </div>
        
        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products/Services *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the products or services you want to sell online..."
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
                <FormLabel className="text-base">Required Features *</FormLabel>
                <FormDescription>
                  Select the features you want for your online store
                </FormDescription>
              </div>
              {ecommerceFeatures.map((feature) => (
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
                  placeholder="Any other details about your e-commerce needs..."
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
                  Subscribe to e-commerce tips
                </FormLabel>
                <FormDescription>
                  Receive exclusive e-commerce insights and best practices
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          size="lg"
        >
          Submit Store Request
        </Button>
      </form>
    </Form>
  );
};

export default EcommerceForm;
