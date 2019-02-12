// Update with your config settings.

const pg = require('pg')
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: './migrations',
    seeds: './seeds/dev',
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/production'
    },
    useNullAsDefault: true
  }

};
