import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import RateLimit from 'express-rate-limit'
import session from 'express-session'
import passport from 'passport'

import { loadApiRoutes } from './api'
import { initializePassport } from './config/passport-initializer'
import { initializeRequestLogger } from './config/request-logger'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(session({ secret: 'ae-boilerplate-super-session-secret', saveUninitialized: true, resave: true }))
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV !== 'test') {
  initializeRequestLogger(app)
  initializePassport()
}

if (process.env.NODE_ENV === 'production') {
  const minutesToKeepRequestsInMemory = 15 * 60 * 1000 // 15 minutes
  const requestsPerWindowMs = 100 // limit each IP to X requests per windowMs

  const apiLimiter = new RateLimit({
    windowMs: minutesToKeepRequestsInMemory,
    max: requestsPerWindowMs,
  })

  app.use(apiLimiter)
}

loadApiRoutes(app)

export { app }
