import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { UserCheck, Users, TrendingUp, Calendar as CalendarIcon } from "lucide-react";
import { mockUsers, mockAttendance } from "../lib/mock-data";
import { toast } from "sonner";

export function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const members = mockUsers.filter(u => u.role === "member" || u.role === "parent");
  
  const handleToggleAttendance = (userId: string) => {
    setAttendance({
      ...attendance,
      [userId]: !attendance[userId],
    });
  };

  const handleSaveAttendance = () => {
    const presentCount = Object.values(attendance).filter(Boolean).length;
    toast.success(`Attendance saved! ${presentCount} of ${members.length} members present.`);
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    members.forEach(m => {
      allPresent[m.id] = true;
    });
    setAttendance(allPresent);
    toast.success("All members marked as present");
  };

  const handleClearAll = () => {
    setAttendance({});
    toast.info("Attendance cleared");
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const attendanceRate = members.length > 0 ? Math.round((presentCount / members.length) * 100) : 0;

  // Calculate monthly statistics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyAttendance = mockAttendance.filter(a => {
    const date = new Date(a.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const monthlyRate = monthlyAttendance.length > 0
    ? Math.round((monthlyAttendance.filter(a => a.present).length / monthlyAttendance.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Attendance Tracking</h2>
        <p className="text-muted-foreground">Record attendance for Saturday church gatherings</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                <p className="text-3xl font-semibold">{members.length}</p>
              </div>
              <Users className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Present Today</p>
                <p className="text-3xl font-semibold">{presentCount}</p>
                <p className="text-xs text-muted-foreground mt-1">{attendanceRate}% attendance</p>
              </div>
              <UserCheck className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Average</p>
                <p className="text-3xl font-semibold">{monthlyRate}%</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <TrendingUp className="w-10 h-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date Selection */}
        <Card className="lg:col-span-1 border-green-200">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose the gathering date</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border border-green-200"
            />
          </CardContent>
        </Card>

        {/* Attendance Form */}
        <Card className="lg:col-span-2 border-green-200">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>
                  Saturday Gathering - {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
                  All Present
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Attendance List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-green-100 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      id={`attendance-${member.id}`}
                      checked={attendance[member.id] || false}
                      onCheckedChange={() => handleToggleAttendance(member.id)}
                    />
                    <Label
                      htmlFor={`attendance-${member.id}`}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </Label>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      attendance[member.id]
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    }
                  >
                    {attendance[member.id] ? "Present" : "Absent"}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="pt-4 border-t border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {presentCount} of {members.length} members present
                  </p>
                  <p className="text-2xl font-semibold text-primary">{attendanceRate}%</p>
                </div>
                <Button onClick={handleSaveAttendance} size="lg" className="gap-2">
                  <UserCheck className="w-5 h-5" />
                  Save Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Recent Attendance Records</CardTitle>
          <CardDescription>Past attendance for reference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockAttendance
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
              .map((record, index) => {
                const member = members.find(m => m.id === record.userId);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">
                          {new Date(record.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">{member?.name}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        record.present
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {record.present ? "Present" : "Absent"}
                    </Badge>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
