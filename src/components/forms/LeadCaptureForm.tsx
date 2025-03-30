
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface LeadCaptureFormProps {
  formType?: 'popup' | 'inline' | 'floating';
  leadSource?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showInterestFields?: boolean;
  embedded?: boolean;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  formType = 'inline',
  leadSource = 'website',
  onSuccess,
  title = 'Stay Updated',
  subtitle = 'Get the latest news and exclusive offers from InnovateHub',
  buttonText = 'Subscribe',
  showInterestFields = false,
  embedded = false
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interests: [] as string[],
    message: '',
    subscribe: true
  });

  const interestOptions = [
    { id: 'platapay', label: 'PlataPay' },
    { id: 'digital', label: 'Digital Customizations' },
    { id: 'ecommerce', label: 'E-Commerce Solutions' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'global', label: 'Global Expansion' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, subscribe: checked }));
  };

  const handleInterestChange = (interestId: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId];
      
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Insert into marketing_recipients
      const { error: recipientError } = await supabase
        .from('marketing_recipients')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          tags: formData.interests,
          subscribed: formData.subscribe
        });

      if (recipientError) throw recipientError;

      // Log to subscribers table with source info
      const { error: subscriberError } = await supabase
        .from('subscribers')
        .insert({
          name: formData.name,
          email: formData.email,
          source: leadSource
        });

      if (subscriberError) throw subscriberError;

      // Call multi-agent function to generate personalized welcome message if available
      if (formData.subscribe) {
        try {
          await supabase.functions.invoke('multi-agent-generate', {
            body: {
              content: `Generate a personalized welcome email for a new subscriber named ${formData.name} from company ${formData.company || 'unknown'} who is interested in ${formData.interests.join(', ') || 'our services'}.`,
              agentId: null, // Use default welcome agent
              domain: "innovatehub.ph"
            }
          });
        } catch (aiError) {
          console.error('AI generation error:', aiError);
          // Non-blocking - continue even if AI fails
        }
      }

      // Success state
      toast({
        title: "Thank you for subscribing!",
        description: "We'll keep you updated with the latest news and offers.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        interests: [],
        message: '',
        subscribe: true
      });

      // Callback if provided
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formClasses = {
    popup: "p-6 bg-white rounded-xl shadow-xl max-w-md mx-auto",
    inline: "p-4 bg-white rounded-lg border border-gray-200",
    floating: "p-5 bg-white rounded-xl shadow-2xl fixed bottom-4 right-4 max-w-sm z-50"
  };

  return (
    <div className={embedded ? '' : formClasses[formType]}>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="company">Company (Optional)</Label>
          <Input
            id="company"
            name="company"
            placeholder="Your company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        
        {showInterestFields && (
          <div>
            <Label>Interests</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {interestOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`interest-${option.id}`} 
                    checked={formData.interests.includes(option.id)}
                    onCheckedChange={() => handleInterestChange(option.id)}
                  />
                  <label 
                    htmlFor={`interest-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="subscribe" 
            checked={formData.subscribe}
            onCheckedChange={handleCheckboxChange}
          />
          <label 
            htmlFor="subscribe"
            className="text-sm text-gray-600 cursor-pointer"
          >
            I agree to receive marketing emails from InnovateHub
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : buttonText}
        </Button>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
