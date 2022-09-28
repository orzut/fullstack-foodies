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
const SavedRestaurant = require("./models/SavedRestaurant");
const SavedOrder = require("./models/SavedOrder");
const Location = require("./models/Location");

//associations could go here!
User.hasMany(Order, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "id",
});
Order.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "id",
});
Order.hasMany(LineItem, {
  foreignKey: { name: "orderId", allowNull: false },
  sourceKey: "id",
});
LineItem.belongsTo(Order, {
  foreignKey: { name: "orderId", allowNull: false },
  sourceKey: "id",
});
LineItem.belongsTo(Dish, {
  foreignKey: { name: "dishId", allowNull: false },
  sourceKey: "id",
});
Dish.hasMany(LineItem, {
  foreignKey: { name: "dishId", allowNull: false },
  sourceKey: "id",
});
Address.belongsTo(User);
Review.belongsTo(User);
// Dish.belongsTo(Restaurant, {
//   foreignKey: { name: "restaurantId", allowNull: true },
//   sourceKey: "id",
// });
// Restaurant.hasMany(Dish, {
//   foreignKey: { name: "restaurantId", allowNull: true },
//   sourceKey: "id",
// });
Review.belongsTo(Restaurant);
Dish.belongsTo(Category);
Restaurant.belongsTo(Cuisine);
Cuisine.hasMany(Restaurant);
Dish.belongsTo(Restaurant);
Order.hasMany(LineItem);
LineItem.belongsTo(Dish);
User.hasMany(Order);
User.hasMany(SavedRestaurant, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "id",
});
SavedRestaurant.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "id",
});
Restaurant.hasMany(SavedRestaurant, {
  foreignKey: { name: "restaurantId", allowNull: false },
  sourceKey: "id",
});
SavedRestaurant.belongsTo(Restaurant, {
  foreignKey: { name: "restaurantId", allowNull: false },
  sourceKey: "id",
});
User.hasMany(SavedOrder, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "id",
});
SavedOrder.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "id",
});
Order.hasMany(SavedOrder, {
  foreignKey: { name: "orderId", allowNull: false },
  sourceKey: "id",
});
SavedOrder.belongsTo(Order, {
  foreignKey: { name: "orderId", allowNull: false },
  sourceKey: "id",
});
Location.belongsTo(User);

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
    Restaurant,
    Order,
    LineItem,
    Category,
    SavedRestaurant,
    SavedOrder,
    Location,
  },
};
