"use client";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

function RoleControl({ user, onRoleChange }: { user: User; onRoleChange: (userId: string, newRole: string) => void }) {
  const [updating, setUpdating] = useState(false);
  return (
    <select
      value={user.role}
      onChange={async e => {
        setUpdating(true);
        await onRoleChange(user._id, e.target.value);
        setUpdating(false);
      }}
      disabled={updating}
      className="border px-2 py-1"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  );
}

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setUsers(data.users))
      .catch(() => setError("Access denied or failed to load users."));
  }, []);

  async function handleRoleChange(userId: string, newRole: string) {
    await fetch("/api/admin/users/role", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    });
    setUsers(users => users.map(u => (u._id === userId ? { ...u, role: newRole } : u)));
  }

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <a href="/admin/audit" className="text-blue-600 underline text-sm">
          View Audit Logs
        </a>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Name</th>
            <th className="text-left py-2 px-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-3">{user.email}</td>
              <td className="py-2 px-3">{user.name}</td>
              <td className="py-2 px-3">
                <RoleControl user={user} onRoleChange={handleRoleChange} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 