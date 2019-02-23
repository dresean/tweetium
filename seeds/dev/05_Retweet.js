const { fakeRetweet, fakeReplyRetweet, multiply } = require('../../utils/makeSeeds')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Retweet').del()
    .then(function () {
      // Inserts seed entries
      return knex('Retweet')
      .insert(multiply(fakeRetweet, 11).concat(multiply(fakeReplyRetweet, 12, 23)))
    })
    .catch(err => console.log(err.message))
};
