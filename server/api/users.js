const router = require('express').Router()
const { models: { User }} = require('../db')
const { isLoggedIn } = require('./middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isLoggedIn, async (req,res,next) => {
  try {
    await req.user.update(req.body)
    res.status(200).send(req.user)
  } catch (ex) {
    console.log(ex)
  }
})