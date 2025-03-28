
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

const AIProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: "", description: "", status: "planning" });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof Project>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("ai_projects")
        .select("*")
        .order(sortField, { ascending: sortDirection === "asc" });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [sortField, sortDirection]);

  const handleSort = (field: keyof Project) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSaveProject = async () => {
    try {
      let result;
      
      if (editingProject) {
        // Update existing project
        result = await supabase
          .from("ai_projects")
          .update({
            name: editingProject.name,
            description: editingProject.description,
            status: editingProject.status,
          })
          .eq("id", editingProject.id);
        
        if (result.error) throw result.error;
        toast.success("Project updated successfully");
      } else {
        // Create new project
        result = await supabase
          .from("ai_projects")
          .insert([newProject]);
        
        if (result.error) throw result.error;
        toast.success("Project created successfully");
      }
      
      setIsDialogOpen(false);
      fetchProjects();
      setNewProject({ name: "", description: "", status: "planning" });
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const { error } = await supabase
        .from("ai_projects")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    setNewProject({ name: "", description: "", status: "planning" });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Projects</CardTitle>
          <CardDescription>
            Manage your AI-powered projects and implementation status
          </CardDescription>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" /> Add Project
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                  Name <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                  Status <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("created_at")}>
                  Created <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No projects found. Create your first project to get started.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "completed" ? "bg-green-100 text-green-800" :
                        project.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {project.status === "in_progress" ? "In Progress" : 
                         project.status === "completed" ? "Completed" : "Planning"}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
            <DialogDescription>
              {editingProject 
                ? "Update the details for this AI project" 
                : "Add a new AI project to your management dashboard"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Project Name</label>
              <Input 
                id="name" 
                value={editingProject ? editingProject.name : newProject.name}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({...editingProject, name: e.target.value});
                  } else {
                    setNewProject({...newProject, name: e.target.value});
                  }
                }}
                placeholder="Enter project name" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <Input 
                id="description" 
                value={editingProject ? editingProject.description : newProject.description}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({...editingProject, description: e.target.value});
                  } else {
                    setNewProject({...newProject, description: e.target.value});
                  }
                }}
                placeholder="Enter project description" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <select 
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={editingProject ? editingProject.status : newProject.status}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({...editingProject, status: e.target.value});
                  } else {
                    setNewProject({...newProject, status: e.target.value});
                  }
                }}
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>
              {editingProject ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AIProjectsList;
