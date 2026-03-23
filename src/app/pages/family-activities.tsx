import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  User, 
  BookOpen, 
  Award, 
  Mic, 
  MessageSquare,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { mockUsers, getStatistics } from "../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function FamilyActivities() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const familyMembers = mockUsers.filter(u => u.familyId === currentUser.familyId && u.role === "member");
  const [selectedMember, setSelectedMember] = useState(familyMembers[0] || null);

  const stats = getStatistics();

  const memberData = [
    { id: "readings", activity: "Readings", completed: 2, total: 4 },
    { id: "quizzes", activity: "Quizzes", completed: 1, total: 2 },
    { id: "recordings", activity: "Recordings", completed: 1, total: 2 },
  ];

  const quizResults = [
    { id: "q1", quiz: "Creation Story", score: 85, date: "2026-03-15" },
    { id: "q2", quiz: "Noah's Ark", score: 0, date: "Not taken" },
  ];

  const questions = [
    {
      id: "1",
      question: "What does the creation story teach us about God's nature?",
      answered: true,
      date: "2026-03-19",
    },
    {
      id: "2",
      question: "How can we apply the lessons from Noah's story in modern times?",
      answered: false,
      date: "2026-03-22",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Family Activities</h2>
        <p className="text-muted-foreground">Monitor your family members' spiritual progress</p>
      </div>

      {familyMembers.length === 0 ? (
        <Card className="border-green-200">
          <CardContent className="py-12 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-medium mb-2">No Family Members</h3>
            <p className="text-muted-foreground">Register family members to track their activities</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Member Selection */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Select Family Member</CardTitle>
              <CardDescription>Choose a member to view their detailed activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-4 rounded-lg border transition-colors text-left ${
                      selectedMember?.id === member.id
                        ? "border-primary bg-primary/5"
                        : "border-green-100 hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{member.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                      </div>
                    </div>
                    {selectedMember?.id === member.id && (
                      <Badge className="mt-2">Selected</Badge>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedMember && (
            <>
              {/* Member Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-semibold">2/4</p>
                        <p className="text-sm text-muted-foreground">Readings</p>
                      </div>
                    </div>
                    <Progress value={50} className="mt-3" />
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-semibold">85%</p>
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                      </div>
                    </div>
                    <Progress value={85} className="mt-3" />
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Mic className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-semibold">1</p>
                        <p className="text-sm text-muted-foreground">Recordings</p>
                      </div>
                    </div>
                    <Progress value={25} className="mt-3" />
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-semibold">75%</p>
                        <p className="text-sm text-muted-foreground">Attendance</p>
                      </div>
                    </div>
                    <Progress value={75} className="mt-3" />
                  </CardContent>
                </Card>
              </div>

              {/* Activity Details */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle>{selectedMember.name}'s Activities</CardTitle>
                  <CardDescription>Detailed breakdown of activities and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="progress" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="progress">Progress</TabsTrigger>
                      <TabsTrigger value="quizzes">Quiz Results</TabsTrigger>
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="progress" className="space-y-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={memberData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                          <XAxis dataKey="activity" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" fill="#4ade80" name="Completed" />
                          <Bar dataKey="total" fill="#86efac" name="Total" />
                        </BarChart>
                      </ResponsiveContainer>

                      <div className="space-y-3 mt-6">
                        <h4 className="font-medium">Reading Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-green-100">
                            <span className="text-sm">Week 1 - Genesis 1-3</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-green-100">
                            <span className="text-sm">Week 2 - Genesis 4-7</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-green-100">
                            <span className="text-sm">Week 3 - Genesis 8-11</span>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Pending
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="quizzes" className="space-y-4">
                      <div className="space-y-3">
                        {quizResults.map((result, index) => (
                          <div
                            key={index}
                            className="p-4 bg-muted/50 rounded-lg border border-green-100"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{result.quiz}</h4>
                              {result.score > 0 ? (
                                <Badge className="bg-green-600">{result.score}%</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  Not Taken
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {result.score > 0 ? `Completed on ${result.date}` : result.date}
                            </p>
                            {result.score > 0 && (
                              <Progress value={result.score} className="mt-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="questions" className="space-y-4">
                      <div className="space-y-3">
                        {questions.map((q) => (
                          <div
                            key={q.id}
                            className="p-4 bg-muted/50 rounded-lg border border-green-100"
                          >
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <MessageSquare className="w-4 h-4 text-primary" />
                                  <Badge variant="outline" className={q.answered ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                                    {q.answered ? "Answered" : "Pending"}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium">{q.question}</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">Asked on {q.date}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}