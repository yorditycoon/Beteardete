import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/main-layout";
import { LoginPage } from "./pages/login-page";
import { MemberDashboard } from "./pages/member-dashboard";
import { ParentDashboard } from "./pages/parent-dashboard";
import { AdminDashboard } from "./pages/admin-dashboard";
import { BibleReading } from "./pages/bible-reading";
import { QuizPage } from "./pages/quiz-page";
import { CalendarPage } from "./pages/calendar-page";
import { MembersManagement } from "./pages/members-management";
import { AdminControls } from "./pages/admin-controls";
import { QuestionsPage } from "./pages/questions-page";
import { AttendancePage } from "./pages/attendance-page";
import { FamilyActivities } from "./pages/family-activities";
import { FamilyManagement } from "./pages/family-management";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { path: "member", Component: MemberDashboard },
      { path: "parent", Component: ParentDashboard },
      { path: "admin", Component: AdminDashboard },
      { path: "bible", Component: BibleReading },
      { path: "quiz", Component: QuizPage },
      { path: "calendar", Component: CalendarPage },
      { path: "members", Component: MembersManagement },
      { path: "family-management", Component: FamilyManagement },
      { path: "admin-controls", Component: AdminControls },
      { path: "questions", Component: QuestionsPage },
      { path: "attendance", Component: AttendancePage },
      { path: "family-activities", Component: FamilyActivities },
    ],
  },
]);