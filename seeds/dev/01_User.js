
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {userId: 1, name: 'Sean', age: 26},
      ]);
    });
};
