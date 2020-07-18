'use strict'

// const db = require('../server/db')
// const {User, Day, Mood} = require('../server/db/models')

const seeder = require('mongoose-seed')

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   const users = await Promise.all([
//     User.create({
//       email: 'cody@email.com',
//       password: '123456',
//       firstName: 'Cody'
//     }),
//     User.create({
//       email: 'murphy@email.com',
//       password: '123456',
//       firstName: 'Murphy'
//     }),
//     User.create({
//       email: 'stephaniebchiang@gmail.com',
//       password: '098765',
//       firstName: 'Steph',
//       accountType: 'Admin'
//     })
//   ])

// const moods = await Promise.all([
//   Mood.create({color: 'orange', mood: 'excited'}),
//   Mood.create({color: 'yellow', mood: 'happy'}),
//   Mood.create({color: 'green', mood: 'serene'}),
//   Mood.create({color: 'blue', mood: 'melancholy'}),
//   Mood.create({color: 'purple', mood: 'moody'}),
//   Mood.create({color: 'red', mood: 'angry'}),
//   Mood.create({color: 'black', mood: 'depressed'}),
//   Mood.create({color: 'grey', mood: 'neutral'})
// ])

//   const days = await Promise.all([
//     Day.create({userId: 1, moodId: 1}),
//     Day.create({userId: 2, moodId: 2}),
//     Day.create({userId: 2, moodId: 1, date: '2020-06-01'}),
//     Day.create({userId: 3, moodId: 3, date: '2020-06-01'}),
//     Day.create({userId: 1, moodId: 1, date: '2020-06-01'}),
//     Day.create({userId: 1, moodId: 2, date: '2020-06-02'}),
//     Day.create({userId: 1, moodId: 2, date: '2020-06-03'})
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded ${days.length} days`)
//   console.log(`seeded ${moods.length} moods`)
//   console.log(`seeded successfully`)
// }

// // We've separated the `seed` function from the `runSeed` function.
// // This way we can isolate the error handling and exit trapping.
// // The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed

// Connect to MongoDB via Mongoose
seeder.connect(
  'mongodb+srv://SBC:huestory@huestory.ubs9w.mongodb.net/huestory?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true},
  function() {
    // Load Mongoose models
    seeder.loadModels(['./server/db/models/mood', './server/db/models/user'])
    // Clear specified collections
    seeder.clearModels(['mood', 'user'], function() {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function(err, done) {
        if (err) {
          return console.log('seeding err', err)
        }
        if (done) {
          return console.log('seed done', done)
        }
        seeder.disconnect()
      })
    })
  }
)

// Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'mood',
    documents: [
      {name: 'excited', color: 'orange'},
      {name: 'happy', color: 'yellow'},
      {name: 'serene', color: 'green'},
      {name: 'melancholy', color: 'blue'},
      {name: 'moody', color: 'purple'},
      {name: 'angry', color: 'red'},
      {name: 'depressed', color: 'black'},
      {name: 'neutral', color: 'grey'}
    ]
  },
  {
    model: 'user',
    documents: [
      {email: 'cody@email.com', password: '123456', firstName: 'Cody'},
      {email: 'murphy@email.com', password: '123456', firstName: 'Murphy'},
      {
        email: 'SBC@email.com',
        password: '098765',
        firstName: 'SBC',
        accountType: 'Admin'
      }
    ]
  }
]
