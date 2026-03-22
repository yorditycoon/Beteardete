import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BookOpen, Mic, MicOff, CheckCircle, Circle, Play, Square } from "lucide-react";
import { mockBibleReadings } from "../lib/mock-data";
import { toast } from "sonner";

export function BibleReading() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedReading, setSelectedReading] = useState(mockBibleReadings[0]);

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      toast.success("Recording started");
      
      // Simulate recording timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Store interval ID to clear later
      (window as any).recordingInterval = interval;
    } else {
      setIsRecording(false);
      clearInterval((window as any).recordingInterval);
      toast.success("Recording saved successfully!");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedCount = mockBibleReadings.filter(r => r.completed).length;
  const totalCount = mockBibleReadings.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Bible Reading</h2>
        <p className="text-muted-foreground">Read assigned chapters and record your voice</p>
      </div>

      {/* Progress Overview */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Reading Progress</CardTitle>
          <CardDescription>
            {completedCount} of {totalCount} readings completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(completedCount / totalCount) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round((completedCount / totalCount) * 100)}% complete
          </p>
        </CardContent>
      </Card>

      {/* Reading List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reading List */}
        <Card className="lg:col-span-1 border-green-200">
          <CardHeader>
            <CardTitle>Assigned Readings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockBibleReadings.map((reading) => (
              <button
                key={reading.id}
                onClick={() => setSelectedReading(reading)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedReading.id === reading.id
                    ? "border-primary bg-primary/5"
                    : "border-green-100 hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{reading.week}</p>
                    <p className="text-xs text-muted-foreground mt-1">{reading.chapters}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {reading.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {reading.completed && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Read
                    </Badge>
                  )}
                  {reading.voiceRecorded && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Recorded
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Reading Details */}
        <Card className="lg:col-span-2 border-green-200">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedReading.week}</CardTitle>
                <CardDescription className="mt-1">{selectedReading.chapters}</CardDescription>
              </div>
              {selectedReading.completed && (
                <Badge className="bg-green-600">Completed</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="read" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="record">Voice Recording</TabsTrigger>
              </TabsList>
              
              <TabsContent value="read" className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-6 border border-green-100 min-h-[300px]">
                  <div className="flex items-start gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium mb-2">Reading Assignment</h4>
                      <p className="text-sm text-muted-foreground">
                        Please read {selectedReading.chapters} from your Bible.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <p className="text-sm">
                      <strong>Instructions:</strong>
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                      <li>Read the assigned chapters carefully</li>
                      <li>Take notes of important verses</li>
                      <li>Reflect on the meaning and lessons</li>
                      <li>Record your voice reading when ready</li>
                      <li>Complete the quiz after reading</li>
                    </ul>
                  </div>
                  
                  {!selectedReading.completed && (
                    <Button className="mt-6 w-full" onClick={() => toast.success("Reading marked as complete!")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="record" className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-6 border border-green-100 min-h-[300px]">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {/* Recording Status */}
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                      isRecording ? "bg-red-100 animate-pulse" : "bg-primary/10"
                    }`}>
                      {isRecording ? (
                        <Mic className="w-12 h-12 text-red-600" />
                      ) : (
                        <MicOff className="w-12 h-12 text-primary" />
                      )}
                    </div>

                    {/* Timer */}
                    {isRecording && (
                      <div className="text-center">
                        <p className="text-3xl font-mono font-semibold">{formatTime(recordingTime)}</p>
                        <p className="text-sm text-muted-foreground mt-1">Recording in progress...</p>
                      </div>
                    )}

                    {/* Recording Button */}
                    <Button
                      size="lg"
                      onClick={handleToggleRecording}
                      variant={isRecording ? "destructive" : "default"}
                      className="gap-2"
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          Start Recording
                        </>
                      )}
                    </Button>

                    {/* Previous Recordings */}
                    {selectedReading.voiceRecorded && !isRecording && (
                      <div className="w-full mt-6 pt-6 border-t border-green-200">
                        <h4 className="font-medium mb-3 text-sm">Previous Recording</h4>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Recording - {selectedReading.week}</p>
                            <p className="text-xs text-muted-foreground">Duration: 5:32</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isRecording && (
                      <div className="text-center text-sm text-muted-foreground max-w-md">
                        <p>Click the button above to start recording your voice while reading the assigned chapters.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
