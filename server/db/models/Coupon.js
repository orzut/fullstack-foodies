const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, INTEGER, ENUM, UUID, UUIDV4 } = Sequelize;

const Coupon = db.define("coupon", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  discount: {
    type: STRING,
    value: ENUM('dollar','percent')
  }
});

module.exports = Coupon;
