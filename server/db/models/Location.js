const Sequelize = require("sequelize");
const db = require("../db");
const { FLOAT } = Sequelize;

const Location = db.define("location", {
  lat: FLOAT,
  lng: FLOAT,
});

module.exports = Location;
