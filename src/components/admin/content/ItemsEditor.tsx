
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EditableContent } from '@/data/contentManagementData';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ItemsEditorProps {
  items: EditableContent['content']['items'];
  onChange: (items: EditableContent['content']['items']) => void;
}

// Default empty item to add when creating new items
const defaultItem = {
  id: '',
  title: '',
  description: '',
  imagePath: '',
  link: ''
};

const ItemsEditor: React.FC<ItemsEditorProps> = ({ items = [], onChange }) => {
  // Generate a unique ID for new items
  const generateUniqueId = () => `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const handleAddItem = () => {
    const newItem = {
      ...defaultItem,
      id: generateUniqueId()
    };
    onChange([...(items || []), newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...(items || [])];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...(items || [])];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    onChange(newItems);
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const reorderedItems = [...(items || [])];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    
    onChange(reorderedItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Section Items</h3>
        <Button 
          size="sm"
          onClick={handleAddItem}
          className="flex items-center gap-1 bg-innovate-600 hover:bg-innovate-700"
        >
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {items && items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border border-gray-200 rounded-lg"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            {...provided.dragHandleProps}
                            className="mt-2 text-gray-400 hover:text-gray-600 cursor-grab"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <Label htmlFor={`item-${index}-title`}>Title</Label>
                                <Input
                                  id={`item-${index}-title`}
                                  value={item.title || ''}
                                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                  placeholder="Item title"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`item-${index}-link`}>Link</Label>
                                <Input
                                  id={`item-${index}-link`}
                                  value={item.link || ''}
                                  onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                                  placeholder="/item-link"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`item-${index}-image`}>Image Path</Label>
                                <Input
                                  id={`item-${index}-image`}
                                  value={item.imagePath || ''}
                                  onChange={(e) => handleItemChange(index, 'imagePath', e.target.value)}
                                  placeholder="/path/to/image.png"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <Label htmlFor={`item-${index}-description`}>Description</Label>
                                <Textarea
                                  id={`item-${index}-description`}
                                  value={item.description || ''}
                                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                  placeholder="Item description"
                                  rows={3}
                                />
                              </div>
                              
                              {item.imagePath && (
                                <div className="mt-2 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                                  <img 
                                    src={item.imagePath} 
                                    alt={item.title || 'Item preview'}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {(!items || items.length === 0) && (
                <div className="text-center py-8 border border-dashed rounded-lg border-gray-200">
                  <p className="text-muted-foreground">No items yet. Click "Add Item" to start adding items.</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ItemsEditor;
