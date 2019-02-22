const { fakeUser } = require('../../utils/makeSeeds')

const arr = []

const multiply = (cb) => {
  for(let i = 1; i <= 35; i++) {
    arr.push(cb(i))
  }
  return arr
}

multiply(fakeUser)

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert(arr);
    })
    .catch(err => console.log(err))
};
