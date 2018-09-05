import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import RateLimit from 'express-rate-limit'

import { initializeRequestLogger } from './config/request-logger'
import { initializePassport } from './config/passport-initializer'
import { loadApiRoutes } from './api'

const app = express()

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})
app.use(bodyParser.json())
app.use(session({ secret: 'ae-boilerplate-super-session-secret', saveUninitialized: true, resave: true }))
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV !== 'test') {
  initializeRequestLogger(app)
}

if (process.env.NODE_ENV === 'production') {
  const minutesToKeepRequestsInMemory = 15 * 60 * 1000 // 15 minutes
  const requestsPerWindowMs = 100 // limit each IP to X requests per windowMs

  const apiLimiter = new RateLimit({
    windowMs: minutesToKeepRequestsInMemory,
    max: requestsPerWindowMs
  });

  app.use(apiLimiter)
}

initializePassport()

loadApiRoutes(app)

export { app }
