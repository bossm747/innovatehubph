
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Trash2, Plus, Brain, Zap, Edit, Power, Settings } from 'lucide-react';
import { AIProvider, getProviderConfig } from '@/utils/aiProviders';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface AIAgent {
  id?: string;
  name: string;
  description?: string;
  provider: string;
  model: string;
  temperature: number;
  max_tokens: number;
  prompt_template: string;
  is_active: boolean;
  type: 'email' | 'content' | 'translation' | 'analysis' | 'general';
  capabilities?: string[];
  created_at?: string;
  updated_at?: string;
}

// Define the form schema
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().optional(),
  provider: z.string(),
  model: z.string(),
  temperature: z.coerce.number().min(0).max(1),
  max_tokens: z.coerce.number().min(100).max(8000),
  prompt_template: z.string().min(10),
  is_active: z.boolean().default(true),
  type: z.enum(['email', 'content', 'translation', 'analysis', 'general']),
  capabilities: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AIAgentsManager: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      provider: 'gemini',
      model: 'gemini-1.5-pro',
      temperature: 0.7,
      max_tokens: 1000,
      prompt_template: 'You are an AI assistant for InnovateHub. {input}',
      is_active: true,
      type: 'email',
      capabilities: [],
    },
  });

  // Fetch AI agents
  const { data: agents = [], isLoading, error, refetch } = useQuery({
    queryKey: ['ai-agents'],
    queryFn: async () => {
      const { data, error } = await supabase.from('ai_agents').select('*');
      if (error) throw error;
      return data as AIAgent[];
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      // Ensure all required fields are present for insert/update
      const agentData: AIAgent = {
        name: values.name,
        description: values.description || '',
        provider: values.provider,
        model: values.model,
        temperature: values.temperature,
        max_tokens: values.max_tokens,
        prompt_template: values.prompt_template,
        is_active: values.is_active,
        type: values.type,
        capabilities: values.capabilities || [],
      };

      if (isEditing && selectedAgent?.id) {
        // Update existing agent
        const { error } = await supabase
          .from('ai_agents')
          .update(agentData)
          .eq('id', selectedAgent.id);
          
        if (error) throw error;
        
        toast({
          title: 'Agent Updated',
          description: `${values.name} has been updated successfully.`,
        });
      } else {
        // Create new agent
        const { error } = await supabase
          .from('ai_agents')
          .insert([agentData]);
          
        if (error) throw error;
        
        toast({
          title: 'Agent Created',
          description: `${values.name} has been created successfully.`,
        });
      }
      
      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['ai-agents'] });
    } catch (error) {
      console.error('Error saving agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to save agent. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle agent edit
  const handleEditAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setIsEditing(true);
    
    form.reset({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      provider: agent.provider,
      model: agent.model,
      temperature: agent.temperature,
      max_tokens: agent.max_tokens,
      prompt_template: agent.prompt_template,
      is_active: agent.is_active,
      type: agent.type,
      capabilities: agent.capabilities,
    });
    
    setIsDialogOpen(true);
  };

  // Handle agent deletion
  const handleDeleteAgent = async (id: string) => {
    try {
      const { error } = await supabase.from('ai_agents').delete().eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Agent Deleted',
        description: 'The agent has been deleted successfully.',
      });
      
      queryClient.invalidateQueries({ queryKey: ['ai-agents'] });
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete agent. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Toggle agent active status
  const toggleAgentStatus = async (agent: AIAgent) => {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .update({ is_active: !agent.is_active })
        .eq('id', agent.id);
      
      if (error) throw error;
      
      toast({
        title: agent.is_active ? 'Agent Deactivated' : 'Agent Activated',
        description: `${agent.name} has been ${agent.is_active ? 'deactivated' : 'activated'}.`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['ai-agents'] });
    } catch (error) {
      console.error('Error toggling agent status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update agent status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Update model options when provider changes
  useEffect(() => {
    const provider = form.watch('provider') as AIProvider;
    const config = getProviderConfig(provider);
    form.setValue('model', config.model);
  }, [form.watch('provider')]);

  // Reset form when dialog is opened for a new agent
  const handleNewAgent = () => {
    form.reset({
      name: '',
      description: '',
      provider: 'gemini',
      model: 'gemini-1.5-pro',
      temperature: 0.7,
      max_tokens: 1000,
      prompt_template: 'You are an AI assistant for InnovateHub. {input}',
      is_active: true,
      type: 'email',
      capabilities: [],
    });
    setIsEditing(false);
    setSelectedAgent(null);
    setIsDialogOpen(true);
  };

  // Get type badge color
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'email':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Email</Badge>;
      case 'content':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Content</Badge>;
      case 'translation':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Translation</Badge>;
      case 'analysis':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Analysis</Badge>;
      case 'general':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">General</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            AI Agents
          </h2>
          <p className="text-muted-foreground">
            Configure specialized AI agents for different tasks
          </p>
        </div>
        <Button onClick={handleNewAgent}>
          <Plus className="h-4 w-4 mr-2" />
          New Agent
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center text-red-800">
              <Trash2 className="w-5 h-5 mr-2" />
              Error loading agents
            </div>
            <p className="text-sm text-red-600 mt-2">Please try again later</p>
          </CardContent>
        </Card>
      ) : agents.length === 0 ? (
        <Card>
          <CardContent className="pt-6 pb-4 text-center">
            <p className="text-muted-foreground">No agents configured</p>
            <Button variant="outline" onClick={handleNewAgent} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Agent
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className={`overflow-hidden ${!agent.is_active ? 'bg-gray-50 opacity-70' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {agent.name}
                      {!agent.is_active && (
                        <Badge variant="outline" className="ml-2 text-gray-500">
                          Inactive
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2 mt-1">
                      <span className="capitalize">{agent.provider}</span>
                      <span>•</span>
                      <span>{agent.model}</span>
                    </CardDescription>
                  </div>
                  {getTypeBadge(agent.type)}
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {agent.description || 'No description provided'}
                </p>
                {agent.capabilities && agent.capabilities.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {agent.capabilities.map((capability, idx) => (
                        <Badge key={idx} variant="outline" className="bg-primary/5">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardContent className="pt-0 pb-3">
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <Settings className="w-3.5 h-3.5 mr-1" />
                    <span>Temp: {agent.temperature}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-3.5 h-3.5 mr-1" />
                    <span>Max tokens: {agent.max_tokens}</span>
                  </div>
                </div>
              </CardContent>
              <div className="border-t px-6 py-3 flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditAgent(agent)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={agent.is_active ? "text-amber-600" : "text-green-600"}
                    onClick={() => toggleAgentStatus(agent)}
                  >
                    <Power className="h-4 w-4 mr-1" />
                    {agent.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteAgent(agent.id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Agent' : 'Create New Agent'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Modify this AI agent to change its capabilities and behavior.'
                : 'Configure a new AI agent to help with specific tasks.'}
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
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Marketing Assistant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="content">Content</SelectItem>
                          <SelectItem value="translation">Translation</SelectItem>
                          <SelectItem value="analysis">Analysis</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this agent does..."
                        className="resize-none"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Provider</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gemini">Google Gemini</SelectItem>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="anthropic">Anthropic</SelectItem>
                          <SelectItem value="mistral">Mistral AI</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (0.0 - 1.0)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Lower values are more precise, higher more creative
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="max_tokens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Tokens</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="100"
                          max="8000"
                          step="100"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum length of generated text
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="prompt_template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt Template</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="You are an AI assistant for InnovateHub. {input}"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Use {'{input}'} as a placeholder for user input
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Enable or disable this agent
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {isEditing ? 'Update Agent' : 'Create Agent'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgentsManager;
