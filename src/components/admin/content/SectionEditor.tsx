
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { EditableContent } from '@/data/contentManagementData';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import ColorPickerInput from './ColorPickerInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemsEditor from './ItemsEditor';

interface SectionEditorProps {
  section: EditableContent;
  onSave: (updatedSection: EditableContent) => void;
  onCancel: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ 
  section, 
  onSave, 
  onCancel 
}) => {
  const [editedSection, setEditedSection] = useState<EditableContent>({...section});

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value
      }
    }));
  };

  const handleColorChange = (colorName: string, value: string) => {
    setEditedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [colorName]: value
      }
    }));
  };

  const handleItemsChange = (updatedItems: EditableContent['content']['items']) => {
    setEditedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        items: updatedItems
      }
    }));
  };

  const handleSave = () => {
    onSave(editedSection);
  };

  return (
    <div className="space-y-6 pb-4">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          {editedSection.content.items && (
            <TabsTrigger value="items">Items</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={editedSection.content.title || ''}
                  onChange={handleContentChange}
                  placeholder="Section title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={editedSection.content.subtitle || ''}
                  onChange={handleContentChange}
                  placeholder="Section subtitle"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedSection.content.description || ''}
                  onChange={handleContentChange}
                  placeholder="Section description"
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          {(editedSection.content.buttonText !== undefined || editedSection.content.buttonLink !== undefined) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  value={editedSection.content.buttonText || ''}
                  onChange={handleContentChange}
                  placeholder="Button text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input
                  id="buttonLink"
                  name="buttonLink"
                  value={editedSection.content.buttonLink || ''}
                  onChange={handleContentChange}
                  placeholder="Button link (e.g., /services)"
                />
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="styling" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imagePath">Image Path</Label>
                <Input
                  id="imagePath"
                  name="imagePath"
                  value={editedSection.content.imagePath || ''}
                  onChange={handleContentChange}
                  placeholder="/path/to/image.png"
                />
                {editedSection.content.imagePath && (
                  <div className="mt-2 h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={editedSection.content.imagePath} 
                      alt="Section preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image</Label>
                <Input
                  id="backgroundImage"
                  name="backgroundImage"
                  value={editedSection.content.backgroundImage || ''}
                  onChange={handleContentChange}
                  placeholder="/path/to/bg-image.png"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPickerInput
                  name="backgroundColor"
                  value={editedSection.content.backgroundColor || ''}
                  onChange={(value) => handleColorChange('backgroundColor', value)}
                  placeholder="bg-gray-50 or custom color"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPickerInput
                  name="textColor"
                  value={editedSection.content.textColor || ''}
                  onChange={(value) => handleColorChange('textColor', value)}
                  placeholder="text-gray-800 or custom color"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {editedSection.content.items && (
          <TabsContent value="items">
            <ItemsEditor 
              items={editedSection.content.items || []} 
              onChange={handleItemsChange}
            />
          </TabsContent>
        )}
      </Tabs>
      
      <div className="flex justify-end pt-4 space-x-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-1"
        >
          <X className="h-4 w-4" /> Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="bg-innovate-600 hover:bg-innovate-700 flex items-center gap-1"
        >
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SectionEditor;
