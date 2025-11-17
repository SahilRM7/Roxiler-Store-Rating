import React, { useEffect, useState } from "react";
import api from "../../api/apiClient";
import StoreCard from "../../components/StoreCard";
import "../Stores.css";

export default function Stores() {
  const [stores, setStores] = useState([]);

  async function load() {
    try {
      const res = await api.get("/user/stores");
      setStores(res.data.stores || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="stores-container">
      <h1 className="stores-title">Discover Local Stores</h1>
      <p className="stores-subtitle">Rate and explore shops around you</p>

      <div className="stores-grid">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} reload={load} />
        ))}
      </div>
    </div>
  );
}

console.log("Stored Token:", localStorage.getItem("token"));
