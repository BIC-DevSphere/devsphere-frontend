import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ projects }) => {
  console.log(projects);

  return (
    <>
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-card shadow-lg rounded-lg overflow-hidden max-w-md"
        >
          <div className="relative font-body">
            {/* Tags */}
            <div className="absolute flex gap-1 right-3 top-3">
              {project.tags.map((tag) => (
                <p
                  key={tag.id}
                  className="bg-chart-2 px-2 py-1 text-sm rounded-md"
                >
                  {tag.name}
                </p>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="absolute flex gap-1 left-3 top-3">
              {project.tech_stack.map((tech, id) => (
                <span
                  key={id}
                  className="bg-chart-3 px-2 py-1 text-sm rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Image */}
            <img
              className="h-64 w-full"
              src="https://i.fokzine.net/upload/25/09/250914_1_daily1681_99.jpg"
              alt={project.name}
            />
          </div>

          <div className="p-4 space-y-4">
            {/* Title */}
            <h3 className="text-xl font-heading font-semibold">
              {project.name}
            </h3>

            {/* Description */}
            <p className="font-body break-words line-clamp-3">
              {project.description}
            </p>

            <div className="flex items-center justify-between">
              {/* Bottom Left - Links */}
              <div className="flex items-center gap-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  className=""
                  title="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={project.demoLink}
                  target="_blank"
                  className=""
                  title="Demo"
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              </div>

              {/* Bottom Right - Contributors */}
              <div className="flex -space-x-2">
                {project.contributors.map((contributor) => (
                  <a
                    key={contributor.id}
                    href={`https://github.com/${contributor.githubUsername}`}
                    target="_blank"
                    title={contributor.name}
                  >
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      className="w-6 h-6 rounded-full border-2"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCard;
