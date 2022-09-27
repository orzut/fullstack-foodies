const router = require("express").Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {
  models: { Restaurant, Dish, Review, User },
} = require("../db");
const db = require("../db/db");
module.exports = router;

// get menu for a restaurant
router.get("/:id/menu", async (req, res, next) => {
  try {
    res.send(await Dish.findAll({ where: { restaurantId: req.params.id } }));
  } catch (err) {
    next(err);
  }
});

// get reviews for a restaurant
router.get("/:id/reviews", async (req, res, next) => {
  try {
    res.send(
      await Review.findAll({
        where: { restaurantId: req.params.id },
        include: [User],
      })
    );
  } catch (err) {
    next(err);
  }
});

// get all restaurants
router.get("/", async (req, res, next) => {
  try {
    if (req.query.key) {
      res.send(
          await Restaurant.findAll({
            where: {
              name: {[Op.iLike]:`%${req.query.key}%`}
            },
            include: [db.models.cuisine],
            limit: req.query.limit
          })
      )
    } else {
      res.send(await Restaurant.findAll({
          include: [db.models.cuisine]
      }));
    }
  } catch (err) {
    next(err);
  }
});
