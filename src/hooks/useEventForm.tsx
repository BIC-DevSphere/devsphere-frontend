import { useState } from 'react';
import type { EventSchedule } from '@/types/event.types';

export const useEventForm = () => {
  const [createEventData, setCreateEventData] = useState({
    name: '',
    description: '',
    status: 'UPCOMING' as 'UPCOMING' | 'COMPLETED',
    eventSchedule: [] as EventSchedule[],
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    status: '',
    eventSchedule: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setCreateEventData((prevData) => ({
      ...prevData,
      [name]: value,
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

  return {
    createEventData,
    setCreateEventData,
    handleInputChange,
    handleStatusChange,
    handleAddSchedule,
    handleUpdateSchedule,
    handleRemoveSchedule,
    formErrors,
    setFormErrors,
  };
};
