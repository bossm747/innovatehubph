
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ 
  message = "No records found in this table" 
}: EmptyStateProps) => {
  return (
    <div className="text-center py-8 space-y-2">
      <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
