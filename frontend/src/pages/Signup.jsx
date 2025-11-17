import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import "./Auth.css";

export default function Signup() {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    try {
      await api.post("/auth/signup", data);
      alert("Signup successful");
      nav("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          (err.response?.data?.errors
            ?.map((e) => e.msg)
            .join(", ")) ||
          "Signup failed"
      );
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input {...register("name", { required: true })} placeholder="Enter name" />

          <label>Email</label>
          <input {...register("email", { required: true })} placeholder="Enter email" />

          <label>Address</label>
          <input {...register("address", { required: true })} placeholder="Enter address" />

          <label>Password</label>
          <input type="password" {...register("password", { required: true })} placeholder="Enter password" />

          <button className="auth-btn">Signup</button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <Link className="switch-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
