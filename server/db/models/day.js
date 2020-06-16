const Sequelize = require('sequelize')
const db = require('../db')

const Day = db.define('day', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
    // unique: true
  },
  moodId: {
    type: Sequelize.INTEGER,
    unique: false
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: false
  }
})

module.exports = Day
