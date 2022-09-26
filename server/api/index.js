const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/restaurants", require("./restaurants"));
router.use("/dishes", require("./dishes"));
router.use("/cuisines", require("./cuisines"));
router.use("/categories", require("./categories"));
router.use("/orders", require("./orders"));
router.use("/stripe", require("./stripe"));
router.use("/reviews", require("./reviews"));
router.use("/location", require("./location"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
