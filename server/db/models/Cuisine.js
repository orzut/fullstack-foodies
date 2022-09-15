const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, UUID, UUIDV4 } = Sequelize;

const Cuisine = db.define("cuisine", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Cuisine;
