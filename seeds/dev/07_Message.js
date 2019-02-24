const { fakeMessage, multiply } = require('../../utils/makeSeeds')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Message').del()
    .then(function () {
      // Inserts seed entries
      return knex('Message').insert(multiply(fakeMessage, 34));
    })
    .catch(err => console.log(err.message))
};
