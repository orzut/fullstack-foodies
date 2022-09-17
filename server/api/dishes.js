const router = require("express").Router();
const {
  models: { Dish },
} = require("../db");
module.exports = router;

// get all dishes
router.get("/", async (req, res, next) => {
  try {
    res.send(await Dish.findAll());
  } catch (err) {
    next(err);
  }
});

// get details for a dish
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await Dish.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});
