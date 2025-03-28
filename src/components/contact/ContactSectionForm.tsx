
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const ContactSectionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation would go here
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you shortly.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
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
        
        <Button 
          type="submit" 
          className="w-full bg-innovate-600 hover:bg-innovate-700 text-white transition-colors btn-shine"
        >
          Send Message
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Need a more detailed inquiry? <Link to="/inquiry" className="text-innovate-600 hover:underline">Visit our inquiry page</Link> for service-specific forms.
        </p>
      </form>
    </div>
  );
};

export default ContactSectionForm;
