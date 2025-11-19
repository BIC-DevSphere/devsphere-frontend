import EventCard from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { deleteEvent, getAllEvents } from '@/services/admin/eventServices';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      console.log(data);
      setEvents(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventDelete = async (eventId: string) => {
    try {
      const result = await deleteEvent(eventId);
      if (!result?.success) {
        throw new Error('Deletion failed');
      }
      toast.success('Event deleted successfully');
      // Refresh the event list
      fetchEvents();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="grid gap-4 px-8 py-12">
      <p className="text-4xl font-semibold">Events</p>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search and Filter */}
        <div className="">Search and Filter</div>

        {/* Add Event Button */}
        <Button className="flex items-center gap-2 shadow-md" onClick={() => navigate('new')}>
          <PlusIcon className="h-4 w-4" />
          Add New Event
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-12">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No events found.</div>
        ) : (
          <EventCard events={events} onDelete={handleEventDelete} />
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
