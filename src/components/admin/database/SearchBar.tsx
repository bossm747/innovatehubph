
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  searchTerm, 
  onSearchChange,
  placeholder = "Search records..." 
}: SearchBarProps) => {
  return (
    <Input 
      placeholder={placeholder}
      value={searchTerm} 
      onChange={(e) => onSearchChange(e.target.value)} 
    />
  );
};
