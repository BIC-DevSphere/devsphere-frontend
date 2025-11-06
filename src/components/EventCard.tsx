import { Link } from 'react-router-dom';
import type { EventResponse } from '@/types/event.types';

interface EventCardProps {
  events: EventResponse[];
}

const EventCard: React.FC<EventCardProps> = ({ events }) => {
  console.log(events);

  return (
    <>
      {events.map((event) => (
        <Link
          key={event.id}
          to={`/admin/events/${event.id}`}
          className="bg-card max-w-md overflow-hidden rounded-lg shadow-lg"
        >
          <div className="relative">
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`rounded-md px-2 py-1 text-sm ${
                  event.status === 'UPCOMING' ? 'bg-chart-2 text-white' : 'bg-chart-3 text-white'
                }`}
              >
                {event.status}
              </span>
            </div>

            {/* Dummy Image */}
            <img
              src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg"
              alt={event.name}
              className="h-48 w-full object-cover"
            />
          </div>

          <div className="space-y-4 p-4">
            {/* Title */}
            <h3 className="font-heading text-xl font-semibold">{event.name}</h3>

            {/* Description */}
            <p className="font-body line-clamp-3 break-words">{event.description}</p>

            {/* Schedule Info */}
            {event.eventSchedule && event.eventSchedule.length > 0 && (
              <>
                <p className="text-muted-foreground text-sm">
                  Starts: {new Date(event.eventSchedule[0].startDate).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground text-sm">
                  Ends:{' '}
                  {new Date(
                    event.eventSchedule[event.eventSchedule.length - 1].endDate
                  ).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default EventCard;
