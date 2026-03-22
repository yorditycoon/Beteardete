import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { CheckCircle, Circle, Award, ChevronRight } from "lucide-react";
import { mockQuizzes } from "../lib/mock-data";
import { toast } from "sonner";

export function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(mockQuizzes[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedQuiz.questions.length - 1;

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate score
      let correct = 0;
      selectedQuiz.questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correct++;
        }
      });
      const score = Math.round((correct / selectedQuiz.questions.length) * 100);
      setQuizCompleted(true);
      toast.success(`Quiz completed! Your score: ${score}%`);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedQuiz.questions.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Weekly Quizzes</h2>
        <p className="text-muted-foreground">Test your knowledge of the Bible readings</p>
      </div>

      {/* Quiz Overview */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Available Quizzes</CardTitle>
          <CardDescription>Complete quizzes to test your understanding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockQuizzes.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => {
                  setSelectedQuiz(quiz);
                  setQuizStarted(false);
                  setQuizCompleted(false);
                }}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  selectedQuiz.id === quiz.id
                    ? "border-primary bg-primary/5"
                    : "border-green-100 hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{quiz.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{quiz.week}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {quiz.questions.length} questions
                    </p>
                  </div>
                  <div>
                    {quiz.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </div>
                {quiz.completed && quiz.score !== undefined && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge className="bg-green-600">Score: {quiz.score}%</Badge>
                  </div>
                )}
                {!quiz.completed && (
                  <Badge variant="outline" className="mt-3 bg-amber-50 text-amber-700 border-amber-200">
                    Not Started
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Content */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{selectedQuiz.title}</CardTitle>
              <CardDescription className="mt-1">{selectedQuiz.week}</CardDescription>
            </div>
            {selectedQuiz.completed && (
              <Badge className="bg-green-600 gap-1">
                <Award className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!quizStarted && !quizCompleted ? (
            /* Quiz Overview */
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{selectedQuiz.title}</h3>
              <p className="text-muted-foreground mb-6">
                This quiz contains {selectedQuiz.questions.length} questions
              </p>
              {selectedQuiz.completed ? (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Previous Score: {selectedQuiz.score}%</span>
                  </div>
                  <div>
                    <Button onClick={handleStartQuiz} variant="outline">
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleStartQuiz} size="lg">
                  Start Quiz
                </Button>
              )}
            </div>
          ) : quizCompleted ? (
            /* Quiz Results */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-medium mb-2">Quiz Completed!</h3>
              <p className="text-4xl font-semibold text-green-600 mb-4">{calculateScore()}%</p>
              <p className="text-muted-foreground mb-8">
                You answered {selectedQuiz.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {selectedQuiz.questions.length} questions correctly
              </p>
              
              {/* Review Answers */}
              <div className="mt-8 space-y-4 max-w-2xl mx-auto text-left">
                <h4 className="font-medium text-center mb-4">Review Your Answers</h4>
                {selectedQuiz.questions.map((question, index) => {
                  const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                  return (
                    <div key={question.id} className={`p-4 rounded-lg border ${
                      isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Your answer: </span>
                            <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                              {question.options[selectedAnswers[question.id]]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm mt-1">
                              <span className="text-muted-foreground">Correct answer: </span>
                              <span className="text-green-700">
                                {question.options[question.correctAnswer]}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button onClick={() => setQuizCompleted(false)} className="mt-8">
                Back to Quizzes
              </Button>
            </div>
          ) : (
            /* Quiz Questions */
            <div className="space-y-6">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                  </span>
                  <span className="font-medium">
                    {Math.round(((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100} 
                  className="h-2"
                />
              </div>

              {/* Question */}
              <div className="bg-muted/50 rounded-lg p-6 border border-green-100 min-h-[300px]">
                <h4 className="text-lg font-medium mb-6">{currentQuestion.question}</h4>

                <RadioGroup
                  value={selectedAnswers[currentQuestion.id]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                          selectedAnswers[currentQuestion.id] === index
                            ? "border-primary bg-primary/5"
                            : "border-green-100 hover:bg-accent"
                        }`}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  className="gap-2"
                >
                  {isLastQuestion ? "Submit Quiz" : "Next Question"}
                  {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
