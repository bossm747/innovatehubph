
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Inbox, Clock } from 'lucide-react';
import { toast } from 'sonner';

const LynAgbayInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLynAgbayInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .ilike('name', '%lyn agbay%')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setInquiries(data || []);
      
      if (data && data.length > 0) {
        toast.success(`Found ${data.length} inquiries from Lyn Agbay`);
      } else {
        toast.info("No inquiries found from Lyn Agbay");
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLynAgbayInquiries();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Inquiries from Lyn Agbay</CardTitle>
          <CardDescription>
            Displaying all inquiries from Lyn Agbay
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchLynAgbayInquiries}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Inbox className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No inquiries found</p>
            <p className="text-sm text-muted-foreground">
              There are no inquiries from Lyn Agbay in the database.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{inquiry.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(inquiry.created_at)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Email:</span> {inquiry.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {inquiry.phone || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Service:</span> {inquiry.service}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {inquiry.status || 'new'}
                  </div>
                </div>
                {inquiry.message && (
                  <div className="mt-2">
                    <span className="font-medium">Message:</span>
                    <p className="mt-1 text-sm whitespace-pre-wrap">{inquiry.message}</p>
                  </div>
                )}
                {inquiry.company && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Company:</span> {inquiry.company}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LynAgbayInquiries;
