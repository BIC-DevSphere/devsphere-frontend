import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { TrashIcon, PenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const dummyDescriptionPreview =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco.";
  const navigate = useNavigate();

  return (
    <div className="flex min-h-40 w-92 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48 flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={`${project.thumbnailUrl ? project.thumbnailUrl : "https://i.fokzine.net/upload/25/09/250914_1_daily1681_99.jpg"}`}
          alt={project.name}
        />

        {/* Tags Overlay - Top Right */}
        <div className="absolute top-2 right-2 flex max-w-32 flex-wrap gap-1">
          {project.tags &&
            project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-blue-500/90 px-2 py-1 text-xs text-white backdrop-blur-sm"
              >
                {tag.name}
              </span>
            ))}
          {project.tags && project.tags.length > 2 && (
            <span className="rounded-full bg-gray-500/90 px-2 py-1 text-xs text-white backdrop-blur-sm">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Header - Title and Tech Stack */}
        <div className="mb-3">
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
            {project.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.techStacks &&
              project.techStacks.slice(0, 3).map((tech, id) => (
                <span
                  key={id}
                  className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-700"
                >
                  {tech}
                </span>
              ))}
            {project.tech_stack && project.tech_stack.length > 3 && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{project.tech_stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Description Preview */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">
          {project.descriptionPreview || dummyDescriptionPreview}
        </p>

        {/* Footer - Links, Contributors, Delete */}
        <div className="mt-auto flex items-center justify-between">
          {/* Left - Action Links */}
          <div className="flex items-center gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-gray-900"
                title="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-gray-900"
                title="Live Demo"
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>

          {/* Right - Contributors and Delete */}
          <div className="flex items-center gap-3">
            {/* Contributors */}
            {project.contributors && project.contributors.length > 0 && (
              <div className="flex -space-x-1">
                {project.contributors.slice(0, 2).map((contributor) => (
                  <a
                    key={contributor.id}
                    href={`https://github.com/${contributor.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={contributor.name}
                  >
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      className="h-6 w-6 rounded-full border-2 border-white transition-colors hover:border-blue-500"
                    />
                  </a>
                ))}
                {project.contributors.length > 2 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200">
                    <span className="text-xs font-medium text-gray-600">
                      +{project.contributors.length - 2}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Delete Button */}
            <Button
              variant="destructive"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onDelete(project.id)}
              title="Delete Project"
            >
              <TrashIcon className="h-3 w-3" />
            </Button>
            <Button
              className="h-7 w-7 p-0"
              onClick={() => navigate(`${project.id}`)}
            >
              <PenIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
