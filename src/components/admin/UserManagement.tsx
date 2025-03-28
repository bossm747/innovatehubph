
import React, { useState } from 'react';
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

const MOCK_STAFF_USERS: StaffProfile[] = [
  {
    id: "1",
    full_name: "John Doe",
    position: "Software Developer",
    department: "Engineering",
    created_at: "2023-01-15T08:30:00Z",
    avatar_url: null,
    email: "john.doe@innovatehub.ph"
  },
  {
    id: "2",
    full_name: "Jane Smith",
    position: "Project Manager",
    department: "Operations",
    created_at: "2023-02-20T10:15:00Z",
    avatar_url: null,
    email: "jane.smith@innovatehub.ph"
  },
  {
    id: "3",
    full_name: "Michael Johnson",
    position: "UI/UX Designer",
    department: "Design",
    created_at: "2023-03-10T09:45:00Z",
    avatar_url: null,
    email: "michael.johnson@innovatehub.ph"
  }
];

const UserManagement = () => {
  const [staffUsers, setStaffUsers] = useState<StaffProfile[]>(MOCK_STAFF_USERS);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', full_name: '', position: '', department: '' });
  const [currentUser, setCurrentUser] = useState<StaffProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock adding a new user
    setTimeout(() => {
      const newStaffUser: StaffProfile = {
        id: `${staffUsers.length + 1}`,
        full_name: newUser.full_name,
        position: newUser.position,
        department: newUser.department,
        created_at: new Date().toISOString(),
        avatar_url: null,
        email: newUser.email
      };
      
      setStaffUsers([newStaffUser, ...staffUsers]);
      setIsAddUserOpen(false);
      setNewUser({ email: '', password: '', full_name: '', position: '', department: '' });
      setIsLoading(false);
      toast.success('Staff user created successfully');
    }, 1000);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsLoading(true);
    
    // Mock updating a user
    setTimeout(() => {
      const updatedUsers = staffUsers.map(user => 
        user.id === currentUser.id ? { ...user, ...currentUser } : user
      );
      
      setStaffUsers(updatedUsers);
      setIsEditUserOpen(false);
      setCurrentUser(null);
      setIsLoading(false);
      toast.success('Staff profile updated successfully');
    }, 1000);
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    
    // Mock deleting a user
    setTimeout(() => {
      const updatedUsers = staffUsers.filter(user => user.id !== currentUser.id);
      
      setStaffUsers(updatedUsers);
      setIsDeleteUserOpen(false);
      setCurrentUser(null);
      setIsLoading(false);
      toast.success('Staff user deleted successfully');
    }, 1000);
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create User"}
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
            {staffUsers.map((user) => (
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
            ))}
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update User"}
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
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
