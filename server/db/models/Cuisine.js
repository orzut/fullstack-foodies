const Sequelize = require("sequelize");
const db = require("../db");
const { STRING } = Sequelize;

const Cuisine = db.define("cuisine", {
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Cuisine;
