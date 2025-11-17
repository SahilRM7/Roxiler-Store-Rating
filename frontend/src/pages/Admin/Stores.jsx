import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/apiClient";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await api.get("/admin/stores", {
      params: { search }
    });
    setStores(res.data.stores);
  }

  useEffect(() => { load(); }, [search]);

  return (
    <div>
      <h2>Stores</h2>

      <Link to="/admin/stores/create">
        <button>Create Store</button>
      </Link>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />

      <table border="1" cellPadding="6" className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Address</th>
            <th>Avg Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.owner?.email}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.avg_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
