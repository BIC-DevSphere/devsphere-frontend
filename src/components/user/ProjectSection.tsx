import { useEffect, useState } from 'react';
import { Calendar, GitBranch, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDate } from '@/utils/formatdate.utils';
import { getAllProjects } from '@/services/admin/projectServices';

const FILTERS = [
  { label: 'All Projects', tag: 'all', icon: '📦' },
  { label: 'Web', tag: 'Web', icon: '🖥️' },
  { label: 'Mobile', tag: 'Mobile', icon: '📱' },
  { label: 'AI/ML', tag: 'AI/ML', icon: '🤖' },
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
      <h2 className="text-red-700 mb-10 text-center text-5xl font-bold">Projects</h2>

      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap justify-start gap-4">
        {FILTERS.map((filter, idx) => (
          <Button
            key={`filter-item-${idx}`}
            onClick={() => setActiveFilter(filter.tag)}
            className={`flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 px-6 py-6 text-base font-semibold text-gray-800 shadow-sm backdrop-blur-md transition-all hover:bg-white`}
          >
            <span className="text-2xl">{filter.icon}</span>
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex min-w-[20rem] flex-col rounded-[2rem] border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="relative mb-5 h-56 w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-700">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col px-2">
              <h3 className="mb-3 text-2xl font-bold text-[#111827] dark:text-gray-100">
                {project.name}
              </h3>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {(project.techStacks || []).map((tech, idx) => (
                  <span
                    key={`${project.id}-tech-${idx}`}
                    className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mb-5 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Calendar size={18} /> {formatDate(project.createdAt)}
              </p>

              {/* Contributors*/}
              <div className="mb-6 flex items-center -space-x-3">
                {(project.contributors || []).slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    className="h-10 w-10 overflow-hidden rounded-full border-[3px] border-white bg-gray-200 transition-transform hover:scale-110 dark:border-gray-800"
                    title={c.name}
                  >
                    {c.avatarUrl ? (
                      <img src={c.avatarUrl} alt={c.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-auto flex gap-3">
                <a
                  href={project.githubLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1e2f5c] py-3 text-base font-bold text-white transition hover:bg-[#15234b] dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <GitBranch size={18} />
                  Github
                </a>
                <a
                  href={project.demoLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d5dae1] py-3 text-base font-bold text-[#1e2f5c] transition hover:bg-[#c4c9d1] dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  <ExternalLink size={18} />
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
