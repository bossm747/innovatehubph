
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import NavigationTable from './NavigationTable';
import NavigationForm from './NavigationForm';
import NavigationHeader from './NavigationHeader';
import { useNavigationItems } from '@/hooks/useNavigationItems';

const NavigationManager = () => {
  const {
    navigationItems,
    isLoading,
    formOpen,
    setFormOpen,
    editingItem,
    form,
    setForm,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    topLevelItems
  } = useNavigationItems();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Navigation Management</CardTitle>
          <CardDescription>Manage your website navigation structure</CardDescription>
        </div>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <NavigationHeader 
            onOpenForm={() => {
              resetForm();
              setFormOpen(true);
            }} 
            editingItem={editingItem} 
          />
          <DialogContent>
            <NavigationForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              onCancel={() => {
                resetForm();
                setFormOpen(false);
              }}
              editingItem={editingItem}
              topLevelItems={topLevelItems}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading navigation items...</div>
        ) : (
          <NavigationTable
            navigationItems={navigationItems}
            onEditItem={handleEdit}
            onDeleteItem={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default NavigationManager;
