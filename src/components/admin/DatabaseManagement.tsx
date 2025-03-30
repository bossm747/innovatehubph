
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Database, Eye, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

// Define a specific type for table records
type BasicValue = string | number | boolean | null;
type TableRecord = {
  [key: string]: BasicValue | BasicValue[] | { [key: string]: BasicValue } | unknown;
  id: string;
};

type PgTable = {
  tablename: string;
};

const DatabaseManagement = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [records, setRecords] = useState<TableRecord[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetchRecords(selectedTable);
    }
  }, [selectedTable]);

  const fetchTables = async () => {
    try {
      // We need to use the raw SQL query because Supabase JS client doesn't expose pg_catalog directly
      const { data, error } = await supabase.rpc('get_all_tables');

      if (error) throw error;

      // Extract table names and sort alphabetically
      const tableNames = data.map((table: PgTable) => table.tablename).sort();
      setTables(tableNames);
      
      // Set the first table as default if none is selected
      if (tableNames.length > 0 && !selectedTable) {
        setSelectedTable(tableNames[0]);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to load database tables');
    }
  };

  const fetchRecords = async (tableName: string) => {
    setLoading(true);
    try {
      // Use dynamic table name safely with RPC
      const { data, error } = await supabase.rpc('get_table_records', { table_name: tableName });

      if (error) throw error;

      // Extract column names from the first record
      if (data && data.length > 0) {
        setColumns(Object.keys(data[0]));
      } else {
        setColumns([]);
      }

      setRecords(data as TableRecord[] || []);
    } catch (error) {
      console.error(`Error fetching records from ${tableName}:`, error);
      toast.error(`Failed to load records from ${tableName}`);
      setRecords([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
    setSearchTerm('');
  };

  const handleRefresh = () => {
    if (selectedTable) {
      fetchRecords(selectedTable);
    }
  };

  const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const filteredRecords = records.filter(record => {
    if (!searchTerm) return true;
    return columns.some(column => {
      const value = record[column];
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Database className="mr-2 h-5 w-5 text-primary" />
          Database Management
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Browse Database Tables</CardTitle>
          <CardDescription>
            View and manage the data stored in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Select value={selectedTable} onValueChange={handleTableChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map(table => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Input 
                  placeholder="Search records..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : records.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">No records found in this table</p>
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map(column => (
                          <TableHead key={column} className="whitespace-nowrap">
                            {column}
                          </TableHead>
                        ))}
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record, index) => (
                        <TableRow key={index}>
                          {columns.map(column => (
                            <TableCell key={column} className="max-w-[200px] truncate">
                              {formatCellValue(record[column])}
                            </TableCell>
                          ))}
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="icon" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseManagement;
