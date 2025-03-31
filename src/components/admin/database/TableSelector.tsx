
import { useState } from 'react';
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
  return (
    <Select 
      value={selectedTable} 
      onValueChange={onTableChange}
      disabled={isLoading}
    >
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
  );
};
