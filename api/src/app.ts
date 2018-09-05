import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { initializeRequestLogger } from './config/request-logger'
import { initializePassport } from './config/passport-initializer'
import { loadApiRoutes } from './api'

const app = express()

app.use((req, res, next) => {
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

initializePassport()

loadApiRoutes(app)

export { app }
