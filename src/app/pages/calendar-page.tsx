import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { mockEvents } from "../lib/mock-data";

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const eventDates = mockEvents.map(event => new Date(event.date));
  
  const selectedDateEvents = mockEvents.filter(event => {
    if (!date) return false;
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "gathering":
        return "bg-green-100 text-green-700 border-green-200";
      case "meeting":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "event":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Calendar</h2>
        <p className="text-muted-foreground">View schedules for meetings, events, and gatherings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1 border-green-200">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view events</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-green-200"
              modifiers={{
                hasEvent: eventDates,
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#22c55e",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              {selectedDateEvents.length > 0 ? "Events on Selected Date" : "All Upcoming Events"}
            </CardTitle>
            <CardDescription>
              {date && selectedDateEvents.length > 0
                ? `${selectedDateEvents.length} event(s) on ${date.toLocaleDateString()}`
                : "View all scheduled activities"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(selectedDateEvents.length > 0 ? selectedDateEvents : mockEvents).map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-green-100 hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant="outline" className={`capitalize text-xs ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-sm">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {selectedDateEvents.length === 0 && date && (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No events scheduled for this date</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Types Legend */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
              <span className="text-sm">Gathering - Saturday church meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
              <span className="text-sm">Meeting - Online Bible discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-100 border border-purple-200"></div>
              <span className="text-sm">Event - Special celebrations and services</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
