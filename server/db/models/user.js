// const crypto = require('crypto')
// const Sequelize = require('sequelize')
// const db = require('../db')

// const User = db.define('user', {
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//     validate: {
//       isEmail: {
//         msg: 'Must be a valid email!'
//       }
//     }
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [[6, 20]],
//         msg: 'Must be 6 - 20 characters long.'
//       }
//     },
//     // Making `.password` act like a func hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('password')
//     }
//   },
//   salt: {
//     type: Sequelize.STRING,
//     // Making `.salt` act like a function hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('salt')
//     }
//   },
//   googleId: {
//     type: Sequelize.STRING
//   },
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: {
//         msg: 'Please enter your name.'
//       }
//     }
//   },
//   accountType: {
//     type: Sequelize.ENUM('User', 'Admin'),
//     defaultValue: 'User'
//   }
// })

// module.exports = User

// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// /**
//  * classMethods
//  */
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

// /**
//  * hooks
//  */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// User.beforeCreate(setSaltAndPassword)
// User.beforeUpdate(setSaltAndPassword)
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword)
// })

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Required']
  },
  password: {
    type: String,
    required: [true, 'Required'],
    minlength: 6,
    maxlength: 20
  },
  firstName: {
    type: String,
    required: [true, 'Required']
  },
  accountType: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  }
})

//create model for todo
const User = mongoose.model('user', UserSchema)

module.exports = User
