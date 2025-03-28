
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  service: z.string({ required_error: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  subscribe: z.boolean().default(false),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

const InquiryPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
      subscribe: false,
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    console.log('Inquiry form data:', data);
    
    // Show success toast
    toast({
      title: "Inquiry Submitted",
      description: "We'll get back to you soon!",
      variant: "default",
    });
    
    // Reset form
    form.reset();
    
    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const serviceOptions = [
    { label: "PlataPay Integration", value: "platapay" },
    { label: "Digital Customizations", value: "digital" },
    { label: "E-Commerce Development", value: "ecommerce" },
    { label: "AI Solutions", value: "ai" },
    { label: "Global Expansion", value: "global" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Helmet>
        <title>Let's Build Together | InnovateHub Inc.</title>
        <meta name="description" content="Ready to collaborate? Tell us about your project and let's co-create your digital future." />
      </Helmet>
      
      <CircuitBackground 
        pattern="tech-circle" 
        className="fixed top-20 right-20" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="blue-wave" 
        className="fixed -bottom-40 -left-40" 
        size="xl" 
        opacity={0.2} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed top-1/3 left-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      <Navbar />
      
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
                Project Inquiry
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text-gradient">
                Let's Build Together
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Ready to transform your business with innovative digital solutions? Tell us about your project, and our team will get back to you to discuss how we can help.
              </p>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-xl font-semibold mb-3">Why Choose InnovateHub?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-800">Expertise:</span> With diverse tech skills from fintech to AI
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-800">Client-Focused:</span> We prioritize your business goals
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-800">Global Reach:</span> Supporting businesses from Batangas to Dubai
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/lovable-uploads/7c51de5e-2a54-4a16-8c38-3aed5f77004a.png" 
                  alt="InnovateHub Team" 
                  className="w-full h-auto" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium">Our team is ready to help</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 fade-up">
              <h2 className="text-2xl font-bold mb-6">Tell Us About Your Project</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interested In *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceOptions.map((option) => (
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project requirements..."
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
                            Subscribe to our newsletter for updates
                          </FormLabel>
                          <FormDescription>
                            We'll send you occasional news about our services and special offers.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-innovate-600 hover:bg-innovate-700 text-white btn-shine"
                    size="lg"
                  >
                    Submit Inquiry
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our <a href="#" className="text-innovate-600 hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InquiryPage;
