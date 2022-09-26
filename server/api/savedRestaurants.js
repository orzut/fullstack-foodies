const router = require("express").Router();
const Sequelize = require('sequelize');
const { isLoggedIn } = require('./middleware');
const Op = Sequelize.Op;
const {
    models: { SavedRestaurant, User, Restaurant },
} = require("../db");
const db = require("../db/db");
module.exports = router;

// get all saved restaurants
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await SavedRestaurant.findAll({
            where: {
                userId: req.user.id
            }
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
        console.log(ex)
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
        console.log(ex)
    }
})
// get reviews for a restaurant
// router.get("/:id/reviews", async (req, res, next) => {
//     try {
//         res.send(
//             await Review.findAll({
//                 where: { restaurantId: req.params.id },
//                 include: [User],
//             })
//         );
//     } catch (err) {
//         next(err);
//     }
// });

// // get all restaurants
// router.get("/", async (req, res, next) => {
//     try {
//         if (req.query.key) {
//             res.send(
//                 await Restaurant.findAll({
//                     where: {
//                         name: {[Op.iLike]:`%${req.query.key}%`}
//                     },
//                     include: [db.models.cuisine],
//                     limit: req.query.limit
//                 })
//             )
//         } else {
//             res.send(await Restaurant.findAll({
//                 include: [db.models.cuisine]
//             }));
//         }
//     } catch (err) {
//         next(err);
//     }
// });
