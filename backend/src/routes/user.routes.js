const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { isUser } = require("../middlewares/role.middleware");
const { getUserStores, rateStore } = require("../controllers/user.controller")

// simple placeholder for frontend

router.get("/stores", authMiddleware, getUserStores);
router.post("/stores/:id/rate", authMiddleware, rateStore);

module.exports = router;
