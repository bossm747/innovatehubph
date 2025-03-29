
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchSiteSettings, 
  updateSiteSettings
} from '@/services/contentManagementService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { FileUploader } from '@/components/admin/shared/FileUploader';
import ColorPickerInput from '@/components/admin/content/ColorPickerInput';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';

const SiteSettingsManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('header');
  
  // Header settings
  const { 
    data: headerSettings, 
    isLoading: headerLoading 
  } = useQuery({
    queryKey: ['site_settings', 'header'],
    queryFn: () => fetchSiteSettings('header'),
  });

  const [headerForm, setHeaderForm] = useState<Record<string, any>>({
    logo: '',
    logo_alt: '',
    logo_text: '',
    background_color: '',
    text_color: ''
  });

  // Footer settings
  const { 
    data: footerSettings, 
    isLoading: footerLoading 
  } = useQuery({
    queryKey: ['site_settings', 'footer'],
    queryFn: () => fetchSiteSettings('footer'),
  });

  const [footerForm, setFooterForm] = useState<Record<string, any>>({
    logo: '',
    logo_alt: '',
    copyright_text: '',
    description: '',
    background_color: '',
    text_color: ''
  });

  // Update forms when data is loaded
  React.useEffect(() => {
    if (headerSettings?.settings) {
      // Fix: Use a function to update state based on previous state when working with objects
      setHeaderForm((prev) => ({
        ...prev,
        ...(headerSettings.settings as Record<string, any>)
      }));
    }
  }, [headerSettings]);

  React.useEffect(() => {
    if (footerSettings?.settings) {
      // Fix: Use a function to update state based on previous state when working with objects
      setFooterForm((prev) => ({
        ...prev,
        ...(footerSettings.settings as Record<string, any>)
      }));
    }
  }, [footerSettings]);

  // Mutations
  const updateHeaderMutation = useMutation({
    mutationFn: (settings: any) => updateSiteSettings('header', settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'header'] });
      toast.success('Header settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Error updating header settings: ${error.message}`);
    }
  });

  const updateFooterMutation = useMutation({
    mutationFn: (settings: any) => updateSiteSettings('footer', settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'footer'] });
      toast.success('Footer settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Error updating footer settings: ${error.message}`);
    }
  });

  const handleHeaderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeaderMutation.mutate(headerForm);
  };

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooterMutation.mutate(footerForm);
  };

  const handleHeaderChange = (name: string, value: any) => {
    setHeaderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFooterChange = (name: string, value: any) => {
    setFooterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Manage header, footer, and other global settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="header">
            {headerLoading ? (
              <div className="flex justify-center py-8">Loading header settings...</div>
            ) : (
              <form onSubmit={handleHeaderSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="header_logo">Logo</Label>
                      <div className="mt-1">
                        <FileUploader
                          currentValue={headerForm.logo}
                          onValueChange={(value) => handleHeaderChange('logo', value)}
                          accept="image/*"
                          maxSize={2}
                        />
                        {headerForm.logo && (
                          <div className="mt-2">
                            <img 
                              src={headerForm.logo} 
                              alt="Header Logo" 
                              className="h-12 w-auto object-contain border rounded p-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="header_logo_alt">Logo Alt Text</Label>
                      <Input
                        id="header_logo_alt"
                        value={headerForm.logo_alt || ''}
                        onChange={(e) => handleHeaderChange('logo_alt', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="header_logo_text">Logo Text</Label>
                      <Input
                        id="header_logo_text"
                        value={headerForm.logo_text || ''}
                        onChange={(e) => handleHeaderChange('logo_text', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Background Color</Label>
                      <ColorPickerInput
                        name="background_color"
                        value={headerForm.background_color || ''}
                        onChange={(value) => handleHeaderChange('background_color', value)}
                        placeholder="bg-white or custom color"
                      />
                    </div>
                    
                    <div>
                      <Label>Text Color</Label>
                      <ColorPickerInput
                        name="text_color"
                        value={headerForm.text_color || ''}
                        onChange={(value) => handleHeaderChange('text_color', value)}
                        placeholder="text-gray-900 or custom color"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Header Settings
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>

          <TabsContent value="footer">
            {footerLoading ? (
              <div className="flex justify-center py-8">Loading footer settings...</div>
            ) : (
              <form onSubmit={handleFooterSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="footer_logo">Logo</Label>
                      <div className="mt-1">
                        <FileUploader
                          currentValue={footerForm.logo}
                          onValueChange={(value) => handleFooterChange('logo', value)}
                          accept="image/*"
                          maxSize={2}
                        />
                        {footerForm.logo && (
                          <div className="mt-2">
                            <img 
                              src={footerForm.logo} 
                              alt="Footer Logo" 
                              className="h-12 w-auto object-contain border rounded p-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="footer_logo_alt">Logo Alt Text</Label>
                      <Input
                        id="footer_logo_alt"
                        value={footerForm.logo_alt || ''}
                        onChange={(e) => handleFooterChange('logo_alt', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="footer_copyright_text">Copyright Text</Label>
                      <Input
                        id="footer_copyright_text"
                        value={footerForm.copyright_text || ''}
                        onChange={(e) => handleFooterChange('copyright_text', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="footer_description">Footer Description</Label>
                      <Textarea
                        id="footer_description"
                        value={footerForm.description || ''}
                        onChange={(e) => handleFooterChange('description', e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label>Background Color</Label>
                      <ColorPickerInput
                        name="background_color"
                        value={footerForm.background_color || ''}
                        onChange={(value) => handleFooterChange('background_color', value)}
                        placeholder="bg-gray-900 or custom color"
                      />
                    </div>
                    
                    <div>
                      <Label>Text Color</Label>
                      <ColorPickerInput
                        name="text_color"
                        value={footerForm.text_color || ''}
                        onChange={(value) => handleFooterChange('text_color', value)}
                        placeholder="text-white or custom color"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Footer Settings
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsManager;
