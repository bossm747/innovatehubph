
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Database, RefreshCw } from 'lucide-react';

// Define a type for the available tables
type AvailableTable = 'ai_projects' | 'ai_generated_files' | 'staff_profiles' | 'inquiries' | 'subscribers' | 'documents' | 'email_logs';

const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState<AvailableTable>('inquiries');
  const [tableData, setTableData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tables, setTables] = useState<AvailableTable[]>([
    'ai_projects', 
    'ai_generated_files', 
    'staff_profiles', 
    'inquiries', 
    'subscribers', 
    'documents', 
    'email_logs'
  ]);

  const fetchTableData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from(selectedTable)
        .select('*');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTableData(data);
        setColumns(Object.keys(data[0]).filter(col => 
          !col.includes('password') && !col.includes('secret')
        ));
      } else {
        setTableData([]);
        // Get columns from metadata if no data
        const { data: metadata } = await supabase.rpc('get_table_columns', { table_name: selectedTable });
        if (metadata) {
          setColumns(metadata.filter((col: string) => 
            !col.includes('password') && !col.includes('secret')
          ));
        }
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      toast.error(`Failed to load data from ${selectedTable}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [selectedTable]);

  const formatValue = (value: any) => {
    if (value === null) return 'null';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const truncateValue = (value: string, maxLength = 50) => {
    return value.length > maxLength 
      ? `${value.substring(0, maxLength)}...` 
      : value;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Database Management</h2>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={fetchTableData}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tables</CardTitle>
          <CardDescription>Select a table to view and manage data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tables.map((table) => (
              <Button
                key={table}
                variant={selectedTable === table ? "default" : "outline"}
                onClick={() => setSelectedTable(table)}
                className="mb-2"
              >
                {table.replace(/_/g, ' ')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedTable.replace(/_/g, ' ')} Data</CardTitle>
          <CardDescription>
            {isLoading 
              ? 'Loading data...' 
              : `${tableData.length} records found`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-auto max-h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-background">Actions</TableHead>
                  {columns.map(column => (
                    <TableHead 
                      key={column} 
                      className="sticky top-0 bg-background whitespace-nowrap"
                    >
                      {column.replace(/_/g, ' ')}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : tableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Record</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                {columns.map(column => (
                                  <div key={column} className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right font-medium col-span-1">
                                      {column.replace(/_/g, ' ')}:
                                    </label>
                                    <Input
                                      defaultValue={formatValue(row[column])}
                                      className="col-span-3"
                                      disabled={column === 'id'}
                                    />
                                  </div>
                                ))}
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              toast.error("Delete functionality is disabled for safety");
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                      {columns.map(column => (
                        <TableCell key={column} className="font-mono text-xs">
                          {truncateValue(formatValue(row[column]))}
                        </TableCell>
                      ))}
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

export default DatabaseManagement;
