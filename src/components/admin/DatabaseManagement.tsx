
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
  DialogTrigger, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Database, RefreshCw, AlertCircle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define a type for the available tables
type AvailableTable = 'ai_projects' | 'ai_generated_files' | 'staff_profiles' | 'inquiries' | 'subscribers' | 'appointments' | 'marketing_campaigns' | 'email_logs';

// Define a basic type for table record values
type BasicValue = string | number | boolean | null;

// Define a non-recursive type for table records
interface TableRecord {
  [key: string]: BasicValue | BasicValue[] | { [key: string]: BasicValue } | BasicValue[][];
}

const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState<AvailableTable>('inquiries');
  const [tableData, setTableData] = useState<TableRecord[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tables] = useState<AvailableTable[]>([
    'ai_projects', 
    'ai_generated_files', 
    'staff_profiles', 
    'inquiries', 
    'subscribers', 
    'appointments',
    'marketing_campaigns',
    'email_logs'
  ]);
  
  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<TableRecord | null>(null);
  const [editedValues, setEditedValues] = useState<TableRecord>({});
  
  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<TableRecord | null>(null);

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
        try {
          const { data: tableInfo } = await supabase
            .from(selectedTable)
            .select('*')
            .limit(0);
            
          // If we can get the structure even with no rows
          if (tableInfo !== null) {
            // For empty array, we'll use an empty object to get the structure
            const columnInfo = tableInfo.length > 0 ? tableInfo[0] : {};
            setColumns(Object.keys(columnInfo).filter(col => 
              !col.includes('password') && !col.includes('secret')
            ));
          } else {
            setColumns([]);
          }
        } catch (metadataError) {
          console.error('Error fetching table structure:', metadataError);
          setColumns([]);
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

  const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const truncateValue = (value: string, maxLength = 50): string => {
    return value.length > maxLength 
      ? `${value.substring(0, maxLength)}...` 
      : value;
  };

  const handleEditClick = (row: TableRecord) => {
    setEditRecord(row);
    const initialValues: TableRecord = {};
    columns.forEach(column => {
      initialValues[column] = row[column];
    });
    setEditedValues(initialValues);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (row: TableRecord) => {
    setRecordToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleInputChange = (column: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const saveEditedRecord = async () => {
    if (!editRecord) return;
    
    setIsLoading(true);
    try {
      // Get primary key column (usually 'id')
      const primaryKey = columns.includes('id') ? 'id' : columns[0];
      
      const { error } = await supabase
        .from(selectedTable)
        .update(editedValues)
        .eq(primaryKey, editRecord[primaryKey]);
      
      if (error) throw error;
      
      toast.success('Record updated successfully');
      setEditDialogOpen(false);
      fetchTableData();
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error('Failed to update record');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async () => {
    if (!recordToDelete) return;
    
    setIsLoading(true);
    try {
      // Get primary key column (usually 'id')
      const primaryKey = columns.includes('id') ? 'id' : columns[0];
      
      const { error } = await supabase
        .from(selectedTable)
        .delete()
        .eq(primaryKey, recordToDelete[primaryKey]);
      
      if (error) throw error;
      
      toast.success('Record deleted successfully');
      setDeleteDialogOpen(false);
      fetchTableData();
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error('Failed to delete record: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
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
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditClick(row)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClick(row)}
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

      {/* Edit Record Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
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
                  value={editedValues[column] !== null ? String(editedValues[column] || '') : ''}
                  onChange={(e) => handleInputChange(column, e.target.value)}
                  className="col-span-3"
                  disabled={column === 'id' || column === 'created_at' || column === 'updated_at'}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveEditedRecord} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {recordToDelete && (
            <div className="py-4">
              <p className="text-sm">
                You are about to delete a record from the <span className="font-bold">{selectedTable}</span> table.
              </p>
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-[200px]">
                {JSON.stringify(recordToDelete, null, 2)}
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteRecord} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? 'Deleting...' : 'Delete Record'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DatabaseManagement;
