const router = require('express').Router()
const {Day} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const days = await Day.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(days)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/today', async (req, res, next) => {
  try {
    const today = await Day.findAll({
      where: {
        userId: req.params.userId,
        date: new Date()
      }
    })
    res.json(today)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/:moodId', async (req, res, next) => {
  try {
    // console.log(req.body)
    const todayMood = await Day.findOrCreate({
      where: {
        userId: req.params.userId,
        date: new Date()
      },
      defaults: {
        moodId: req.params.moodId
      }
    })
    console.log(todayMood[0].dataValues, 'todaymood api')
    if (todayMood[0]) res.json(todayMood[0].dataValues)
    else res.sendStatus(500)
  } catch (error) {
    next(error)
  }
})
