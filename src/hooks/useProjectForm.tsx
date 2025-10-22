import { useState } from 'react';

export const useProjectForm = () => {
  const [createProjectData, setCreateProjectData] = useState({
    name: '',
    thumbnail: null,
    githubLink: '',
    demoLink: '',
    techStacks: [],
    tags: [],
    description: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    thumbnail: '',
    githubLink: '',
    demoLink: '',
    techStacks: '',
    tags: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;

    setCreateProjectData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? (files?.[0] ?? null) : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setCreateProjectData((prevData) => {
      const currentArray = prevData[name as keyof typeof prevData] as string[];

      if (currentArray.includes(value)) {
        console.log('Value already exists:', value);
        return prevData; // Don't add duplicates
      }

      return {
        ...prevData,
        [name]: [...currentArray, value],
      };
    });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleAddTag = (tagId: string) => {
    setCreateProjectData((prev) => ({
      ...prev,
      tags: [...prev.tags, tagId],
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      tags: '',
    }));
  };

  const handleRemoveItem = (name: string, value: any) => {
    setCreateProjectData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item: any) => item !== value),
    }));
  };

  const handleRemoveTag = (tagId: string) => {
    setCreateProjectData((prev) => ({
      ...prev,
      tags: prev.tags.filter((id) => id !== tagId),
    }));
  };

  const addDescription = (description: string) => {
    setCreateProjectData((prevData) => ({
      ...prevData,
      description,
    }));
  };

  const removeThumbnail = () => {
    setCreateProjectData((prevData) => ({
      ...prevData,
      thumbnail: null,
    }));
  };

  return {
    createProjectData,
    setCreateProjectData,
    handleInputChange,
    handleSelectChange,
    handleRemoveItem,
    handleAddTag,
    handleRemoveTag,
    addDescription,
    removeThumbnail,
    formErrors,
    setFormErrors,
  };
};
