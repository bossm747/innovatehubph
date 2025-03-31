
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { NavigationItem } from '@/types/navigation';

interface NavigationFormProps {
  form: {
    label: string;
    url: string;
    parent_id: string | null;
    is_dropdown: boolean;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    label: string;
    url: string;
    parent_id: string | null;
    is_dropdown: boolean;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  editingItem: NavigationItem | null;
  topLevelItems: NavigationItem[];
}

const NavigationForm = ({
  form,
  setForm,
  onSubmit,
  onCancel,
  editingItem,
  topLevelItems
}: NavigationFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="label" className="text-right">
            Label
          </Label>
          <Input
            id="label"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="url" className="text-right">
            URL
          </Label>
          <Input
            id="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="parent" className="text-right">
            Parent
          </Label>
          <select
            id="parent"
            value={form.parent_id || ''}
            onChange={(e) => setForm({ ...form, parent_id: e.target.value || null })}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">None (Top Level)</option>
            {topLevelItems.map((item) => (
              <option 
                key={item.id} 
                value={item.id}
                disabled={editingItem?.id === item.id}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="is_dropdown" className="text-right">
            Is Dropdown
          </Label>
          <div className="col-span-3 flex items-center">
            <Checkbox
              id="is_dropdown"
              checked={form.is_dropdown}
              onCheckedChange={(checked) => 
                setForm({ ...form, is_dropdown: checked as boolean })
              }
            />
            <Label htmlFor="is_dropdown" className="ml-2">
              This item has a dropdown menu
            </Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {editingItem ? 'Update' : 'Add'} Item
        </Button>
      </DialogFooter>
    </form>
  );
};

export default NavigationForm;
