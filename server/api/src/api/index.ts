import routes from './routes'

export const loadApiRoutes = (app) => {
  app.use('/', routes)
}
