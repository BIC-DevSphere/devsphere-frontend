import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Calendar } from 'lucide-react';
import type { EventSchedule } from '@/types/event.types';

interface EventScheduleManagerProps {
  schedules: EventSchedule[];
  isViewMode?: boolean;
  errors: any;
  onAddSchedule: (schedule: EventSchedule) => void;
  onUpdateSchedule: (index: number, schedule: EventSchedule) => void;
  onRemoveSchedule: (index: number) => void;
}

export const EventScheduleManager = ({
  schedules,
  isViewMode = false,
  errors,
  onAddSchedule,
  onUpdateSchedule,
  onRemoveSchedule,
}: EventScheduleManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Omit<EventSchedule, 'id'>>({
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleAddClick = () => {
    if (newSchedule.description && newSchedule.startDate && newSchedule.endDate) {
      // Validate dates
      if (new Date(newSchedule.endDate) < new Date(newSchedule.startDate)) {
        alert('End date must be after start date');
        return;
      }

      onAddSchedule({
        id: `temp-${Date.now()}`,
        ...newSchedule,
      });

      // Reset form
      setNewSchedule({
        description: '',
        startDate: '',
        endDate: '',
      });
      setIsAdding(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="event-schedule-manager">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Label className="text-foreground text-sm font-medium">Event Schedule</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            Add multiple schedules for your event
          </p>
        </div>
        {!isViewMode && !isAdding && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Schedule
          </Button>
        )}
      </div>

      {/* Display existing schedules */}
      <div className="mb-4 space-y-3">
        {schedules.length === 0 && !isAdding && (
          <div className="border-border rounded border border-dashed p-6 text-center">
            <Calendar className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              {isViewMode
                ? 'No schedules added yet'
                : 'Click "Add Schedule" to create event schedules'}
            </p>
          </div>
        )}

        {schedules.map((schedule, index) => (
          <Card key={schedule.id || index} className="border-border border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-foreground font-medium">{schedule.description}</p>
                <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Start: {formatDate(schedule.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>End: {formatDate(schedule.endDate)}</span>
                  </div>
                </div>
              </div>
              {!isViewMode && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveSchedule(index)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add new schedule form */}
      {isAdding && !isViewMode && (
        <Card className="border-primary bg-primary/5 border p-4">
          <h4 className="text-foreground mb-3 font-medium">Add New Schedule</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="schedule-description" className="text-foreground text-sm font-medium">
                Description
              </Label>
              <Input
                id="schedule-description"
                type="text"
                placeholder="e.g., Registration Opens, Workshop Session"
                value={newSchedule.description}
                onChange={(e) =>
                  setNewSchedule((prev) => ({ ...prev, description: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="schedule-start-date"
                  className="text-foreground text-sm font-medium"
                >
                  Start Date & Time
                </Label>
                <Input
                  id="schedule-start-date"
                  type="datetime-local"
                  value={newSchedule.startDate}
                  onChange={(e) =>
                    setNewSchedule((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="schedule-end-date" className="text-foreground text-sm font-medium">
                  End Date & Time
                </Label>
                <Input
                  id="schedule-end-date"
                  type="datetime-local"
                  value={newSchedule.endDate}
                  onChange={(e) => setNewSchedule((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setNewSchedule({ description: '', startDate: '', endDate: '' });
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAddClick}
                disabled={
                  !newSchedule.description || !newSchedule.startDate || !newSchedule.endDate
                }
              >
                Add Schedule
              </Button>
            </div>
          </div>
        </Card>
      )}

      {errors.eventSchedule && (
        <div className="text-destructive mt-2 text-sm">{errors.eventSchedule}</div>
      )}
    </div>
  );
};
