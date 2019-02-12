// Update with your config settings.

const pg = require('pg')
require('dotenv').config({path: '../.env'})
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
  },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/production'
    },
    useNullAsDefault: true
  }

};
