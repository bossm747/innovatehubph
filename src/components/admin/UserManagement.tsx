
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Pencil, Trash2, UserPlus } from 'lucide-react';

interface StaffProfile {
  id: string;
  full_name: string | null;
  position: string | null;
  department: string | null;
  created_at: string;
  avatar_url: string | null;
  email?: string;
}

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', full_name: '', position: '', department: '' });
  const [currentUser, setCurrentUser] = useState<StaffProfile | null>(null);

  const { data: staffUsers, isLoading } = useQuery({
    queryKey: ['staff-users'],
    queryFn: async () => {
      // First get all staff profiles
      const { data: profiles, error } = await supabase
        .from('staff_profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Then get user emails from auth.users (this requires admin access which edge function can provide)
      // For simplicity, we'll mock the emails based on full_name in this example
      return (profiles as StaffProfile[]).map(profile => ({
        ...profile,
        email: profile.full_name ? `${profile.full_name.toLowerCase().replace(/\s+/g, '.')}@innovatehub.ph` : 'unknown@innovatehub.ph'
      }));
    }
  });

  const addUserMutation = useMutation({
    mutationFn: async () => {
      // In a real implementation, this would be an edge function call to create users
      // For now we'll use supabase auth directly but in production this would require an edge function
      const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.full_name
          }
        }
      });
      
      if (error) throw error;
      
      // The trigger we created will automatically add the user to staff_profiles
      // We'll need to update the additional fields
      const { error: updateError } = await supabase
        .from('staff_profiles')
        .update({
          position: newUser.position,
          department: newUser.department
        })
        .eq('id', data.user?.id);
      
      if (updateError) throw updateError;
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-users'] });
      toast.success('Staff user created successfully');
      setIsAddUserOpen(false);
      setNewUser({ email: '', password: '', full_name: '', position: '', department: '' });
    },
    onError: (error) => {
      toast.error(`Error creating user: ${error.message}`);
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) return null;
      
      const { error } = await supabase
        .from('staff_profiles')
        .update({
          full_name: currentUser.full_name,
          position: currentUser.position,
          department: currentUser.department
        })
        .eq('id', currentUser.id);
      
      if (error) throw error;
      return currentUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-users'] });
      toast.success('Staff profile updated successfully');
      setIsEditUserOpen(false);
      setCurrentUser(null);
    },
    onError: (error) => {
      toast.error(`Error updating profile: ${error.message}`);
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) return null;
      
      // This would actually require an admin API call or edge function to delete a user
      // In this example we'll just delete the profile, but in production
      // you would delete the auth.users record which would cascade to profiles
      const { error } = await supabase
        .from('staff_profiles')
        .delete()
        .eq('id', currentUser.id);
      
      if (error) throw error;
      return currentUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-users'] });
      toast.success('Staff user deleted successfully');
      setIsDeleteUserOpen(false);
      setCurrentUser(null);
    },
    onError: (error) => {
      toast.error(`Error deleting user: ${error.message}`);
    }
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUserMutation.mutate();
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate();
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  const openEditDialog = (user: StaffProfile) => {
    setCurrentUser(user);
    setIsEditUserOpen(true);
  };

  const openDeleteDialog = (user: StaffProfile) => {
    setCurrentUser(user);
    setIsDeleteUserOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Staff Users</h2>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff User</DialogTitle>
              <DialogDescription>
                Create a new staff user with an @innovatehub.ph email address.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={newUser.email} 
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="staff@innovatehub.ph"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Initial Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={newUser.password} 
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={newUser.full_name} 
                    onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input 
                    id="position" 
                    value={newUser.position} 
                    onChange={(e) => setNewUser({...newUser, position: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    value={newUser.department} 
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={addUserMutation.isPending}>
                  {addUserMutation.isPending ? "Creating..." : "Create User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>List of staff users with access to the portal</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : staffUsers && staffUsers.length > 0 ? (
              staffUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name || "Unnamed"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.position || "-"}</TableCell>
                  <TableCell>{user.department || "-"}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openEditDialog(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => openDeleteDialog(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No staff users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff User</DialogTitle>
            <DialogDescription>
              Update staff user information
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <form onSubmit={handleUpdateUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-full-name">Full Name</Label>
                  <Input 
                    id="edit-full-name" 
                    value={currentUser.full_name || ''} 
                    onChange={(e) => setCurrentUser({...currentUser, full_name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Input 
                    id="edit-position" 
                    value={currentUser.position || ''} 
                    onChange={(e) => setCurrentUser({...currentUser, position: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input 
                    id="edit-department" 
                    value={currentUser.department || ''} 
                    onChange={(e) => setCurrentUser({...currentUser, department: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateUserMutation.isPending}>
                  {updateUserMutation.isPending ? "Updating..." : "Update User"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this staff user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentUser && (
              <p className="text-sm">
                You are about to delete user: <span className="font-bold">{currentUser.full_name}</span> ({currentUser.email})
              </p>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteUserOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
