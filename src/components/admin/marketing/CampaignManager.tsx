
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, MailIcon, Send, Calendar as CalendarIconFull } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MarketingCopyGenerator from './MarketingCopyGenerator';
import RecipientsList from './RecipientsList';

interface CampaignManagerProps {}

const CampaignManager: React.FC<CampaignManagerProps> = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now() + 24 * 60 * 60 * 1000)); // Tomorrow by default
  const [campaignData, setCampaignData] = useState({
    subject: '',
    content: '',
    template_type: 'newsletter'
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scheduled_emails')
        .select('*')
        .order('scheduled_at', { ascending: false });
        
      if (error) throw error;
      
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load email campaigns",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    try {
      if (!campaignData.subject || !campaignData.content || !date) {
        toast({
          title: "Error",
          description: "Please fill all required fields",
          variant: "destructive"
        });
        return;
      }
      
      if (selectedRecipients.length === 0) {
        toast({
          title: "Error",
          description: "Please select at least one recipient",
          variant: "destructive"
        });
        return;
      }
      
      const { error } = await supabase.from('scheduled_emails').insert({
        subject: campaignData.subject,
        template_content: { content: campaignData.content },
        template_type: campaignData.template_type,
        recipients: selectedRecipients,
        scheduled_at: date.toISOString(),
        sent: false
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Email campaign created successfully"
      });
      
      // Reset form and close dialog
      setCampaignData({
        subject: '',
        content: '',
        template_type: 'newsletter'
      });
      setSelectedRecipients([]);
      setShowNewCampaignDialog(false);
      
      // Refresh the list
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create email campaign",
        variant: "destructive"
      });
    }
  };

  const handleContentGenerated = (content: string) => {
    setCampaignData(prev => ({ ...prev, content }));
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl flex items-center">
              <MailIcon className="mr-2 h-5 w-5 text-innovate-600" />
              Email Campaigns
            </CardTitle>
            <CardDescription>
              Create and manage your email marketing campaigns
            </CardDescription>
          </div>
          <Button onClick={() => setShowNewCampaignDialog(true)}>
            <Send className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2">Subject</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Recipients</th>
                  <th className="text-left p-2">Scheduled for</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length > 0 ? (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-t">
                      <td className="p-2">{campaign.subject}</td>
                      <td className="p-2 capitalize">{campaign.template_type}</td>
                      <td className="p-2">{campaign.recipients?.length || 0}</td>
                      <td className="p-2">
                        {new Date(campaign.scheduled_at).toLocaleString()}
                      </td>
                      <td className="p-2">
                        <Badge 
                          variant={
                            campaign.sent 
                              ? "success" 
                              : new Date(campaign.scheduled_at) < new Date() 
                                ? "destructive" 
                                : "outline"
                          }
                        >
                          {campaign.sent 
                            ? "Sent" 
                            : new Date(campaign.scheduled_at) < new Date() 
                              ? "Missed" 
                              : "Scheduled"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center">
                      {loading ? "Loading campaigns..." : "No email campaigns found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Email Campaign</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select 
                  value={campaignData.template_type} 
                  onValueChange={(value) => setCampaignData({...campaignData, template_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={campaignData.subject}
                  onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                  placeholder="Enter email subject line"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Schedule Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP p") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        className="mt-1"
                        value={date ? format(date, "HH:mm") : ""}
                        onChange={(e) => {
                          if (date && e.target.value) {
                            const [hours, minutes] = e.target.value.split(':');
                            const newDate = new Date(date);
                            newDate.setHours(parseInt(hours), parseInt(minutes));
                            setDate(newDate);
                          }
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <MarketingCopyGenerator 
                onCopyGenerated={handleContentGenerated}
                type={campaignData.template_type as any}
              />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  value={campaignData.content}
                  onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                  placeholder="Enter email content"
                  className="min-h-[150px]"
                />
                <p className="text-xs text-muted-foreground">
                  This content will be sent from your @innovatehub.ph domain email.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Select Recipients</Label>
                <RecipientsList 
                  onSelectRecipients={setSelectedRecipients}
                  selectable={true}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">Selected: {selectedRecipients.length} recipients</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCampaign}>
              <CalendarIconFull className="mr-2 h-4 w-4" />
              Schedule Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampaignManager;
