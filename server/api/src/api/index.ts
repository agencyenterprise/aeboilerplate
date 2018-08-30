import routes from './routes'

export function loadApiRoutes(app) {
  app.use('/', routes)
}
