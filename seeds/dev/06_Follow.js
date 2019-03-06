const { fakeFollow, multiply } = require('../../utils/makeSeeds')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Follow').del()
    .then(function () {
      // Inserts seed entries
      return knex('Follow').insert(multiply(fakeFollow, 34));
    })
    .catch(err => console.log(err.message))
};
