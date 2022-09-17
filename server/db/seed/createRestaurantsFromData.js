const csvToJson = require("convert-csv-to-json");
const { Restaurant } = require("../db/");
const restaurants = csvToJson
  .fieldDelimiter(",")
  .getJsonFromCsv("../../../public/restaurants-cleaned.csv");

const createRestaurantsFromData = async (restaurants = restaurants) => {
  await Promise.all(
    restaurants.map((restaurant) => {
      return Restaurant.create(restaurant);
    })
  );
};
