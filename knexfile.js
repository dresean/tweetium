// use pg as postgres client, initiates database

const pg = require('pg')
pg.defaults.ssl = true
require('dotenv').config({path: './.env'})
module.exports = {
  development : {
    client: 'pg',
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/production'
    },
    useNullAsDefault: true,
    connection: {
      database: process.env.DEV_DATABASE_NAME,
      user: process.env.DEV_DATABASE_USER,
      password: process.env.DEV_PASSWORD,
    },
    ssl: true
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
    useNullAsDefault: true,
    ssl: true
  }
};
