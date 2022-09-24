const router = require("express").Router();
const {
  models: { Review, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    res.send(await Review.findAll({ include: [User] }));
  } catch (err) {
    next(err);
  }
});
