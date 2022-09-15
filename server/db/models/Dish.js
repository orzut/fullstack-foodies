const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, DECIMAL, TEXT, UUID, UUIDV4 } = Sequelize;

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
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: TEXT,
    allowNull: false,
  },
});

module.exports = Dish;
