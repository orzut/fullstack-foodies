const router = require('express').Router();
const { db, models: {SavedOrder}} = require('../db')
const { isLoggedIn } = require('./middleware')
module.exports = router;

router.post('/',isLoggedIn,async (req,res,next) => {
    try {
        const savedOrder = await SavedOrder.create({
            name: req.body.name,
            userId: req.body.userId,
            orderId: req.body.orderId,
        });
        res.status(201).send(savedOrder)
    } catch (ex) {
        next(ex)
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const savedOrder = await SavedOrder.findOne({
            where: {
                userId: req.user.id,
                orderId: req.params.id
            }
        });
        await savedOrder.destroy();
        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})

router.get('/',isLoggedIn,async (req,res,next) => {
    try {
        const savedOrders = await SavedOrder.findAll({
            where: {
                userId: req.user.id
            },
            include: [{ model: db.models.order,
                        include: [db.models.lineItem]
            }]
        })
        res.status(200).send(savedOrders)
    } catch (ex) {
        next(ex);
    }
})