
exports.up = function(knex, Promise) {
    return (
        knex.Schema.createTable('User', (tbl) => {
            tbl.increments('userId').unsigned()
            tbl.string('name', 25).notNullable().defaultTo('')
            tbl.integer('age').unsigned().defaultTo('')
        })
        .then((result) => {
            console.log('User table Created! \n', result)
        })
        .catch((err) => {
            console.log('User table was not created successfully!', err)
        })
    )
};

exports.down = function(knex, Promise) {
    return (
        knex.dropTableIfExists('User')
        .then((result) => {
            console.log('User table Created! \n', result)
        })
        .catch((err) => {
            console.log('User table was not created successfully!', err)
        })
    )
};
