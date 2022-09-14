const db = require("../db");
const Sequelize = require("sequelize");

const Restaurant = db.define("restaurant", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
});

module.exports = Restaurant;
