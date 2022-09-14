const {db,  models } = require('../index');
const { User, Restaurant, Order, LineItem, Dish } = models;
const createUsers = require('./createUsers');
const createRestaurants = require('./createRestaurants');
const createDishes = require('./createDishes');
const syncAndSeed = async () => {
    try {
        await db.authenticate();
        await db.sync({force: true});

        console.log('Seeding users...');
        const users = await Promise.all(createUsers(20).map((user) => {
            return User.create(user)
        }));
        console.log('Seeding restaurants...');
        const restaurants = await Promise.all(createRestaurants(100).map((restaurant) => {
            return Restaurant.create(restaurant)
        }));
        console.log('Seeding dishes...');
        const dishes = await Promise.all(createDishes(1000).map((dish) => {
            return Dish.create(dish)
        }));
        console.log('Seeding orders...');
        const orders = await Promise.all(createOrders(1000).map((dish) => {
            return Dish.create(dish)
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