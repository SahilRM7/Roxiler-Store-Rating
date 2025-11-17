const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/user", require("./user.routes"));
router.use("/owner", require("./owner.routes"));

module.exports = router;
