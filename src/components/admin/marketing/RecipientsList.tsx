
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Search, MoreVertical, PlusCircle, X, 
  Check, RefreshCw, DownloadCloud, UploadCloud 
} from 'lucide-react';

interface Recipient {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subscribed: boolean;
  tags: string[] | null;
  created_at: string;
}

interface RecipientsListProps {
  onSelectRecipients?: (recipients: string[]) => void;
  selectable?: boolean;
}

const RecipientsList: React.FC<RecipientsListProps> = ({
  onSelectRecipients,
  selectable = false
}) => {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    company: '',
    tags: ''
  });

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      setLoading(true);
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
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipient = async () => {
    try {
      if (!newRecipient.name || !newRecipient.email) {
        toast({
          title: "Error",
          description: "Name and email are required",
          variant: "destructive"
        });
        return;
      }
      
      // Convert tags string to array
      const tagsArray = newRecipient.tags
        ? newRecipient.tags.split(',').map(tag => tag.trim())
        : null;
      
      const { error } = await supabase.from('marketing_recipients').insert({
        name: newRecipient.name,
        email: newRecipient.email,
        company: newRecipient.company || null,
        tags: tagsArray,
        subscribed: true
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Recipient added successfully"
      });
      
      // Reset form and close dialog
      setNewRecipient({ name: '', email: '', company: '', tags: '' });
      setShowAddDialog(false);
      
      // Refresh the list
      fetchRecipients();
    } catch (error) {
      console.error('Error adding recipient:', error);
      toast({
        title: "Error",
        description: "Failed to add recipient",
        variant: "destructive"
      });
    }
  };

  const handleRecipientSelection = (recipientId: string) => {
    if (!selectable) return;
    
    setSelectedRecipients(prev => {
      const newSelection = prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId];
        
      // If there's a callback, notify parent component
      if (onSelectRecipients) {
        onSelectRecipients(newSelection);
      }
      
      return newSelection;
    });
  };

  const filteredRecipients = recipients.filter(recipient => {
    const searchLower = searchQuery.toLowerCase();
    return (
      recipient.name.toLowerCase().includes(searchLower) ||
      recipient.email.toLowerCase().includes(searchLower) ||
      (recipient.company && recipient.company.toLowerCase().includes(searchLower)) ||
      (recipient.tags && recipient.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  });

  const handleSubscriptionToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('marketing_recipients')
        .update({ subscribed: !currentStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setRecipients(prev => 
        prev.map(recipient => 
          recipient.id === id 
            ? { ...recipient, subscribed: !currentStatus } 
            : recipient
        )
      );
      
      toast({
        title: "Updated",
        description: `Subscription status updated`
      });
    } catch (error) {
      console.error('Error updating subscription status:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription status",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRecipient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('marketing_recipients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setRecipients(prev => prev.filter(recipient => recipient.id !== id));
      
      // Remove from selection if selected
      if (selectedRecipients.includes(id)) {
        const newSelection = selectedRecipients.filter(recipientId => recipientId !== id);
        setSelectedRecipients(newSelection);
        if (onSelectRecipients) {
          onSelectRecipients(newSelection);
        }
      }
      
      toast({
        title: "Deleted",
        description: "Recipient deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting recipient:', error);
      toast({
        title: "Error",
        description: "Failed to delete recipient",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-innovate-600" />
              Marketing Recipients
            </CardTitle>
            <CardDescription>
              Manage your email marketing list
            </CardDescription>
          </div>
          <Button onClick={() => setShowAddDialog(true)} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recipient
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4 space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchRecipients} 
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {selectable && (
                  <TableHead className="w-[40px]"></TableHead>
                )}
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableHeader>
              <TableBody>
                {filteredRecipients.length > 0 ? (
                  filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      {selectable && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRecipientSelection(recipient.id)}
                            className="h-6 w-6"
                          >
                            {selectedRecipients.includes(recipient.id) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded border border-gray-300" />
                            )}
                          </Button>
                        </TableCell>
                      )}
                      <TableCell>{recipient.name}</TableCell>
                      <TableCell>{recipient.email}</TableCell>
                      <TableCell>{recipient.company || '-'}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={recipient.subscribed ? "success" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleSubscriptionToggle(recipient.id, recipient.subscribed)}
                        >
                          {recipient.subscribed ? 'Subscribed' : 'Unsubscribed'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {recipient.tags && recipient.tags.length > 0 ? (
                            recipient.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-xs">No tags</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleSubscriptionToggle(recipient.id, recipient.subscribed)}
                            >
                              {recipient.subscribed ? (
                                <>
                                  <X className="mr-2 h-4 w-4" />
                                  <span>Unsubscribe</span>
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Subscribe</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteRecipient(recipient.id)}
                              className="text-red-600"
                            >
                              <X className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={selectable ? 7 : 6} 
                      className="h-24 text-center"
                    >
                      {loading ? (
                        <div className="flex justify-center items-center">
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          <span>Loading recipients...</span>
                        </div>
                      ) : (
                        "No recipients found."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Recipient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newRecipient.name}
                onChange={(e) => setNewRecipient({...newRecipient, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newRecipient.email}
                onChange={(e) => setNewRecipient({...newRecipient, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={newRecipient.company}
                onChange={(e) => setNewRecipient({...newRecipient, company: e.target.value})}
                placeholder="ABC Corp"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional, comma separated)</Label>
              <Input
                id="tags"
                value={newRecipient.tags}
                onChange={(e) => setNewRecipient({...newRecipient, tags: e.target.value})}
                placeholder="client, prospect, vip"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRecipient}>
              Add Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipientsList;
