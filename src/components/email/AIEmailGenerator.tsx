
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Send, MessagesSquare, Sparkles } from 'lucide-react';

type EmailTemplate = 'welcome' | 'newsletter' | 'promotion' | 'followup' | 'service' | 'confirmation' | 'custom';

interface AIEmailGeneratorProps {
  onEmailGenerated?: (content: string, metadata?: any) => void;
  initialTemplate?: EmailTemplate;
  initialRecipients?: string[];
  showSendOption?: boolean;
}

const AIEmailGenerator: React.FC<AIEmailGeneratorProps> = ({
  onEmailGenerated,
  initialTemplate = 'newsletter',
  initialRecipients = [],
  showSendOption = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState<EmailTemplate>(initialTemplate);
  const [keyPoints, setKeyPoints] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('information');
  const [tone, setTone] = useState<string>('professional');
  const [recipients, setRecipients] = useState<string>(initialRecipients.join(', '));
  const [sendImmediately, setSendImmediately] = useState<boolean>(false);
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [generationMetadata, setGenerationMetadata] = useState<any>(null);

  const generateEmail = async () => {
    if (!subject.trim()) {
      toast.error('Please provide a subject for your email');
      return;
    }

    if (!keyPoints.trim()) {
      toast.error('Please provide some key points for your email');
      return;
    }

    setIsLoading(true);
    try {
      const recipientList = recipients
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);

      // Convert key points to array
      const keyPointsArray = keyPoints
        .split('\n')
        .map(point => point.trim())
        .filter(point => point.length > 0);
      
      const { data, error } = await supabase.functions.invoke('multi-agent-generate', {
        body: {
          content: keyPoints,
          agentType: 'email-generator',
          parameters: {
            template,
            subject,
            purpose,
            tone,
            key_points: keyPointsArray,
            recipient: recipientList.length > 0 ? 'valued customer' : 'valued customers',
            recipients: recipientList,
            sendEmail: sendImmediately && recipientList.length > 0,
            templateType: template
          }
        },
      });

      if (error) throw error;

      setGeneratedEmail(data.text);
      setGenerationMetadata(data.metadata);
      
      if (onEmailGenerated) {
        onEmailGenerated(data.text, data.metadata);
      }

      if (sendImmediately && recipientList.length > 0) {
        if (data.metadata?.emailSent) {
          toast.success(`Email sent to ${recipientList.length} recipient(s)!`);
        } else {
          toast.error('Failed to send email. Please check the logs for details.');
        }
      } else {
        toast.success('Email generated successfully!');
      }
    } catch (error) {
      console.error('Error generating email:', error);
      toast.error('Failed to generate email: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const sendGeneratedEmail = async () => {
    if (!generatedEmail || recipientsList.length === 0) {
      toast.error('Please generate an email and add recipients first');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('email-marketing', {
        body: {
          subject: subject || 'Message from InnovateHub',
          recipients: recipientsList,
          templateType: template,
          templateContent: {
            title: subject,
            intro: purpose,
            message: generatedEmail,
            ctaText: "Learn More",
            ctaLink: "https://innovatehub.ph"
          }
        },
      });

      if (error) throw error;

      if (data.success) {
        toast.success(`Email sent to ${recipientsList.length} recipient(s)!`);
      } else {
        throw new Error(data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const recipientsList = recipients
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-innovate-600" />
            AI Email Generator
          </CardTitle>
          <CardDescription>
            Generate professional emails using AI, tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select value={template} onValueChange={(value) => setTemplate(value as EmailTemplate)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="service">Service Update</SelectItem>
                  <SelectItem value="confirmation">Confirmation</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                placeholder="Enter the email subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="information">Share Information</SelectItem>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="followup">Follow Up</SelectItem>
                  <SelectItem value="invitation">Invitation</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="keyPoints">Key Points (one per line)</Label>
              <Textarea
                id="keyPoints"
                placeholder="Enter the key points for your email..."
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                rows={5}
              />
            </div>
            
            {showSendOption && (
              <>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="recipients">Recipients (comma separated)</Label>
                  <Textarea
                    id="recipients"
                    placeholder="Enter email addresses separated by commas..."
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    rows={2}
                  />
                  {recipientsList.length > 0 && (
                    <p className="text-xs text-muted-foreground">{recipientsList.length} recipient(s)</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 md:col-span-2">
                  <Switch
                    id="sendImmediately"
                    checked={sendImmediately}
                    onCheckedChange={setSendImmediately}
                  />
                  <Label htmlFor="sendImmediately">Send email immediately after generation</Label>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={isLoading}>
            <MessagesSquare className="mr-2 h-4 w-4" />
            Save as Template
          </Button>
          <Button onClick={generateEmail} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Email
          </Button>
        </CardFooter>
      </Card>

      {generatedEmail && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>
              AI-generated email ready to use or edit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-md whitespace-pre-line">
              {generatedEmail}
            </div>
            
            {generationMetadata?.emailSent && (
              <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 text-sm">
                  ✓ Email successfully sent to {recipientsList.length} recipient(s)
                </p>
              </div>
            )}
          </CardContent>
          {showSendOption && !sendImmediately && recipientsList.length > 0 && (
            <CardFooter>
              <Button 
                onClick={sendGeneratedEmail} 
                disabled={isLoading || !generatedEmail}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send Email to {recipientsList.length} Recipient(s)
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
};

export default AIEmailGenerator;
