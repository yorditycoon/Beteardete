import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { MessageSquare, CheckCircle, Clock, User } from "lucide-react";
import { mockQuestions } from "../lib/mock-data";
import { toast } from "sonner";

export function QuestionsPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [filter, setFilter] = useState<"all" | "answered" | "pending">("all");

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      toast.success("Question submitted successfully!");
      setNewQuestion("");
    }
  };

  const filteredQuestions = mockQuestions.filter(q => {
    if (filter === "answered") return q.answer;
    if (filter === "pending") return !q.answer;
    return true;
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const isAdmin = currentUser.role === "admin";

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Questions & Doubts</h2>
        <p className="text-muted-foreground">
          {isAdmin ? "Answer member questions" : "Ask questions and get answers from admin"}
        </p>
      </div>

      {/* Ask Question Form - Only for non-admin */}
      {!isAdmin && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>
              Have questions about the readings or need spiritual guidance?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your question here..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={4}
              className="resize-none border-green-200"
            />
            <Button onClick={handleSubmitQuestion} disabled={!newQuestion.trim()}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Question
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filter */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Questions History</CardTitle>
              <CardDescription>
                {isAdmin ? "View and answer all member questions" : "Your questions and answers"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "answered" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("answered")}
              >
                Answered
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="p-4 rounded-lg border border-green-100 bg-white hover:bg-accent/50 transition-colors"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{question.userName}</p>
                        <Badge variant="outline" className={question.answer ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                          {question.answer ? (
                            <><CheckCircle className="w-3 h-3 mr-1" /> Answered</>
                          ) : (
                            <><Clock className="w-3 h-3 mr-1" /> Pending</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Asked on {new Date(question.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-3 pl-13">
                  <p className="font-medium text-sm mb-2">Question:</p>
                  <p className="text-sm">{question.question}</p>
                </div>

                {/* Answer */}
                {question.answer ? (
                  <div className="pl-13 pt-3 border-t border-green-100">
                    <p className="font-medium text-sm mb-2 text-green-700">Answer:</p>
                    <p className="text-sm">{question.answer}</p>
                    {question.answeredAt && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Answered on {new Date(question.answeredAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                ) : isAdmin ? (
                  <div className="pl-13 pt-3 border-t border-green-100">
                    <Textarea
                      placeholder="Type your answer here..."
                      rows={3}
                      className="resize-none border-green-200 mb-2"
                    />
                    <Button size="sm" onClick={() => toast.success("Answer submitted!")}>
                      Submit Answer
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No questions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
