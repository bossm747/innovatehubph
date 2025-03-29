
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { EditableContent } from '@/data/contentManagementData';
import SectionEditor from './SectionEditor';
import { Edit, Eye, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PageContentEditorProps {
  pageContent: EditableContent[];
  allContent: EditableContent[];
  onSave: (updatedContent: EditableContent[]) => void;
}

const PageContentEditor: React.FC<PageContentEditorProps> = ({ 
  pageContent, 
  allContent,
  onSave 
}) => {
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedContent, setEditedContent] = useState<EditableContent[]>(pageContent);

  const toggleEditMode = (sectionId: string) => {
    setEditMode(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleSectionUpdate = (updatedSection: EditableContent) => {
    const updatedEditedContent = editedContent.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
    
    setEditedContent(updatedEditedContent);
    
    // Update all content
    const updatedAllContent = allContent.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
    
    onSave(updatedAllContent);
    toggleEditMode(updatedSection.id);
    toast.success(`${updatedSection.sectionName} section updated!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {pageContent.length > 0 ? `${pageContent[0].pageName} Page Sections` : 'No sections found'}
        </h3>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {editedContent.map(section => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 group">
              <div className="flex items-center gap-2 text-left">
                <span className="font-medium">{section.sectionName}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                  {section.sectionType}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <div className="pb-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleEditMode(section.id)}
                  className="flex items-center gap-1"
                >
                  {editMode[section.id] ? (
                    <>
                      <Eye className="h-4 w-4" /> Preview
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" /> Edit
                    </>
                  )}
                </Button>
              </div>

              {editMode[section.id] ? (
                <SectionEditor 
                  section={section}
                  onSave={handleSectionUpdate}
                  onCancel={() => toggleEditMode(section.id)}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Content</h4>
                    <div className="space-y-2">
                      {section.content.title && (
                        <div>
                          <span className="text-sm text-gray-500">Title:</span>
                          <p className="text-sm">{section.content.title}</p>
                        </div>
                      )}
                      {section.content.subtitle && (
                        <div>
                          <span className="text-sm text-gray-500">Subtitle:</span>
                          <p className="text-sm">{section.content.subtitle}</p>
                        </div>
                      )}
                      {section.content.description && (
                        <div>
                          <span className="text-sm text-gray-500">Description:</span>
                          <p className="text-sm">{section.content.description}</p>
                        </div>
                      )}
                      {section.content.items && section.content.items.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-500">Items:</span>
                          <p className="text-sm">{section.content.items.length} items</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Styling</h4>
                    <div className="space-y-2">
                      {section.content.backgroundColor && (
                        <div>
                          <span className="text-sm text-gray-500">Background:</span>
                          <p className="text-sm">{section.content.backgroundColor}</p>
                        </div>
                      )}
                      {section.content.imagePath && (
                        <div>
                          <span className="text-sm text-gray-500">Image:</span>
                          <div className="mt-1 h-20 w-20 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={section.content.imagePath} 
                              alt={section.sectionName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PageContentEditor;
