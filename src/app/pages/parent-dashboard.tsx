import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  CheckCircle,
  UserPlus
} from "lucide-react";
import { dailyVerse, mockBibleReadings, getStatistics, mockUsers } from "../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";

export function ParentDashboard() {
  const navigate = useNavigate();
  const stats = getStatistics();
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const familyMembers = mockUsers.filter(u => u.familyId === currentUser.familyId && u.role === "member");

  const familyProgressData = familyMembers.map((member, index) => ({
    id: member.id,
    name: member.name,
    readings: 2,
    quizzes: 1,
    recordings: 1,
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Parent Dashboard</h2>
        <p className="text-muted-foreground">Manage your family members and track their progress</p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/app/members")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Family Members</p>
                <p className="text-3xl font-semibold">{familyMembers.length}</p>
              </div>
              <Users className="w-12 h-12 text-primary opacity-50" />
            </div>
            <Button variant="outline" className="w-full mt-4">
              <UserPlus className="w-4 h-4 mr-2" />
              Register New Member
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/app/family-activities")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Family Activities</p>
                <p className="text-3xl font-semibold">View All</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary opacity-50" />
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Family Progress
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Family Members Overview */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Family Members</CardTitle>
          <CardDescription>Quick overview of your family members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-green-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/app/family-activities")}>
                  View Progress
                </Button>
              </div>
            ))}
            {familyMembers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No family members registered yet</p>
                <Button className="mt-4" onClick={() => navigate("/app/members")}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register First Member
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Family Progress Chart */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Family Progress Overview</CardTitle>
          <CardDescription>Track Bible readings, quizzes, and voice recordings</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={familyProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="readings" fill="#4ade80" name="Completed Readings" />
              <Bar dataKey="quizzes" fill="#86efac" name="Completed Quizzes" />
              <Bar dataKey="recordings" fill="#22c55e" name="Voice Recordings" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Personal Statistics */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Your Personal Progress</CardTitle>
          <CardDescription>Your own spiritual journey statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{stats.completedReadings}/{stats.totalReadings}</p>
                  <p className="text-sm text-muted-foreground">Readings</p>
                </div>
              </div>
              <Progress value={(stats.completedReadings / stats.totalReadings) * 100} />
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{stats.averageScore}%</p>
                  <p className="text-sm text-muted-foreground">Quiz Score</p>
                </div>
              </div>
              <Progress value={stats.averageScore} />
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{stats.attendanceRate}%</p>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                </div>
              </div>
              <Progress value={stats.attendanceRate} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Reading */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Current Week's Reading</CardTitle>
          <CardDescription>Your assigned Bible chapters</CardDescription>
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
    </div>
  );
}