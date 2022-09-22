const router = require("express").Router();
const {
  models: { Restaurant, Dish, Review, User },
} = require("../db");
module.exports = router;

// get all restaurants
router.get("/", async (req, res, next) => {
  try {
    res.send(await Restaurant.findAll());
  } catch (err) {
    next(err);
  }
});

// get menu for a restaurant
router.get("/:id/menu", async (req, res, next) => {
  try {
    console.log(req.params.id);
    res.send(await Dish.findAll({ where: { restaurantId: req.params.id } }));
  } catch (err) {
    next(err);
  }
});
