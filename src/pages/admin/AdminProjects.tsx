import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { deleteProject, getAllProjects } from '@/services/admin/projectServices';
import { useDebounce } from '@uidotdev/usehooks';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      console.log(data);
      setProjects(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };
  const handleProjectDelete = async (projectId: string) => {
    try {
      const result = await deleteProject(projectId);
      if (!result?.success) {
        throw new Error('Deletion failed');
      }
      toast.success('Project deleted successfully');
      // Refresh the project list
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete project');
    }
  };

  // The search logic can be improved in future to search other fields as well
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="grid gap-4 px-8 py-12">
      <p className="text-4xl font-semibold">Projects</p>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative mt-2 max-w-md flex-1">
          <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search projects by name..."
            className="bg-white pl-10 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add Project Button */}
        <Button className="flex items-center gap-2 shadow-md" onClick={() => navigate('new')}>
          <PlusIcon className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-12">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No projects found.</div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleProjectDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
