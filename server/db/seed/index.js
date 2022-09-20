const { db, models } = require("../index");
const { User, Restaurant, Order, LineItem, Dish } = models;
const createUsers = require("./createUsers");
const { createRestaurants, createRestaurantsFromData } = require("./createRestaurants");
const createDishes = require("./createDishes");
const createOrders = require("./createOrders");
const createLineItems = require("./createLineItems");
const seedCuisines = require("./seedCuisines");
const { faker } = require("@faker-js/faker");

const path = require("path");
const syncAndSeed = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });

    console.log("Seeding users...");
    const users = await Promise.all(
      createUsers(20).map((user) => {
        return User.create(user);
      })
    );
    console.log("Seeding cuisines...");
    const cuisines = await seedCuisines();

    console.log("Seeding restaurants...");
    const restaurants = await Promise.all(
        createRestaurantsFromData().map((restaurant) => {
          const cuisine = cuisines.find((cuisine) =>
          restaurant.category.toLowerCase().includes(cuisine.name.toLowerCase())
        );
        const cuisineId = cuisine ? cuisine.id : null;
        return Restaurant.create({
          ...restaurant,
          cuisineId: cuisineId,
          imageUrl: restaurant.imageUrl? restaurant.imageUrl : faker.image.food(100, 100, true),
        });
      })
    );
    console.log("Seeding dishes...");
    const dishes = await Promise.all(
      createDishes(1000, restaurants).map((dish) => {
        return Dish.create(dish);
      })
    );
    console.log("Seeding orders...");
    const orders = await Promise.all(
      createOrders(10, users).map((order) => {
        return Order.create(order);
      })
    );
    console.log("Seeding line items...");
    const lineItems = await Promise.all(
      createLineItems(10, dishes, orders).map((lineItem) => {
        return LineItem.create(lineItem);
      })
    );
  } catch (ex) {
    console.log(ex);
  }
};

// Execute the `seed` function, IF we ran this module directly (`node seed`)
if (module === require.main) {
  syncAndSeed().then(() => {
    console.log("Seeding done");
  });
}

module.exports = syncAndSeed;
