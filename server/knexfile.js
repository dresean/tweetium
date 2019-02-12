// Update with your config settings.

const pg = require('pg')
require('dotenv').config({path: '../.env'})
module.exports = {

  development: {
    client: 'pg',
    // connection: process.env.DATABASE_URL,
    connection: {
      host: '127.0.0.1',
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_ACCESS_KEY,
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
      password: process.env.DATABASE_ACCESS_KEY,
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
