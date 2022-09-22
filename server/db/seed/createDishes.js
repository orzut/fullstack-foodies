const { faker } = require("@faker-js/faker");

const createDishes = (numberOfDishes, restaurants, categories) => {
  const dishes = [];
  for (let i = 0; i < numberOfDishes; i++) {
    const name = faker.commerce.product();
    const price = Math.floor(Math.random() * 1000) / 100;
    const imageUrl = faker.image.food(80, 60, true);
    const description = faker.lorem.lines(1);
    dishes.push({
      name,
      price,
      imageUrl,
      description,
      restaurantId: restaurants[Math.floor(Math.random() * 100)].id,
      categoryId: categories[Math.floor(Math.random() * categories.length)].id,
    });
  }
  return dishes;
};

module.exports = createDishes;
