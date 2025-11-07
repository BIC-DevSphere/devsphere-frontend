import { useState } from 'react';
import type { EventSchedule } from '@/types/event.types';

export const useEventForm = () => {
  const [createEventData, setCreateEventData] = useState({
    name: '',
    description: '',
    status: 'UPCOMING' as 'UPCOMING' | 'COMPLETED',
    eventSchedule: [] as EventSchedule[],
    thumbnail: null as File | null,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    status: '',
    eventSchedule: '',
    thumbnail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    const target = e.target as HTMLInputElement;
    const files = target.files;

    setCreateEventData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? (files?.[0] ?? null) : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleStatusChange = (value: 'UPCOMING' | 'COMPLETED') => {
    setCreateEventData((prevData) => ({
      ...prevData,
      status: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      status: '',
    }));
  };

  const handleAddSchedule = (schedule: EventSchedule) => {
    setCreateEventData((prevData) => ({
      ...prevData,
      eventSchedule: [...prevData.eventSchedule, schedule],
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      eventSchedule: '',
    }));
  };

  const handleUpdateSchedule = (index: number, schedule: EventSchedule) => {
    setCreateEventData((prevData) => ({
      ...prevData,
      eventSchedule: prevData.eventSchedule.map((s, i) => (i === index ? schedule : s)),
    }));
  };

  const handleRemoveSchedule = (index: number) => {
    setCreateEventData((prevData) => ({
      ...prevData,
      eventSchedule: prevData.eventSchedule.filter((_, i) => i !== index),
    }));
  };

  const removeThumbnail = () => {
    setCreateEventData((prevData) => ({
      ...prevData,
      thumbnail: null,
    }));
  };

  return {
    createEventData,
    setCreateEventData,
    handleInputChange,
    handleStatusChange,
    handleAddSchedule,
    handleUpdateSchedule,
    handleRemoveSchedule,
    removeThumbnail,
    formErrors,
    setFormErrors,
  };
};
