const data = require("./data.json");
const { models } = require("../index");
const { Cuisine } = models;

const seedCuisines = async () => {
  const cuisines = await Promise.all(
    data.resources.map((cuisine) =>
      Cuisine.create({ name: cuisine.title, imageUrl: cuisine.imageUrl })
    )
  );
  return cuisines;
};

module.exports = seedCuisines;
