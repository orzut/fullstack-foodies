const router = require("express").Router();
const Sequelize = require('sequelize');
const { isLoggedIn } = require('./middleware');
const Op = Sequelize.Op;
const {
    models: { SavedRestaurant },
} = require("../db");
const db = require("../db/db");
module.exports = router;

// get all saved restaurants
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await SavedRestaurant.findAll({
            where: {
                userId: req.user.id
            },
            include: [db.models.restaurant]
        }));
    } catch (err) {
        next(err);
    }
});

router.post('/', isLoggedIn, async (req,res, next) => {
    try {
        const savedRestaurant = await SavedRestaurant.create({
            userId: req.user.id,
            restaurantId: req.body.id
        })
        res.status(201).send(savedRestaurant)
    } catch (ex) {
        next(ex)
    }
})

router.delete('/:id',isLoggedIn, async (req,res,next) => {
    try {
        const removeSavedRestaurant = await SavedRestaurant.findOne({
            where: {
                userId: req.user.id,
                restaurantId: req.params.id
            }
        });
        await removeSavedRestaurant.destroy()
        res.sendStatus(204);
    } catch (ex) {
        next(ex)
    }
})
