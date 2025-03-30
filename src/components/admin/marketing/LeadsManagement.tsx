
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import {
  DownloadCloud,
  Send,
  Filter,
  RefreshCw,
  FileText,
  Tag,
  Users,
  Star,
  Clock,
  ArrowUpDown,
  Loader2,
  Brain
} from 'lucide-react';
import { format } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  tags: string[];
  subscribed: boolean;
  created_at: string;
  updated_at: string;
}

interface LeadScoreData {
  id: string;
  score: number;
  probability: number;
  interests: string[];
  lastInteraction: string;
  notes: string;
}

const LeadsManagement = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('newest');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [activityTab, setActivityTab] = useState('all');
  const [leadScores, setLeadScores] = useState<Record<string, LeadScoreData>>({});
  const [processingAction, setProcessingAction] = useState(false);

  // Fetch leads
  useEffect(() => {
    fetchLeads();
  }, []);

  // Apply filters
  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, tagFilter, sortOption, activityTab]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketing_recipients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      
      // Simulate lead scoring with AI
      simulateLeadScoring(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: 'Error fetching leads',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const simulateLeadScoring = (leadsData: Lead[]) => {
    // In a real implementation, this would call the AI agent to score leads
    // For now, we'll simulate scores based on data we have
    const scores: Record<string, LeadScoreData> = {};
    
    leadsData.forEach(lead => {
      // Calculate a score based on available data
      const hasCompany = lead.company ? 15 : 0;
      const interestScore = lead.tags?.length * 10 || 0;
      const recencyScore = new Date(lead.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 ? 20 : 0;
      
      const totalScore = hasCompany + interestScore + recencyScore + Math.floor(Math.random() * 30);
      const clampedScore = Math.min(Math.max(totalScore, 1), 100);
      
      scores[lead.id] = {
        id: lead.id,
        score: clampedScore,
        probability: clampedScore / 100,
        interests: lead.tags || [],
        lastInteraction: lead.updated_at || lead.created_at,
        notes: ''
      };
    });
    
    setLeadScores(scores);
  };

  const filterLeads = () => {
    let filtered = [...leads];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Tag filter
    if (tagFilter) {
      filtered = filtered.filter(lead => lead.tags?.includes(tagFilter));
    }
    
    // Activity filter
    if (activityTab === 'active') {
      filtered = filtered.filter(lead => lead.subscribed);
    } else if (activityTab === 'inactive') {
      filtered = filtered.filter(lead => !lead.subscribed);
    }
    
    // Sorting
    if (sortOption === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortOption === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortOption === 'score') {
      filtered.sort((a, b) => (leadScores[b.id]?.score || 0) - (leadScores[a.id]?.score || 0));
    }
    
    setFilteredLeads(filtered);
  };

  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const handleCreateCampaign = async () => {
    if (selectedLeads.length === 0) {
      toast({
        title: 'No leads selected',
        description: 'Please select at least one lead',
        variant: 'destructive'
      });
      return;
    }

    setProcessingAction(true);
    try {
      // Get all selected leads
      const selectedLeadData = leads.filter(lead => selectedLeads.includes(lead.id));
      
      // Call AI to generate campaign content based on selected leads
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('multi-agent-generate', {
        body: {
          content: `Generate a targeted email marketing campaign for ${selectedLeadData.length} leads interested in ${
            [...new Set(selectedLeadData.flatMap(lead => lead.tags || []))].join(', ') || 'our services'
          }.`,
          domain: "innovatehub.ph"
        }
      });
      
      if (aiError) throw aiError;
      
      // Create a new campaign
      const { data: campaignData, error: campaignError } = await supabase
        .from('marketing_campaigns')
        .insert({
          name: `Campaign for ${selectedLeadData.length} leads - ${new Date().toLocaleDateString()}`,
          subject: aiResponse.text.split('\n')[0] || 'Generated Campaign',
          content: aiResponse.text,
          recipient_count: selectedLeadData.length,
          status: 'draft'
        })
        .select()
        .single();
      
      if (campaignError) throw campaignError;
      
      toast({
        title: 'Campaign created',
        description: `New campaign created with ${selectedLeadData.length} recipients`
      });
      
      setSelectedLeads([]);
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Error creating campaign',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const generateCSV = () => {
    // Generate CSV content
    const headers = ['Name', 'Email', 'Company', 'Tags', 'Subscribed', 'Created At', 'Lead Score'];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.company || '',
      (lead.tags || []).join(', '),
      lead.subscribed ? 'Yes' : 'No',
      new Date(lead.created_at).toLocaleDateString(),
      leadScores[lead.id]?.score || 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `innovatehub-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Lead Management</h2>
          <p className="text-muted-foreground">
            Manage and analyze your marketing leads
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchLeads} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={generateCSV} disabled={loading || filteredLeads.length === 0}>
            <DownloadCloud className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-2/3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Leads</CardTitle>
                <Badge variant="outline">
                  {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'}
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-64">
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                
                <Select value={tagFilter || ''} onValueChange={(value) => setTagFilter(value || null)}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Tags</SelectItem>
                    <SelectItem value="platapay">PlataPay</SelectItem>
                    <SelectItem value="digital">Digital Customizations</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="ai">AI Solutions</SelectItem>
                    <SelectItem value="global">Global Expansion</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="score">Lead Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activityTab} onValueChange={setActivityTab} className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Leads</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No leads found matching your criteria
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                              onChange={handleSelectAll}
                              className="rounded border-gray-300 mr-2"
                            />
                            Name
                          </div>
                        </th>
                        <th className="text-left font-medium p-2">Email</th>
                        <th className="text-left font-medium p-2">Company</th>
                        <th className="text-left font-medium p-2">Tags</th>
                        <th className="text-left font-medium p-2">Created</th>
                        <th className="text-left font-medium p-2">
                          <div className="flex items-center">
                            Lead Score
                            <Badge className="ml-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
                              <Brain className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map(lead => (
                        <tr key={lead.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedLeads.includes(lead.id)}
                                onChange={() => handleSelectLead(lead.id)}
                                className="rounded border-gray-300 mr-2"
                              />
                              <span className={!lead.subscribed ? 'text-muted-foreground' : ''}>
                                {lead.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2">{lead.email}</td>
                          <td className="p-2">{lead.company || '-'}</td>
                          <td className="p-2">
                            <div className="flex flex-wrap gap-1">
                              {lead.tags && lead.tags.length > 0 ? lead.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              )) : '-'}
                            </div>
                          </td>
                          <td className="p-2">{format(new Date(lead.created_at), 'MMM d, yyyy')}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                                  getScoreColor(leadScores[lead.id]?.score || 0)
                                }`}
                              >
                                {leadScores[lead.id]?.score || '-'}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {getScoreLabel(leadScores[lead.id]?.score || 0)}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {selectedLeads.length > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-medium">{selectedLeads.length}</span> leads selected
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="default"
                      onClick={handleCreateCampaign}
                      disabled={processingAction}
                    >
                      {processingAction ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Create Campaign
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full sm:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                AI Lead Insights
              </CardTitle>
              <CardDescription>
                AI-powered analysis of your lead database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-xs text-blue-600 font-medium mb-1">Lead Quality</div>
                  <div className="text-2xl font-bold">
                    {filteredLeads.length > 0 
                      ? Math.round(
                          filteredLeads.reduce(
                            (sum, lead) => sum + (leadScores[lead.id]?.score || 0), 
                            0
                          ) / filteredLeads.length
                        )
                      : 0}%
                  </div>
                  <div className="text-xs text-blue-600 mt-1">Average score</div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-xs text-green-600 font-medium mb-1">Conversion</div>
                  <div className="text-2xl font-bold">
                    {filteredLeads.length > 0 
                      ? Math.round(
                          filteredLeads.reduce(
                            (sum, lead) => sum + (leadScores[lead.id]?.probability || 0), 
                            0
                          ) / filteredLeads.length * 100
                        )
                      : 0}%
                  </div>
                  <div className="text-xs text-green-600 mt-1">Estimated rate</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 space-y-2">
                <h4 className="font-medium text-sm">Top Interests</h4>
                <div className="space-y-1">
                  {getTopTags(leads).map((tag, index) => (
                    <div key={tag.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs text-blue-700">
                          {index + 1}
                        </div>
                        <span className="text-sm">{tag.name}</span>
                      </div>
                      <Badge variant="outline">{tag.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-3 space-y-2">
                <h4 className="font-medium text-sm">AI Recommendations</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p>Target leads interested in PlataPay with agent-specific promotions.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p>Engage high-scoring leads with personalized AI demos.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p>Create re-engagement campaign for inactive subscribers.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => setSelectedLeads(getHighValueLeads(leads, leadScores))}>
                <Users className="w-4 h-4 mr-2" />
                Select High-Value Leads
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getScoreColor = (score: number) => {
  if (score >= 70) return 'bg-green-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-gray-400';
};

const getScoreLabel = (score: number) => {
  if (score >= 70) return 'High value';
  if (score >= 40) return 'Medium value';
  return 'Low value';
};

const getTopTags = (leads: any[]) => {
  const tagCounts: Record<string, number> = {};
  
  leads.forEach(lead => {
    if (lead.tags && lead.tags.length) {
      lead.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

const getHighValueLeads = (leads: any[], scores: Record<string, any>) => {
  return leads
    .filter(lead => lead.subscribed && (scores[lead.id]?.score || 0) >= 60)
    .map(lead => lead.id);
};

export default LeadsManagement;
