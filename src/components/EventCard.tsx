import { Link } from 'react-router-dom';
import type { EventResponse } from '@/types/event.types';
import { Button } from './ui/button';
import { PenIcon, TrashIcon } from 'lucide-react';

interface EventCardProps {
  events: EventResponse[];
  onDelete?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ events, onDelete }) => {
  return (
    <>
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-card text-card-foreground flex min-h-40 w-92 flex-col overflow-hidden rounded-lg transition-shadow duration-300 shadow-lg hover:shadow-xl"
        >
          {/* Image Section */}
          <div className="bg-card relative h-48 flex-shrink-0">
            <img
              className="h-full w-full object-cover"
              src={
                event.thumbnailUrl ||
                'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
              }
              alt={event.name}
            />

            {/* Status Badge - Top Right */}
            <div className="absolute top-2 right-2">
              <span
                className={`rounded-md px-2 py-1 text-xs backdrop-blur-sm ${
                  event.status === 'UPCOMING'
                    ? 'bg-chart-2 text-primary-foreground'
                    : 'bg-chart-3 text-primary-foreground'
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-card-foreground flex flex-1 flex-col p-4">
            {/* Header - Title */}
            <div className="mb-3">
              <h3 className="text-foreground font-heading mb-2 line-clamp-1 text-lg font-semibold">
                {event.name}
              </h3>
            </div>

            {/* Description Preview */}
            <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-sm">
              {event.description}
            </p>

            {/* Schedule Info */}
            {event.eventSchedule && event.eventSchedule.length > 0 && (
              <div className="text-muted-foreground mb-2 text-xs">
                <span>
                  Starts: {new Date(event.eventSchedule[0].startDate).toLocaleDateString()}
                </span>
                <span className="ml-2">
                  Ends:{' '}
                  {new Date(
                    event.eventSchedule[event.eventSchedule.length - 1].endDate
                  ).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Footer - Edit/Delete */}
            <div className="mt-auto flex items-center justify-end gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => onDelete && onDelete(event.id)}
                title="Delete Event"
              >
                <TrashIcon className="h-3 w-3" />
              </Button>
              <Link to={`/admin/events/${event.id}`}>
                <Button className="h-7 w-7 p-0" title="Edit Event">
                  <PenIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCard;
