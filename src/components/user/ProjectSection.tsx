import { useEffect, useState } from 'react';
import { Calendar, GitBranch, ExternalLink, Package, Monitor, Smartphone, Cpu } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDate } from '@/utils/formatdate.utils';
import { getAllProjects } from '@/services/admin/projectServices';
import type { Contributor, ProjectResponse, Tag } from '@/types/project.types';

const FILTERS = [
  { label: 'All Projects', tag: 'all', icon: <Package size={18} /> },
  { label: 'Web', tag: 'Web', icon: <Monitor size={18} /> },
  { label: 'Mobile', tag: 'Mobile', icon: <Smartphone size={18} /> },
  { label: 'AI/ML', tag: 'AI/ML', icon: <Cpu size={18} /> },
];

const ProjectSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData: ProjectResponse[] = await getAllProjects();
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

  const filteredProjects: ProjectResponse[] =
    activeFilter === 'all'
      ? projects
      : projects.filter((project: ProjectResponse) =>
          (project.tags || []).some((tag: Tag | string) =>
            typeof tag === 'string' ? tag === activeFilter : tag.name === activeFilter
          )
        );

  return (
    <section>
      <div className="mb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-red-700" />
          <h2 className="text-xs font-bold tracking-widest text-red-700 uppercase">Projects</h2>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">Built by the community</h3>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8 flex w-fit flex-wrap justify-start gap-1 rounded-xl border border-slate-100 bg-slate-50/80 p-1 shadow-sm backdrop-blur-md">
        {FILTERS.map((filter, idx) => (
          <Button
            key={`filter-item-${idx}`}
            onClick={() => setActiveFilter(filter.tag)}
            className={`text-md flex items-center gap-2 rounded-lg border px-3 py-5 font-medium transition-all duration-200 hover:bg-white ${
              activeFilter === filter.tag
                ? 'border-slate-200 bg-white text-gray-800'
                : 'border-transparent bg-transparent text-gray-500 shadow-none hover:bg-white/60 hover:text-gray-700'
            } `}
          >
            <span className="text-base leading-none">{filter.icon}</span>
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {filteredProjects.map((project: ProjectResponse) => (
          <div
            key={project.id}
            className="relative flex min-w-[20rem] flex-col rounded-xl border border-gray-100 bg-white p-3 pt-36 mb-28 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 translate-y-32 max-w-sm"
          >
            {/* Image */}
            <div className="absolute top-0 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-lg">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.name}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="flex h-60 w-full items-center justify-center bg-gray-100 text-gray-400">
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
                {(project.techStacks || []).map((tech: string, idx: number) => (
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

              {/* Contributors (hex masked, overlapping) */}
              <div className="mb-6 flex items-center -space-x-3">
                {(project.contributors || []).slice(0, 3).map((c: Contributor) => (
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
