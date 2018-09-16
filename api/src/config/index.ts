export const config = {
  http: {
    host: process.env.HTTP_HOST || '0.0.0.0',
    port: process.env.PORT || 3001,
  },
  auth: {
    linkedIn: {
      clientID: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_basicprofile'],
    },
    successLoginRedirectUrl: process.env.SUCCESS_LOGIN_REDIRECT_URL,
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  env: process.env.NODE_ENV || 'development',
  knex: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      port: process.env.DB_CONN_PORT,
      host: process.env.DB_CONN_HOST,
      database: process.env.DB_CONN_DATABASE,
      user: process.env.DB_CONN_USER,
      password: process.env.DB_CONN_PASSWORD,
    },
    pool: {
      min: +process.env.DATABASE_POOL_MIN || 0,
      max: +process.env.DATABASE_POOL_MAX || 10,
    },
    migrations: {
      directory: `${__dirname}/../../db/pg/migrations`,
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: `${__dirname}/../../db/pg/seeds`,
    },
  },
}
