module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.ENUM("admin", "user", "store_owner")
  });

  User.associate = (models) => {
    User.hasMany(models.Store, { foreignKey: "owner_id" });
    User.hasMany(models.Rating, { foreignKey: "user_id" });
  };

  return User;
};
