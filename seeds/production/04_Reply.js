const { multiply, fakeReply } = require('../../utils/makeSeeds')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Reply').del()
    .then(function () {
      // Inserts seed entries
      return knex('Reply').insert(multiply(fakeReply));
    })
    .catch(err => console.log(err.message))
};
