import React from "react";
import RatingStars from "./RatingStars";
import api from "../api/apiClient";
import "./StoreCard.css";

export default function StoreCard({ store, reload }) {

  async function rate(v) {
    try {
      await api.post(`/user/stores/${store.id}/rate`, { rating: v });
      reload();
    } catch (err) {
      alert("Rating failed");
    }
  }

  return (
    <div className="better-store-card">
      <div className="card-header">
        <h3>{store.name}</h3>
        <p className="address">{store.address}</p>
      </div>

      <div className="card-rating">
        <span className="rating-number">
          ⭐ {store.avg_rating?.toFixed(2) || "0.0"}
        </span>
      </div>

      <RatingStars value={store.user_rating || 0} onChange={rate} />
    </div>
  );
}
