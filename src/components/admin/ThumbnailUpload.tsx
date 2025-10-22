import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Upload } from "lucide-react";

interface ThumbnailUploadProps {
  thumbnail: File | null;
  thumbnailUrl?: string;
  isViewMode: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export const ThumbnailUpload = ({
  thumbnail,
  thumbnailUrl,
  isViewMode,
  onChange,
  onRemove,
}: ThumbnailUploadProps) => {
  const hasImage = thumbnail || thumbnailUrl;

  return (
    <>
      <div className="project-input-right-header border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold">Thumbnail</h1>
      </div>
      <div className="project-thumbnail-input mt-8">
        <div
          className={`flex h-full min-h-56 w-full items-center justify-center ${
            isViewMode && hasImage
              ? "border-2 border-gray-200"
              : !hasImage
                ? "cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-100"
                : "border-2 border-gray-200"
          } transition duration-300`}
        >
          {hasImage ? (
            <div className="project-thumbnail-preview w-full">
              <img
                src={thumbnail ? URL.createObjectURL(thumbnail) : thumbnailUrl}
                alt="Thumbnail"
                className="max-h-60 w-full object-contain"
              />
              {thumbnail && (
                <p className="p-2 text-center text-xs text-gray-600">
                  file: {thumbnail.name}
                </p>
              )}
            </div>
          ) : isViewMode ? (
            <span className="text-gray-400">No thumbnail</span>
          ) : (
            <label
              htmlFor="projectThumbnail"
              className="cursor-pointer text-gray-500"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <PlusIcon className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-500" />
                <span className="flex items-center gap-2">
                  Click to upload
                  <span className="text-xs">(Max: 5MB)</span>
                </span>
                <Input
                  type="file"
                  id="projectThumbnail"
                  name="thumbnail"
                  className="hidden"
                  onChange={onChange}
                  accept="image/*"
                />
              </div>
            </label>
          )}
        </div>

        {/* Action buttons for edit mode */}
        {!isViewMode && (
          <div className="thumbnail-action-buttons mt-4 flex justify-center gap-2">
            {hasImage && (
              <Button variant="destructive" onClick={onRemove}>
                Remove Thumbnail
              </Button>
            )}

            {/* Always show upload button in edit mode */}
            <label htmlFor="projectThumbnailUpdate" className="cursor-pointer">
              <Button variant="outline" type="button" asChild>
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {hasImage ? "Change Thumbnail" : "Upload Thumbnail"}
                </div>
              </Button>
              <Input
                type="file"
                id="projectThumbnailUpdate"
                name="thumbnail"
                className="hidden"
                onChange={onChange}
                accept="image/*"
              />
            </label>
          </div>
        )}
      </div>
    </>
  );
};
