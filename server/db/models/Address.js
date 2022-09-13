const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, BOOLEAN } = Sequelize;

const Address = db.define("address", {
  apt: {
    type: STRING,
  },
  street: {
    type: STRING,
    allowNull: false,
  },
  city: {
    type: STRING,
    allowNull: false,
  },
  state: {
    type: STRING,
    allowNull: false,
  },
  zipcode: {
    type: STRING,
    allowNull: false,
  },
  isPrimary: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Address;
