
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Plus, 
  Send, 
  Calendar, 
  Edit, 
  Eye, 
  Copy, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar as CalendarIcon,
  Users
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { EmailCampaign } from '@/utils/aiProviders';
import { useQuery } from '@tanstack/react-query';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Campaign name must be at least 2 characters.' }),
  subject: z.string().min(5, { message: 'Subject line must be at least 5 characters.' }),
  content: z.string().min(10, { message: 'Email content must be at least 10 characters.' }),
  template: z.string().optional(),
  scheduledAt: z.string().optional(),
});

const CampaignManager: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('drafts');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subject: '',
      content: '',
      template: '',
      scheduledAt: '',
    },
  });

  // Fetch campaigns from Supabase
  const { data: campaigns, isLoading, error, refetch } = useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_campaigns')
          .select('*');
        
        if (error) throw error;
        
        return data as EmailCampaign[];
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        return [] as EmailCampaign[];
      }
    }
  });

  // Helper for filtering campaigns
  const filteredCampaigns = () => {
    if (!campaigns) return [];
    
    switch (activeTab) {
      case 'drafts':
        return campaigns.filter(c => c.status === 'draft');
      case 'scheduled':
        return campaigns.filter(c => c.status === 'scheduled');
      case 'sent':
        return campaigns.filter(c => c.status === 'sent');
      case 'all':
      default:
        return campaigns;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing && selectedCampaign) {
        // Update existing campaign
        const { error } = await supabase
          .from('marketing_campaigns')
          .update({
            name: values.name,
            subject: values.subject,
            content: values.content,
            template: values.template,
            scheduled_at: values.scheduledAt ? new Date(values.scheduledAt).toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedCampaign.id);
          
        if (error) throw error;
      } else {
        // Create new campaign
        const { error } = await supabase
          .from('marketing_campaigns')
          .insert({
            name: values.name,
            subject: values.subject,
            content: values.content,
            template: values.template || null,
            scheduled_at: values.scheduledAt ? new Date(values.scheduledAt).toISOString() : null,
            status: 'draft',
          });
          
        if (error) throw error;
      }
      
      await refetch();
      
      toast({
        title: isEditing ? "Campaign updated" : "Campaign created",
        description: `Your campaign has been ${isEditing ? 'updated' : 'created'} successfully.`,
      });
      
      form.reset();
      setIsCreateDialogOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast({
        title: "Failed to save campaign",
        description: "There was an error saving your campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCampaign = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setIsEditing(true);
    
    form.reset({
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content,
      template: campaign.template || '',
      scheduledAt: campaign.scheduledAt ? new Date(campaign.scheduledAt).toISOString().slice(0, 16) : '',
    });
    
    setIsCreateDialogOpen(true);
  };

  const handlePreviewCampaign = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setIsPreviewDialogOpen(true);
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('marketing_campaigns')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      await refetch();
      
      toast({
        title: "Campaign deleted",
        description: "Your campaign has been deleted successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Failed to delete campaign",
        description: "There was an error deleting your campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scheduleCampaign = async (id: string, scheduledTime: string) => {
    try {
      if (!scheduledTime) {
        toast({
          title: "Schedule time required",
          description: "Please select when you want to send this campaign.",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('marketing_campaigns')
        .update({
          status: 'scheduled',
          scheduled_at: new Date(scheduledTime).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
        
      if (error) throw error;
      
      await refetch();
      
      toast({
        title: "Campaign scheduled",
        description: "Your campaign has been scheduled successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error scheduling campaign:', error);
      toast({
        title: "Failed to schedule campaign",
        description: "There was an error scheduling your campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="flex items-center gap-1"><Edit className="w-3 h-3" /> Draft</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"><Clock className="w-3 h-3" /> Scheduled</Badge>;
      case 'sent':
        return <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3" /> Sent</Badge>;
      case 'failed':
        return <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200"><AlertCircle className="w-3 h-3" /> Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Email Campaigns</h2>
          <p className="text-muted-foreground">Create and manage your InnovateHub email marketing campaigns</p>
        </div>
        <Button 
          onClick={() => {
            form.reset();
            setIsEditing(false);
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="pt-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center text-red-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Error loading campaigns
                </div>
                <p className="text-sm text-red-600 mt-2">Please try again later</p>
              </CardContent>
            </Card>
          ) : filteredCampaigns().length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-4 text-center">
                <p className="text-muted-foreground">No campaigns found</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                    setIsCreateDialogOpen(true);
                  }}
                  className="mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCampaigns().map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <span>Subject: {campaign.subject}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="text-sm text-muted-foreground line-clamp-3">
                      {campaign.content}
                    </div>
                    
                    {campaign.scheduledAt && (
                      <div className="flex items-center text-xs text-muted-foreground mt-3">
                        <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                        Scheduled for: {new Date(campaign.scheduledAt).toLocaleString()}
                      </div>
                    )}
                    
                    {campaign.recipientCount && (
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <UsersIcon className="w-3.5 h-3.5 mr-1" />
                        Recipients: {campaign.recipientCount}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between gap-2 pt-2">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePreviewCampaign(campaign)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      
                      {campaign.status === 'draft' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditCampaign(campaign)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {campaign.status === 'draft' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Send className="w-4 h-4 mr-1" />
                              Schedule
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Schedule Campaign</DialogTitle>
                              <DialogDescription>
                                When would you like to send this campaign?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Form {...form}>
                                <FormField
                                  control={form.control}
                                  name="scheduledAt"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Schedule Date</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="datetime-local" 
                                          {...field} 
                                          min={new Date().toISOString().slice(0, 16)} 
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Choose when this campaign should be sent.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </Form>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={() => scheduleCampaign(campaign.id, form.getValues().scheduledAt || '')}
                                disabled={!form.getValues().scheduledAt}
                              >
                                Schedule Campaign
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create/Edit Campaign Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Make changes to your campaign details below.'
                : 'Fill in the details below to create a new email campaign.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Promotion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="update">Product Update</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Line</FormLabel>
                    <FormControl>
                      <Input placeholder="Exciting news from InnovateHub!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your email content here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {isEditing ? 'Save Changes' : 'Create Campaign'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Preview Campaign Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Campaign Preview</DialogTitle>
            <DialogDescription>
              Preview how your campaign will appear to recipients
            </DialogDescription>
          </DialogHeader>
          
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm text-muted-foreground">From: InnovateHub &lt;marketing@innovatehub.ph&gt;</p>
                <p className="text-sm text-muted-foreground">To: [Recipient]</p>
                <p className="text-sm font-medium mt-2">Subject: {selectedCampaign.subject}</p>
              </div>
              
              <div className="py-4">
                <div className="whitespace-pre-wrap">
                  {selectedCampaign.content}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground border-t pt-2">
                <p>© 2024 InnovateHub Inc. All rights reserved.</p>
                <p>RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
                <p className="mt-1">[Unsubscribe link will appear here]</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignManager;
