export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "member" | "parent" | "admin";
  familyId?: string;
}

export interface BibleReading {
  id: string;
  week: string;
  chapters: string;
  completed: boolean;
  voiceRecorded: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  week: string;
  questions: QuizQuestion[];
  completed: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "event" | "gathering";
  description: string;
}

export interface Question {
  id: string;
  userId: string;
  userName: string;
  question: string;
  answer?: string;
  answeredAt?: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  present: boolean;
}

// Mock users
export const mockUsers: User[] = [
  { id: "1", email: "member@test.com", password: "123456", name: "John Doe", role: "member", familyId: "fam1" },
  { id: "2", email: "parent@test.com", password: "123456", name: "Mary Smith", role: "parent", familyId: "fam1" },
  { id: "3", email: "admin@test.com", password: "123456", name: "Admin User", role: "admin" },
];

// Daily verse
export const dailyVerse = {
  verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  reference: "John 3:16",
};

// Mock Bible readings
export const mockBibleReadings: BibleReading[] = [
  { id: "1", week: "Week 1", chapters: "Genesis 1-3", completed: true, voiceRecorded: true },
  { id: "2", week: "Week 2", chapters: "Genesis 4-7", completed: true, voiceRecorded: false },
  { id: "3", week: "Week 3", chapters: "Genesis 8-11", completed: false, voiceRecorded: false },
  { id: "4", week: "Week 4", chapters: "Genesis 12-15", completed: false, voiceRecorded: false },
];

// Mock quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Creation Story",
    week: "Week 1",
    completed: true,
    score: 85,
    questions: [
      {
        id: "q1",
        question: "On which day did God create light?",
        options: ["Day 1", "Day 2", "Day 3", "Day 4"],
        correctAnswer: 0,
      },
      {
        id: "q2",
        question: "What did God create on the sixth day?",
        options: ["Fish", "Birds", "Animals and humans", "Plants"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "2",
    title: "Noah's Ark",
    week: "Week 2",
    completed: false,
    questions: [
      {
        id: "q1",
        question: "How many days did it rain?",
        options: ["7 days", "40 days", "100 days", "365 days"],
        correctAnswer: 1,
      },
    ],
  },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Saturday Gathering",
    date: "2026-03-27",
    time: "10:00 AM",
    type: "gathering",
    description: "Weekly church gathering for worship and fellowship",
  },
  {
    id: "2",
    title: "Online Bible Discussion",
    date: "2026-03-24",
    time: "7:00 PM",
    type: "meeting",
    description: "Discussion on this week's Bible reading",
  },
  {
    id: "3",
    title: "Easter Celebration",
    date: "2026-04-05",
    time: "9:00 AM",
    type: "event",
    description: "Special Easter service and celebration",
  },
];

// Mock questions
export const mockQuestions: Question[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    question: "What does the creation story teach us about God's nature?",
    answer: "The creation story reveals God as the ultimate Creator who brings order from chaos...",
    answeredAt: "2026-03-20",
    createdAt: "2026-03-19",
  },
  {
    id: "2",
    userId: "1",
    userName: "John Doe",
    question: "How can we apply the lessons from Noah's story in modern times?",
    createdAt: "2026-03-22",
  },
];

// Mock attendance data
export const mockAttendance: Attendance[] = [
  { id: "1", userId: "1", date: "2026-03-01", present: true },
  { id: "2", userId: "1", date: "2026-03-08", present: true },
  { id: "3", userId: "1", date: "2026-03-15", present: false },
  { id: "4", userId: "1", date: "2026-03-22", present: true },
];

// Statistics
export const getStatistics = () => {
  const totalReadings = mockBibleReadings.length;
  const completedReadings = mockBibleReadings.filter(r => r.completed).length;
  const voiceRecordings = mockBibleReadings.filter(r => r.voiceRecorded).length;
  const totalQuizzes = mockQuizzes.length;
  const completedQuizzes = mockQuizzes.filter(q => q.completed).length;
  const averageScore = mockQuizzes.filter(q => q.score).reduce((acc, q) => acc + (q.score || 0), 0) / completedQuizzes || 0;
  const attendanceRate = (mockAttendance.filter(a => a.present).length / mockAttendance.length) * 100;

  return {
    completedReadings,
    totalReadings,
    voiceRecordings,
    completedQuizzes,
    totalQuizzes,
    averageScore: Math.round(averageScore),
    attendanceRate: Math.round(attendanceRate),
  };
};
