
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { submitInquiryForm } from "@/services/inquiryService";

const ContactSectionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '', // Added phone field
    message: '',
    subscribe: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, subscribe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!formData.name || !formData.email || !formData.message || !formData.phone) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      
      if (!formData.email.includes('@')) {
        toast.error("Please enter a valid email address");
        setIsSubmitting(false);
        return;
      }
      
      // Add service type for general contact form
      const inquiryData = {
        ...formData,
        service: "general",
      };
      
      // Submit to the inquiry service
      const result = await submitInquiryForm(inquiryData);
      
      if (result.success) {
        // Show success toast
        toast.success("Message Sent!", {
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          subscribe: true
        });
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
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="bg-innovate-600 py-6 px-8">
        <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
        <p className="text-innovate-100">Fill out the form below and we'll get back to you shortly.</p>
      </div>
      
      <form className="p-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John Doe" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="john@example.com" 
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
            <Input 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              placeholder="Your Company" 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+63 9XX XXX XXXX" 
              required 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
          <Textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Tell us about your project or inquiry..." 
            rows={6} 
            required 
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="subscribe" 
            checked={formData.subscribe} 
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="subscribe" className="text-sm text-gray-700 cursor-pointer">
            Subscribe to our newsletter for updates
          </label>
        </div>
        
        <Button 
          type="submit" 
          variant="green"
          className="w-full btn-shine"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Need a more detailed inquiry? <Link to="/inquiry" className="text-innovate-600 hover:underline">Visit our inquiry page</Link> for service-specific forms.
        </p>
      </form>
    </div>
  );
};

export default ContactSectionForm;
