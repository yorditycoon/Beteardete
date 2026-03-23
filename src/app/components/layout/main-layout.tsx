import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { User } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { 
  Church, 
  Home, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  CheckSquare,
  ClipboardList,
  UserCheck,
  FolderTree
} from "lucide-react";
import { toast } from "sonner";

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!currentUser) return null;

  const navItems = [
    { 
      path: currentUser.role === "admin" ? "/app/admin" : currentUser.role === "parent" ? "/app/parent" : "/app/member", 
      icon: Home, 
      label: "Dashboard",
      roles: ["member", "parent", "admin"]
    },
    { 
      path: "/app/family-management", 
      icon: FolderTree, 
      label: "Family Management",
      roles: ["admin"]
    },
    { 
      path: "/app/bible", 
      icon: BookOpen, 
      label: "Bible Reading",
      roles: ["member", "parent", "admin"]
    },
    { 
      path: "/app/quiz", 
      icon: CheckSquare, 
      label: "Quizzes",
      roles: ["member", "parent", "admin"]
    },
    { 
      path: "/app/calendar", 
      icon: Calendar, 
      label: "Calendar",
      roles: ["member", "parent", "admin"]
    },
    { 
      path: "/app/questions", 
      icon: MessageSquare, 
      label: "Questions",
      roles: ["member", "parent", "admin"]
    },
    { 
      path: "/app/family-activities", 
      icon: ClipboardList, 
      label: "Family Activities",
      roles: ["parent"]
    },
    { 
      path: "/app/members", 
      icon: Users, 
      label: "Family Members",
      roles: ["parent"]
    },
    { 
      path: "/app/attendance", 
      icon: UserCheck, 
      label: "Attendance",
      roles: ["admin"]
    },
    { 
      path: "/app/admin-controls", 
      icon: Settings, 
      label: "Admin Controls",
      roles: ["admin"]
    },
  ].filter(item => item.roles.includes(currentUser.role));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-green-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Church className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Bete Ardete</h1>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg border border-green-200 p-4 sticky top-24">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}