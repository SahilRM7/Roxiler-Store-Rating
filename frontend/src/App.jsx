import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Stores from "./pages/User/Stores";

import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminCreateUser from "./pages/Admin/CreateUser";
import AdminStores from "./pages/Admin/Stores";
import AdminCreateStore from "./pages/Admin/CreateStore";

import OwnerDashboard from "./pages/Owner/Dashboard";

import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";

function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Layout Wrapper */}
      <Route element={<Layout />}>

        <Route path="/" element={<Navigate to="/stores" replace />} />

        {/* User */}
        <Route
          path="/stores"
          element={
            <ProtectedRoute roles={["user", "store_owner", "admin"]}>
              <Stores />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminCreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminStores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores/create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminCreateStore />
            </ProtectedRoute>
          }
        />

        {/* Store Owner */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute roles={["store_owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
