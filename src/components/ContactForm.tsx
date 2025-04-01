
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { submitInquiryForm } from "@/services/inquiryService";
import { Mail, Send, User, Building, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  subscribe: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      subscribe: true,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Add service type for general contact form
      const formData = {
        service: "general",
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone || "",
        message: data.message,
        subscribe: data.subscribe,
      };
      
      // Submit to the inquiry service
      const result = await submitInquiryForm(formData);
      
      if (result.success) {
        // Show success toast
        toast.success("Message Sent!", {
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        
        // Reset form
        form.reset();
      } else {
        toast.error("Error Submitting Form", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error Submitting Form", {
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden fade-up border border-gray-100">
      <div className="bg-gradient-to-r from-innovate-600 to-blue-600 py-6 px-8">
        <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
        <p className="text-innovate-100">Fill out the form below and we'll get back to you shortly.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="rounded-md border-gray-200 focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} className="rounded-md border-gray-200 focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    Company (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" {...field} className="rounded-md border-gray-200 focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    Phone (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+63 912 345 6789" {...field} className="rounded-md border-gray-200 focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project or inquiry..." 
                    rows={6}
                    {...field}
                    className="rounded-md border-gray-200 focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50" 
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-innovate-600 data-[state=checked]:border-innovate-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    Subscribe to our newsletter for updates on our services and industry insights
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-innovate-600 to-blue-600 hover:from-innovate-700 hover:to-blue-700 text-white transition-colors btn-shine"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </span>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
