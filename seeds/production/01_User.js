const { fakeUser, multiply } = require('../../utils/makeSeeds')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert(multiply(fakeUser))
    })
    .catch(err => console.log(err.message))
};
