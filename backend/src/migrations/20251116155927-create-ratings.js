// src/migrations/...-create-ratings.js
"use strict";

module.exports = {
  up: async (q, S) => {
    await q.createTable("Ratings", {
      id: { type: S.UUID, defaultValue: S.literal("gen_random_uuid()"), primaryKey: true },
      rating: S.INTEGER,
      user_id: { type: S.UUID, references: { model: "Users", key: "id" } },
      store_id: { type: S.UUID, references: { model: "Stores", key: "id" } },
      createdAt: S.DATE,
      updatedAt: S.DATE
    });

    await q.addConstraint("Ratings", {
      fields: ["user_id", "store_id"],
      type: "unique",
      name: "unique_user_store_rating"
    });
  },
  down: async (q) => { await q.dropTable("Ratings"); }
};
