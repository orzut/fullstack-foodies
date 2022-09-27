const router = require("express").Router();
const {
    models: { Address },
} = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = router;

router.get("/", isLoggedIn, async (req, res, next) => {
    console.log(req.user)
    try {
        res.send(await Address.findAll({
            where: {
                userId: req.user.id
            }
        }));
    } catch (err) {
        next(err);
    }
});
