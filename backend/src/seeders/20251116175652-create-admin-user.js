const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed = await bcrypt.hash("Password@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        name: "Admin",
        email: "admin771@example.com",
        password: hashed,
        address: "Admin Address",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { email: "admin771@example.com" });
  }
};
