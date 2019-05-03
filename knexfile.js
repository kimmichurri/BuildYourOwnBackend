module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/art',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ss1=true`,
    migrations: {
      directory: './db/migrations'
    },
    userNullAsDefault: true,
    seeds: {
      directory: './db/seeds/dev'
    }
  }
};
