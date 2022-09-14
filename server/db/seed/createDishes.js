const { faker } = require('@faker-js/faker');

const createDishes = (numberOfDishes) => {
    const dishes = [];
    for (let i = 0;i < numberOfDishes; i++) {
        const name = faker.commerce.product();
        const price = Math.floor(Math.random()*10000)/100;
        const imageUrl = faker.image.food();
        dishes.push({
            name,
            price,
            imageUrl
        });
    };
    return dishes;
};

module.exports = createDishes;