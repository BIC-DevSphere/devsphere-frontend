export const normalizeEventData = (data: any) => {
  try {
    // Parse description if it's a string
    let parsedDescription = data.description;
    if (typeof data.description === 'string' && data.description) {
      try {
        parsedDescription = JSON.parse(data.description);
      } catch (e) {
        // If it's not valid JSON, wrap it in Editor.js format
        parsedDescription = {
          time: Date.now(),
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: data.description,
              },
            },
          ],
        };
      }
    }

    const normalizedData = {
      name: data.name,
      status: data.status,
      eventSchedule:
        data.eventSchedule?.map((schedule: any) => ({
          id: schedule.id,
          description: schedule.description,
          startDate: schedule.startDate,
          endDate: schedule.endDate,
        })) || [],
      description: parsedDescription, // Store as object, not string
    };
    return normalizedData;
  } catch (error) {
    console.error('Error normalizing event data:', error);
    return null;
  }
};

export const validateEventData = (data: any) => {
  const errors = {
    name: '',
    status: '',
    eventSchedule: '',
    description: '',
  };

  if (!data.name.trim()) {
    errors.name = 'Event name is required';
  }
  if (!data.status) {
    errors.status = 'Event status is required';
  }
  if (!data.eventSchedule || data.eventSchedule.length === 0) {
    errors.eventSchedule = 'At least one schedule is required';
  }

  return errors;
};

const isEditorJSContentChanged = (original: any, updated: string): boolean => {
  try {
    // original is now an object, updated is a JSON string
    const originalBlocks =
      typeof original === 'string' ? JSON.parse(original).blocks : original?.blocks;
    const updatedData = JSON.parse(updated);

    // Compare blocks content, ignoring time field
    return JSON.stringify(originalBlocks) !== JSON.stringify(updatedData.blocks);
  } catch (error) {
    return true; // If there's an error, consider it changed
  }
};

export const extractUpdatedEventFields = (eventDataSnapshot: any, eventUploadData: any) => {
  if (!eventDataSnapshot) return null;

  try {
    const changes = Object.entries(eventUploadData)
      .map(([key, val]) => {
        const dataFromSnapshot = eventDataSnapshot[key];

        if (key === 'eventSchedule') {
          // Deep comparison for schedules
          if (JSON.stringify(val) !== JSON.stringify(dataFromSnapshot)) {
            return [key, val];
          }
          return null;
        } else if (key === 'description') {
          const stringVal = val as string;
          // Compare parsed description object with new string value
          if (isEditorJSContentChanged(dataFromSnapshot, stringVal)) {
            return [key, val];
          }
          return null;
        } else {
          // Simple field comparison
          if (val !== dataFromSnapshot) {
            return [key, val];
          }
          return null;
        }
      })
      .filter((entry): entry is [string, any] => entry !== null);

    if (changes.length === 0) return null;

    return Object.fromEntries(changes);
  } catch (error) {
    console.error('Error extracting updated event fields:', error);
    return null;
  }
};
