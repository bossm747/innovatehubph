import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AIProject {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AIGeneratedFile {
  id: string;
  filename: string;
  type: string;
  storage_path: string;
  project_id: string;
  created_at: string;
}

const AIProjectsList = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const { data: projects, isLoading: projectsLoading, refetch: refetchProjects } = useQuery({
    queryKey: ['ai-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_projects')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as AIProject[];
    }
  });

  const { data: filesMap, isLoading: filesLoading } = useQuery({
    queryKey: ['ai-files-by-project'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_generated_files')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Create a map of project_id to array of files
      return (data as AIGeneratedFile[]).reduce((acc, file) => {
        if (!file.project_id) return acc;
        
        if (!acc[file.project_id]) {
          acc[file.project_id] = [];
        }
        acc[file.project_id].push(file);
        return acc;
      }, {} as Record<string, AIGeneratedFile[]>);
    }
  });

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) return;
    
    try {
      const { error } = await supabase
        .from('ai_projects')
        .insert([newProject]);
      
      if (error) throw error;
      
      setNewProject({ name: '', description: '' });
      setShowForm(false);
      refetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const renderProjectForm = () => (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h4 className="text-lg font-semibold mb-3">Create New Project</h4>
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-innovate-500 focus:ring-innovate-500 sm:text-sm"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-innovate-500 focus:ring-innovate-500 sm:text-sm"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button className="ml-2" onClick={handleCreateProject}>Create</Button>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects?.map(project => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || 'No description provided'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="mr-2 h-4 w-4" />
              Last updated: {new Date(project.updated_at).toLocaleDateString()}
            </div>
            <div className="flex items-start mb-2">
              <div className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                {project.status || 'Planning'}
              </div>
            </div>
            {!filesLoading && filesMap && filesMap[project.id] && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-500 mb-1">Recent files:</p>
                <ul className="space-y-1">
                  {filesMap[project.id].slice(0, 3).map(file => (
                    <li key={file.id} className="text-sm flex items-center">
                      <FileText className="h-3 w-3 mr-1 text-gray-400" />
                      <span className="truncate">{file.filename}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-sm" onClick={() => navigate(`/project/${project.id}`)}>
              View Project
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Projects</h2>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {showForm && renderProjectForm()}

      {projectsLoading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : projects && projects.length > 0 ? (
        renderProjects()
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No AI Projects Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Create your first AI project to organize your generated content and resources.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIProjectsList;
