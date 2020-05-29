const Sequelize = require('sequelize')
const db = require('../db')

const Mood = db.define('mood', {
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  mood: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Mood
