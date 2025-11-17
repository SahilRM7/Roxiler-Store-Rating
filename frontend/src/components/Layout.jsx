import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <>
      <nav
        style={{
          padding: 12,
          display: "flex",
          gap: 12,
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link to="/stores">Stores</Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/stores">Stores</Link>
          </>
        )}

        {user?.role === "store_owner" && (
          <Link to="/owner/dashboard">Owner Dashboard</Link>
        )}

        <div style={{ marginLeft: "auto" }}>
          {user ? (
            <>
              {user.email} |
              <button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  logout();
                  nav("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      <main style={{ padding: 20 }}>
        <Outlet /> {/* THIS RENDERS ALL CHILD ROUTES */}
      </main>
    </>
  );
}
