
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { EmailCampaign } from '@/utils/aiProviders';
import { Loader2, Send, Plus, Calendar, CheckCircle2, XCircle, Clock, Pencil, Trash2, Users } from 'lucide-react';

type EmailStatus = 'draft' | 'scheduled' | 'sent' | 'failed';

const CampaignManager = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [campaignStatus, setCampaignStatus] = useState<EmailStatus>('draft');
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: 'Error fetching campaigns',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .insert({
          name: campaignName,
          subject: campaignSubject,
          content: campaignContent,
          status: campaignStatus
        })
        .select()
        .single();

      if (error) throw error;
      setCampaigns(prev => [data as EmailCampaign, ...prev]);
      setOpenCreateDialog(false);
      setCampaignName('');
      setCampaignSubject('');
      setCampaignContent('');
      setCampaignStatus('draft');
      toast({
        title: 'Campaign created',
        description: 'Your new campaign has been created'
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Error creating campaign',
        description: 'Please try again later',
        variant: 'destructive'
      });
    }
  };

  const updateCampaign = async () => {
    if (!selectedCampaign) return;

    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .update({
          name: campaignName,
          subject: campaignSubject,
          content: campaignContent,
          status: campaignStatus
        })
        .eq('id', selectedCampaign.id)
        .select()
        .single();

      if (error) throw error;
      setCampaigns(prev =>
        prev.map(campaign => (campaign.id === selectedCampaign.id ? data as EmailCampaign : campaign))
      );
      setOpenEditDialog(false);
      setSelectedCampaign(null);
      setCampaignName('');
      setCampaignSubject('');
      setCampaignContent('');
      setCampaignStatus('draft');
      toast({
        title: 'Campaign updated',
        description: 'Campaign has been updated successfully'
      });
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast({
        title: 'Error updating campaign',
        description: 'Please try again later',
        variant: 'destructive'
      });
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      const { error } = await supabase
        .from('marketing_campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw error;
      setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
      toast({
        title: 'Campaign deleted',
        description: 'Campaign has been deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: 'Error deleting campaign',
        description: 'Please try again later',
        variant: 'destructive'
      });
    }
  };

  const handleEditClick = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setCampaignName(campaign.name);
    setCampaignSubject(campaign.subject);
    setCampaignContent(campaign.content);
    setCampaignStatus(campaign.status);
    setOpenEditDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Campaign Management</h2>
          <p className="text-muted-foreground">
            Create and manage your email marketing campaigns
          </p>
        </div>
        <Button onClick={() => setOpenCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Recipients
            </CardTitle>
          </CardHeader>
          <CardContent>
            Manage your email recipients and lists.
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-green-600" />
              Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent>
            Schedule your email campaigns for optimal send times.
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-purple-600" />
              Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            Automate your email marketing workflows for efficiency.
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No campaigns created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map(campaign => (
            <Card key={campaign.id} className="border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{campaign.name}</CardTitle>
                <Badge variant="secondary">{campaign.status}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {campaign.subject}
                </p>
              </CardContent>
              <div className="flex justify-end space-x-2 p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(campaign)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteCampaign(campaign.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogTrigger asChild>
          <Button>Create Campaign</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={campaignSubject}
                onChange={e => setCampaignSubject(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={campaignContent}
                onChange={e => setCampaignContent(e.target.value)}
                className="col-span-3 min-h-[150px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={campaignStatus} onValueChange={value => setCampaignStatus(value as EmailStatus)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setOpenCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createCampaign}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogTrigger asChild>
          <Button>Edit Campaign</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={campaignSubject}
                onChange={e => setCampaignSubject(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={campaignContent}
                onChange={e => setCampaignContent(e.target.value)}
                className="col-span-3 min-h-[150px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={campaignStatus} onValueChange={value => setCampaignStatus(value as EmailStatus)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={updateCampaign}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignManager;
