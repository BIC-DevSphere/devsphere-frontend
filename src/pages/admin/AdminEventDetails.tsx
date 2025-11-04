import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/services/admin/eventServices";

const dummyEvents = [
		{
			"id": "4786f250-3fda-48a5-80ea-de84fdf9076f",
			"name": "ABCD",
			"description": "ALPHABET",
			"status": "UPCOMING",
			"eventSchedule": [
				{
					"id": "fcbe5081-3f6e-4696-bb2b-19f7758a6425",
					"startDate": "2025-09-15T10:00:00.000Z",
					"endDate": "2025-09-15T12:00:00.000Z",
					"description": "TODAY IS FIRST DAY",
					"eventId": "4786f250-3fda-48a5-80ea-de84fdf9076f"
				},
				{
					"id": "aa11b7ed-a465-4098-897c-5ce847b71549",
					"startDate": "2025-09-16T12:00:00.000Z",
					"endDate": "2025-09-16T14:00:00.000Z",
					"description": "TODAY IS SECOND DAY",
					"eventId": "4786f250-3fda-48a5-80ea-de84fdf9076f"
				}
			]
		},
		{
			"id": "e5ae4620-b899-4486-83d9-a622074933f4",
			"name": "NEW EVENT",
			"description": "NEW EVENT",
			"status": "UPCOMING",
			"eventSchedule": [
				{
					"id": "95e60be8-4feb-47f1-b6fc-ae30ddc3f073",
					"startDate": "2025-09-15T10:00:00.000Z",
					"endDate": "2025-09-15T12:00:00.000Z",
					"description": "TODAY IS FIRST DAY",
					"eventId": "e5ae4620-b899-4486-83d9-a622074933f4"
				},
				{
					"id": "b11fd7e1-7aae-49fd-9638-98fad118e3f3",
					"startDate": "2025-09-16T12:00:00.000Z",
					"endDate": "2025-09-16T14:00:00.000Z",
					"description": "TODAY IS SECOND DAY",
					"eventId": "e5ae4620-b899-4486-83d9-a622074933f4"
				}
			]
		},
		{
			"id": "c4514d94-4b7a-4834-8e16-e3e42618244e",
			"name": "COMPLETED EVENT",
			"description": "NEW EVENT",
			"status": "COMPLETED",
			"eventSchedule": [
				{
					"id": "81c70f52-8386-4317-bd09-80247de1c289",
					"startDate": "2025-09-15T10:00:00.000Z",
					"endDate": "2025-09-15T12:00:00.000Z",
					"description": "TODAY IS FIRST DAY",
					"eventId": "c4514d94-4b7a-4834-8e16-e3e42618244e"
				},
				{
					"id": "2ebff3bc-80b7-4507-8c5c-fda1ce92ea2f",
					"startDate": "2025-09-16T12:00:00.000Z",
					"endDate": "2025-09-16T14:00:00.000Z",
					"description": "TODAY IS SECOND DAY",
					"eventId": "c4514d94-4b7a-4834-8e16-e3e42618244e"
				}
			]
		},
		{
			"id": "aeb58d3f-e5d1-4e3f-95d7-d447d858ffd4",
			"name": "COMPLETED TEST",
			"description": "NEW EVENT",
			"status": "COMPLETED",
			"eventSchedule": [
				{
					"id": "3d71c36a-119e-41d6-b3f8-bf354a27280b",
					"startDate": "2025-09-15T10:00:00.000Z",
					"endDate": "2025-09-15T12:00:00.000Z",
					"description": "TODAY IS FIRST DAY",
					"eventId": "aeb58d3f-e5d1-4e3f-95d7-d447d858ffd4"
				},
				{
					"id": "7f6f780f-1845-4b04-92a6-6c6974ca6820",
					"startDate": "2025-09-16T12:00:00.000Z",
					"endDate": "2025-09-16T14:00:00.000Z",
					"description": "TODAY IS SECOND DAY",
					"eventId": "aeb58d3f-e5d1-4e3f-95d7-d447d858ffd4"
				}
			]
		}
	]

const AdminEventDetails = () => {
  const { id } = useParams<{ id }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);

        const foundEvent = dummyEvents.find((e) => e.id === id);
        setEvent(foundEvent);

        // const data = await getEventById(id);
        // setEvent(data);
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