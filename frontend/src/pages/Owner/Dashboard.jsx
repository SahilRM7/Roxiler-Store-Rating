import React, { useEffect, useState } from "react";
import api from "../../api/apiClient";
import "../Page.css";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);

  async function load() {
    const res = await api.get("/owner/dashboard");
    setStores(res.data.stores);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">Your Stores</h2>

      {stores.length === 0 && (
        <p className="empty-text">You do not own any stores.</p>
      )}

      {stores.map((store) => (
        <div key={store.id} className="store-dashboard-card">
          <h3>{store.name}</h3>
          <p>Average Rating: ⭐ {store.avg_rating?.toFixed(2)}</p>

          {store.Ratings.length === 0 ? (
            <p className="empty-text">No ratings yet.</p>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>
                {store.Ratings.map((r) => (
                  <tr key={r.id}>
                    <td>{r.user?.name || "Unknown"}</td>
                    <td>{r.user?.email || "Unknown"}</td>
                    <td>⭐ {r.rating}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      ))}
    </div>
  );
}
