import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Settings,
  FolderTree
} from "lucide-react";
import { dailyVerse, mockUsers, mockBibleReadings, mockQuizzes, mockEvents, mockQuestions, getStatistics, getFamilies } from "../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { useNavigate } from "react-router";

export function AdminDashboard() {
  const navigate = useNavigate();
  const stats = getStatistics();
  
  const totalMembers = mockUsers.filter(u => u.role === "member").length;
  const totalParents = mockUsers.filter(u => u.role === "parent").length;
  const totalUsers = totalMembers + totalParents;
  const upcomingEvents = mockEvents.filter(e => new Date(e.date) >= new Date()).length;
  const pendingQuestions = mockQuestions.filter(q => !q.answer).length;

  // Family-based statistics
  const families = getFamilies();

  const getFamilyStats = (familyId: string) => {
    const familyMembers = mockUsers.filter(u => u.familyId === familyId);
    const memberCount = familyMembers.filter(u => u.role === "member").length;
    
    // Simulated stats - in real app, would calculate from actual data
    const avgQuizScores = [85, 78, 92, 88, 81];
    const attendanceRates = [75, 82, 90, 78, 85];
    const completedReadings = [2, 3, 2, 1, 2];
    
    const familyIndex = parseInt(familyId.replace('fam', '')) - 1;
    
    return {
      members: memberCount,
      avgQuiz: avgQuizScores[familyIndex] || 80,
      attendance: attendanceRates[familyIndex] || 80,
      readings: completedReadings[familyIndex] || 2
    };
  };

  // Weekly activity trend
  const weeklyActivity = [
    { id: "w1", week: "Week 1", readings: 8, quizzes: 6, recordings: 5 },
    { id: "w2", week: "Week 2", readings: 7, quizzes: 5, recordings: 4 },
    { id: "w3", week: "Week 3", readings: 3, quizzes: 2, recordings: 2 },
    { id: "w4", week: "Week 4", readings: 1, quizzes: 0, recordings: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">Manage the entire church community and monitor activities</p>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                <p className="text-3xl font-semibold">{totalUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalMembers} members, {totalParents} parents
                </p>
              </div>
              <Users className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
                <p className="text-3xl font-semibold">{upcomingEvents}</p>
                <p className="text-xs text-muted-foreground mt-1">Scheduled events</p>
              </div>
              <Calendar className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Questions</p>
                <p className="text-3xl font-semibold">{pendingQuestions}</p>
                <p className="text-xs text-muted-foreground mt-1">Need answers</p>
              </div>
              <MessageSquare className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Attendance</p>
                <p className="text-3xl font-semibold">{stats.attendanceRate}%</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <UserCheck className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/app/family-management")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <FolderTree className="w-8 h-8 text-primary" />
              <h4 className="font-medium">Family Management</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Create families and assign parents
            </p>
            <Button variant="outline" className="w-full">
              Manage Families
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/app/admin-controls")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-8 h-8 text-primary" />
              <h4 className="font-medium">Admin Controls</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule readings, create quizzes, and manage events
            </p>
            <Button variant="outline" className="w-full">
              Go to Controls
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/app/attendance")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <UserCheck className="w-8 h-8 text-primary" />
              <h4 className="font-medium">Take Attendance</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Record attendance for Saturday gatherings
            </p>
            <Button variant="outline" className="w-full">
              Mark Attendance
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/app/questions")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h4 className="font-medium">Answer Questions</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {pendingQuestions} questions waiting for your response
            </p>
            <Button variant="outline" className="w-full">
              View Questions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Trend */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Weekly Activity Trend</CardTitle>
          <CardDescription>Track overall community engagement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="readings" stroke="#4ade80" strokeWidth={2} name="Readings" />
              <Line type="monotone" dataKey="quizzes" stroke="#86efac" strokeWidth={2} name="Quizzes" />
              <Line type="monotone" dataKey="recordings" stroke="#22c55e" strokeWidth={2} name="Recordings" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Family Statistics */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Family Performance Overview</CardTitle>
          <CardDescription>Individual family progress and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {families.map((family, index) => {
              const familyStat = getFamilyStats(family.id);
              return (
                <div key={family.id} className="p-4 bg-muted/50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{family.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {family.parentName ? `Led by ${family.parentName}` : 'No parent assigned'} • {familyStat.members} members
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate("/app/family-management")}>
                      Manage
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg Quiz Score</p>
                      <div className="flex items-center gap-2">
                        <Progress value={familyStat.avgQuiz} className="flex-1" />
                        <span className="text-sm font-medium">{familyStat.avgQuiz}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={familyStat.attendance} className="flex-1" />
                        <span className="text-sm font-medium">{familyStat.attendance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Completed Readings</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(familyStat.readings / 4) * 100} className="flex-1" />
                        <span className="text-sm font-medium">{familyStat.readings}/4</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Recent Completions</CardTitle>
            <CardDescription>Latest member activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe completed Genesis 1-3</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Award className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe scored 85% on Creation Quiz</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Mary Smith recorded voice for Week 1</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Next events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-green-100">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}