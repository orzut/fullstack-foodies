const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, TEXT } = Sequelize;

const Review = db.define("review", {
  rating: {
    type: INTEGER,
    min: 1,
    max: 5,
  },
  review: {
    type: TEXT,
  },
});

module.exports = Review;
