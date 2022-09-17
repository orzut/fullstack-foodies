const {db,  models } = require('../index');
const { User, Restaurant, Order, LineItem, Dish } = models;
const createUsers = require('./createUsers');
const createRestaurants = require('./createRestaurants');
const csvToJson = require('convert-csv-to-json');
const createDishes = require('./createDishes');
const createOrders = require('./createOrders');
const createLineItems = require('./createLineItems');
const path = require('path');
const syncAndSeed = async () => {
    try {
        await db.authenticate();
        await db.sync({force: true});
        const restaurantsData = csvToJson.fieldDelimiter(';').getJsonFromCsv(path.join(__dirname,'..','..','..','public','restaurants-cleaned-delimiter-2.csv'));
        console.log(restaurantsData)
        console.log('Seeding users...');
        const users = await Promise.all(createUsers(20).map((user) => {
            return User.create(user)
        }));
        console.log('Seeding restaurants...');
        // const restaurants = await Promise.all(createRestaurants(100).map((restaurant) => {
        //     return Restaurant.create(restaurant)
        // }));
        const restaurants = await Promise.all(restaurantsData.map((restaurant) => {
            return Restaurant.create(restaurant)
        }));
        console.log('Seeding dishes...');
        const dishes = await Promise.all(createDishes(1000, restaurants).map((dish) => {
            return Dish.create(dish)
        }));
        console.log('Seeding orders...');
        const orders = await Promise.all(createOrders(10, users).map((order) => {
            return Order.create(order)
        }));
        console.log('Seeding line items...');
        const lineItems = await Promise.all(createLineItems(10, dishes, orders).map((lineItem) => {
            return LineItem.create(lineItem)
        }));
    } catch (ex) {
        console.log(ex)
    }
};

// Execute the `seed` function, IF we ran this module directly (`node seed`)
if (module === require.main) {
    syncAndSeed().then(()=>{console.log('Seeding done')})
}

module.exports = syncAndSeed;