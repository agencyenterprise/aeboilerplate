const configuration = {
  http: {
    host: process.env.HTTP_HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  auth: {
    linkedIn: {
      clientID: '77gy1y1ddffvxw',
      clientSecret: 'WNOSE0fM0KdVPlDq',
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_basicprofile'],
    },
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  env: process.env.NODE_ENV || 'development',
  knex: {
    development: {
      client: 'postgresql',
      connection: {
        port: process.env.DB_CONN_PORT,
        host: process.env.DB_CONN_HOST,
        database: process.env.DB_CONN_DATABASE,
        user: process.env.DB_CONN_USER,
        password: process.env.DB_CONN_PASSWORD,
      },
      pool: {
        min: +process.env.DATABASE_POOL_MIN,
        max: +process.env.DATABASE_POOL_MAX,
      },
      migrations: {
        directory: `${__dirname}/../db/pg/migrations`,
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  },
}

export default configuration
