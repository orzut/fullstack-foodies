const router = require("express").Router();
const {
  models: { Location },
} = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = router;

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.setLocation(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getLocation());
  } catch (err) {
    next(err);
  }
});
