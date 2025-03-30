
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Mail, X, Check, AlertTriangle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface EmailLog {
  id: string;
  email_type: string;
  recipient: string;
  subject: string;
  sent_at: string;
  successful: boolean;
  error_message: string | null;
  inquiry_id: string | null;
}

const EmailLogViewer = () => {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmailLogs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setEmailLogs(data || []);
    } catch (error) {
      console.error('Error fetching email logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailLogs();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy HH:mm:ss');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Mail className="mr-2 h-5 w-5 text-primary" />
          Email Logs
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchEmailLogs}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Email Activity</CardTitle>
          <CardDescription>
            View the status of emails sent through the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Loading email logs...
                    </TableCell>
                  </TableRow>
                ) : emailLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No email logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  emailLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {log.successful ? (
                          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Sent
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <X className="h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {log.email_type.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.recipient}</TableCell>
                      <TableCell>{log.subject}</TableCell>
                      <TableCell>{formatDate(log.sent_at)}</TableCell>
                      <TableCell>
                        {log.error_message ? (
                          <div className="text-xs text-red-600 max-w-xs truncate" title={log.error_message}>
                            <AlertTriangle className="h-3 w-3 inline mr-1" />
                            {log.error_message}
                          </div>
                        ) : log.inquiry_id ? (
                          <div className="text-xs text-gray-500">
                            Related to inquiry: {log.inquiry_id.substring(0, 8)}...
                          </div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailLogViewer;
