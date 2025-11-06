import { API_ENDPOINTS } from '@/config/apiConfig';
import { axiosInstance } from '../axiosInterceptor';
import type { EventResponse, EventRequest } from '@/types/event.types';

/**
 * Parses description - handles both plain text and JSON editor format
 */
const parseDescription = (description: string | null | undefined): string => {
  if (!description) return '';

  try {
    // Try to parse as JSON (Editor.js format)
    const parsed = JSON.parse(description);
    if (parsed.blocks && Array.isArray(parsed.blocks)) {
      // Extract text from blocks
      return parsed.blocks
        .map((block: any) => block.data?.text || '')
        .filter((text: string) => text.length > 0)
        .join('\n');
    }
  } catch {
    // Not JSON, return as plain text
    return description;
  }

  return description;
};

export const getAllEvents = async (): Promise<EventResponse[]> => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.events);
    if (!res || res.status !== 200) {
      throw new Error('Failed to fetch events');
    }

    // Parse descriptions in all events
    return res.data.data.map((event: EventResponse) => ({
      ...event,
      description: parseDescription(event.description),
    }));
  } catch (err) {
    throw err;
  }
};

export const getEventById = async (id: string): Promise<EventResponse> => {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.events}/${id}`);
    if (!res || res.status !== 200) {
      throw new Error('Failed to fetch event');
    }

    // Parse description
    const event = res.data.data;
    return {
      ...event,
      description: parseDescription(event.description),
    };
  } catch (err) {
    throw err;
  }
};

export const createEvent = async (eventData: EventRequest): Promise<EventResponse> => {
  try {
    console.log('Creating event with data: ', eventData);
    const res = await axiosInstance.postForm(API_ENDPOINTS.events, {
      eventData: JSON.stringify(eventData),
    });

    if (!res) {
      throw new Error('Failed to create event');
    }

    const event = res.data.data;
    return {
      ...event,
      description: parseDescription(event.description),
    };
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (
  eventId: string,
  eventDataUpdates: Partial<EventRequest>
): Promise<EventResponse> => {
  try {
    // Fetch current event data
    const currentEvent = await getEventById(eventId);

    // Process event schedules to ensure proper structure
    let processedSchedules = eventDataUpdates.eventSchedule;

    if (eventDataUpdates.eventSchedule) {
      // Clean up schedules: remove temporary client-side IDs if they exist
      processedSchedules = eventDataUpdates.eventSchedule.map((schedule) => {
        // If the schedule has an id that's a valid UUID (from server), keep it
        // If it's a new schedule (no id or temporary id), remove the id field
        if (schedule.id && schedule.id.includes('-') && schedule.id.length === 36) {
          // Looks like a valid UUID from the server
          return schedule;
        }
        // New schedule - remove id field so backend treats it as new
        const { id, ...scheduleWithoutId } = schedule;
        return scheduleWithoutId;
      });
    }

    // Merge current data with updates
    const mergedEventData = {
      ...currentEvent,
      ...eventDataUpdates,
      ...(processedSchedules && { eventSchedule: processedSchedules }),
    };

    const stringifiedData = JSON.stringify(mergedEventData);

    const res = await axiosInstance.patchForm(`${API_ENDPOINTS.events}/${eventId}`, {
      eventData: stringifiedData,
    });

    if (!res || res.status !== 200) {
      throw new Error('Failed to update event');
    }

    const event = res.data.data;
    return {
      ...event,
      description: parseDescription(event.description),
    };
  } catch (error) {
    console.error('Update error:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const res = await axiosInstance.delete(`${API_ENDPOINTS.events}/${eventId}`);
    if (!res || res.status !== 200) {
      throw new Error('Failed to delete event');
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};
