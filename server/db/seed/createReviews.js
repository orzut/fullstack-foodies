const { faker } = require("@faker-js/faker");

let REVIEWS = [];

const createReviews = () => {
  return {
    rating: Math.round(Math.random() * (5 - 1) + 1),
    review: faker.lorem.paragraph(),
  };
};

Array.from({ length: 1000 }).forEach(() => REVIEWS.push(createReviews()));

module.exports = { REVIEWS };
