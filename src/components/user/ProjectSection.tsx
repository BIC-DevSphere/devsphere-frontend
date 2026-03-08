import { useEffect, useState } from 'react';
import { Box, LaptopMinimal, TabletSmartphone, Bot, Github, Calendar, Link } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDate } from '@/utils/formatdate.utils';
import { getAllProjects } from '@/services/admin/projectServices';

const FILTERS = [
  { label: 'All Projects', tag: 'all', icon: <Box /> },
  { label: 'Web', tag: 'Web', icon: <LaptopMinimal /> },
  { label: 'Mobile', tag: 'Mobile', icon: <TabletSmartphone /> },
  { label: 'AI/ML', tag: 'AI/ML', icon: <Bot /> },
];

const ProjectSection: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="py-10 text-center">Loading projects...</p>;
  if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => (project.tags || []).some((tag) => tag.name === activeFilter));

  return (
    <section>
      <h2 className="text-primary mb-6 text-center text-3xl font-bold">Projects</h2>

      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap justify-start gap-4">
        {FILTERS.map((filter, idx) => (
          <Button
            key={`filter-item-${idx}`}
            onClick={() => setActiveFilter(filter.tag)}
            className={`flex gap-2 rounded-full bg-white px-2 py-6 text-black shadow-lg transition`}
          >
            <div className="rounded-full bg-gray-200 p-2">{filter.icon}</div>
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card min-w-[20rem] rounded-xl bg-gray-50 shadow-md transition hover:shadow-lg dark:bg-gray-800"
          >
            <div className="relative h-52 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="absolute top-2 right-2 flex flex-wrap gap-2">
                {(project.tags || []).slice(0, 2).map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white shadow-md"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5">
              <h3 className="mb-1 text-xl font-semibold text-gray-800 dark:text-gray-200">
                {project.name}
              </h3>
              <p className="mb-3 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={20} /> {formatDate(project.createdAt)}
              </p>

              {/* Tech Stack */}
              <div className="mb-3 flex gap-2 overflow-x-auto">
                {(project.techStacks || []).map((tech) => (
                  <span
                    key={project.id}
                    className="rounded-full bg-red-50 px-3 py-1 text-sm whitespace-nowrap text-red-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Contributors*/}
              <div className="mb-4 flex items-center gap-2">
                {(project.contributors || []).slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    className="h-8 w-8 transform overflow-hidden rounded-full border-2 border-gray-300 transition hover:scale-110 dark:border-gray-600"
                    title={c.name}
                  >
                    {c.avatarUrl && (
                      <img src={c.avatarUrl} alt={c.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <a
                  href={project.githubLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-700 py-2 font-medium text-white transition hover:bg-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <Github className="h-5 w-5" />
                  Github
                </a>
                <a
                  href={project.demoLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 py-2 font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <Link className="h-5 w-5" />
                  Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
