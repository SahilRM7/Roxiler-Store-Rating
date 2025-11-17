module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    avg_rating: { type: DataTypes.FLOAT, defaultValue: 0 }
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: "owner_id", as: "owner" });
    Store.hasMany(models.Rating, { foreignKey: "store_id" });
  };

  return Store;
};
