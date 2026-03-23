export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "member" | "parent" | "admin";
  familyId?: string;
  familyName?: string;
}

export interface BibleReading {
  id: string;
  week: string;
  weekNumber: number;
  chapters: string;
  completed: boolean;
  voiceRecorded: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  week: string;
  weekNumber: number;
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
  familyId: string;
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

export interface WeeklyProgress {
  userId: string;
  weekNumber: number;
  readingCompleted: boolean;
  voiceRecorded: boolean;
  quizCompleted: boolean;
  quizScore?: number;
}

// Mock users - 5 families with parents and members
export const mockUsers: User[] = [
  // Admin
  { id: "admin1", email: "admin@beteardete.com", password: "admin123", name: "Admin User", role: "admin" },
  
  // Family 1 - Tesfaye Family
  { id: "p1", email: "mother1@test.com", password: "123456", name: "Tsehay Tesfaye", role: "parent", familyId: "fam1", familyName: "Tesfaye Family" },
  { id: "m1a", email: "member1a@test.com", password: "123456", name: "Dawit Tesfaye", role: "member", familyId: "fam1", familyName: "Tesfaye Family" },
  { id: "m1b", email: "member1b@test.com", password: "123456", name: "Sara Tesfaye", role: "member", familyId: "fam1", familyName: "Tesfaye Family" },
  { id: "m1c", email: "member1c@test.com", password: "123456", name: "Daniel Tesfaye", role: "member", familyId: "fam1", familyName: "Tesfaye Family" },
  
  // Family 2 - Kebede Family
  { id: "p2", email: "mother2@test.com", password: "123456", name: "Meseret Kebede", role: "parent", familyId: "fam2", familyName: "Kebede Family" },
  { id: "m2a", email: "member2a@test.com", password: "123456", name: "Yohannes Kebede", role: "member", familyId: "fam2", familyName: "Kebede Family" },
  { id: "m2b", email: "member2b@test.com", password: "123456", name: "Ruth Kebede", role: "member", familyId: "fam2", familyName: "Kebede Family" },
  
  // Family 3 - Assefa Family
  { id: "p3", email: "father3@test.com", password: "123456", name: "Solomon Assefa", role: "parent", familyId: "fam3", familyName: "Assefa Family" },
  { id: "m3a", email: "member3a@test.com", password: "123456", name: "Hanna Assefa", role: "member", familyId: "fam3", familyName: "Assefa Family" },
  { id: "m3b", email: "member3b@test.com", password: "123456", name: "Samuel Assefa", role: "member", familyId: "fam3", familyName: "Assefa Family" },
  { id: "m3c", email: "member3c@test.com", password: "123456", name: "Marta Assefa", role: "member", familyId: "fam3", familyName: "Assefa Family" },
  
  // Family 4 - Haile Family
  { id: "p4", email: "mother4@test.com", password: "123456", name: "Almaz Haile", role: "parent", familyId: "fam4", familyName: "Haile Family" },
  { id: "m4a", email: "member4a@test.com", password: "123456", name: "Abenezer Haile", role: "member", familyId: "fam4", familyName: "Haile Family" },
  { id: "m4b", email: "member4b@test.com", password: "123456", name: "Eden Haile", role: "member", familyId: "fam4", familyName: "Haile Family" },
  
  // Family 5 - Bekele Family
  { id: "p5", email: "father5@test.com", password: "123456", name: "Yosef Bekele", role: "parent", familyId: "fam5", familyName: "Bekele Family" },
  { id: "m5a", email: "member5a@test.com", password: "123456", name: "Bethlehem Bekele", role: "member", familyId: "fam5", familyName: "Bekele Family" },
  { id: "m5b", email: "member5b@test.com", password: "123456", name: "Natnael Bekele", role: "member", familyId: "fam5", familyName: "Bekele Family" },
  { id: "m5c", email: "member5c@test.com", password: "123456", name: "Eyob Bekele", role: "member", familyId: "fam5", familyName: "Bekele Family" },
];

export const getFamilies = () => {
  return [
    { id: "fam1", name: "Tesfaye Family" },
    { id: "fam2", name: "Kebede Family" },
    { id: "fam3", name: "Assefa Family" },
    { id: "fam4", name: "Haile Family" },
    { id: "fam5", name: "Bekele Family" },
  ];
};

// Daily verse
export const dailyVerse = {
  verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  reference: "John 3:16",
};

// Mock Bible readings - shared across all families with week numbers
export const mockBibleReadings: BibleReading[] = [
  { id: "1", week: "Week 1 (Mar 3-9)", weekNumber: 1, chapters: "Genesis 1-3", completed: true, voiceRecorded: true },
  { id: "2", week: "Week 2 (Mar 10-16)", weekNumber: 2, chapters: "Genesis 4-7", completed: true, voiceRecorded: false },
  { id: "3", week: "Week 3 (Mar 17-23)", weekNumber: 3, chapters: "Genesis 8-11", completed: false, voiceRecorded: false },
  { id: "4", week: "Week 4 (Mar 24-30)", weekNumber: 4, chapters: "Genesis 12-15", completed: false, voiceRecorded: false },
];

// Mock quizzes - shared across all families with week numbers
export const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Creation Story",
    week: "Week 1 (Mar 3-9)",
    weekNumber: 1,
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
    week: "Week 2 (Mar 10-16)",
    weekNumber: 2,
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

// Mock questions - now includes familyId
export const mockQuestions: Question[] = [
  {
    id: "1",
    userId: "m1a",
    userName: "Dawit Tesfaye",
    familyId: "fam1",
    question: "What does the creation story teach us about God's nature?",
    answer: "The creation story reveals God as the ultimate Creator who brings order from chaos...",
    answeredAt: "2026-03-20",
    createdAt: "2026-03-19",
  },
  {
    id: "2",
    userId: "m2a",
    userName: "Yohannes Kebede",
    familyId: "fam2",
    question: "How can we apply the lessons from Noah's story in modern times?",
    createdAt: "2026-03-22",
  },
  {
    id: "3",
    userId: "m3b",
    userName: "Samuel Assefa",
    familyId: "fam3",
    question: "Why did God create the world in six days?",
    createdAt: "2026-03-21",
  },
];

// Mock attendance data
export const mockAttendance: Attendance[] = [
  { id: "1", userId: "1", date: "2026-03-01", present: true },
  { id: "2", userId: "1", date: "2026-03-08", present: true },
  { id: "3", userId: "1", date: "2026-03-15", present: false },
  { id: "4", userId: "1", date: "2026-03-22", present: true },
];

// Weekly progress data for each user - to show historical progress
export const mockWeeklyProgress: WeeklyProgress[] = [
  // Week 1 data for various users
  { userId: "m1a", weekNumber: 1, readingCompleted: true, voiceRecorded: true, quizCompleted: true, quizScore: 85 },
  { userId: "m1b", weekNumber: 1, readingCompleted: true, voiceRecorded: false, quizCompleted: true, quizScore: 90 },
  { userId: "m2a", weekNumber: 1, readingCompleted: true, voiceRecorded: true, quizCompleted: true, quizScore: 75 },
  
  // Week 2 data
  { userId: "m1a", weekNumber: 2, readingCompleted: true, voiceRecorded: false, quizCompleted: false },
  { userId: "m1b", weekNumber: 2, readingCompleted: false, voiceRecorded: false, quizCompleted: false },
  { userId: "m2a", weekNumber: 2, readingCompleted: true, voiceRecorded: true, quizCompleted: true, quizScore: 80 },
  
  // Week 3 data (current week - partial data)
  { userId: "m1a", weekNumber: 3, readingCompleted: false, voiceRecorded: false, quizCompleted: false },
];

export const getWeeklyProgressForUser = (userId: string, weekNumber: number) => {
  return mockWeeklyProgress.find(p => p.userId === userId && p.weekNumber === weekNumber) || {
    userId,
    weekNumber,
    readingCompleted: false,
    voiceRecorded: false,
    quizCompleted: false,
  };
};

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