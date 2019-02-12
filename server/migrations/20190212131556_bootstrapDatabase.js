
exports.up = function(knex, Promise) {
    return knex.schema.createTable('User', (tbl) => {
            tbl.increments('userId').unsigned().primary()
            tbl.string('name', 25).notNullable().defaultTo('')
            tbl.integer('age').unsigned().defaultTo(0)
            tbl.timestamps(true, true)
        })
        .then(result => {
            console.log('User table Created! \n', result)
        })
        .catch(err => {
            console.log('User table was not created successfully!', err)
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('User')
        .then(result => {
            console.log('User table Created! \n', result)
        })
        .catch(err => {
            console.log('User table was not created successfully!', err)
        })
};
