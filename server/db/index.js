//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Address = require("./models/Address");
const Review = require("./models/Review");
const Dish = require("./models/Dish");
const Category = require("./models/Category");
const Coupon = require("./models/Coupon");
const Cuisine = require("./models/Cuisine");
const Restaurant = require("./models/Restaurant");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");

//associations could go here!
Address.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Dish);
Dish.belongsTo(Category);
Restaurant.belongsTo(Cuisine);
Dish.belongsTo(Restaurant);
Order.hasMany(LineItem);
LineItem.belongsTo(Dish);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Address,
    Review,
    Dish,
    Coupon,
    Cuisine,
    Restaurant,
    Order,
    LineItem,
  },
};
