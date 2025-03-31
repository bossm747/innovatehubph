
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';

// Define a specific type for table records
type BasicValue = string | number | boolean | null;
type TableRecord = {
  [key: string]: BasicValue | BasicValue[] | { [key: string]: BasicValue } | unknown;
  id: string;
};

interface TableViewProps {
  records: TableRecord[];
  columns: string[];
  formatCellValue: (value: any) => string;
}

export const TableView = ({ 
  records, 
  columns,
  formatCellValue
}: TableViewProps) => {
  return (
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
            {records.map((record, index) => (
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
  );
};
