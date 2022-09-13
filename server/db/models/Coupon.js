const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, ENUM } = Sequelize;

const Coupon = db.define("coupon", {
  value: {
    type: INTEGER,
    allowNull: false,
  },
  type: {
    type: ENUM,
    values: ["dollar", "percent"],
  },
});

module.exports = Coupon;
