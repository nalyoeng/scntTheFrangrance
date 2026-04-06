import { useEffect, useState } from "react";
import { UserStorage } from "./user";
import AdminHeader from '../components/AdminHeader';
export default function UserManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState(() => {
    const localUsers = localStorage.getItem("users");
    return localUsers ? JSON.parse(localUsers) : [];
  });

  useEffect(() => {
    const localUsers = localStorage.getItem("users");
    if (!localUsers) {
      localStorage.setItem("users", JSON.stringify(UserStorage.users));
    }
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setName("");
    setEmail("");
  };

  const handleDelete = (id) => {
    const filtered = users.filter((u) => u.id !== id);
    setUsers(filtered);
    localStorage.setItem("users", JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4">
      <AdminHeader />
      <div className="w-full max-w-5xl grid mt-15 md:grid-cols-2 gap-8">

        {/* LEFT - FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-500 mb-6">Add new users</p>

          <form onSubmit={handleAddUser} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="User name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="user@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
            >
              + Add User
            </button>
          </form>
        </div>

        {/* RIGHT - USER LIST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">User List</h2>

          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users yet</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-xl hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-sm px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}