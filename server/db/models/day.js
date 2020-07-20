// const Sequelize = require('sequelize')
// const db = require('../db')

// const Day = db.define('day', {
//   date: {
//     type: Sequelize.DATEONLY,
//     defaultValue: Sequelize.NOW
//     // unique: true
//   },
//   moodId: {
//     type: Sequelize.INTEGER,
//     unique: false
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     unique: false
//   }
// })

// module.exports = Day

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DaySchema = new Schema({
  date: {
    type: Date
  },
  year: {type: Number},
  month: {type: Number},
  day: {type: Number},
  moodId: {
    type: mongoose.ObjectId
  },
  userId: {
    type: mongoose.ObjectId
  }
})

//create model for todo
const Day = mongoose.model('day', DaySchema)

module.exports = Day
