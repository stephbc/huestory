// const Sequelize = require('sequelize')
// const db = require('../db')

// const Mood = db.define('mood', {
//   color: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   mood: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   }
// })

// module.exports = Mood

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoodSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Required']
  },
  color: {
    type: String,
    required: [true, 'Required']
  }
})

//create model for todo
const Mood = mongoose.model('mood', MoodSchema)

module.exports = Mood
