const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, TEXT, UUID, UUIDV4 } = Sequelize;

const Review = db.define("review", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
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
