const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, FLOAT, DECIMAL, TEXT, UUID, UUIDV4 } = Sequelize;

const Dish = db.define("dish", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: STRING,
    allowNull: false,
  },
  imageUrl: {
    type: TEXT,
    allowNull: true,
  },
  description: {
    type: TEXT,
    allowNull: true
  }
});

module.exports = Dish;
