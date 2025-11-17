const { body } = require("express-validator");

exports.signupValidator = [
  body("name").isLength({ min: 5, max: 60 }),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 6, max: 16 })
    .matches(/[A-Z]/)
    .matches(/[^A-Za-z0-9]/),
  body("address").isLength({ max: 400 })
];
