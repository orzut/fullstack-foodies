const router = require("express").Router();
const {
  models: { Dish },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    res.send(await Dish.findAll());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await Dish.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});
