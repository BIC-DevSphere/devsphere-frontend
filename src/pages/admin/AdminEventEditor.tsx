import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, XIcon, Pencil, Save, Trash2 } from 'lucide-react';
import {
  createEvent,
  getEventById,
  deleteEvent,
  updateEvent,
} from '@/services/admin/eventServices';
import { useEventForm } from '@/hooks/useEventForm';
import { useEditorJs } from '@/hooks/useEditorJs';
import { EventBasicInfo } from '@/components/admin/EventBasicInfo';
import { EventScheduleManager } from '@/components/admin/EventScheduleManager';
import { ThumbnailUpload } from '@/components/admin/ThumbnailUpload';
import {
  extractUpdatedEventFields,
  normalizeEventData,
  validateEventData,
} from '@/utils/event.utils';

const AdminEventEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(!id);
  const [isLoading, setIsLoading] = useState(!!id);
  const [eventDataSnapshot, setEventDataSnapshot] = useState<any>(null);
  const [fetchedEventInfo, setFetchedEventInfo] = useState<any>(null);
  const [editorDescription, setEditorDescription] = useState<any>(null);

  const {
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
  } = useEventForm();

  // Initialize editor with description data
  const { editorRef, editorHolder } = useEditorJs(editorDescription);

  const isCreateMode = !id;
  const isViewMode = id && !isEditing;
  const isEditMode = id && isEditing;

  // Fetch event data if in view/edit mode
  useEffect(() => {
    if (id) {
      fetchEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEvent = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const event = await getEventById(id);
      let descriptionData = null;

      if (event.description) {
        try {
          descriptionData = JSON.parse(event.description);
        } catch {
          // If parsing fails, create a basic structure
          descriptionData = {
            time: Date.now(),
            blocks: [
              {
                type: 'paragraph',
                data: {
                  text: event.description,
                },
              },
            ],
          };
        }
      }

      // Update event object with parsed description
      event.description = descriptionData;

      if (event) {
        setFetchedEventInfo(event);
        const normalizedData = normalizeEventData(event);
        setCreateEventData(normalizedData);
        setEventDataSnapshot(normalizedData);

        // Set editor description after normalizing data
        setEditorDescription(descriptionData);
      }
    } catch (error) {
      toast.error('Failed to load event');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Save editor content
      const outputData = await editorRef.current?.save();
      if (!outputData || !outputData.blocks || outputData.blocks.length === 0) {
        toast.error('Please write event description');
        return;
      }

      const eventData = {
        ...createEventData,
        description: JSON.stringify(outputData),
      };

      const errors = validateEventData(eventData);
      setFormErrors(errors);
      if (Object.values(errors).some((err) => err)) {
        toast.error('Please fix validation errors');
        return;
      }

      if (isCreateMode) {
        const response = await createEvent(eventData);
        toast.success('Event created successfully!');
        navigate(`/admin/events/${response.id}`);
      } else {
        const updateData = extractUpdatedEventFields(eventDataSnapshot, eventData);

        if (!updateData || Object.keys(updateData).length === 0) {
          toast.error('No changes detected to update');
          return;
        }

        console.log('Updating event with:', updateData);

        const result = await updateEvent(id, updateData);
        console.log('Event updated successfully:', result);

        // Refetch event data
        await fetchEvent();
        toast.success('Event updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(isCreateMode ? 'Failed to create event' : 'Failed to update event');
      console.error('Submit error:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully!');
      navigate('/admin/events');
    } catch (error) {
      toast.error('Failed to delete event');
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
      // Refetch to reset changes
      fetchEvent();
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-muted-foreground">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="create-event-container p-8">
      <div className="create-event-header">
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground hover:text-foreground mb-3 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              {isCreateMode ? 'Add a New Event' : isEditMode ? 'Edit Event' : 'Event Details'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isCreateMode
                ? 'Please fill in the details below to create a new event.'
                : isEditMode
                  ? 'Update the event information below.'
                  : 'View event information.'}
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
            <div className="create-event-footer">
              <Button onClick={handleSubmit}>Create Event</Button>
            </div>
          )}
        </div>
      </div>

      <div
        className="create-event-body mt-8 grid gap-4"
        style={{
          gridTemplateAreas: `
            "left right"
            "description-bottom thumbnail-bottom"
          `,
          gridTemplateColumns: '7fr 3fr',
        }}
      >
        <Card
          className="event-input-left border-border bg-card border-1 p-6 shadow-md"
          style={{ gridArea: 'left' }}
        >
          <div className="event-input-left-header border-border mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold">Event Details</h1>
          </div>

          <EventBasicInfo
            name={createEventData.name}
            status={createEventData.status}
            isViewMode={isViewMode}
            errors={formErrors}
            onChange={handleInputChange}
            onStatusChange={handleStatusChange}
          />
        </Card>

        <div className="event-input-right flex flex-col gap-4" style={{ gridArea: 'right' }}>
          <Card className="event-schedule-card border-border bg-card border-1 p-6 shadow-md">
            <div className="event-schedule-header border-border mb-4 border-b pb-4">
              <h1 className="text-xl font-bold">Schedules</h1>
              <p className="text-muted-foreground mt-1 text-xs">Manage event timeline</p>
            </div>
            <EventScheduleManager
              schedules={createEventData.eventSchedule}
              isViewMode={isViewMode}
              errors={formErrors}
              onAddSchedule={handleAddSchedule}
              onUpdateSchedule={handleUpdateSchedule}
              onRemoveSchedule={handleRemoveSchedule}
            />
          </Card>
        </div>

        <Card
          className="event-input-bottom border-border bg-card h-auto min-h-40 w-full border-1 p-6 shadow-md"
          style={{ gridArea: 'description-bottom' }}
        >
          <div className="event-description-header">
            <h2 className="border-border mb-6 border-b pb-4 text-2xl font-bold">
              Event Description
            </h2>
          </div>
          <div className="event-description-input">
            <div id="editorjs" ref={editorHolder} />
          </div>
        </Card>

        <Card
          className="event-thumbnail-card border-border bg-card border-1 p-6 shadow-md"
          style={{ gridArea: 'thumbnail-bottom' }}
        >
          <ThumbnailUpload
            thumbnail={createEventData.thumbnail}
            thumbnailUrl={fetchedEventInfo?.thumbnailUrl}
            isViewMode={isViewMode}
            onChange={handleInputChange}
            onRemove={removeThumbnail}
          />
        </Card>
      </div>
    </div>
  );
};

export default AdminEventEditor;
