import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { getAllEvents } from '@/services/admin/eventServices';
import type { EventResponse } from '@/types/event.types';
import { getEventScheduleText, getEventDurationText } from '@/utils/event.utils';

const UpcomingEventUserCard = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const allEvents = await getAllEvents();

        const upcoming = allEvents.filter((event) => event.status?.toLowerCase() === 'upcoming');

        setEvents(upcoming);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  if (loading) return <p>Loading Events...</p>;
  if (!events.length) return <p>No upcoming events right now.</p>;

  const event = events[0];

  const scheduleText = getEventScheduleText(event.eventSchedule);

  const durationText = getEventDurationText(event.eventSchedule);

  return (
    <section>
      <h2 className="text-red-700 mb-10 text-center text-5xl font-bold">Upcoming Events</h2>
      <div className="flex h-88 w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* Left Image */}
        <div className="relative h-full w-1/3 p-4">
          <img
            src={
              event.thumbnailUrl ||
              'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
            }
            alt="Upcoming Event"
            className="h-full w-full rounded-2xl object-cover"
          />
          <span className="absolute top-6 right-6 rounded bg-white px-3 py-1 text-xs font-semibold shadow-md">
            {event.status}
          </span>
        </div>

        {/* Right Content */}
        <div className="flex w-2/3 flex-col justify-between p-8 pr-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-heading text-3xl font-semibold text-slate-900 md:text-4xl">
                {event.name}
              </h1>

              <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                {event.description}
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-cyan-700">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-semibold tracking-wider uppercase">Schedule</span>
                  </div>
                  <p className="text-sm text-slate-700">{scheduleText}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-cyan-700">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold tracking-wider uppercase">Venue</span>
                  </div>
                  <p className="text-sm text-slate-700">BIC, Biratnagar</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:col-span-2 lg:col-span-1">
                  <div className="mb-2 flex items-center gap-2 text-cyan-700">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-semibold tracking-wider uppercase">Audience</span>
                  </div>
                  <p className="text-sm text-slate-700">150+ registered</p>
                </div>
              </div>

              <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
                Duration: {durationText}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-900 hover:bg-blue-900 px-24 py-6">Register Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventUserCard;
