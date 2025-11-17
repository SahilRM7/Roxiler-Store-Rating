import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/apiClient";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await api.get("/admin/users", { params: { search } });
    setUsers(res.data.users);
  }

  useEffect(() => { load(); }, [search]);

  return (
    <div>
      <h2>Users</h2>

      <Link to="/admin/users/create">
        <button>Create User</button>
      </Link>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />

      <table border="1" cellPadding="6" className="styled-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
