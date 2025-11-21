import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { EventResponse } from "@/types/event.types";
import { getAllEvents } from "@/services/admin/eventServices";
import { formatDate } from "@/utils/formatdate.utils";

const EventUserCard = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const allEvents = await getAllEvents();
        const completed = allEvents.filter(
            (event) => event.status?.toLowerCase() === "completed"
        );

        setEvents(completed)
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (!events.length) return <p>No events found.</p>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-primary mb-6 text-center text-3xl font-bold">Events</h2>
      <div className="grid gap-4 md:grid-cols-3 py-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative p-0.5">
              <img
                src={event.thumbnailUrl || "https://placehold.co/600x400/orange/white"}
                alt={event.name}
                className="w-full h-44 object-cover rounded-t-xl"
              />

              <div className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded flex items-center gap-1 shadow-md">
                <span className="text-green-400 text-base leading-none">●</span>
                {event.status?.toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                {event.name}
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                {event.description}
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-500 mt-3">
                {/* Dates */}
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <span>
                    {event.eventSchedule?.length
                      ? `${formatDate(event.eventSchedule[0].startDate)} - ${formatDate(
                          event.eventSchedule[event.eventSchedule.length - 1].endDate
                        )}`
                      : "Date TBD"}
                  </span>
                </div>

                {/* Fixed location for now (until backend adds proper field) */}
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <span>Biratnagar International College</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users size={18} className="text-gray-500" />
                  <span>50 attending</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center pb-5">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-sm tracking-wide w-4/5 py-2.5 rounded-lg shadow-md transition-all duration-300">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventUserCard;
