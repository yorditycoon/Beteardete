import { useState } from "react";
import { Plus, Users, UserCheck, Edit2, Trash2 } from "lucide-react";
import { mockFamilies, mockUsers, Family, User } from "../lib/mock-data";

export function FamilyManagement() {
  const [families, setFamilies] = useState<Family[]>(mockFamilies);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showCreateFamily, setShowCreateFamily] = useState(false);
  const [showAssignParent, setShowAssignParent] = useState(false);
  const [showCreateParent, setShowCreateParent] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("");
  const [newFamily, setNewFamily] = useState({ name: "" });
  const [newParent, setNewParent] = useState({ name: "", email: "", password: "123456" });

  // Get available parents (not yet assigned to any family)
  const availableParents = users.filter(u => u.role === "parent" && !u.familyId);

  const handleCreateFamily = () => {
    if (!newFamily.name.trim()) return;
    
    const family: Family = {
      id: `fam${Date.now()}`,
      name: newFamily.name,
      createdBy: "admin1",
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setFamilies([...families, family]);
    setNewFamily({ name: "" });
    setShowCreateFamily(false);
  };

  const handleCreateParent = () => {
    if (!newParent.name.trim() || !newParent.email.trim()) return;
    
    const parent: User = {
      id: `p${Date.now()}`,
      email: newParent.email,
      password: newParent.password,
      name: newParent.name,
      role: "parent",
      hasAccess: true,
      createdBy: "admin1",
    };
    
    setUsers([...users, parent]);
    setNewParent({ name: "", email: "", password: "123456" });
    setShowCreateParent(false);
  };

  const handleAssignParent = (parentId: string) => {
    if (!selectedFamilyId) return;

    // Update the parent with family info
    const updatedUsers = users.map(u => {
      if (u.id === parentId) {
        const family = families.find(f => f.id === selectedFamilyId);
        return {
          ...u,
          familyId: selectedFamilyId,
          familyName: family?.name,
        };
      }
      return u;
    });

    // Update the family with parent info
    const parent = users.find(u => u.id === parentId);
    const updatedFamilies = families.map(f => {
      if (f.id === selectedFamilyId) {
        return {
          ...f,
          parentId,
          parentName: parent?.name,
        };
      }
      return f;
    });

    setUsers(updatedUsers);
    setFamilies(updatedFamilies);
    setShowAssignParent(false);
    setSelectedFamilyId("");
  };

  const handleDeleteFamily = (familyId: string) => {
    if (!confirm("Are you sure you want to delete this family? All members will lose their family association.")) return;
    
    // Remove family
    setFamilies(families.filter(f => f.id !== familyId));
    
    // Remove family association from users
    setUsers(users.map(u => {
      if (u.familyId === familyId) {
        return { ...u, familyId: undefined, familyName: undefined };
      }
      return u;
    }));
  };

  const getFamilyMembersCount = (familyId: string) => {
    return users.filter(u => u.familyId === familyId && u.role === "member").length;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Family Management</h1>
          <p className="text-gray-600 mt-1">Create families and assign parents to manage them</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateParent(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <UserCheck className="w-4 h-4" />
            Create Parent
          </button>
          <button
            onClick={() => setShowCreateFamily(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#90EE90] text-gray-900 rounded-lg hover:bg-green-400"
          >
            <Plus className="w-4 h-4" />
            Create Family
          </button>
        </div>
      </div>

      {/* Families Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {families.map((family) => (
          <div key={family.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#90EE90] flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{family.name}</h3>
                  <p className="text-sm text-gray-500">Created {family.createdAt}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteFamily(family.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Parent Info */}
            <div className="space-y-3">
              {family.parentId ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Parent</p>
                    <p className="font-medium text-gray-900">{family.parentName}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFamilyId(family.id);
                      setShowAssignParent(true);
                    }}
                    className="text-[#90EE90] hover:text-green-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedFamilyId(family.id);
                    setShowAssignParent(true);
                  }}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#90EE90] hover:text-[#90EE90] transition-colors"
                >
                  + Assign Parent
                </button>
              )}

              {/* Members Count */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Family Members</p>
                <p className="font-medium text-gray-900">{getFamilyMembersCount(family.id)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Family Modal */}
      {showCreateFamily && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Family</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Family Name
                </label>
                <input
                  type="text"
                  value={newFamily.name}
                  onChange={(e) => setNewFamily({ name: e.target.value })}
                  placeholder="e.g., Smith Family"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90EE90]"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowCreateFamily(false);
                    setNewFamily({ name: "" });
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFamily}
                  className="px-4 py-2 bg-[#90EE90] text-gray-900 rounded-lg hover:bg-green-400"
                >
                  Create Family
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Parent Modal */}
      {showCreateParent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Parent</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newParent.name}
                  onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90EE90]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newParent.email}
                  onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90EE90]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Password
                </label>
                <input
                  type="text"
                  value={newParent.password}
                  onChange={(e) => setNewParent({ ...newParent, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90EE90]"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowCreateParent(false);
                    setNewParent({ name: "", email: "", password: "123456" });
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateParent}
                  className="px-4 py-2 bg-[#90EE90] text-gray-900 rounded-lg hover:bg-green-400"
                >
                  Create Parent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Parent Modal */}
      {showAssignParent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Assign Parent</h2>
            {availableParents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No available parents. Create a new parent first.</p>
                <button
                  onClick={() => {
                    setShowAssignParent(false);
                    setShowCreateParent(true);
                  }}
                  className="mt-4 px-4 py-2 bg-[#90EE90] text-gray-900 rounded-lg hover:bg-green-400"
                >
                  Create Parent
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {availableParents.map((parent) => (
                  <button
                    key={parent.id}
                    onClick={() => handleAssignParent(parent.id)}
                    className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#90EE90] hover:bg-green-50 text-left transition-colors"
                  >
                    <p className="font-medium text-gray-900">{parent.name}</p>
                    <p className="text-sm text-gray-500">{parent.email}</p>
                  </button>
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setShowAssignParent(false);
                  setSelectedFamilyId("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
