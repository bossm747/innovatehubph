
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Gift, Sparkles, Target, Users, Clock, PlusCircle, Edit2, ArrowRight, Loader2, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const promotionTypes = [
  { id: 'discount', name: 'Discount', description: 'Percentage or fixed amount off' },
  { id: 'free_trial', name: 'Free Trial', description: 'Limited time free access' },
  { id: 'bundle', name: 'Bundle Deal', description: 'Multiple services at special price' },
  { id: 'limited_offer', name: 'Limited Time Offer', description: 'Special pricing for a limited period' },
  { id: 'referral', name: 'Referral Program', description: 'Rewards for referrals' },
];

const audienceTypes = [
  { id: 'new_leads', name: 'New Leads', description: 'First-time contacts' },
  { id: 'existing_clients', name: 'Existing Clients', description: 'Current customers' },
  { id: 'inactive', name: 'Inactive Clients', description: 'Previous clients without recent activity' },
  { id: 'high_value', name: 'High Value Prospects', description: 'Leads with high conversion probability' },
  { id: 'specific_interest', name: 'Interest-Based', description: 'Based on specific interest tags' },
];

const samplePromotions = [
  {
    id: '1',
    name: 'Summer Special',
    description: '20% off on all digital customization services',
    type: 'discount',
    audience: ['new_leads', 'inactive'],
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    status: 'active',
    conversionRate: 12.5,
  },
  {
    id: '2',
    name: 'PlataPay Agent Signup',
    description: 'Free setup and training for new PlataPay agents',
    type: 'free_trial',
    audience: ['new_leads', 'specific_interest'],
    startDate: '2024-06-15',
    endDate: '2024-12-31',
    status: 'active',
    conversionRate: 18.2,
  },
  {
    id: '3',
    name: 'Enterprise AI Bundle',
    description: 'AI consulting + implementation at packaged price',
    type: 'bundle',
    audience: ['existing_clients', 'high_value'],
    startDate: '2024-06-10',
    endDate: '2024-09-15',
    status: 'draft',
    conversionRate: 0,
  },
];

const PromotionsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');
  const [promotions, setPromotions] = useState(samplePromotions);
  const [showCreatePromotionDialog, setShowCreatePromotionDialog] = useState(false);
  const [loadingGenerateIdeas, setLoadingGenerateIdeas] = useState(false);
  const [promotionIdeas, setPromotionIdeas] = useState<string[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    audience: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
    specificInterests: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAudienceChange = (audience: string) => {
    setFormData(prev => {
      const newAudiences = prev.audience.includes(audience)
        ? prev.audience.filter(a => a !== audience)
        : [...prev.audience, audience];
      
      return { ...prev, audience: newAudiences };
    });
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => {
      const newInterests = prev.specificInterests.includes(interest)
        ? prev.specificInterests.filter(i => i !== interest)
        : [...prev.specificInterests, interest];
      
      return { ...prev, specificInterests: newInterests };
    });
  };

  const filteredPromotions = promotions.filter(promotion => {
    if (activeTab === 'active') {
      return promotion.status === 'active';
    } else if (activeTab === 'draft') {
      return promotion.status === 'draft';
    } else if (activeTab === 'expired') {
      return promotion.status === 'expired';
    }
    return true;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      audience: [],
      startDate: null,
      endDate: null,
      specificInterests: [],
    });
  };

  const handleCreatePromotion = () => {
    // Validate form
    if (!formData.name || !formData.description || !formData.type || formData.audience.length === 0) {
      toast({
        title: 'Missing information',
        description: 'Please fill out all required fields',
        variant: 'destructive'
      });
      return;
    }

    // In a real implementation, this would save to the database
    // For now, we'll just update the local state
    const newPromotion = {
      id: Math.random().toString(36).substring(7), // Generate random ID
      name: formData.name,
      description: formData.description,
      type: formData.type,
      audience: formData.audience,
      startDate: formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      endDate: formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : format(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      status: 'draft',
      conversionRate: 0,
    };

    setPromotions([...promotions, newPromotion]);
    toast({
      title: 'Promotion created',
      description: 'Your new promotion has been created as a draft'
    });
    
    resetForm();
    setShowCreatePromotionDialog(false);
  };

  const generatePromotionIdeas = async () => {
    setLoadingGenerateIdeas(true);
    try {
      // Call the multi-agent function to generate promotion ideas
      const { data, error } = await supabase.functions.invoke('multi-agent-generate', {
        body: {
          content: 'Generate 5 innovative marketing promotion ideas for InnovateHub that would help attract new clients for our PlataPay, Digital Customization, and AI solution services. Each idea should be 1-2 sentences with a catchy name and clear value proposition.',
          domain: 'innovatehub.ph'
        }
      });
      
      if (error) throw error;
      
      // Parse the response text into separate ideas
      const generatedText = data.text;
      const ideas = generatedText
        .split(/\d\./)
        .filter(Boolean)
        .map(idea => idea.trim());
      
      setPromotionIdeas(ideas);
    } catch (error) {
      console.error('Error generating promotion ideas:', error);
      toast({
        title: 'Error generating ideas',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoadingGenerateIdeas(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Promotions</h2>
          <p className="text-muted-foreground">
            Create and manage special offers for your customers
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={generatePromotionIdeas} disabled={loadingGenerateIdeas}>
            {loadingGenerateIdeas ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Ideas
          </Button>
          
          <Dialog open={showCreatePromotionDialog} onOpenChange={setShowCreatePromotionDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Promotion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Promotion</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Summer Special Offer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your promotion and its benefits"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Promotion Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select promotion type" />
                    </SelectTrigger>
                    <SelectContent>
                      {promotionTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Target Audience</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {audienceTypes.map(audience => (
                      <div key={audience.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`audience-${audience.id}`}
                          checked={formData.audience.includes(audience.id)}
                          onChange={() => handleAudienceChange(audience.id)}
                          className="rounded border-gray-300"
                        />
                        <label
                          htmlFor={`audience-${audience.id}`}
                          className="text-sm"
                        >
                          {audience.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {formData.audience.includes('specific_interest') && (
                  <div>
                    <Label>Specific Interests</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {['platapay', 'digital', 'ecommerce', 'ai', 'global'].map(interest => (
                        <div key={interest} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`interest-${interest}`}
                            checked={formData.specificInterests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="rounded border-gray-300"
                          />
                          <label
                            htmlFor={`interest-${interest}`}
                            className="text-sm capitalize"
                          >
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreatePromotionDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePromotion}>
                    Create Promotion
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {promotionIdeas.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI-Generated Promotion Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {promotionIdeas.map((idea, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-xs text-purple-600 font-medium">Idea {index + 1}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => {
                      // Extract the first sentence as the name
                      const firstSentenceMatch = idea.match(/^([^.!?]+[.!?])/);
                      const name = firstSentenceMatch ? firstSentenceMatch[0].trim() : idea.substring(0, 30);
                      
                      setFormData({
                        ...formData,
                        name: name,
                        description: idea
                      });
                      setShowCreatePromotionDialog(true);
                    }}>
                      <Edit2 className="h-3 w-3" />
                      <span className="ml-1 text-xs">Use</span>
                    </Button>
                  </div>
                  <p className="text-sm">{idea}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Promotion Campaigns</CardTitle>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredPromotions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No {activeTab} promotions found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPromotions.map(promotion => (
                <Card key={promotion.id} className="border overflow-hidden">
                  <div className={`h-1 ${getStatusColor(promotion.status)}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <Gift className="w-4 h-4 mr-2 text-blue-600" />
                        {promotion.name}
                      </CardTitle>
                      <Badge variant={getStatusVariant(promotion.status)}>
                        {promotion.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {promotion.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Target className="w-4 h-4 mr-1" />
                          {formatAudience(promotion.audience)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span>
                            {promotion.startDate} - {promotion.endDate}
                          </span>
                        </div>
                      </div>
                      
                      {promotion.status === 'active' && (
                        <div className="pt-2">
                          <div className="text-xs font-medium mb-1">Conversion Rate</div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${Math.min(promotion.conversionRate * 5, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">
                              {promotion.conversionRate}% conversion
                            </span>
                            <Badge variant="outline" className="text-xs h-5">
                              <Users className="w-3 h-3 mr-1" />
                              {Math.floor(Math.random() * 100) + 10} leads
                            </Badge>
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-2 flex justify-end">
                        <Button variant="ghost" size="sm" className="h-7">
                          <span className="mr-1">Manage</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'draft': return 'bg-yellow-500';
    case 'expired': return 'bg-gray-400';
    default: return 'bg-blue-500';
  }
};

const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' => {
  switch (status) {
    case 'active': return 'default';
    case 'draft': return 'secondary';
    case 'expired': return 'outline';
    default: return 'default';
  }
};

const formatAudience = (audience: string[]) => {
  if (audience.length === 0) return 'All audiences';
  if (audience.length > 2) return `${audience.length} audience types`;
  
  return audience.map(a => {
    switch (a) {
      case 'new_leads': return 'New Leads';
      case 'existing_clients': return 'Existing Clients';
      case 'inactive': return 'Inactive Clients';
      case 'high_value': return 'High Value';
      case 'specific_interest': return 'By Interest';
      default: return a;
    }
  }).join(', ');
};

export default PromotionsManager;
