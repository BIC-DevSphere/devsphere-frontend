import { PlusIcon, XIcon } from 'lucide-react';
import type { Tag } from '@/types/project.types';

interface ProjectTagSelectorProps {
  availableTags: Tag[];
  selectedTags: string[];
  isViewMode: boolean;
  errors: any;
  onAddTag: (tagId: string) => void;
  onRemoveTag: (tagId: string) => void;
}

const ProjectTagSelector = ({
  availableTags,
  selectedTags,
  isViewMode,
  errors,
  onAddTag,
  onRemoveTag,
}: ProjectTagSelectorProps) => {
  return (
    <>
      <div className="project-tags-input mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">Project Tags</label>
        {isViewMode ? (
          <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-3">
            {selectedTags?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tagId) => {
                  const tag = availableTags.find((t) => t.id === tagId);
                  return (
                    <span
                      key={tagId}
                      className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700"
                    >
                      {tag?.name || tagId}
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="text-gray-400">No tags</span>
            )}
          </div>
        ) : (
          <>
            <div
              className="available-tags grid gap-2 py-3"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(7.5rem, 1fr))',
              }}
            >
              {availableTags.map((tag) => {
                const isTagSelected = selectedTags.includes(tag.id);
                return (
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-[18px] border-1 px-4 py-2 transition duration-300 select-none ${
                      isTagSelected
                        ? 'border-yellow-200 bg-yellow-200 text-yellow-700 shadow-md hover:border-yellow-300 hover:bg-yellow-300'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-yellow-300 hover:bg-yellow-200'
                    }`}
                    key={tag.id}
                    onClick={() => {
                      if (isTagSelected) {
                        onRemoveTag(tag.id);
                      } else {
                        onAddTag(tag.id);
                      }
                    }}
                  >
                    <p>{tag.name}</p>
                    {isTagSelected ? <XIcon size={16} /> : <PlusIcon size={16} />}
                  </div>
                );
              })}
            </div>
            {errors.tags && <div className="mt-1 text-sm text-red-600">{errors.tags}</div>}
          </>
        )}
      </div>
    </>
  );
};

export default ProjectTagSelector;
