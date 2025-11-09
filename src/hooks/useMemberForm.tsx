import { useState, useCallback } from 'react';

export const useMemberForm = () => {
  const [createMemberData, setCreateMemberData] = useState({
    name: '',
    role: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
    year: new Date().toISOString().split('T')[0],
    avatar: null as File | null,
    avatarUrl: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    role: '',
    status: '',
    year: '',
    avatar: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;

    setCreateMemberData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? (files?.[0] ?? null) : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleStatusChange = (status: 'ACTIVE' | 'INACTIVE') => {
    setCreateMemberData((prevData) => ({
      ...prevData,
      status,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      status: '',
    }));
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          avatar: 'Please select a valid image file',
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          avatar: 'Image size should be less than 5MB',
        }));
        return;
      }
    }

    setCreateMemberData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      avatar: '',
    }));
  };

  const removeAvatar = () => {
    setCreateMemberData((prevData) => ({
      ...prevData,
      avatar: null,
      avatarUrl: '',
    }));
  };

  const validateForm = () => {
    const errors = {
      name: '',
      role: '',
      status: '',
      year: '',
      avatar: '',
    };

    if (!createMemberData.name.trim()) {
      errors.name = 'Member name is required';
    }

    if (!createMemberData.role.trim()) {
      errors.role = 'Member role is required';
    }

    if (!createMemberData.status || !['ACTIVE', 'INACTIVE'].includes(createMemberData.status)) {
      errors.status = 'Valid status (ACTIVE/INACTIVE) is required';
    }

    if (!createMemberData.year.trim()) {
      errors.year = 'Member year is required';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const resetForm = useCallback(() => {
    setCreateMemberData({
      name: '',
      role: '',
      status: 'ACTIVE',
      year: new Date().toISOString().split('T')[0],
      avatar: null,
      avatarUrl: '',
    });
    setFormErrors({
      name: '',
      role: '',
      status: '',
      year: '',
      avatar: '',
    });
  }, []);

  const setMemberData = useCallback((memberData: any) => {
    setCreateMemberData({
      name: memberData.name || '',
      role: memberData.role || '',
      status: memberData.status || 'ACTIVE',
      year: memberData.year ? new Date(memberData.year).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      avatar: memberData.avatar || null,
      avatarUrl: memberData.avatarUrl || '',
    });
  }, []);

  return {
    createMemberData,
    setCreateMemberData,
    setMemberData,
    handleInputChange,
    handleStatusChange,
    handleAvatarChange,
    removeAvatar,
    validateForm,
    resetForm,
    formErrors,
    setFormErrors,
  };
};
