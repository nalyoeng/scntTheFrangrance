import { useEffect, useState } from "react";
import { UserStorage } from "./user";


export default function AdminManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState(() => {
    const localUsers = localStorage.getItem("admins");
    return localUsers ? JSON.parse(localUsers) : [];
  });

  useEffect(() => {
    const localUsers = localStorage.getItem("admins");
    if (!localUsers) {
      localStorage.setItem("admins", JSON.stringify(UserStorage.adminUsers));
    }
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      email
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("admins", JSON.stringify(updatedUsers));
    setName("");
    setEmail("");
  }


  return (
    <div>
      <h1>Admin Management</h1>
      <p>Manage admins here.</p>
      {/* New admin form */}
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Add Admin</button>
      </form>

      {/* List admins */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}