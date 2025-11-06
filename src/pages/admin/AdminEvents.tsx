import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/services/admin/eventServices';
import EventCard from '@/components/EventCard';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewEvent = () => {
    // Navigate directly to the full editor for creating new events
    navigate('/admin/events/new');
  };

  if (isLoading) {
    return <div className="p-8">Loading events...</div>;
  }

  return (
    <div className="grid gap-4 px-8 py-12">
      <p className="text-4xl font-semibold">Events</p>

      <div className="flex gap-2 justify-self-end">
        <Button onClick={handleAddNewEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Event
        </Button>
      </div>

      <div className="">Search and Filter</div>

      <div className="flex flex-wrap gap-x-4 gap-y-12">
        {events.length === 0 ? (
          <div className="text-muted-foreground w-full py-12 text-center">
            No events found. Create your first event!
          </div>
        ) : (
          <EventCard events={events} />
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
