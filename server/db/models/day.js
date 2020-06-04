const Sequelize = require('sequelize')
const db = require('../db')

const Day = db.define('day', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
    // unique: true
  }
})

module.exports = Day
