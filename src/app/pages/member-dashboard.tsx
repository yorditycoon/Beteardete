import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { 
  BookOpen, 
  Mic, 
  CheckCircle, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { dailyVerse, mockBibleReadings, mockQuizzes, mockEvents, getStatistics, getWeeklyProgressForUser } from "../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

export function MemberDashboard() {
  const [question, setQuestion] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(3); // Current week is 3
  const stats = getStatistics();
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = currentUser.id || "m1a";

  // Get weekly progress for selected week
  const weekProgress = getWeeklyProgressForUser(userId, selectedWeek);

  const readingData = [
    { name: "Week 1", completed: 1, pending: 0 },
    { name: "Week 2", completed: 1, pending: 0 },
    { name: "Week 3", completed: 0, pending: 1 },
    { name: "Week 4", completed: 0, pending: 1 },
  ];

  const voiceRecordingData = [
    { name: "Recorded", value: stats.voiceRecordings },
    { name: "Not Recorded", value: stats.completedReadings - stats.voiceRecordings },
  ];

  const attendanceData = [
    { name: "Attended", value: stats.attendanceRate },
    { name: "Absent", value: 100 - stats.attendanceRate },
  ];

  const COLORS = ["#4ade80", "#86efac", "#22c55e", "#16a34a"];

  const handleSubmitQuestion = () => {
    if (question.trim()) {
      toast.success("Question submitted successfully!");
      setQuestion("");
    }
  };

  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Welcome Back!</h2>
        <p className="text-muted-foreground">Continue your spiritual journey with today's verse</p>
      </div>

      {/* Daily Verse */}
      <Card className="border-green-200 bg-gradient-to-br from-white to-green-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Daily Verse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg italic mb-2">"{dailyVerse.verse}"</p>
          <p className="text-sm text-muted-foreground">— {dailyVerse.reference}</p>
        </CardContent>
      </Card>

      {/* Upcoming Events Alert */}
      {upcomingEvents.length > 0 && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-primary/10 rounded flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-semibold">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                  <Badge variant="outline" className="mt-1 capitalize">{event.type}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Reading Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold">{stats.completedReadings}/{stats.totalReadings}</p>
                <p className="text-xs text-muted-foreground mt-1">Chapters completed</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary opacity-50" />
            </div>
            <Progress value={(stats.completedReadings / stats.totalReadings) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Voice Recordings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold">{stats.voiceRecordings}</p>
                <p className="text-xs text-muted-foreground mt-1">Recordings done</p>
              </div>
              <Mic className="w-8 h-8 text-primary opacity-50" />
            </div>
            <Progress value={(stats.voiceRecordings / stats.completedReadings) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Quiz Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold">{stats.averageScore}%</p>
                <p className="text-xs text-muted-foreground mt-1">Average score</p>
              </div>
              <Award className="w-8 h-8 text-primary opacity-50" />
            </div>
            <Progress value={stats.averageScore} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold">{stats.attendanceRate}%</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary opacity-50" />
            </div>
            <Progress value={stats.attendanceRate} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reading Progress Chart */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Weekly Reading Progress</CardTitle>
            <CardDescription>Track your Bible reading completion</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={readingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4ade80" name="Completed" />
                <Bar dataKey="pending" fill="#86efac" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Voice Recording Chart */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Voice Recording Status</CardTitle>
            <CardDescription>Your voice recording completion rate</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={voiceRecordingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {voiceRecordingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Chart */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Saturday Gathering Attendance</CardTitle>
          <CardDescription>Your attendance for this month</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#4ade80" : "#e5e7eb"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ask Question */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Ask a Question
          </CardTitle>
          <CardDescription>
            Have questions or doubts? Ask the admin for guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="resize-none border-green-200"
          />
          <Button onClick={handleSubmitQuestion} disabled={!question.trim()}>
            Submit Question
          </Button>
        </CardContent>
      </Card>

      {/* Current Bible Reading */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Current Week's Reading</CardTitle>
          <CardDescription>Your assigned Bible chapters for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBibleReadings.slice(0, 2).map((reading) => (
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
                <div className="flex items-center gap-2">
                  {reading.completed && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                  {reading.voiceRecorded && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Mic className="w-3 h-3 mr-1" />
                      Recorded
                    </Badge>
                  )}
                  {!reading.completed && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Viewer */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Progress History</CardTitle>
              <CardDescription>View your progress for past weeks</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
                disabled={selectedWeek === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-3">Week {selectedWeek}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.min(4, selectedWeek + 1))}
                disabled={selectedWeek === 4}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">Reading</p>
                </div>
                {weekProgress.readingCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {weekProgress.readingCompleted ? "Completed" : "Not completed"}
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">Voice Recording</p>
                </div>
                {weekProgress.voiceRecorded ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {weekProgress.voiceRecorded ? "Recorded" : "Not recorded"}
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">Quiz</p>
                </div>
                {weekProgress.quizCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {weekProgress.quizCompleted 
                  ? `Score: ${weekProgress.quizScore}%` 
                  : "Not completed"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}