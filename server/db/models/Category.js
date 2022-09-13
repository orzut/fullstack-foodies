const Sequelize = require("sequelize");
const db = require("../db");
const { STRING } = Sequelize;

const Category = db.define("category", {
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Category;
