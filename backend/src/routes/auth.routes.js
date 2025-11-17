const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");
const { signupValidator } = require("../validators/auth.validator");

router.post("/signup", signupValidator, signup);
router.post("/login", login);

module.exports = router;
