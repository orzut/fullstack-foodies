const router = require("express").Router();
const {
  models: { Cuisine },
} = require("../db");
module.exports = router;

// get all cuisines
router.get("/", async (req, res, next) => {
  try {
    res.send(await Cuisine.findAll());
  } catch (err) {
    next(err);
  }
});
