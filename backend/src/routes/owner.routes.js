const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { isStoreOwner } = require("../middlewares/role.middleware");

const { ownerDashboard } = require("../controllers/owner.controller");

router.get("/dashboard", authMiddleware, isStoreOwner, ownerDashboard);

module.exports = router;
