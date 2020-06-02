const router = require('express').Router()
const {Mood, User, Day} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const moods = await Mood.findAll()
    res.json(moods)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const thisMood = await Mood.findByPk(req.params.id)
    res.json(thisMood)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const addMood = await Day.create({
      moodId: req.params.id,
      userId: req.user.id
    })
    res.json(addMood)
  } catch (error) {
    next(error)
  }
})

// router.get('/:id/users', async (req, res, next) => {
//   try {
//     const moodToday = await Mood.findBy({
//       where: {
//         id: req.params.id,
//         // date:
//       },
//     })
//     res.json(moodToday)
//   } catch (err) {
//     next(err)
//   }
// })
