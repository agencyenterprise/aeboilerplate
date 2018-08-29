import express from 'express'
import bodyParser from 'body-parser'

import loadApiRoutes from './api'
import addRequestLogging from './request-logger'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})

app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'test') {
  addRequestLogging(app)
}

loadApiRoutes(app)

export default app
