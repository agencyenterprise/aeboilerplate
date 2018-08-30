import bodyParser from 'body-parser'
import express from 'express'
import passport from 'passport'

import { initializeRequestLogger } from './request-logger'
import { initializePassport } from './passport-initializer'
import { loadApiRoutes } from './api'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV !== 'test') {
  initializeRequestLogger(app)
}

initializePassport()

loadApiRoutes(app)

export default app
