export const normalizeProjectData = (data: any) => {
  try {
    const normalizedData = {
      name: data.name,
      thumbnail: null,
      githubLink: data.githubLink,
      demoLink: data.demoLink || '',
      techStacks: data.techStacks || [],
      tags: data.tags?.map((tag: any) => (typeof tag === 'string' ? tag : tag.id)) || [],
      description: data.description || '',
      contributors: data.contributors || [],
    };
    return normalizedData;
  } catch (error) {
    console.error('Error normalizing project data:', error);
    return null;
  }
};

export const validateProjectData = (data: any) => {
  const errors = {
    name: '',
    thumbnail: '',
    githubLink: '',
    demoLink: '',
    techStacks: '',
    tags: '',
    description: '',
  };

  if (!data.name.trim()) {
    errors.name = 'Project name is required';
  }
  if (!data.githubLink.trim()) {
    errors.githubLink = 'GitHub link is required';
  }
  if (data.techStacks.length === 0) {
    errors.techStacks = 'At least one tech stack is required';
  }
  if (data.tags.length === 0) {
    errors.tags = 'At least one tag is required';
  }
  return errors;
};

const isEditorJSContentChanged = (original: string, updated: string): boolean => {
  try {
    const originalData = JSON.parse(original);
    const updatedData = JSON.parse(updated);

    /* The problem was that the Editor JS always updated the "time" field even if there were no changes.
       Due to this the description was always detected as changed. So we ignore the time field while comparing.
    */

    return JSON.stringify(originalData.blocks) === JSON.stringify(updatedData.blocks);
  } catch (error) {
    return original === updated;
  }
};
export const extractUpdatedProjectFields = (projectDataSnapshot: any, projectUploadData: any) => {
  console.log(projectDataSnapshot);
  if (!projectDataSnapshot) return null;
  try {
    const data = Object.entries(projectUploadData)
      .map(([key, val]) => {
        const datafromSnapshot = projectDataSnapshot[key];
        if (Array.isArray(val)) {
          if (key === 'contributors') return null; // Always ignore contributors
          // Compare arrays properly
          const snapshotArray = datafromSnapshot || [];
          const currentSorted = [...val].sort();
          const snapshotSorted = [...snapshotArray].sort();

          // Check if the array has changed or not
          if (JSON.stringify(currentSorted) !== JSON.stringify(snapshotSorted)) {
            if (key === 'tags') {
              return ['tagIds', val]; // Transform tags to tagIds
            }
            return [key, val];
          }
          return null; // Don't include field with no changes
        } else if (val instanceof File) {
          return [key, val];
        } else {
          if (key === 'description') {
            const stringVal = val as string;
            // If no difference, skip it
            if (isEditorJSContentChanged(datafromSnapshot, stringVal)) {
              return [key, val];
            }
            return null;
          }
          // If difference is detected add it
          if (datafromSnapshot !== val) {
            return [key, val];
          }
          return null;
        }
      })
      .filter((entry) => entry !== null); // Return valid entries only

    console.log(data);
    return Object.fromEntries(data);
  } catch (error) {
    console.error('Error in extractUpdatedProjectFields:', error);
    return {};
  }
};
