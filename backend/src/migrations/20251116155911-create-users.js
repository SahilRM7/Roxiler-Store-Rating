// src/migrations/...-create-users.js
"use strict";

module.exports = {
  up: async (q, S) => {
    await q.createTable("Users", {
      id: { type: S.UUID, defaultValue: S.literal("gen_random_uuid()"), primaryKey: true },
      name: S.STRING,
      email: { type: S.STRING, unique: true },
      password: S.STRING,
      address: S.STRING,
      role: S.ENUM("admin", "user", "store_owner"),
      createdAt: S.DATE,
      updatedAt: S.DATE
    });
  },
  down: async (q) => { await q.dropTable("Users"); }
};
