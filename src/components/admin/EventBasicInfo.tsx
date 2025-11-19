import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EventBasicInfoProps {
  name: string;
  status: 'UPCOMING' | 'COMPLETED';
  isViewMode?: boolean;
  errors: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: 'UPCOMING' | 'COMPLETED') => void;
}

export const EventBasicInfo = ({
  name,
  status,
  isViewMode = false,
  errors,
  onChange,
  onStatusChange,
}: EventBasicInfoProps) => {
  return (
    <>
      <div className="event-name-input">
        <Label className="text-foreground mb-2 block text-sm font-medium">Event Name</Label>
        {isViewMode ? (
          <div className="border-border bg-muted text-foreground mt-2 rounded border p-3">
            {name || '—'}
          </div>
        ) : (
          <div>
            <Input
              type="text"
              name="name"
              className="mt-2"
              placeholder="Enter name of the event"
              value={name}
              onChange={onChange}
            />
            {errors.name && <div className="text-destructive mt-1 text-sm">{errors.name}</div>}
          </div>
        )}
      </div>

      {/* Event Status */}
      <div className="event-status-input mt-6">
        <Label className="text-foreground mb-2 block text-sm font-medium">Event Status</Label>
        {isViewMode ? (
          <div className="border-border bg-muted mt-2 rounded border p-3">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  status === 'UPCOMING' ? 'bg-chart-2' : 'bg-chart-3'
                }`}
              ></div>
              <span className="text-foreground">
                {status === 'UPCOMING' ? 'Upcoming' : 'Completed'}
              </span>
            </div>
          </div>
        ) : (
          <div>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UPCOMING">
                  <div className="flex items-center gap-2">
                    <div className="bg-chart-2 h-2 w-2 rounded-full"></div>
                    Upcoming
                  </div>
                </SelectItem>
                <SelectItem value="COMPLETED">
                  <div className="flex items-center gap-2">
                    <div className="bg-chart-3 h-2 w-2 rounded-full"></div>
                    Completed
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <div className="text-destructive mt-1 text-sm">{errors.status}</div>}
          </div>
        )}
      </div>
    </>
  );
};
