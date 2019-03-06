const { multiply, fakeTweet } = require('../../utils/makeSeeds')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Tweet').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tweet').insert(multiply(fakeTweet));
    })
    .catch(err => console.log(err.message))
};
