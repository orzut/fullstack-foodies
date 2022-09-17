const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, BOOLEAN, UUID, UUIDV4 } = Sequelize;

const Address = db.define("address", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
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
