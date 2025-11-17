// src/migrations/...-create-stores.js
"use strict";

module.exports = {
  up: async (q, S) => {
    await q.createTable("Stores", {
      id: { type: S.UUID, defaultValue: S.literal("gen_random_uuid()"), primaryKey: true },
      name: S.STRING,
      email: S.STRING,
      address: S.STRING,
      avg_rating: { type: S.FLOAT, defaultValue: 0 },
      owner_id: { type: S.UUID, references: { model: "Users", key: "id" } },
      createdAt: S.DATE,
      updatedAt: S.DATE
    });
  },
  down: async (q) => { await q.dropTable("Stores"); }
};
