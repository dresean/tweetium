const { multiply, fakeLike } = require('../../utils/makeSeeds')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Like').del()
    .then(function () {
      // Inserts seed entries
      return knex('Like').insert(multiply(fakeLike));
    })
    .catch(err => console.log(err.message))
};
