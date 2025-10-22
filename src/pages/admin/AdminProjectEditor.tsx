import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllTags } from '@/services/tagServices';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, XIcon, Pencil, Save, Trash2 } from 'lucide-react';
import {
  createProject,
  getProjectById,
  deleteProject,
  updateProject,
} from '@/services/admin/projectServices';
import { useProjectForm } from '@/hooks/useProjectForm';
import { useEditorJs } from '@/hooks/useEditorJs';

import TechStackSelector from '@/components/admin/TechStackSelector';
import { ProjectBasicInfo } from '@/components/admin/ProjectBasicInfo';
import ProjectTagSelector from '@/components/admin/ProjectTagSelector';
import { ThumbnailUpload } from '@/components/admin/ThumbnailUpload';

import {
  extractUpdatedProjectFields,
  normalizeProjectData,
  validateProjectData,
} from '@/utils/project.utils';

const AdminProjectEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // If id exists, we are in view/edit mode
  const [tags, setTags] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(!id); // Auto-enable edit mode for create
  const [isLoading, setIsLoading] = useState(!!id); // Loading if we need to fetch data
  const [projectDataSnapshot, setProjectDataSnapshot] = useState<any>(null);
  const [fetchedProjectInfo, setFetchedProjectInfo] = useState<any>(null);

  const {
    createProjectData,
    setCreateProjectData,
    handleInputChange,
    handleSelectChange,
    handleRemoveItem,
    handleAddTag,
    handleRemoveTag,
    formErrors,
    setFormErrors,
    removeThumbnail,
  } = useProjectForm();

  const { editorRef, editorHolder } = useEditorJs(createProjectData.description);

  // Determine mode
  const isCreateMode = !id;
  const isViewMode = id && !isEditing;
  const isEditMode = id && isEditing;

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getAllTags();
        setTags(data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Fetch project data if in view/edit mode
  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const project = await getProjectById(id);
      let descriptionData = null;
      if (project.description) {
        try {
          descriptionData = JSON.parse(project.description);
        } catch {
          descriptionData = project.description; // fallback to raw string
        }
      }
      // Update project object with parsed description
      project.description = descriptionData;

      if (project) {
        // setProjectInfo(project);
        setFetchedProjectInfo(project);
        const normalizedData = normalizeProjectData(project);
        setCreateProjectData(normalizedData);
        setProjectDataSnapshot(normalizedData);
      }
    } catch (error) {
      toast.error('Failed to load project');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async () => {
    try {
      const outputData = await editorRef.current?.save();
      if (!outputData) {
        toast.error('Please write description');
        return;
      }
      const projectData = {
        ...createProjectData,
        description: JSON.stringify(outputData),
      };

      const errors = validateProjectData(projectData);
      setFormErrors(errors);
      if (Object.values(errors).some((err) => err)) return;

      if (isCreateMode) {
        const response = await createProject(projectData);
        toast.success('Project created successfully!');
        navigate(`/admin/projects/${response.id}`);
      } else {
        const updateData = extractUpdatedProjectFields(projectDataSnapshot, projectData);

        if (!updateData || Object.keys(updateData).length === 0) {
          toast.error('No changes detected to update');
          return;
        }

        try {
          const result = await updateProject(id, updateData);
          await fetchProject();
          console.log('Project updated successfully:', result);
          toast.success('Project updated successfully!');
          setIsEditing(false);
        } catch (error) {
          toast.error('Failed to update project');
          console.error('Error updating project:', error);
        }
      }
    } catch (error) {
      toast.error(isCreateMode ? 'Failed to create project' : 'Failed to update project');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id);
      toast.success('Project deleted successfully!');
      navigate('/admin/projects');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isCreateMode) {
      navigate(-1);
    } else {
      setIsEditing(false);
      // Optionally refetch project data here to reset changes
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-gray-600">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="create-project-container p-8">
      <div className="create-project-header">
        <Button
          variant="outline"
          size="sm"
          className="mb-3 flex items-center gap-2 text-gray-600 hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isCreateMode ? 'Add a New Project' : isEditMode ? 'Edit Project' : 'Project Details'}
            </h1>
            <p className="text-sm text-gray-600">
              {isCreateMode
                ? 'Please fill in the details below to create a new project.'
                : isEditMode
                  ? 'Update the project information below.'
                  : 'View project information.'}
            </p>
          </div>

          {!isCreateMode ? (
            <div className="flex gap-2">
              {isViewMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={handleSubmit}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <XIcon className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="create-project-footer mt-6">
              <Button onClick={handleSubmit}>
                {isCreateMode ? 'Create Project' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className="create-project-body mt-8 grid gap-4"
        style={{
          gridTemplateAreas: `
            "left right"
            "bottom bottom"
          `,
          gridTemplateColumns: '7fr 3fr',
        }}
      >
        <Card
          className="project-input-left border-1 border-blue-100 bg-white p-6 shadow-md"
          style={{ gridArea: 'left' }}
        >
          <div className="project-input-left-header mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold">Project Details</h1>
          </div>

          {/* Project Name */}
          <ProjectBasicInfo
            name={createProjectData.name}
            githubLink={createProjectData.githubLink}
            demoLink={createProjectData.demoLink}
            isViewMode={isViewMode}
            errors={formErrors}
            onChange={handleInputChange}
          />

          {/* Tech Stacks */}
          <div className="project-meta-inputs mt-6">
            <TechStackSelector
              selectedStacks={createProjectData.techStacks}
              isViewMode={isViewMode}
              onAddItem={handleSelectChange}
              errors={formErrors}
              onRemoveItem={handleRemoveItem}
            />

            {/* Tags */}
            <ProjectTagSelector
              availableTags={tags}
              selectedTags={createProjectData.tags}
              isViewMode={isViewMode}
              onAddTag={handleAddTag}
              errors={formErrors}
              onRemoveTag={handleRemoveTag}
            />
          </div>
        </Card>

        {/* Thumbnail */}
        <Card
          className="project-input-right border-1 border-blue-100 bg-white p-6 shadow-md"
          style={{ gridArea: 'right' }}
        >
          <ThumbnailUpload
            thumbnail={createProjectData.thumbnail}
            thumbnailUrl={fetchedProjectInfo?.thumbnailUrl}
            isViewMode={isViewMode}
            onChange={handleInputChange}
            onRemove={removeThumbnail}
          />
        </Card>

        {/* Description */}
        <Card
          className="project-input-bottom mt-4 h-auto min-h-40 w-full border-1 border-blue-100 bg-white p-6 shadow-md"
          style={{ gridArea: 'bottom' }}
        >
          <div className="project-description-header">
            <h2 className="mb-6 border-b border-gray-200 pb-4 text-2xl font-bold">
              Project Description
            </h2>
          </div>
          <div className="project-description-input">
            <div id="editorjs" ref={editorHolder} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminProjectEditor;
