const { body } = require("express-validator");

exports.createUserValidator = [
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8, max: 16 })
    .matches(/[A-Z]/)
    .matches(/[^A-Za-z0-9]/),
  body("address").isLength({ max: 400 }),
  body("role").isIn(["admin", "user", "store_owner"])
];

exports.createStoreValidator = [
  body("name").isLength({ min: 3, max: 60 }),
  body("email").optional().isEmail(),
  body("address").isLength({ max: 400 }),
  body("owner_id").notEmpty()
];
