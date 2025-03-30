
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon, MailIcon, SendIcon, TagIcon, UsersIcon } from 'lucide-react';

// Email template types with all fields
interface NewsletterTemplate {
  title: string;
  intro: string; 
  message: string;
  ctaLink: string;
  ctaText: string;
}

interface PromotionTemplate {
  title: string;
  intro: string;
  offerTitle: string;
  offerDescription: string;
  message: string;
  ctaLink: string;
  ctaText: string;
}

interface WelcomeTemplate {
  title: string;
  intro: string;
  message: string;
  service: string;
  customMessage: string;
  ctaLink: string;
  ctaText: string;
  calendlyLink: string;
}

interface ServiceHighlightTemplate {
  title: string;
  intro: string;
  serviceName: string;
  serviceDescription: string;
  message: string;
  ctaLink: string;
  ctaText: string;
  learnMoreLink: string;
}

// Form schemas
const emailFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  recipients: z.string().min(1, "At least one recipient is required"),
  template: z.string(),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
});

const recipientFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  tags: z.string().optional(),
});

const EmailMarketingTab: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('compose');
  const [recipients, setRecipients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Template state management
  const [selectedTemplate, setSelectedTemplate] = useState('newsletter');
  const [newsletterTemplate, setNewsletterTemplate] = useState<NewsletterTemplate>({
    title: 'InnovateHub Monthly Newsletter',
    intro: 'Hello from InnovateHub!',
    message: 'Here are the latest updates and insights from our team.',
    ctaLink: 'https://innovatehub.ph/blog',
    ctaText: 'Read More',
  });
  
  const [promotionTemplate, setPromotionTemplate] = useState<PromotionTemplate>({
    title: 'Special Offer Inside!',
    intro: 'Limited Time Opportunity',
    offerTitle: 'Get 15% Off Your Next Project',
    offerDescription: 'Book a consultation before the end of the month to claim your discount',
    message: 'Our team is ready to help bring your digital project to life with premium quality and competitive pricing.',
    ctaLink: 'https://innovatehub.ph/contact',
    ctaText: 'Claim Offer',
  });
  
  const [welcomeTemplate, setWelcomeTemplate] = useState<WelcomeTemplate>({
    title: 'Welcome to InnovateHub',
    intro: 'Thank you for your interest',
    service: 'digital solutions',
    customMessage: 'We're excited to learn more about your project and how we can help.',
    message: 'Our team of experts is ready to provide top-notch service and support.',
    ctaLink: 'https://innovatehub.ph/services',
    ctaText: 'Explore Our Services',
    calendlyLink: 'https://innovatehub.ph/book',
  });
  
  const [serviceTemplate, setServiceTemplate] = useState<ServiceHighlightTemplate>({
    title: 'Introducing Our Services',
    intro: 'Discover what we can do for you',
    serviceName: 'PlataPay Integration',
    serviceDescription: 'Seamless digital payment solutions for your business needs',
    message: 'Our team specializes in providing tailored solutions to meet your unique requirements.',
    ctaLink: 'https://innovatehub.ph/services/platapay',
    ctaText: 'Learn More',
    learnMoreLink: 'https://innovatehub.ph/case-studies',
  });

  // Forms
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      subject: '',
      recipients: '',
      template: 'newsletter',
    },
  });

  const recipientForm = useForm<z.infer<typeof recipientFormSchema>>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      tags: '',
    },
  });

  // Load recipients on mount
  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketing_recipients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipients(data || []);
    } catch (error) {
      console.error('Error fetching recipients:', error);
      toast({
        title: "Error",
        description: "Failed to load recipients list",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addRecipient = async (data: z.infer<typeof recipientFormSchema>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('marketing_recipients')
        .insert({
          name: data.name,
          email: data.email,
          company: data.company || null,
          tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : null,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recipient added successfully",
      });

      recipientForm.reset();
      fetchRecipients();
    } catch (error) {
      console.error('Error adding recipient:', error);
      toast({
        title: "Error",
        description: "Failed to add recipient",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async (data: z.infer<typeof emailFormSchema>) => {
    setIsSending(true);
    try {
      // Get template content based on selection
      let templateContent;
      switch (data.template) {
        case 'newsletter':
          templateContent = newsletterTemplate;
          break;
        case 'promotion':
          templateContent = promotionTemplate;
          break;
        case 'welcome':
          templateContent = welcomeTemplate;
          break;
        case 'service':
          templateContent = serviceTemplate;
          break;
        default:
          templateContent = newsletterTemplate;
      }

      const recipientsList = data.recipients.split(',').map(email => email.trim());
      
      // Prepare scheduling information if applicable
      let scheduledAt = null;
      if (data.scheduledDate && data.scheduledTime) {
        scheduledAt = new Date(`${data.scheduledDate}T${data.scheduledTime}`).toISOString();
      }

      // Call the email-marketing edge function
      const { data: result, error } = await supabase.functions.invoke('email-marketing', {
        body: {
          subject: data.subject,
          recipients: recipientsList,
          templateType: data.template,
          templateContent,
          scheduledAt
        }
      });

      if (error) throw error;

      toast({
        title: scheduledAt ? "Email Scheduled" : "Email Sent",
        description: scheduledAt ? "Your email has been scheduled successfully" : "Your email has been sent successfully",
      });

      emailForm.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="compose" className="flex items-center">
            <SendIcon className="w-4 h-4 mr-2" />
            Compose Email
          </TabsTrigger>
          <TabsTrigger value="recipients" className="flex items-center">
            <UsersIcon className="w-4 h-4 mr-2" />
            Manage Recipients
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <MailIcon className="w-4 h-4 mr-2" />
            Email Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compose Marketing Email</CardTitle>
              <CardDescription>
                Create and send marketing emails to your audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(sendEmail)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="recipients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipients</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter email addresses separated by commas" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Template</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedTemplate(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="newsletter">Newsletter</SelectItem>
                            <SelectItem value="promotion">Promotion</SelectItem>
                            <SelectItem value="welcome">Welcome</SelectItem>
                            <SelectItem value="service">Service Highlight</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={emailForm.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule Date (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="scheduledTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule Time (Optional)</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border p-4 rounded-md bg-muted/30">
                    <h3 className="font-medium mb-2">Template Preview:</h3>
                    <div className="text-sm text-muted-foreground">
                      {selectedTemplate === 'newsletter' && (
                        <>
                          <p><strong>Title:</strong> {newsletterTemplate.title}</p>
                          <p><strong>Intro:</strong> {newsletterTemplate.intro}</p>
                          <p><strong>Message:</strong> {newsletterTemplate.message}</p>
                        </>
                      )}
                      {selectedTemplate === 'promotion' && (
                        <>
                          <p><strong>Title:</strong> {promotionTemplate.title}</p>
                          <p><strong>Intro:</strong> {promotionTemplate.intro}</p>
                          <p><strong>Offer:</strong> {promotionTemplate.offerTitle}</p>
                        </>
                      )}
                      {selectedTemplate === 'welcome' && (
                        <>
                          <p><strong>Title:</strong> {welcomeTemplate.title}</p>
                          <p><strong>Intro:</strong> {welcomeTemplate.intro}</p>
                          <p><strong>Service:</strong> {welcomeTemplate.service}</p>
                        </>
                      )}
                      {selectedTemplate === 'service' && (
                        <>
                          <p><strong>Title:</strong> {serviceTemplate.title}</p>
                          <p><strong>Intro:</strong> {serviceTemplate.intro}</p>
                          <p><strong>Service:</strong> {serviceTemplate.serviceName}</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={isSending} className="w-full">
                    {isSending ? "Sending..." : emailForm.watch("scheduledDate") ? "Schedule Email" : "Send Email"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Add Recipient</CardTitle>
                <CardDescription>
                  Add new subscribers to your mailing list
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...recipientForm}>
                  <form onSubmit={recipientForm.handleSubmit(addRecipient)} className="space-y-4">
                    <FormField
                      control={recipientForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipientForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipientForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={recipientForm.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <TagIcon className="mr-2 h-4 w-4 opacity-50" />
                              <Input placeholder="customer, lead, partner (comma separated)" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Adding..." : "Add Recipient"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recipients List</CardTitle>
                <CardDescription>
                  Manage your mailing list subscribers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Tags</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">Loading recipients...</TableCell>
                        </TableRow>
                      ) : recipients.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">No recipients found</TableCell>
                        </TableRow>
                      ) : (
                        recipients.map((recipient) => (
                          <TableRow key={recipient.id}>
                            <TableCell>{recipient.name}</TableCell>
                            <TableCell>{recipient.email}</TableCell>
                            <TableCell>{recipient.company || '-'}</TableCell>
                            <TableCell>
                              {recipient.tags ? 
                                recipient.tags.map((tag: string) => (
                                  <span key={tag} className="inline-block bg-muted rounded-full px-2 py-1 text-xs mr-1 mb-1">
                                    {tag}
                                  </span>
                                )) : '-'
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Template</CardTitle>
                <CardDescription>
                  Edit your newsletter email template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newsletter-title">Title</Label>
                      <Input 
                        id="newsletter-title"
                        value={newsletterTemplate.title}
                        onChange={(e) => setNewsletterTemplate({...newsletterTemplate, title: e.target.value})}
                        placeholder="Newsletter Title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsletter-intro">Introduction</Label>
                      <Input 
                        id="newsletter-intro"
                        value={newsletterTemplate.intro}
                        onChange={(e) => setNewsletterTemplate({...newsletterTemplate, intro: e.target.value})}
                        placeholder="Newsletter Introduction"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsletter-message">Main Message</Label>
                      <Textarea 
                        id="newsletter-message"
                        value={newsletterTemplate.message}
                        onChange={(e) => setNewsletterTemplate({...newsletterTemplate, message: e.target.value})}
                        placeholder="Newsletter Message"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newsletter-cta-text">CTA Text</Label>
                      <Input 
                        id="newsletter-cta-text"
                        value={newsletterTemplate.ctaText}
                        onChange={(e) => setNewsletterTemplate({...newsletterTemplate, ctaText: e.target.value})}
                        placeholder="Call to Action Text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsletter-cta-link">CTA Link</Label>
                      <Input 
                        id="newsletter-cta-link"
                        value={newsletterTemplate.ctaLink}
                        onChange={(e) => setNewsletterTemplate({...newsletterTemplate, ctaLink: e.target.value})}
                        placeholder="Call to Action URL"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promotion Template</CardTitle>
                <CardDescription>
                  Edit your promotional email template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="promo-title">Title</Label>
                      <Input 
                        id="promo-title"
                        value={promotionTemplate.title}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, title: e.target.value})}
                        placeholder="Promotion Title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="promo-intro">Introduction</Label>
                      <Input 
                        id="promo-intro"
                        value={promotionTemplate.intro}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, intro: e.target.value})}
                        placeholder="Promotion Introduction"
                      />
                    </div>
                    <div>
                      <Label htmlFor="promo-offer-title">Offer Title</Label>
                      <Input 
                        id="promo-offer-title"
                        value={promotionTemplate.offerTitle}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, offerTitle: e.target.value})}
                        placeholder="Offer Title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="promo-offer-desc">Offer Description</Label>
                      <Textarea 
                        id="promo-offer-desc"
                        value={promotionTemplate.offerDescription}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, offerDescription: e.target.value})}
                        placeholder="Offer Description"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="promo-message">Main Message</Label>
                      <Textarea 
                        id="promo-message"
                        value={promotionTemplate.message}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, message: e.target.value})}
                        placeholder="Promotion Message"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="promo-cta-text">CTA Text</Label>
                      <Input 
                        id="promo-cta-text"
                        value={promotionTemplate.ctaText}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, ctaText: e.target.value})}
                        placeholder="Call to Action Text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="promo-cta-link">CTA Link</Label>
                      <Input 
                        id="promo-cta-link"
                        value={promotionTemplate.ctaLink}
                        onChange={(e) => setPromotionTemplate({...promotionTemplate, ctaLink: e.target.value})}
                        placeholder="Call to Action URL"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Welcome Template</CardTitle>
                <CardDescription>
                  Edit your welcome email template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="welcome-title">Title</Label>
                      <Input 
                        id="welcome-title"
                        value={welcomeTemplate.title}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, title: e.target.value})}
                        placeholder="Welcome Title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="welcome-intro">Introduction</Label>
                      <Input 
                        id="welcome-intro"
                        value={welcomeTemplate.intro}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, intro: e.target.value})}
                        placeholder="Welcome Introduction"
                      />
                    </div>
                    <div>
                      <Label htmlFor="welcome-service">Service</Label>
                      <Input 
                        id="welcome-service"
                        value={welcomeTemplate.service}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, service: e.target.value})}
                        placeholder="Service Type"
                      />
                    </div>
                    <div>
                      <Label htmlFor="welcome-custom">Custom Message</Label>
                      <Textarea 
                        id="welcome-custom"
                        value={welcomeTemplate.customMessage}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, customMessage: e.target.value})}
                        placeholder="Custom Welcome Message"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="welcome-message">Main Message</Label>
                      <Textarea 
                        id="welcome-message"
                        value={welcomeTemplate.message}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, message: e.target.value})}
                        placeholder="Welcome Message"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="welcome-cta-text">CTA Text</Label>
                      <Input 
                        id="welcome-cta-text"
                        value={welcomeTemplate.ctaText}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, ctaText: e.target.value})}
                        placeholder="Call to Action Text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="welcome-cta-link">CTA Link</Label>
                      <Input 
                        id="welcome-cta-link"
                        value={welcomeTemplate.ctaLink}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, ctaLink: e.target.value})}
                        placeholder="Call to Action URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="welcome-calendly">Calendly Link</Label>
                      <Input 
                        id="welcome-calendly"
                        value={welcomeTemplate.calendlyLink}
                        onChange={(e) => setWelcomeTemplate({...welcomeTemplate, calendlyLink: e.target.value})}
                        placeholder="Booking Link"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Highlight Template</CardTitle>
                <CardDescription>
                  Edit your service highlight email template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="service-title">Title</Label>
                      <Input 
                        id="service-title"
                        value={serviceTemplate.title}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, title: e.target.value})}
                        placeholder="Service Email Title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-intro">Introduction</Label>
                      <Input 
                        id="service-intro"
                        value={serviceTemplate.intro}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, intro: e.target.value})}
                        placeholder="Service Introduction"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-name">Service Name</Label>
                      <Input 
                        id="service-name"
                        value={serviceTemplate.serviceName}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, serviceName: e.target.value})}
                        placeholder="Service Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-desc">Service Description</Label>
                      <Textarea 
                        id="service-desc"
                        value={serviceTemplate.serviceDescription}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, serviceDescription: e.target.value})}
                        placeholder="Service Description"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="service-message">Main Message</Label>
                      <Textarea 
                        id="service-message"
                        value={serviceTemplate.message}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, message: e.target.value})}
                        placeholder="Service Message"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-cta-text">CTA Text</Label>
                      <Input 
                        id="service-cta-text"
                        value={serviceTemplate.ctaText}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, ctaText: e.target.value})}
                        placeholder="Call to Action Text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-cta-link">CTA Link</Label>
                      <Input 
                        id="service-cta-link"
                        value={serviceTemplate.ctaLink}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, ctaLink: e.target.value})}
                        placeholder="Call to Action URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-learn-more">Learn More Link</Label>
                      <Input 
                        id="service-learn-more"
                        value={serviceTemplate.learnMoreLink}
                        onChange={(e) => setServiceTemplate({...serviceTemplate, learnMoreLink: e.target.value})}
                        placeholder="Learn More Link"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketingTab;
