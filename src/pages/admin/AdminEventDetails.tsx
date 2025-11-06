import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/services/admin/eventServices";

const AdminEventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {        
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  if (isLoading) return <div className="p-8">Loading event details...</div>;

  return (
    <div className="p-8 space-y-6">
      {/* Back Arrow */}
      <Button
        variant="ghost"
        onClick={() => navigate("/admin/events")}
        className="flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Events
      </Button>

      {/* Event Details */}
      <div className="bg-card p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl font-heading font-semibold">{event.name}</h1>
        <p className="text-muted-foreground">{event.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <span className={`px-2 py-1 text-sm rounded-md ${event.status === "UPCOMING" ? "bg-chart-2 text-white" : "bg-chart-3 text-white"}`}>
            {event.status}
          </span>
        </div>

        {/* Event Schedule */}
        {event.eventSchedule && event.eventSchedule.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Schedule</h2>
            {event.eventSchedule.map((schedule) => (
              <div key={schedule.id} className="border p-4 rounded-md space-y-1">
                <p className="font-medium">{schedule.description}</p>
                <p className="text-sm text-muted-foreground">
                  Start: {new Date(schedule.startDate).toLocaleString()} | End: {new Date(schedule.endDate).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventDetails;