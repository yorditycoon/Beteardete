import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BookOpen, Plus, Calendar, CheckSquare, Edit, Trash2 } from "lucide-react";
import { mockBibleReadings, mockQuizzes, mockEvents } from "../lib/mock-data";
import { toast } from "sonner";

export function AdminControls() {
  const [newReading, setNewReading] = useState({ week: "", chapters: "" });
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting" as "meeting" | "event" | "gathering",
    description: "",
  });

  const handleAddReading = () => {
    if (newReading.week && newReading.chapters) {
      toast.success("Bible reading scheduled successfully!");
      setNewReading({ week: "", chapters: "" });
    }
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      toast.success("Event added to calendar!");
      setNewEvent({
        title: "",
        date: "",
        time: "",
        type: "meeting",
        description: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Admin Controls</h2>
        <p className="text-muted-foreground">Manage Bible readings, quizzes, and events</p>
      </div>

      <Tabs defaultValue="readings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="readings">Bible Readings</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Bible Readings Tab */}
        <TabsContent value="readings" className="space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Schedule Bible Reading</CardTitle>
              <CardDescription>Assign weekly Bible chapters for members to read</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="week">Week</Label>
                  <Input
                    id="week"
                    placeholder="e.g., Week 5"
                    value={newReading.week}
                    onChange={(e) => setNewReading({ ...newReading, week: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chapters">Chapters</Label>
                  <Input
                    id="chapters"
                    placeholder="e.g., Genesis 16-20"
                    value={newReading.chapters}
                    onChange={(e) => setNewReading({ ...newReading, chapters: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddReading} className="gap-2">
                <Plus className="w-4 h-4" />
                Schedule Reading
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Current Bible Readings</CardTitle>
              <CardDescription>Manage existing reading assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockBibleReadings.map((reading) => (
                  <div
                    key={reading.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{reading.week}</p>
                        <p className="text-sm text-muted-foreground">{reading.chapters}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Create New Quiz</CardTitle>
              <CardDescription>Add quizzes for weekly Bible readings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input id="quiz-title" placeholder="e.g., Abraham's Journey" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiz-week">Week</Label>
                <Select>
                  <SelectTrigger id="quiz-week">
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week1">Week 1</SelectItem>
                    <SelectItem value="week2">Week 2</SelectItem>
                    <SelectItem value="week3">Week 3</SelectItem>
                    <SelectItem value="week4">Week 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Questions</Label>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Question
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg border border-green-100 space-y-3">
                  <Input placeholder="Question text" />
                  <div className="space-y-2">
                    <Label className="text-sm">Answer Options</Label>
                    <Input placeholder="Option 1" className="text-sm" />
                    <Input placeholder="Option 2" className="text-sm" />
                    <Input placeholder="Option 3" className="text-sm" />
                    <Input placeholder="Option 4" className="text-sm" />
                  </div>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Option 1</SelectItem>
                      <SelectItem value="2">Option 2</SelectItem>
                      <SelectItem value="3">Option 3</SelectItem>
                      <SelectItem value="4">Option 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => toast.success("Quiz created successfully!")} className="gap-2">
                <CheckSquare className="w-4 h-4" />
                Create Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Existing Quizzes</CardTitle>
              <CardDescription>Manage created quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{quiz.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {quiz.week} • {quiz.questions.length} questions
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
              <CardDescription>Schedule meetings, gatherings, and special events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="e.g., Saturday Gathering"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: "meeting" | "event" | "gathering") =>
                    setNewEvent({ ...newEvent, type: value })
                  }
                >
                  <SelectTrigger id="event-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gathering">Gathering</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Event details..."
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>

              <Button onClick={handleAddEvent} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Manage scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
