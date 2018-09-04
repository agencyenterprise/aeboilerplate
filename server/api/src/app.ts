import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { initializeRequestLogger } from './config/request-logger'
import { initializePassport } from './config/passport-initializer'
import { loadApiRoutes } from './api'

const expressApp = express()

expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})
expressApp.use(bodyParser.json())
expressApp.use(session({ secret: 'ae-boilerplate-super-session-secret', saveUninitialized: true, resave: true }))
expressApp.use(passport.initialize())
expressApp.use(passport.session())

if (process.env.NODE_ENV !== 'test') {
  initializeRequestLogger(expressApp)
}

initializePassport()

loadApiRoutes(expressApp)

export const app = expressApp
