const bcrypt = require("bcrypt");
const SALT = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT);
};

exports.comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
