import { routes } from './routes'

export const loadApiRoutes = (app) => {
  app.use('/api', routes)
}
