
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Send, Upload, UserPlus, CalendarClock } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';

// Template types
const templateTypes = [
  { value: 'welcome', label: 'Welcome Email' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'promotion', label: 'Promotion/Offer' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'service_announcement', label: 'Service Announcement' },
];

// Example recipient lists - in a real app, these would come from your database
const recipientLists = [
  { value: 'all', label: 'All Contacts' },
  { value: 'leads', label: 'Recent Leads' },
  { value: 'newsletter', label: 'Newsletter Subscribers' },
  { value: 'clients', label: 'Existing Clients' },
  { value: 'custom', label: 'Custom List' },
];

// For demo purposes
const mockRecipients = {
  all: [
    { email: 'contact1@example.com', name: 'Contact One', company: 'Company A' },
    { email: 'contact2@example.com', name: 'Contact Two', company: 'Company B' },
    { email: 'contact3@example.com', name: 'Contact Three', company: 'Company C' },
  ],
  leads: [
    { email: 'lead1@example.com', name: 'Lead One', company: 'Company D' },
    { email: 'lead2@example.com', name: 'Lead Two', company: 'Company E' },
  ],
  newsletter: [
    { email: 'subscriber1@example.com', name: 'Subscriber One' },
    { email: 'subscriber2@example.com', name: 'Subscriber Two' },
    { email: 'subscriber3@example.com', name: 'Subscriber Three' },
  ],
  clients: [
    { email: 'client1@example.com', name: 'Client One', company: 'Client Company A' },
    { email: 'client2@example.com', name: 'Client Two', company: 'Client Company B' },
  ],
  custom: [],
};

const EmailMarketingTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [isLoading, setIsLoading] = useState(false);
  const [templateType, setTemplateType] = useState('welcome');
  const [subject, setSubject] = useState('');
  const [previewEmail, setPreviewEmail] = useState('');
  const [recipientListType, setRecipientListType] = useState('leads');
  const [customRecipients, setCustomRecipients] = useState('');
  const [senderName, setSenderName] = useState('InnovateHub');
  const [senderEmail, setSenderEmail] = useState('marketing@innovatehub.ph');
  const [replyToEmail, setReplyToEmail] = useState('businessdevelopment@innovatehub.ph');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [templateData, setTemplateData] = useState({
    title: '',
    intro: '',
    message: '',
    ctaLink: 'https://innovatehub.ph/services',
    ctaText: 'Learn More',
  });

  // Handle sending a test email
  const handleSendTest = async () => {
    if (!previewEmail || !subject) {
      toast.error('Please provide a subject and test email address');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('email-marketing', {
        body: {
          templateType,
          subject,
          recipients: [{ email: previewEmail }],
          templateData,
          senderName,
          senderEmail,
          replyTo: replyToEmail,
        },
      });

      if (error) throw error;
      
      toast.success('Test email sent successfully!');
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Failed to send test email. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending the campaign
  const handleSendCampaign = async () => {
    if (!subject) {
      toast.error('Please provide a subject for your email');
      return;
    }

    // Get recipients based on selected list
    let recipients = mockRecipients[recipientListType as keyof typeof mockRecipients];
    
    // If custom list, parse the textarea input
    if (recipientListType === 'custom') {
      if (!customRecipients.trim()) {
        toast.error('Please add at least one recipient email');
        return;
      }
      
      // Parse custom recipients - expecting one email per line or comma-separated
      recipients = customRecipients.split(/[\n,]/)
        .map(email => email.trim())
        .filter(email => email && email.includes('@'))
        .map(email => ({ email }));
    }

    if (recipients.length === 0) {
      toast.error('No valid recipients found');
      return;
    }

    setIsLoading(true);
    try {
      const campaignData = {
        templateType,
        subject,
        recipients,
        templateData,
        senderName,
        senderEmail,
        replyTo: replyToEmail,
        scheduledFor: isScheduled && scheduledDate ? scheduledDate.toISOString() : undefined,
      };

      const { data, error } = await supabase.functions.invoke('email-marketing', {
        body: campaignData,
      });

      if (error) throw error;
      
      if (isScheduled && scheduledDate) {
        toast.success(`Campaign scheduled for ${scheduledDate.toLocaleString()}`);
      } else {
        toast.success(`Campaign sent! ${data.sent} emails delivered, ${data.failed} failed.`);
      }
      
      // Reset form after successful send
      setSubject('');
      setTemplateData({
        title: '',
        intro: '',
        message: '',
        ctaLink: 'https://innovatehub.ph/services',
        ctaText: 'Learn More',
      });
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Failed to send campaign. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic template fields based on selected template type
  const renderTemplateFields = () => {
    switch (templateType) {
      case 'welcome':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="ctaLink">CTA Button Link</Label>
              <Input
                id="ctaLink"
                value={templateData.ctaLink}
                onChange={(e) => setTemplateData({...templateData, ctaLink: e.target.value})}
                placeholder="https://innovatehub.ph/services"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ctaText">CTA Button Text</Label>
              <Input
                id="ctaText"
                value={templateData.ctaText}
                onChange={(e) => setTemplateData({...templateData, ctaText: e.target.value})}
                placeholder="Explore Our Services"
              />
            </div>
          </>
        );
      
      case 'newsletter':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Newsletter Title</Label>
              <Input
                id="title"
                value={templateData.title}
                onChange={(e) => setTemplateData({...templateData, title: e.target.value})}
                placeholder="InnovateHub Monthly Newsletter"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="intro">Introduction Text</Label>
              <Textarea
                id="intro"
                value={templateData.intro}
                onChange={(e) => setTemplateData({...templateData, intro: e.target.value})}
                placeholder="Here are the latest updates from InnovateHub..."
                rows={3}
              />
            </div>
            {/* In a real app, you would add support for adding multiple articles */}
          </>
        );
      
      case 'promotion':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Promotion Title</Label>
              <Input
                id="title"
                value={templateData.title}
                onChange={(e) => setTemplateData({...templateData, title: e.target.value})}
                placeholder="Special Offer"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="intro">Introduction Text</Label>
              <Textarea
                id="intro"
                value={templateData.intro}
                onChange={(e) => setTemplateData({...templateData, intro: e.target.value})}
                placeholder="We have an exciting offer just for you!"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="offerTitle">Offer Title</Label>
              <Input
                id="offerTitle"
                value={templateData.offerTitle || ''}
                onChange={(e) => setTemplateData({...templateData, offerTitle: e.target.value})}
                placeholder="Limited Time Offer"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="offerDescription">Offer Description</Label>
              <Textarea
                id="offerDescription"
                value={templateData.offerDescription || ''}
                onChange={(e) => setTemplateData({...templateData, offerDescription: e.target.value})}
                placeholder="Description of your special offer or promotion"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ctaLink">CTA Button Link</Label>
              <Input
                id="ctaLink"
                value={templateData.ctaLink}
                onChange={(e) => setTemplateData({...templateData, ctaLink: e.target.value})}
                placeholder="https://innovatehub.ph/contact"
              />
            </div>
          </>
        );
      
      case 'follow_up':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="service">Service Name</Label>
              <Input
                id="service"
                value={templateData.service || ''}
                onChange={(e) => setTemplateData({...templateData, service: e.target.value})}
                placeholder="Digital Customizations"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="customMessage">Custom Message</Label>
              <Textarea
                id="customMessage"
                value={templateData.customMessage || ''}
                onChange={(e) => setTemplateData({...templateData, customMessage: e.target.value})}
                placeholder="Our team is ready to assist you with any inquiries..."
                rows={3}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="calendlyLink">Booking Link</Label>
              <Input
                id="calendlyLink"
                value={templateData.calendlyLink || ''}
                onChange={(e) => setTemplateData({...templateData, calendlyLink: e.target.value})}
                placeholder="https://innovatehub.ph/contact"
              />
            </div>
          </>
        );
      
      case 'service_announcement':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Announcement Title</Label>
              <Input
                id="title"
                value={templateData.title}
                onChange={(e) => setTemplateData({...templateData, title: e.target.value})}
                placeholder="New Service Announcement"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={templateData.serviceName || ''}
                onChange={(e) => setTemplateData({...templateData, serviceName: e.target.value})}
                placeholder="AI Solutions"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="serviceDescription">Service Description</Label>
              <Textarea
                id="serviceDescription"
                value={templateData.serviceDescription || ''}
                onChange={(e) => setTemplateData({...templateData, serviceDescription: e.target.value})}
                placeholder="Description of your new service..."
                rows={3}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="learnMoreLink">Learn More Link</Label>
              <Input
                id="learnMoreLink"
                value={templateData.learnMoreLink || ''}
                onChange={(e) => setTemplateData({...templateData, learnMoreLink: e.target.value})}
                placeholder="https://innovatehub.ph/services"
              />
            </div>
          </>
        );
      
      default:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Email Title</Label>
              <Input
                id="title"
                value={templateData.title}
                onChange={(e) => setTemplateData({...templateData, title: e.target.value})}
                placeholder="Message from InnovateHub"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="message">Email Message</Label>
              <Textarea
                id="message"
                value={templateData.message}
                onChange={(e) => setTemplateData({...templateData, message: e.target.value})}
                placeholder="Your message content here..."
                rows={5}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ctaLink">CTA Button Link (Optional)</Label>
              <Input
                id="ctaLink"
                value={templateData.ctaLink}
                onChange={(e) => setTemplateData({...templateData, ctaLink: e.target.value})}
                placeholder="https://innovatehub.ph/"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ctaText">CTA Button Text</Label>
              <Input
                id="ctaText"
                value={templateData.ctaText}
                onChange={(e) => setTemplateData({...templateData, ctaText: e.target.value})}
                placeholder="Learn More"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">
            <Mail className="w-4 h-4 mr-2" />
            Compose Email
          </TabsTrigger>
          <TabsTrigger value="recipients">
            <UserPlus className="w-4 h-4 mr-2" />
            Recipients
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Send className="w-4 h-4 mr-2" />
            Send Options
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compose Marketing Email</CardTitle>
              <CardDescription>
                Create professional marketing emails using our templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="templateType">Email Template</Label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.map((template) => (
                      <SelectItem key={template.value} value={template.value}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject line"
                />
              </div>
              
              {renderTemplateFields()}
              
              <div className="mb-4">
                <Label htmlFor="previewEmail">Send Test To</Label>
                <div className="flex gap-2">
                  <Input
                    id="previewEmail"
                    value={previewEmail}
                    onChange={(e) => setPreviewEmail(e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                  />
                  <Button 
                    onClick={handleSendTest} 
                    disabled={isLoading || !previewEmail}
                    variant="outline"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recipients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Recipients</CardTitle>
              <CardDescription>
                Choose who will receive this email campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="recipientList">Recipient List</Label>
                <Select value={recipientListType} onValueChange={setRecipientListType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipientLists.map((list) => (
                      <SelectItem key={list.value} value={list.value}>
                        {list.label} {list.value !== 'custom' ? `(${mockRecipients[list.value as keyof typeof mockRecipients].length})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {recipientListType === 'custom' && (
                <div className="mb-4">
                  <Label htmlFor="customRecipients">Custom Recipients</Label>
                  <Textarea
                    id="customRecipients"
                    value={customRecipients}
                    onChange={(e) => setCustomRecipients(e.target.value)}
                    placeholder="Enter email addresses (one per line or comma-separated)"
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter one email address per line or separate with commas
                  </p>
                </div>
              )}
              
              {recipientListType !== 'custom' && (
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Recipients Preview</h3>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Email</th>
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Company</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockRecipients[recipientListType as keyof typeof mockRecipients].map((recipient, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{recipient.email}</td>
                            <td className="py-2">{recipient.name || '-'}</td>
                            <td className="py-2">{recipient.company || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {mockRecipients[recipientListType as keyof typeof mockRecipients].length} recipients in this list
                  </p>
                </div>
              )}
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CSV Contact List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings & Sending Options</CardTitle>
              <CardDescription>
                Configure sender information and schedule your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="InnovateHub"
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="senderEmail">Sender Email</Label>
                <Input
                  id="senderEmail"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="marketing@innovatehub.ph"
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="replyToEmail">Reply-To Email</Label>
                <Input
                  id="replyToEmail"
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  placeholder="businessdevelopment@innovatehub.ph"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
                <Label htmlFor="schedule" className="flex items-center">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Schedule for later
                </Label>
              </div>
              
              {isScheduled && (
                <div className="mt-4">
                  <Label htmlFor="scheduleDate">Select Date and Time</Label>
                  <div className="mt-2">
                    <DatePicker
                      date={scheduledDate}
                      setDate={setScheduledDate}
                      showTimePicker={true}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSendCampaign} 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isScheduled ? 'Schedule Campaign' : 'Send Campaign'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketingTab;
