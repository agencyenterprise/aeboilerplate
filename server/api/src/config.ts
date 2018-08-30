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
}

export default configuration
