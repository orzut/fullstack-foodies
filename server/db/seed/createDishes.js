const { faker } = require('@faker-js/faker');

const createDishes = (numberOfDishes, restaurants) => {
    const dishes = [];
    for (let i = 0;i < numberOfDishes; i++) {
        const name = faker.commerce.product();
        const price = Math.floor(Math.random()*10000)/100;
        const imageUrl = faker.image.food();
        const description = faker.lorem.lines(1);
        dishes.push({
            name,
            price,
            imageUrl,
            description,
            restaurantId: restaurants[Math.floor(Math.random()*restaurants.length)].id
        });
    };
    return dishes;
};

module.exports = createDishes;