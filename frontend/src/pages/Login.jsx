import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../api/apiClient";
import "./Auth.css"; // Add this file (below)

export default function Login() {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  async function onSubmit(data) {
    try {
      const res = await api.post("/auth/login", data);
      login(res.data);

      const role = res.data?.user?.role;

      if (role === "admin") nav("/admin/dashboard");
      else if (role === "store_owner") nav("/owner/dashboard");
      else nav("/stores");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input {...register("email", { required: true })} placeholder="Enter email" />

          <label>Password</label>
          <input type="password" {...register("password", { required: true })} placeholder="Enter password" />

          <button className="auth-btn">Login</button>
        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <Link className="switch-link" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
