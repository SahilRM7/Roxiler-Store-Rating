"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => 
    file.indexOf(".") !== 0 && file !== basename && file.endsWith(".js")
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(name => {
  if (db[name].associate) db[name].associate(db);
});

db.sequelize = sequelize;

module.exports = db;
