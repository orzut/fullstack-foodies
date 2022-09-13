//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Address = require("./models/Address");
const Review = require("./models/Review");
const Dish = require("./models/Dish");
const Category = require("./models/Category");
const Coupon = require("./models/Coupon");
const Cuisine = require("./models/Cuisine");

//associations could go here!
Address.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Dish);
Category.belongsTo(Dish);

module.exports = {
  db,
  models: {
    User,
    Address,
    Review,
    Dish,
    Coupon,
    Cuisine,
  },
};
