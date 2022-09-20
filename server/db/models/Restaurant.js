const db = require("../db");
const Sequelize = require("sequelize");

const Restaurant = db.define("restaurant", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  score: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  ratings: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  category: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  priceRange: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
});

module.exports = Restaurant;
