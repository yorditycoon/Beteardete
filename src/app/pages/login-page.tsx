import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { mockUsers } from "../lib/mock-data";
import { Church } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success(`Welcome, ${user.name}!`);
      
      // Navigate based on role
      if (user.role === "admin") {
        navigate("/app/admin");
      } else if (user.role === "parent") {
        navigate("/app/parent");
      } else {
        navigate("/app/member");
      }
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Church className="w-10 h-10 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl">Bete Ardete</CardTitle>
            <CardDescription className="text-base mt-2">
              Church Management System
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-green-200 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-green-200 focus:border-primary"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-green-100">
            <p className="text-sm text-muted-foreground mb-3">Demo Accounts:</p>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-muted/50 rounded">
                <p className="font-medium">Member: member1a@test.com</p>
                <p className="text-muted-foreground">Password: 123456</p>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <p className="font-medium">Parent: mother1@test.com</p>
                <p className="text-muted-foreground">Password: 123456</p>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <p className="font-medium">Admin: admin@beteardete.com</p>
                <p className="text-muted-foreground">Password: admin123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}