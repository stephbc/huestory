const router = require('express').Router()
const {Day} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const today = await Day.create()
    if (today) res.json(today)
    else res.sendStatus(500)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const days = await Day.findAll({
      where: {
        userId: req.params.userId
      }
    })
    // if(!days) await Day.create(req.body);
    res.json(days)
  } catch (err) {
    next(err)
  }
})
