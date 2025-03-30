
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AIProvider, AI_PROVIDERS, getProviderConfig } from '@/utils/aiProviders';
import { Brain, Sparkles, Settings, Zap, Cpu, ArrowUpRight, FileText, BadgeCheck, Lightbulb, AlertCircle, RefreshCw, Bot, Plus, Edit, Trash, Send } from 'lucide-react';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  provider: AIProvider;
  model: string;
  temperature: number;
  max_tokens: number;
  prompt_template: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  type: 'email' | 'content' | 'translation' | 'analysis' | 'general';
  capabilities: string[];
}

const AIAgentsManager: React.FC = () => {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testResult, setTestResult] = useState('');
  const [isTestingAgent, setIsTestingAgent] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const [formData, setFormData] = useState<Partial<AIAgent>>({
    name: '',
    description: '',
    provider: 'gemini',
    model: '',
    temperature: 0.7,
    max_tokens: 1000,
    prompt_template: '',
    is_active: true,
    type: 'email',
    capabilities: []
  });

  const { data: agents, isLoading, error, refetch } = useQuery({
    queryKey: ['ai-agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as AIAgent[];
    }
  });

  useEffect(() => {
    if (selectedAgent) {
      setFormData(selectedAgent);
    } else {
      resetForm();
    }
  }, [selectedAgent]);

  useEffect(() => {
    if (formData.provider) {
      const providerConfig = getProviderConfig(formData.provider as AIProvider);
      setFormData(prev => ({
        ...prev,
        model: providerConfig.model,
        prompt_template: prev.prompt_template || providerConfig.defaultPrompt
      }));
    }
  }, [formData.provider]);

  const resetForm = () => {
    const defaultProvider = 'gemini';
    const providerConfig = getProviderConfig(defaultProvider as AIProvider);
    
    setFormData({
      name: '',
      description: '',
      provider: defaultProvider,
      model: providerConfig.model,
      temperature: 0.7,
      max_tokens: 1000,
      prompt_template: providerConfig.defaultPrompt,
      is_active: true,
      type: 'email',
      capabilities: []
    });
  };

  const filteredAgents = () => {
    if (!agents) return [];
    
    switch (activeTab) {
      case 'email':
        return agents.filter(agent => agent.type === 'email');
      case 'content':
        return agents.filter(agent => agent.type === 'content');
      case 'translation':
        return agents.filter(agent => agent.type === 'translation');
      case 'analysis':
        return agents.filter(agent => agent.type === 'analysis');
      case 'active':
        return agents.filter(agent => agent.is_active);
      case 'all':
      default:
        return agents;
    }
  };

  const handleSaveAgent = async () => {
    try {
      if (!formData.name || !formData.prompt_template || !formData.model || !formData.provider) {
        toast({
          title: "Validation error",
          description: "Please fill out all required fields",
          variant: "destructive",
        });
        return;
      }
      
      const agentData = {
        ...formData,
        updated_at: new Date().toISOString()
      };
      
      if (selectedAgent) {
        // Update existing agent
        const { error } = await supabase
          .from('ai_agents')
          .update(agentData)
          .eq('id', selectedAgent.id);
          
        if (error) throw error;
        
        toast({
          title: "Agent updated",
          description: "Your AI agent has been updated successfully",
          variant: "default",
        });
      } else {
        // Create new agent
        // Make sure all required fields are present for a new agent
        if (!agentData.name || !agentData.model || !agentData.provider || !agentData.prompt_template) {
          toast({
            title: "Missing required fields",
            description: "Please fill in all required fields: name, model, provider, and prompt template",
            variant: "destructive",
          });
          return;
        }
        
        const { error } = await supabase
          .from('ai_agents')
          .insert([{
            ...agentData,
            created_at: new Date().toISOString()
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Agent created",
          description: "Your new AI agent has been created successfully",
          variant: "default",
        });
      }
      
      resetForm();
      setSelectedAgent(null);
      setIsEditDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Error saving agent:', error);
      toast({
        title: "Error",
        description: "Failed to save the AI agent. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Agent deleted",
        description: "Your AI agent has been deleted successfully",
        variant: "default",
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast({
        title: "Error",
        description: "Failed to delete the AI agent. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleAgentStatus = async (agent: AIAgent) => {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .update({ 
          is_active: !agent.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', agent.id);
        
      if (error) throw error;
      
      toast({
        title: agent.is_active ? "Agent deactivated" : "Agent activated",
        description: `Your AI agent has been ${agent.is_active ? 'deactivated' : 'activated'} successfully`,
        variant: "default",
      });
      
      refetch();
    } catch (error) {
      console.error('Error toggling agent status:', error);
      toast({
        title: "Error",
        description: "Failed to update agent status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const testAgent = async () => {
    try {
      setIsTestingAgent(true);
      setTestResult('');
      
      // Call multi-agent-generate function with the agent's ID
      const { data, error } = await supabase.functions.invoke('multi-agent-generate', {
        body: {
          prompt: testInput,
          agentId: selectedAgent?.id,
        }
      });
      
      if (error) throw error;
      
      setTestResult(data.text);
    } catch (error) {
      console.error('Error testing agent:', error);
      toast({
        title: "Test failed",
        description: "Failed to test the AI agent. Please check your settings and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingAgent(false);
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Send className="w-4 h-4" />;
      case 'content':
        return <FileText className="w-4 h-4" />;
      case 'translation':
        return <ArrowUpRight className="w-4 h-4" />;
      case 'analysis':
        return <Cpu className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Brain className="w-5 h-5 mr-2 text-innovate-600" />
            AI Agents Manager
          </h2>
          <p className="text-muted-foreground">
            Create and manage AI agents for your email marketing campaigns
          </p>
        </div>
        <Button onClick={() => {
          resetForm();
          setSelectedAgent(null);
          setIsEditDialogOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="translation">Translation</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="active">Active Only</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-innovate-600"></div>
            </div>
          ) : error ? (
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Error loading AI agents
                </div>
                <p className="text-sm mt-2">There was an error loading your AI agents. Please try again later.</p>
              </CardContent>
            </Card>
          ) : filteredAgents().length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No AI Agents Found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'all' 
                    ? "You haven't created any AI agents yet."
                    : `You don't have any ${activeTab} agents yet.`}
                </p>
                <Button onClick={() => {
                  resetForm();
                  if (activeTab !== 'all' && activeTab !== 'active') {
                    setFormData(prev => ({ ...prev, type: activeTab as any }));
                  }
                  setSelectedAgent(null);
                  setIsEditDialogOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Agent
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents().map(agent => (
                <Card key={agent.id} className={`overflow-hidden ${!agent.is_active ? 'opacity-70' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${agent.is_active ? 'bg-green-100' : 'bg-gray-100'} mr-2`}>
                          {getAgentTypeIcon(agent.type)}
                        </div>
                        <CardTitle className="text-base">{agent.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className={agent.is_active 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-gray-100 text-gray-600"
                      }>
                        {agent.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {agent.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {AI_PROVIDERS[agent.provider as AIProvider]?.name || agent.provider}
                      </Badge>
                      
                      {agent.capabilities && agent.capabilities.length > 0 && agent.capabilities.slice(0, 2).map((capability, i) => (
                        <Badge key={i} variant="outline" className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {capability}
                        </Badge>
                      ))}
                      
                      {agent.capabilities && agent.capabilities.length > 2 && (
                        <Badge variant="outline">+{agent.capabilities.length - 2}</Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium capitalize">{agent.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Temperature:</span>
                        <span className="font-medium">{agent.temperature}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Tokens:</span>
                        <span className="font-medium">{agent.max_tokens}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span className="font-medium">{new Date(agent.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2 border-t">
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setTestInput('');
                          setTestResult('');
                          setIsTestDialogOpen(true);
                        }}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                      <Button 
                        variant={agent.is_active ? "outline" : "default"} 
                        size="sm"
                        onClick={() => handleToggleAgentStatus(agent)}
                      >
                        {agent.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedAgent ? 'Edit AI Agent' : 'Create New AI Agent'}</DialogTitle>
            <DialogDescription>
              {selectedAgent 
                ? 'Update the configuration for this AI agent.'
                : 'Configure a new AI agent for your marketing campaigns.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Agent Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name || ''} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Email Content Writer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description || ''} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Generates email content for marketing campaigns"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Agent Type</Label>
                  <Select 
                    value={formData.type as string} 
                    onValueChange={(value) => setFormData({...formData, type: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="content">Content Creation</SelectItem>
                      <SelectItem value="translation">Translation</SelectItem>
                      <SelectItem value="analysis">Data Analysis</SelectItem>
                      <SelectItem value="general">General Purpose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="capabilities">Capabilities (comma separated)</Label>
                  <Input 
                    id="capabilities" 
                    value={formData.capabilities?.join(', ') || ''} 
                    onChange={(e) => setFormData({
                      ...formData, 
                      capabilities: e.target.value.split(',').map(cap => cap.trim()).filter(Boolean)
                    })}
                    placeholder="Email writing, Subject lines, CTA optimization"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="provider">AI Provider</Label>
                  <Select 
                    value={formData.provider as string} 
                    onValueChange={(value) => setFormData({...formData, provider: value as AIProvider})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Google Gemini (Recommended)</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                      <SelectItem value="mistral">Mistral AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature">Temperature</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="temperature" 
                        type="number" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        value={formData.temperature || 0.7} 
                        onChange={(e) => setFormData({...formData, temperature: parseFloat(e.target.value)})}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower = more deterministic, Higher = more creative
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="max_tokens">Max Tokens</Label>
                    <Input 
                      id="max_tokens" 
                      type="number" 
                      min="100" 
                      max="4000" 
                      step="50" 
                      value={formData.max_tokens || 1000} 
                      onChange={(e) => setFormData({...formData, max_tokens: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input 
                    id="model" 
                    value={formData.model || ''} 
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    placeholder="gemini-1.5-pro"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prompt_template">Prompt Template</Label>
                  <Textarea 
                    id="prompt_template" 
                    value={formData.prompt_template || ''} 
                    onChange={(e) => setFormData({...formData, prompt_template: e.target.value})}
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use variables like {`{input}`}, {`{recipient_name}`}, {`{company_name}`}, etc.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="is_active" 
                    checked={formData.is_active} 
                    onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                  />
                  <Label htmlFor="is_active">Enable this agent</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAgent}>
              {selectedAgent ? 'Save Changes' : 'Create Agent'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Test AI Agent: {selectedAgent?.name}</DialogTitle>
            <DialogDescription>
              Enter a test prompt to see how this agent responds
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <Label htmlFor="test_input">Test Prompt</Label>
              <Textarea 
                id="test_input" 
                value={testInput} 
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Enter your test prompt here..."
                rows={3}
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={testAgent}
                disabled={isTestingAgent || !testInput.trim()}
              >
                {isTestingAgent ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Test Agent
                  </>
                )}
              </Button>
            </div>
            
            {testResult && (
              <div>
                <Label>Response:</Label>
                <div className="border rounded-md p-4 bg-gray-50 mt-2 max-h-[300px] overflow-y-auto">
                  <div className="whitespace-pre-wrap">
                    {testResult}
                  </div>
                </div>
              </div>
            )}
            
            {selectedAgent && (
              <div className="rounded-md bg-blue-50 p-4 text-blue-800 text-sm">
                <h4 className="font-medium flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Agent Configuration
                </h4>
                <div className="mt-2 space-y-1">
                  <p><strong>Provider:</strong> {AI_PROVIDERS[selectedAgent.provider as AIProvider]?.name}</p>
                  <p><strong>Model:</strong> {selectedAgent.model}</p>
                  <p><strong>Temperature:</strong> {selectedAgent.temperature}</p>
                  <p><strong>Max Tokens:</strong> {selectedAgent.max_tokens}</p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgentsManager;
