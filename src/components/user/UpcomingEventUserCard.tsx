import { useEffect, useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../ui/button";
import { getAllEvents } from "@/services/admin/eventServices";
import type { EventResponse } from "@/types/event.types";
import { formatDate } from "@/utils/formatdate.utils";

const UpcomingEventUserCard = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const allEvents = await getAllEvents();

        const upcoming = allEvents.filter(
          (event) => event.status?.toLowerCase() === "upcoming"
        );

        setEvents(upcoming);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  if (loading) return <p>Loading Events...</p>;
  if (!events.length) return <p>No upcoming events right now.</p>;

  const event = events[0];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-primary mb-6 text-center text-3xl font-bold">
        Upcoming Events
      </h2>
      <div className="w-full h-88 bg-white rounded-2xl shadow-xl overflow-hidden flex hover:shadow-2xl transition-all duration-300">
        {/* Left Image */}
        <div className="relative w-1/3 h-full p-4">
          <img
            src={event.thumbnailUrl}
            alt="Upcoming Event"
            className="h-full w-full object-cover rounded-2xl"
          />
          <span className="absolute top-6 right-6 bg-white text-xs font-semibold px-3 py-1 rounded shadow-md">
            {event.status}
          </span>
        </div>

        {/* Right Content */}
        <div className="w-2/3 flex flex-col justify-between p-8 pr-10">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-1">
              {event.name}
            </h1>

            <p className="text-gray-400 text-base leading-relaxed mb-4 max-w-4xl">
              {event.description}
            </p>

            <div className="flex flex-col gap-3 text-base">
              {/* Date */}
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5 text-red-600" />
                <span className="text-gray-600 text-sm">
                  {event.eventSchedule?.length
                    ? `${formatDate(event.eventSchedule[0].startDate)} - ${formatDate(
                        event.eventSchedule[event.eventSchedule.length - 1].endDate
                      )}`
                    : "Date TBD"}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="text-gray-600 text-sm">BIC, Biratnagar</span>
              </div>

              {/* Registered */}
              <div className="flex items-center gap-1">
                <Users className="w-5 h-5 text-red-600" />
                <span className="text-gray-600 text-sm">150+ registered</span>
              </div>

              {/* Duration */}
              <div>
                <span className="inline-flex items-center bg-blue-100 text-gray-600 text-xs font-medium px-3 py-1 rounded">
                  <span className="text-blue-600 mr-1">•</span>
                  {event.eventSchedule?.length
                    ? `${Math.ceil(
                        (new Date(
                          event.eventSchedule[event.eventSchedule.length - 1].endDate
                        ).getTime() -
                          new Date(event.eventSchedule[0].startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} days`
                    : "Duration TBD"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white w-1/3 h-auto px-10 py-4 text-base font-semibold rounded-lg transition-all duration-200">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventUserCard;
