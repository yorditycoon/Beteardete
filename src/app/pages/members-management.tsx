import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { User, UserPlus, Mail, Eye, EyeOff } from "lucide-react";
import { mockUsers } from "../lib/mock-data";
import { toast } from "sonner";

export function MembersManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const isAdmin = currentUser.role === "admin";
  
  // Filter members based on role
  const displayMembers = isAdmin 
    ? mockUsers.filter(u => u.role !== "admin")
    : mockUsers.filter(u => u.familyId === currentUser.familyId && u.role === "member");

  const handleRegisterMember = () => {
    if (newMember.name && newMember.email && newMember.password) {
      toast.success(`Member registered successfully!\n\nEmail: ${newMember.email}\nPassword: ${newMember.password}\n\nPlease save these credentials.`);
      setNewMember({ name: "", email: "", password: "" });
      setIsDialogOpen(false);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    setNewMember({ ...newMember, password });
    toast.success("Password generated!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl mb-2">Members Management</h2>
        <p className="text-muted-foreground">
          {isAdmin ? "Manage all church members" : "Manage your family members"}
        </p>
      </div>

      {/* Register New Member */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Register New Member</CardTitle>
              <CardDescription>
                Add a new member and provide them with login credentials
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Register Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Register New Member</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new member account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter member's name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="member@example.com"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={newMember.password}
                          onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <Button type="button" variant="outline" onClick={generatePassword}>
                        Generate
                      </Button>
                    </div>
                  </div>
                  {newMember.password && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> Please save these credentials and share them securely with the member.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRegisterMember}>
                    Register Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Members List */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Registered Members</CardTitle>
          <CardDescription>
            {displayMembers.length} member{displayMembers.length !== 1 ? "s" : ""} registered
          </CardDescription>
        </CardHeader>
        <CardContent>
          {displayMembers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-medium mb-2">No Members Yet</h3>
              <p className="text-muted-foreground mb-6">
                Register your first member to get started
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Register First Member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayMembers.map((member) => (
                <Card key={member.id} className="border-green-100">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{member.name}</h4>
                        <Badge variant="outline" className="mt-1 capitalize text-xs">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-green-100 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="border-green-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-base">Member Access Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>For Parents/Mothers:</strong> You can register members of your family and provide them with login credentials.
          </p>
          <p>
            <strong>For Admin:</strong> You can view all members and parents, and grant access to Fathers and Mothers roles.
          </p>
          <p className="text-muted-foreground mt-3">
            Note: Always share login credentials securely and encourage members to change their passwords after first login.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
