
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Menu, ExternalLink } from 'lucide-react';
import { NavigationItem } from '@/types/navigation';

interface NavigationTableProps {
  navigationItems: NavigationItem[];
  onEditItem: (item: NavigationItem) => void;
  onDeleteItem: (id: string) => void;
}

const NavigationTable = ({ 
  navigationItems, 
  onEditItem, 
  onDeleteItem 
}: NavigationTableProps) => {
  const topLevelItems = navigationItems.filter(item => !item.parent_id);
  const childItems = navigationItems.filter(item => item.parent_id);

  if (navigationItems.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No navigation items found. Click "Add Item" to create your first navigation link.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Label</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topLevelItems.map((item) => (
          <React.Fragment key={item.id}>
            <TableRow>
              <TableCell>
                <Menu className="h-4 w-4" />
              </TableCell>
              <TableCell className="font-medium">{item.label}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {item.url}
                  <a 
                    href={item.url.startsWith('/') ? item.url : `/${item.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </TableCell>
              <TableCell>
                {item.is_dropdown ? 'Dropdown' : 'Link'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEditItem(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {/* Show children of this item */}
            {childItems
              .filter(child => child.parent_id === item.id)
              .map(child => (
                <TableRow key={child.id}>
                  <TableCell className="pl-8">
                    <div className="w-4 h-0 border-t border-dashed border-gray-300"></div>
                  </TableCell>
                  <TableCell className="font-medium">{child.label}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {child.url}
                      <a 
                        href={child.url.startsWith('/') ? child.url : `/${child.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    {child.is_dropdown ? 'Dropdown' : 'Link'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEditItem(child)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDeleteItem(child.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default NavigationTable;
