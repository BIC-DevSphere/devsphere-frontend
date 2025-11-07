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

/**
 * Maps event images to thumbnailUrl for backward compatibility
 */
const mapEventResponse = (event: EventResponse): EventResponse => {
  const thumbnailUrl =
    event.images?.find((img) => img.imageType === 'PROMOTIONAL')?.imageUrl || event.thumbnailUrl;

  return {
    ...event,
    description: parseDescription(event.description),
    thumbnailUrl,
  };
};

export const getAllEvents = async (): Promise<EventResponse[]> => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.events);
    if (!res || res.status !== 200) {
      throw new Error('Failed to fetch events');
    }

    // Parse descriptions and map images in all events
    return res.data.data.map((event: EventResponse) => mapEventResponse(event));
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

    // Map images but keep description as raw JSON for editor
    const event = res.data.data;
    const thumbnailUrl =
      event.images?.find((img: any) => img.imageType === 'PROMOTIONAL')?.imageUrl ||
      event.thumbnailUrl;

    return {
      ...event,
      thumbnailUrl,
      // Keep description as raw string - will be parsed by AdminEventEditor
    };
  } catch (err) {
    throw err;
  }
};

export const createEvent = async (eventData: EventRequest): Promise<EventResponse> => {
  try {
    const formData = {
      name: eventData.name,
      description: eventData.description,
      status: eventData.status,
      eventSchedule: eventData.eventSchedule,
      images: eventData.thumbnail ? [{ imageType: 'PROMOTIONAL' }] : [],
    };

    const payload: any = {
      eventData: JSON.stringify(formData),
    };

    if (eventData.thumbnail) {
      payload.imageFiles = eventData.thumbnail;
    }

    const res = await axiosInstance.postForm(API_ENDPOINTS.events, payload);
    if (!res) {
      throw new Error('Failed to create event');
    }

    const event = res.data.data;
    return mapEventResponse(event);
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (
  eventId: string,
  eventDataUpdates: Partial<EventRequest>
): Promise<EventResponse> => {
  try {
    // Get current event to merge with updates
    const currentEvent = await getEventById(eventId);

    // Process schedules - remove temp IDs for new schedules
    let processedSchedules = eventDataUpdates.eventSchedule;
    if (eventDataUpdates.eventSchedule) {
      processedSchedules = eventDataUpdates.eventSchedule.map((schedule) => {
        // Keep real UUIDs (existing schedules), remove temp IDs (new schedules)
        if (schedule.id && schedule.id.includes('-') && schedule.id.length === 36) {
          return schedule;
        }
        const { id, ...scheduleWithoutId } = schedule;
        return scheduleWithoutId;
      });
    }

    const mergedData = {
      name: eventDataUpdates.name ?? currentEvent.name,
      description: eventDataUpdates.description ?? currentEvent.description,
      status: eventDataUpdates.status ?? currentEvent.status,
      eventSchedule: processedSchedules ?? currentEvent.eventSchedule,
      images: eventDataUpdates.thumbnail
        ? [{ imageType: 'PROMOTIONAL' }]
        : (currentEvent.images ?? []),
    };

    const payload: any = {
      eventData: JSON.stringify(mergedData),
    };

    if (eventDataUpdates.thumbnail) {
      payload.imageFiles = eventDataUpdates.thumbnail;
    }

    const res = await axiosInstance.patchForm(`${API_ENDPOINTS.events}/${eventId}`, payload);
    if (!res || res.status !== 200) {
      throw new Error('Failed to update event');
    }

    const event = res.data.data;
    return mapEventResponse(event);
  } catch (error) {
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
