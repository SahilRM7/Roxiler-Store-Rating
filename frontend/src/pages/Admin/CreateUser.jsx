import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm();

  async function onSubmit(data) {
    try {
      await api.post("/admin/users", data);
      alert("User created successfully");
      nav("/admin/users");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? err.response.data.errors.map((e) => e.msg).join(", ")
          : "Failed to create user");
      alert(msg);
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Create User (Admin)</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <p style={{ color: "red" }}>Name is required</p>}

        <label>Email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <p style={{ color: "red" }}>Email is required</p>}

        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p style={{ color: "red" }}>Password is required</p>}

        <label>Address</label>
        <textarea className="form-input" {...register("address")} rows={3} />

        <label>Role</label>
        <select className="form-input" {...register("role", { required: true })}>
          <option value="user">User</option>
          <option value="store_owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button disabled={isSubmitting} style={{ marginTop: 12 }}>Create</button>
      </form>
    </div>
  );
}
