
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database } from 'lucide-react';
import { toast } from 'sonner';

// Import our new components
import { TableSelector } from './database/TableSelector';
import { SearchBar } from './database/SearchBar';
import { TableView } from './database/TableView';
import { EmptyState } from './database/EmptyState';
import { LoadingState } from './database/LoadingState';
import { DatabaseService, TableRecord } from './database/DatabaseService';

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
      setLoading(true);
      const tableNames = await DatabaseService.fetchTables();
      
      setTables(tableNames);
      
      // Set the first table as default if none is selected
      if (tableNames.length > 0 && !selectedTable) {
        setSelectedTable(tableNames[0]);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to load database tables');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async (tableName: string) => {
    setLoading(true);
    try {
      const tableRecords = await DatabaseService.fetchRecords(tableName);
      
      // Extract column names from the first record
      if (tableRecords.length > 0) {
        setColumns(Object.keys(tableRecords[0]));
        setRecords(tableRecords);
      } else {
        setColumns([]);
        setRecords([]);
      }
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
                <TableSelector 
                  tables={tables}
                  selectedTable={selectedTable}
                  onTableChange={handleTableChange}
                  isLoading={loading}
                />
              </div>
              <div className="md:col-span-3">
                <SearchBar 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>
            </div>

            {loading ? (
              <LoadingState />
            ) : records.length === 0 ? (
              <EmptyState />
            ) : (
              <TableView 
                records={filteredRecords}
                columns={columns}
                formatCellValue={formatCellValue}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseManagement;
