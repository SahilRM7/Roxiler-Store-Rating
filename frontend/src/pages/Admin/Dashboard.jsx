import React, { useEffect, useState } from "react";
import api from "../../api/apiClient";
import "../Admin.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalOwners: 0,
    totalRatings: 0
  });

  async function load() {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">Overview of your platform</p>

      <div className="dashboard-grid">

        <div className="dash-card">
          <div className="dash-icon users"></div>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="dash-card">
          <div className="dash-icon stores"></div>
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>

        <div className="dash-card">
          <div className="dash-icon owners"></div>
          <h3>Store Owners</h3>
          <p>{stats.totalOwners}</p>
        </div>

        <div className="dash-card">
          <div className="dash-icon ratings"></div>
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>

      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="actions-grid">
          <a className="action-card" href="/admin/users/create">
            ➕ Create User
          </a>

          <a className="action-card" href="/admin/stores/create">
            🏪 Create Store
          </a>

          <a className="action-card" href="/admin/users">
            👥 Manage Users
          </a>

          <a className="action-card" href="/admin/stores">
            🏬 Manage Stores
          </a>
        </div>
      </div>

    </div>
  );
}
