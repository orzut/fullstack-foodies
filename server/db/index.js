//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");
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
Dish.belongsTo(Restaurant);
Restaurant.hasMany(Dish);

module.exports = {
  db,
  models: {
    User,
    Restaurant,
    Order,
    LineItem,
    Address,
    Review,
    Dish,
    Coupon,
    Cuisine,
  },
};
