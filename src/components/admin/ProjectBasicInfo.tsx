import { Input } from "@/components/ui/input";

interface ProjectBasicInfoProps {
  name: string;
  githubLink: string;
  demoLink: string;
  isViewMode?: boolean;
  errors: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProjectBasicInfo = ({
  name,
  githubLink,
  demoLink,
  isViewMode = false,
  errors,
  onChange,
}: ProjectBasicInfoProps) => {
  return (
    <>
      <div className="project-name-input">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Project Name
        </label>
        {isViewMode ? (
          <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-3 text-gray-900">
            {name || "—"}
          </div>
        ) : (
          <div>
            <Input
              type="text"
              name="name"
              className="mt-2"
              placeholder="Enter name of the project"
              value={name}
              onChange={onChange}
            />
            {errors.name && (
              <div className="mt-1 text-sm text-red-600">{errors.name}</div>
            )}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="project-hyperlinks-input mt-6 flex items-center justify-between gap-10">
        <div className="project-githubUrl-input w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            GitHub URL
          </label>
          {isViewMode ? (
            <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-3">
              {githubLink ? (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {githubLink}
                </a>
              ) : (
                <span className="text-gray-400">Not provided</span>
              )}
            </div>
          ) : (
            <div>
              <Input
                type="text"
                name="githubLink"
                className="mt-2"
                placeholder="Enter github url"
                value={githubLink}
                onChange={onChange}
              />
              {errors.githubLink && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.githubLink}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="project-demoUrl-input w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Demo URL
          </label>
          {isViewMode ? (
            <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-3">
              {demoLink ? (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {demoLink}
                </a>
              ) : (
                <span className="text-gray-400">Not provided</span>
              )}
            </div>
          ) : (
            <div>
              <Input
                type="text"
                name="demoLink"
                className="mt-2"
                placeholder="Enter demo url"
                value={demoLink}
                onChange={onChange}
              />
              {errors.demoLink && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.demoLink}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
