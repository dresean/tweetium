const knex = require('./knexfile')
const config = knex[process.env.CONFIG] || knex['development']
module.exports = require('knex')(config)