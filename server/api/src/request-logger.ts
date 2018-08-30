import httpContext from 'express-http-context'
import morgan from 'morgan'
import uuid from 'node-uuid'

export const initializeRequestLogger = (app) => {
  setupRequestId(app)
  addMorganTokens()
  logOptionRequests(app)
  logNonOptionRequests(app)
}

const requestStamp = '[:date[iso] #:id]'
const optionRequests = (req) => req.method === 'OPTIONS'
const nonOptionRequests = (req) => req.method !== 'OPTIONS'

const setupRequestId = (app) => {
  app.use(httpContext.middleware)

  app.use((req, res, next) => {
    httpContext.set('reqId', uuid.v1())
    next()
  })
}

const addMorganTokens = () => {
  morgan.token('id', (req) => httpContext.get('reqId').split('-')[0])
  morgan.token('json-body', (req) => JSON.stringify(req.body))
  morgan.token('json-query', (req) => JSON.stringify(req.query))
}

const logNonOptionRequests = (app) => {
  app.use(
    morgan(`${requestStamp} Started :method :url for :remote-addr Query: :json-query Body: :json-body`, {
      immediate: true,
      skip: optionRequests,
    }),
  )
  app.use(
    morgan(`${requestStamp} Completed :status in :response-time ms`, {
      skip: optionRequests,
    }),
  )
}

const logOptionRequests = (app) => {
  app.use(
    morgan(`${requestStamp} Completed :method :url for :remote-addr with :status in :response-time ms`, {
      skip: nonOptionRequests,
    }),
  )
}
