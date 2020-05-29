const router = require('express').Router()
const {Mood} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Mood.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['color', 'mood']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
