import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
  const nav = useNavigate();
  const [owners, setOwners] = useState([]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm();

  useEffect(() => {
    loadOwners();
  }, []);

  async function loadOwners() {
    const res = await api.get("/admin/users", { params: { role: "store_owner" } });
    setOwners(res.data.users || []);
  }

  async function onSubmit(data) {
    try {
      await api.post("/admin/stores", data);
      alert("Store created successfully");
      nav("/admin/stores");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? err.response.data.errors.map((e) => e.msg).join(", ")
          : "Failed to create store");
      alert(msg);
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Create Store (Admin)</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Store Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <p style={{ color: "red" }}>Store name is required</p>}

        <label>Email (optional)</label>
        <input {...register("email")} />

        <label>Address</label>
        <textarea className="form-input" {...register("address", { required: true })} rows={3} />
        {errors.address && <p style={{ color: "red" }}>Address is required</p>}

        <label>Select Store Owner</label>
        <select className="form-input" {...register("owner_id", { required: true })}>
          <option value="">-- Select Owner --</option>
          {owners.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name} ({o.email})
            </option>
          ))}
        </select>
        {errors.owner_id && (
          <p style={{ color: "red" }}>Store owner is required</p>
        )}

        <button disabled={isSubmitting} style={{ marginTop: 12 }}>Create</button>
      </form>
    </div>
  );
}
