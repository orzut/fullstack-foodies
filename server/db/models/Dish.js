const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, DECIMAL, TEXT } = Sequelize;

const Dish = db.define("dish", {
  name: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: TEXT,
    allowNull: false,
  },
});

module.exports = Dish;
