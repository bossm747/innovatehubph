
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TableSelectorProps {
  tables: string[];
  selectedTable: string;
  onTableChange: (tableName: string) => void;
  isLoading: boolean;
}

export const TableSelector = ({ 
  tables, 
  selectedTable, 
  onTableChange,
  isLoading 
}: TableSelectorProps) => {
  // Ensure we filter out any empty string values before rendering
  const validTables = tables.filter(table => table.trim() !== '');
  
  return (
    <Select 
      value={selectedTable} 
      onValueChange={onTableChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a table" />
      </SelectTrigger>
      <SelectContent>
        {validTables.length > 0 ? (
          validTables.map(table => (
            <SelectItem 
              key={table} 
              value={table} 
            >
              {table}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-tables">No tables available</SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
