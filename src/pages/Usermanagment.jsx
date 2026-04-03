import { useEffect, useState } from "react";
import { UserStorage } from "./user";


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
    const newUser = {
      id: Date.now(),
      name,
      email
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setName("");
    setEmail("");
  }


  return (
    <div>
      <h1>User Management</h1>
      <p>Manage users here.</p>
      {/* New user form */}
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Add User</button>
      </form>

      {/* List users */}
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