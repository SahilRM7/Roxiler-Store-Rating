import React from "react";

export default function RatingStars({ value = 0, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map((s) => (
        <span
          key={s}
          style={{
            cursor: "pointer",
            fontSize: 20,
            opacity: value >= s ? 1 : 0.4
          }}
          onClick={() => onChange(s)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
