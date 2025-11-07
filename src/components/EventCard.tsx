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
          className="flex min-h-40 w-92 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          {/* Image Section */}
          <div className="relative h-48 flex-shrink-0">
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
                className={`rounded-md px-2 py-1 text-xs text-white backdrop-blur-sm ${
                  event.status === 'UPCOMING' ? 'bg-blue-500/90' : 'bg-gray-500/90'
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-4">
            {/* Header - Title */}
            <div className="mb-3">
              <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
                {event.name}
              </h3>
            </div>

            {/* Description Preview */}
            <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">{event.description}</p>

            {/* Schedule Info */}
            {event.eventSchedule && event.eventSchedule.length > 0 && (
              <div className="mb-2 text-xs text-gray-500">
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
