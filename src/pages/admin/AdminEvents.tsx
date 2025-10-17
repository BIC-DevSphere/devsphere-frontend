import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/services/admin/eventServices";
import EventCard from "@/components/EventCard";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  // if (!events || events.length === 0) {
  //   return <div className="p-8">Loading events...</div>;
  // }

  return (
    <div className="grid py-12 px-8 gap-4">
      <p className="text-4xl font-semibold">Events</p>

      <Button className="justify-self-end">Add New Event</Button>

      <div className="">Search and Filter</div>

      <div className="flex flex-wrap gap-x-4 gap-y-12">
        <EventCard 
        // events={events} 
        />
      </div>
    </div>
  );
};

export default AdminEvents;