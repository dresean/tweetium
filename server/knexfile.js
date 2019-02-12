// Update with your config settings.

const pg = require('pg')
require('dotenv').config({path: '../.env'})
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DEV_DATABASE_NAME,
      user: process.env.DEV_DATABASE_USER,
      password: process.env.DEV_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
  },
    seeds: {
      directory: './seeds/dev/'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
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
    ssl: true,
    useNullAsDefault: true
  }

};
