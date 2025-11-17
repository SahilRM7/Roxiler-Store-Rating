module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    rating: DataTypes.INTEGER
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, { foreignKey: "user_id" });
    Rating.belongsTo(models.Store, { foreignKey: "store_id" });
  };

  return Rating;
};
